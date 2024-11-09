import axios from "axios";

const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjcWZxc2t2aXp4cWdmbW1lcXVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMDk1MzcsImV4cCI6MjA0NjY4NTUzN30.xhZx65ir9m9Jn0XIJEeBeueLI72THSSSEqJlCUg5P-ceyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjcWZxc2t2aXp4cWdmbW1lcXVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMDk1MzcsImV4cCI6MjA0NjY4NTUzN30.xhZx65ir9m9Jn0XIJEeBeueLI72THSSSEqJlCUg5P-c';
const SERVICE_KEY = process.env.API_KEY;

const supabaseApi = axios.create({
    baseURL: 'https://dcqfqskvizxqgfmmequm.supabase.co',
    headers: {
        'Content-Type': 'application/json',
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`
    }
});

interface Like {
    id: string;
    message_id: string;
    created_at?: string;
}

export async function getLikes(): Promise<Like[]> {
    try {
        const response = await supabaseApi.get('/rest/v1/likes', {
            headers: {
                'apikey': ANON_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar likes:", error);
        return [];
    }
}

export async function saveLike(messageId: string): Promise<Like | null> {
    try {
        const response = await supabaseApi.post('/rest/v1/likes', 
            { message_id: messageId },
            {
                headers: {
                    'Authorization': `Bearer ${SERVICE_KEY}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao salvar like:", error);
        return null;
    }
}

export default supabaseApi; 