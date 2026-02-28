import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const WelcomeScreen = () => {
  const { setStep } = useApp();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <div className="mb-8 flex justify-center">
          <div className="bg-orange-100 p-4 rounded-full">
            <Sparkles className="w-12 h-12 text-orange-600" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 tracking-tight">
          Chào bạn! 👋 <br />
          <span className="text-orange-600">AI Hướng Nghiệp</span> đây.
        </h1>
        
        <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed">
          Mình ở đây để giúp bạn khám phá bản thân và tìm ra con đường nghề nghiệp phù hợp nhất. 
          Chỉ mất vài phút để vẽ nên tương lai!
        </p>

        <button
          onClick={() => setStep(1)}
          className="group bg-orange-600 hover:bg-orange-700 text-white text-xl font-medium py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
        >
          Bắt đầu ngay
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full text-left">
          {[
            { id: '01', label: 'Khám phá bản thân', icon: '🔍' },
            { id: '02', label: 'Trắc nghiệm Holland', icon: '📝' },
            { id: '03', label: 'Phân tích AI', icon: '🤖' },
            { id: '04', label: 'Định hướng tương lai', icon: '🚀' },
          ].map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:border-orange-200 hover:shadow-md transition-all group cursor-default">
              <div className="flex justify-between items-start mb-3">
                <span className="text-4xl font-black text-orange-500 group-hover:text-orange-600 transition-colors">{item.id}</span>
                <span className="text-2xl opacity-50 grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
              </div>
              <div className="font-bold text-stone-800 text-lg group-hover:text-orange-700 transition-colors">{item.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
