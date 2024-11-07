import axios from "axios";

async function api() {
    try {
        const response = await axios.get('https://script.google.com/macros/s/AKfycbxKyd290oCunOdYlytU4FoUp2vPKlglFe0qUentNP3YZcbiK4jVlqQGsKCpaQ7-TKd8/exec');
        console.log(response.data);  
        return response;
    } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
    }
}

export default api;
