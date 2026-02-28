import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MapPin, DollarSign, Briefcase, Building, Filter, Star, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  salary: string;
  location: string;
  field: string;
  matchScore: number;
}

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Fresher Frontend Developer',
    company: 'Tech Solutions Vietnam',
    description: 'Tham gia phát triển ứng dụng web sử dụng ReactJS, TailwindCSS.',
    skills: ['ReactJS', 'JavaScript', 'HTML/CSS'],
    salary: '10 - 15 triệu',
    location: 'Hồ Chí Minh',
    field: 'Công nghệ thông tin',
    matchScore: 95,
  },
  {
    id: '2',
    title: 'Content Marketing Intern',
    company: 'Creative Agency',
    description: 'Sáng tạo nội dung cho các kênh social media, viết bài SEO.',
    skills: ['Content Writing', 'Social Media', 'Creative'],
    salary: '3 - 5 triệu',
    location: 'Hà Nội',
    field: 'Marketing',
    matchScore: 85,
  },
  {
    id: '3',
    title: 'Junior Graphic Designer',
    company: 'Design Studio',
    description: 'Thiết kế banner, poster, ấn phẩm truyền thông.',
    skills: ['Photoshop', 'Illustrator', 'Creativity'],
    salary: '8 - 12 triệu',
    location: 'Đà Nẵng',
    field: 'Thiết kế',
    matchScore: 75,
  },
  {
    id: '4',
    title: 'Business Analyst Fresher',
    company: 'Fintech Corp',
    description: 'Phân tích yêu cầu nghiệp vụ, viết tài liệu kỹ thuật.',
    skills: ['Analysis', 'Communication', 'SQL'],
    salary: '12 - 18 triệu',
    location: 'Hồ Chí Minh',
    field: 'Kinh tế',
    matchScore: 60,
  },
  {
    id: '5',
    title: 'Sales Executive',
    company: 'Real Estate Group',
    description: 'Tìm kiếm và tư vấn khách hàng mua bán bất động sản.',
    skills: ['Sales', 'Communication', 'Negotiation'],
    salary: '10 - 30 triệu',
    location: 'Hà Nội',
    field: 'Kinh doanh',
    matchScore: 50,
  },
];

export const CareerFeed = () => {
  const { userProfile } = useApp();
  const [filterField, setFilterField] = useState<string>('All');

  // Simulate personalization logic
  const personalizedJobs = useMemo(() => {
    // In a real app, we would calculate matchScore based on userProfile here
    // For now, we use the mock matchScore but sort/filter by it
    let jobs = [...MOCK_JOBS];
    
    // Simple filter simulation
    if (filterField !== 'All') {
      jobs = jobs.filter(job => job.field === filterField);
    }

    // Sort by match score
    return jobs.sort((a, b) => b.matchScore - a.matchScore);
  }, [filterField]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-orange-600" />
          Bảng tin việc làm
        </h3>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-stone-400" />
          <select 
            className="text-sm border-none bg-stone-100 rounded-lg px-3 py-1.5 focus:ring-0 cursor-pointer"
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
          >
            <option value="All">Tất cả lĩnh vực</option>
            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
            <option value="Marketing">Marketing</option>
            <option value="Thiết kế">Thiết kế</option>
            <option value="Kinh tế">Kinh tế</option>
            <option value="Kinh doanh">Kinh doanh</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {personalizedJobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-stone-100 rounded-xl p-4 hover:border-orange-200 hover:shadow-md transition-all group bg-stone-50/50"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                  {job.title}
                </h4>
                <p className="text-sm text-stone-500 flex items-center gap-1">
                  <Building className="w-3 h-3" /> {job.company}
                </p>
              </div>
              {job.matchScore >= 70 && (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {job.matchScore}% Match
                </span>
              )}
            </div>

            <p className="text-sm text-stone-600 mb-3 line-clamp-2">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {job.skills.map(skill => (
                <span key={skill} className="text-xs bg-white border border-stone-200 px-2 py-1 rounded-md text-stone-600">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 pt-3">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> {job.salary}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {job.location}
                </span>
              </div>
              <button className="text-orange-600 font-medium hover:underline">
                Ứng tuyển ngay
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
