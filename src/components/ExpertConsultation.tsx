import React from 'react';
import { motion } from 'motion/react';
import { User, Star, Calendar, MessageCircle, Video } from 'lucide-react';

const MENTORS = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    title: 'Senior Career Coach',
    experience: '10 năm kinh nghiệm tư vấn hướng nghiệp',
    expertise: ['Công nghệ thông tin', 'Kỹ năng mềm'],
    rating: 4.9,
    reviews: 120,
    avatar: 'https://i.pravatar.cc/150?u=a',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    title: 'HR Manager',
    experience: '8 năm kinh nghiệm tuyển dụng',
    expertise: ['Phỏng vấn', 'CV Review', 'Marketing'],
    rating: 4.8,
    reviews: 95,
    avatar: 'https://i.pravatar.cc/150?u=b',
  },
];

export const ExpertConsultation = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
            <User className="w-6 h-6 text-orange-600" />
            Tư vấn chuyên gia
          </h2>
          <p className="text-stone-600 mt-2">
            Kết nối trực tiếp với các chuyên gia hàng đầu để nhận lời khuyên chuyên sâu.
          </p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg shadow-orange-200 transition-all flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Đặt lịch ngay
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MENTORS.map((mentor) => (
          <motion.div
            key={mentor.id}
            whileHover={{ y: -5 }}
            className="border border-stone-100 rounded-xl p-6 hover:border-orange-200 hover:shadow-md transition-all bg-stone-50/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={mentor.avatar} 
                alt={mentor.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <h3 className="font-bold text-lg text-stone-900">{mentor.name}</h3>
                <p className="text-sm text-orange-600 font-medium">{mentor.title}</p>
                <div className="flex items-center gap-1 text-xs text-stone-500 mt-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span>{mentor.rating} ({mentor.reviews} đánh giá)</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-stone-600 mb-4 line-clamp-2">
              {mentor.experience}. Chuyên môn: {mentor.expertise.join(', ')}.
            </p>

            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50 flex items-center justify-center gap-2 transition-colors">
                <MessageCircle className="w-4 h-4" /> Chat
              </button>
              <button className="flex-1 py-2 bg-orange-50 border border-orange-100 rounded-lg text-sm font-medium text-orange-700 hover:bg-orange-100 flex items-center justify-center gap-2 transition-colors">
                <Video className="w-4 h-4" /> Video Call
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
