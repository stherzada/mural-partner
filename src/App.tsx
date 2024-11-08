import { useEffect, useState } from 'react';
import api from './services/axios.ts';

interface Message {
    twitch: string;
    mensagem: string;
    id?: string;
}

function App() {
    const [data, setData] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState<{[key: string]: boolean}>({});

    const fetchData = async () => {
        try {
            const response = await api();
            if (JSON.stringify(response) !== JSON.stringify(data)) {
                setData(response);
            }
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const handleLike = (index: number) => {
        setLikes(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-gray-600">Carregando...</div>
        </div>
    );

    return (
        <div className="min-h-screen w-full bg-gray-100 px-4 py-8 flex flex-col">
            <h1 className="text-4xl font-bold my-8 text-center flex justify-center items-center">
                <span className="rainbow-text">1 ANO DE PARTNER DA STHERZADA</span>
                <span className="ml-2">🎉</span>
            </h1>
            <div className="w-full">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {data.map((item, index) => (
                        <div 
                            key={index} 
                            className="break-inside-avoid bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-float"
                            style={{
                                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-purple-600 font-semibold">
                                        {item?.twitch}
                                    </span>
                                    <button 
                                        onClick={() => handleLike(index)}
                                        className="focus:outline-none transform transition-transform duration-200 hover:scale-110 bg-transparent border-none"
                                    >
                                        {likes[index] ? (
                                            <span className="text-2xl animate-like">💜</span>
                                        ) : (
                                            <span className="text-2xl opacity-70 hover:opacity-100">🖤</span>
                                        )}
                                    </button>
                                </div>
                                <p className="text-gray-600">
                                    {item?.mensagem}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="mt-auto py-8 text-center">
                <p className="text-lg">
                    Deseja mandar uma mensagem também?{" "}
                    <a 
                        href="https://forms.gle/2YhFD7sQPGRa7aQDA" 
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
