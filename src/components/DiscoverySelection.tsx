import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Compass, Star, Moon } from 'lucide-react';

export const DiscoverySelection = () => {
  const { setStep } = useApp();
  const navigate = useNavigate();

  const options = [
    {
      id: 'holland',
      title: 'Trắc nghiệm Holland',
      description: 'Khám phá tính cách nghề nghiệp qua bài trắc nghiệm khoa học.',
      icon: Compass,
      color: 'bg-blue-500',
      action: () => setStep(3), // Go to Holland Test (Step 3)
    },
    {
      id: 'tarot',
      title: 'Tarot',
      description: 'Thông điệp vũ trụ về định hướng tương lai của bạn.',
      icon: Sparkles,
      color: 'bg-purple-500',
      action: () => navigate('/tarot'),
    },
    {
      id: 'numerology',
      title: 'Thần Số Học',
      description: 'Khám phá con số chủ đạo và ý nghĩa cuộc đời bạn.',
      icon: Star, // Using Star as a placeholder for Numerology
      color: 'bg-indigo-500',
      action: () => navigate('/numerology'),
    },
    {
      id: 'zodiac',
      title: 'Cung Hoàng Đạo',
      description: 'Giải mã tính cách dựa trên chòm sao của bạn.',
      icon: Moon,
      color: 'bg-pink-500',
      action: () => navigate('/zodiac'),
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-900 mb-4">
          Khám phá bản thân
        </h2>
        <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
          Chọn một phương pháp để bắt đầu hành trình thấu hiểu chính mình. 
          Bạn có thể quay lại đây bất cứ lúc nào.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={option.action}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer group border border-stone-100 hover:border-orange-200 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 ${option.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
              
              <div className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                <option.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors">
                {option.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {option.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
