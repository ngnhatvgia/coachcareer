import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { generateEntertainmentContent } from '../services/ai';
import { Sun, Loader2 } from 'lucide-react';
import { ImmersiveLayout } from './ImmersiveLayout';
import { useNavigate } from 'react-router-dom';

export const DailyMessage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true);
      try {
        const data = await generateEntertainmentContent('daily', {});
        // The prompt asks for lucky_message or content for the message
        setMessage(data.lucky_message || data.content);
      } catch (error) {
        console.error(error);
        setMessage("Hãy luôn tin tưởng vào bản thân và nỗ lực hết mình. Những điều tốt đẹp đang chờ đón bạn phía trước!");
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  return (
    <ImmersiveLayout title="Thông Điệp Mỗi Ngày" subtitle="Năng lượng tích cực" theme="daily" onBack={() => navigate('/entertainment')}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
            <p className="text-yellow-100">Đang nhận thông điệp từ vũ trụ...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="mb-8 relative inline-block">
              <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-30 rounded-full" />
              <Sun className="w-20 h-20 text-yellow-400 relative z-10 animate-pulse" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight font-serif">
              "{message}"
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-8" />
            
            <p className="text-yellow-100/80 italic">
              Chúc bạn một ngày tràn đầy năng lượng và niềm vui!
            </p>
          </motion.div>
        )}
      </div>
    </ImmersiveLayout>
  );
};
