import axios from "axios";

interface ResponseData {
    Twitch: string;
    Mensagem: string;
    id: string;
}

async function fetchSheetMessages() {
    try {
        const response = await axios.get<ResponseData[]>('https://script.google.com/macros/s/AKfycbxKyd290oCunOdYlytU4FoUp2vPKlglFe0qUentNP3YZcbiK4jVlqQGsKCpaQ7-TKd8/exec');
        const filteredData = response.data.map((item: ResponseData) => ({
            twitch: item.Twitch,
            mensagem: item.Mensagem,
            id: item.id
        }));
        
        return filteredData;
    } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
        return [];
    }
}

export default fetchSheetMessages;
