import React from 'react';
import { motion } from 'motion/react';
import { Building, GraduationCap, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

const UNIVERSITIES = [
  {
    id: 'fptu',
    name: 'Đại học FPT Cần Thơ',
    description: 'Trường đại học hàng đầu về công nghệ và đổi mới sáng tạo tại khu vực Đồng bằng sông Cửu Long.',
    strengths: ['Công nghệ thông tin', 'Kinh tế', 'Ngôn ngữ', 'Thiết kế đồ họa'],
    image: 'https://cantho.fpt.edu.vn/images/slider/slide-1.jpg', // Placeholder image
    location: 'Cần Thơ',
    isFeatured: true,
  },
  {
    id: 'ctu',
    name: 'Đại học Cần Thơ',
    description: 'Trường đại học trọng điểm quốc gia, đa ngành, đa lĩnh vực.',
    strengths: ['Nông nghiệp', 'Thủy sản', 'Sư phạm', 'Kỹ thuật'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Can_Tho_University_Logo.png/1200px-Can_Tho_University_Logo.png', // Placeholder
    location: 'Cần Thơ',
    isFeatured: false,
  },
  {
    id: 'hcmut',
    name: 'Đại học Bách Khoa TP.HCM',
    description: 'Trung tâm đào tạo kỹ thuật hàng đầu phía Nam.',
    strengths: ['Kỹ thuật', 'Công nghệ', 'Kiến trúc'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_HCMUT.png/1200px-Logo_HCMUT.png', // Placeholder
    location: 'TP. Hồ Chí Minh',
    isFeatured: false,
  },
];

export const UniversityDiscovery = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-orange-600" />
        Khám phá trường đại học
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {UNIVERSITIES.map((uni, index) => (
          <motion.div
            key={uni.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border ${uni.isFeatured ? 'border-orange-200 ring-2 ring-orange-100' : 'border-stone-200'}`}
          >
            <div className="h-48 bg-stone-200 relative overflow-hidden group">
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src={uni.image} 
                alt={uni.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                    // Fallback image if link breaks
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=University';
                }}
              />
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <h3 className="font-bold text-lg">{uni.name}</h3>
                <p className="text-sm opacity-90 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {uni.location}
                </p>
              </div>
              {uni.isFeatured && (
                <div className="absolute top-4 right-4 z-20 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Đề xuất
                </div>
              )}
            </div>

            <div className="p-6">
              <p className="text-stone-600 text-sm mb-4 line-clamp-3">
                {uni.description}
              </p>

              <div className="mb-4">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Thế mạnh đào tạo</h4>
                <div className="flex flex-wrap gap-2">
                  {uni.strengths.map(strength => (
                    <span key={strength} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-md border border-stone-200">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              <button className={`w-full py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${uni.isFeatured ? 'bg-orange-50 text-orange-700 hover:bg-orange-100' : 'bg-stone-50 text-stone-700 hover:bg-stone-100'}`}>
                Tìm hiểu thêm <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
