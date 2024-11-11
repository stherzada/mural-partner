import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import fetchSheetMessages from "./services/axios";
import { Message } from "./types/Message";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { MessageCard } from "./components/MessageCard";

const FORM_URL = "https://forms.gle/2YhFD7sQPGRa7aQDA";
const REFRESH_INTERVAL = 30000;

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

const debounce = (fn: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

function App() {
    const [data, setData] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState<Record<string, number>>({});

    const fetchData = useCallback(async () => {
        try {
            const response = await fetchSheetMessages();
            if (JSON.stringify(response) !== JSON.stringify(data)) {
                setData(response);
            }
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setLoading(false);
        }
    }, [data]);

    const fetchLikes = useCallback(async () => {
        const { data: likesData, error } = await supabase
            .from('likes')
            .select('*');
        
        if (error) {
            console.error("Erro ao buscar likes:", error);
            return;
        }

        const likesMap = likesData.reduce((acc, like) => ({
            ...acc,
            [like.message_id]: like.like_count
        }), {});
        
        setLikes(likesMap);
    }, []);

    const handleLike = useCallback(
        debounce(async (messageId: string) => {
            try {
                const numericId = parseInt(messageId);
                if (isNaN(numericId)) throw new Error("ID inválido");

                const { error } = await supabase
                    .rpc('increment_like', { message_id: numericId });
                    
                if (error) throw error;
                await fetchLikes();
            } catch (error) {
                console.error("Erro ao salvar like:", error);
            }
        }, 3500),
        [fetchLikes]
    );

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [fetchData]);

    useEffect(() => {
        fetchLikes();
    }, [fetchLikes]);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen w-full bg-gray-100 px-4 py-8 flex flex-col">
            <h1 className="text-4xl font-bold my-8 text-center flex justify-center items-center">
                <span className="rainbow-text">
                    1 ANO DE PARTNER DA STHERZADA
                </span>
                <span className="ml-2">🎉</span>
            </h1>
            
            <div className="w-full">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {data.map((message, index) => (
                        <MessageCard
                            key={index}
                            message={message}
                            likes={likes[message.id || '']}
                            onLike={handleLike}
                        />
                    ))}
                </div>
            </div>

            <footer className="mt-auto py-8 text-center">
                <p className="text-lg">
                    Deseja mandar uma mensagem também?{" "}
                    <a
                        href={FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 underline font-medium"
                    >
                        Clique aqui
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default App;
