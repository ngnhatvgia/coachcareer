import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { chatWithCoach } from '../services/ai';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const ChatInterface = () => {
  const { analysisResult } = useApp();
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Chào bạn! Mình là AI Coach. Bạn có muốn mình phân tích sâu hơn ngành nào không? Hoặc bạn có thắc mắc gì khác, hãy hỏi mình nhé! 👇' }
  ]);
  const [input, setInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isChatLoading) return;

    const userMsg = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);

    try {
      // Construct history for context
      const history = [
        {
          role: 'user',
          parts: [{ text: `Đây là kết quả phân tích của tôi: ${JSON.stringify(analysisResult)}` }]
        },
        {
          role: 'model',
          parts: [{ text: "Đã hiểu. Tôi sẵn sàng giải đáp thắc mắc dựa trên kết quả này." }]
        },
        ...messages.map(m => ({
          role: m.role === 'model' ? 'model' : 'user', // Map 'model' to 'model' for Gemini API (it uses 'model' role for AI responses in history usually, or 'user' for user)
          // Actually Gemini API uses 'user' and 'model'.
          parts: [{ text: m.text }]
        }))
      ];

      const responseText = await chatWithCoach(history, userMsg);
      setMessages((prev) => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { role: 'model', text: "Xin lỗi, mình đang gặp chút sự cố. Bạn thử lại sau nhé!" }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden flex flex-col h-[500px]">
      <div className="bg-orange-600 p-4 flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-full">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-white font-bold">Hỏi đáp cùng AI Coach</h3>
          <p className="text-orange-200 text-xs">Luôn sẵn sàng lắng nghe</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-orange-100' : 'bg-emerald-100'}`}>
              {msg.role === 'user' ? <User className="w-5 h-5 text-orange-600" /> : <Sparkles className="w-5 h-5 text-emerald-600" />}
            </div>
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-orange-600 text-white rounded-tr-none'
                  : 'bg-white text-stone-800 shadow-sm border border-stone-100 rounded-tl-none'
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isChatLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-stone-100">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-stone-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isChatLoading}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-stone-300 text-white p-3 rounded-xl transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
