'use client';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.sender === 'ai';

  return (
    <div className={`flex items-start gap-2 ${isAI ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
        isAI 
          ? 'bg-gradient-to-br from-primary-cyan to-primary-purple' 
          : 'bg-gray-700'
      }`}>
        {isAI ? '🧠' : '👤'}
      </div>

      {/* Message Bubble */}
      <div className={`max-w-[75%] rounded-lg px-4 py-2 ${
        isAI 
          ? 'bg-dark-700/50 text-gray-200' 
          : 'bg-gradient-to-r from-primary-cyan to-primary-purple text-white'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>
      </div>
    </div>
  );
}
