import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, BookOpen, GraduationCap, Briefcase, Loader2, ArrowRight } from 'lucide-react';
import { searchCareers, CareerSearchResult } from '../services/ai';
import { useNavigate } from 'react-router-dom';

export const CareerSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CareerSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const data = await searchCareers(query);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleCareerClick = (title: string) => {
    navigate(`/career/${encodeURIComponent(title)}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Tra cứu Nghề nghiệp & Đào tạo</h2>
        <p className="text-stone-600">
          Tìm kiếm thông tin chi tiết về ngành nghề, khối thi, và trường đại học tại Việt Nam.
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-10">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-4 w-6 h-6 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập tên ngành, nghề, hoặc kỹ năng (VD: Marketing, IT, vẽ...)"
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all shadow-sm text-lg"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-2 bg-orange-600 hover:bg-orange-700 disabled:bg-stone-300 text-white px-6 py-2 rounded-xl font-medium transition-all"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Tìm kiếm'}
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {isLoading && (
          <div className="text-center py-12">
            <Loader2 className="w-10 h-10 text-orange-600 animate-spin mx-auto mb-4" />
            <p className="text-stone-500">Đang tìm kiếm thông tin mới nhất...</p>
          </div>
        )}

        {!isLoading && hasSearched && results.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-100">
            <p className="text-stone-500">Không tìm thấy kết quả nào cho "{query}". Hãy thử từ khóa khác nhé!</p>
          </div>
        )}

        {!isLoading && results.map((career, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => handleCareerClick(career.title)}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-orange-700 flex items-center gap-2 group-hover:text-orange-600 transition-colors">
                <Briefcase className="w-5 h-5" />
                {career.title}
              </h3>
              <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-orange-500 transition-colors" />
            </div>

            <p className="text-stone-700 mb-6 leading-relaxed">
              {career.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-stone-900 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  Yêu cầu & Kỹ năng
                </h4>
                <ul className="list-disc list-inside text-sm text-stone-600 space-y-1">
                  {career.requirements.slice(0, 3).map((req, i) => (
                    <li key={i} className="line-clamp-1">{req}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-stone-900 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  Đào tạo & Tuyển sinh
                </h4>
                <div className="text-sm text-stone-600">
                  <p className="mb-2"><span className="font-medium text-stone-800">Khối thi:</span> {career.admissionInfo}</p>
                  <p className="font-medium text-stone-800 mb-1">Trường đào tạo tiêu biểu:</p>
                  <div className="flex flex-wrap gap-2">
                    {career.universities.slice(0, 3).map((uni, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                        {uni}
                      </span>
                    ))}
                    {career.universities.length > 3 && (
                      <span className="bg-stone-100 text-stone-500 px-2 py-1 rounded text-xs font-medium">
                        +{career.universities.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
