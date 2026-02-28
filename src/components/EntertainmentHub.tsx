import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Star, Hash, Layers, Sun, ArrowRight } from 'lucide-react';
import { ImmersiveLayout } from './ImmersiveLayout';

export const EntertainmentHub = () => {
  const modules = [
    {
      title: 'Cung Hoàng Đạo',
      description: 'Khám phá tính cách qua lăng kính chiêm tinh.',
      icon: Star,
      path: '/zodiac',
      color: 'bg-purple-600',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Thần Số Học',
      description: 'Giải mã con số chủ đạo của cuộc đời bạn.',
      icon: Hash,
      path: '/numerology',
      color: 'bg-orange-600',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      title: 'Tarot',
      description: 'Nhận thông điệp định hướng từ những lá bài.',
      icon: Layers,
      path: '/tarot',
      color: 'bg-emerald-600',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Thông Điệp Ngày',
      description: 'Nạp năng lượng tích cực mỗi ngày.',
      icon: Sun,
      path: '/daily',
      color: 'bg-sky-600',
      gradient: 'from-sky-500 to-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Góc Giải Trí & Khám Phá</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Thư giãn và thấu hiểu bản thân hơn qua các công cụ phân tích thú vị. 
            Kết hợp giữa khoa học dữ liệu và các phương pháp trắc nghiệm tâm lý.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, idx) => (
            <Link key={idx} to={module.path} className="block group">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 h-full flex flex-col relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${module.gradient} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-opacity group-hover:opacity-20`} />
                
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  <module.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {module.title}
                </h3>
                <p className="text-stone-600 mb-6 flex-grow">
                  {module.description}
                </p>
                
                <div className="flex items-center text-sm font-medium text-stone-500 group-hover:text-orange-600 transition-colors">
                  Khám phá ngay <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
