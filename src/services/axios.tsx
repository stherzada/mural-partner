import axios from "axios";

async function api() {
    try {
        const response = await axios.get('https://script.google.com/macros/s/AKfycbxKyd290oCunOdYlytU4FoUp2vPKlglFe0qUentNP3YZcbiK4jVlqQGsKCpaQ7-TKd8/exec');
        
        // Filtra apenas twitch e mensagem de cada objeto
        const filteredData = response.data.map((item: any) => ({
            twitch: item.Twitch,
            mensagem: item.Mensagem
        }));
        
        return filteredData;
    } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
        return [];
    }
}

export default api;
