import React, { useEffect, useState } from 'react';
import api from './services/axios';

interface Message {
    twitch: string;
    mensagem: string;
}

import './App.css'
function App() {
    const [data, setData] = useState<Message[]>([]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api(); 
                setData(response);       
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);            
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-gray-600">Carregando...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Mensagens da Comunidade
                </h1>
                
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
        </div>
    );
}

export default App
