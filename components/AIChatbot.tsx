'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessage, getWelcomeMessage } from '@/lib/AI';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for custom event to open chatbot
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true);
    };

    window.addEventListener('openChatbot', handleOpenChatbot);
    
    return () => {
      window.removeEventListener('openChatbot', handleOpenChatbot);
    };
  }, []);

  // Send welcome message when chatbot opens for the first time
  useEffect(() => {
    if (isOpen && !hasWelcomed) {
      setIsTyping(true);
      setHasWelcomed(true);
      
      getWelcomeMessage().then((welcomeText) => {
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          text: welcomeText,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
        setIsTyping(false);
      }).catch((error) => {
        console.error('Error getting welcome message:', error);
        // Fallback welcome message
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          text: "Hi! I'm Danny Yang, a Full Stack Developer and AI Engineer. I'd love to chat with you about my experience, projects, or technical expertise. What would you like to know?",
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
        setIsTyping(false);
      });
    }
  }, [isOpen, hasWelcomed]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponseText = await sendMessage(currentInput);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Show error message to user
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble responding right now. Please try asking your question again.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full border-2 border-primary-purple flex items-center justify-center hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={28} className='text-primary-cyan' /> : <img src='/ai-icon.png' alt='AI Icon' className='w-14 h-14' />}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, rotateY: 90, scale: 0, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 90, scale: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed bottom-28 right-8 z-50 w-[90vw] md:w-96 h-[500px] glass-strong rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-primary-cyan/10 to-primary-purple/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-primary-purple flex items-center justify-center">
                  <img src='/ai-icon.png' alt='AI Icon' className='w-8 h-8' />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Hi, I am D.Y's AI Assistant</h3>
                  <p className="text-xs text-gray-400">Powered by Gemini AI</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-primary-purple flex items-center justify-center text-sm">
                    <img src='/ai-icon.png' alt='AI Icon' className='w-6 h-6' />
                  </div>
                  <div className="bg-dark-700/50 rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type message..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2 rounded-lg bg-dark-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-primary-cyan transition-colors text-sm disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-cyan to-primary-purple flex items-center justify-center transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
