import { useEffect, useState } from 'react';
import api from './services/axios';

interface Message {
    twitch: string;
    mensagem: string;
}

function App() {
    const [data, setData] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await api();
            // Compara se há dados novos antes de atualizar
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
        fetchData(); // Busca inicial

        // Configura o intervalo para verificar a cada 30 segundos
        const interval = setInterval(() => {
            fetchData();
        }, 30000);

        // Limpa o intervalo quando o componente for desmontado
        return () => clearInterval(interval);
    }, []);

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-float"
                            style={{
                                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        >
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <span className="text-purple-600 font-semibold">
                                        {item?.twitch}
                                    </span>
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
