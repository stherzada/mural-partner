import React, { useEffect, useState } from 'react';
import api from './services/axios';

function App() {
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api(); 
                setData(response?.data);       
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);            
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            <h1>Dados da API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default App;
