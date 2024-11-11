import { Message } from "../types/Message";

interface MessageCardProps {
    message: Message;
    likes: number;
    onLike: (id: string) => void;
}

export const MessageCard = ({ message, likes, onLike }: MessageCardProps) => (
    <div
        className="break-inside-avoid bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-float"
        style={{
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
        }}
    >
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-purple-600 font-semibold">
                    {message.twitch}
                </span>
                <button
                    onClick={() => message.id && onLike(message.id)}
                    className="focus:outline-none transform transition-transform duration-200 hover:scale-110 bg-transparent border-none"
                >
                    <span className="text-2xl animate-like">💜</span>
                    <span className="ml-1">{likes || 0}</span>
                </button>
            </div>
            <p className="text-gray-600">{message.mensagem}</p>
        </div>
    </div>
); 