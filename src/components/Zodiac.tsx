import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { generateEntertainmentContent } from '../services/ai';
import { Star, Sparkles, Loader2, Calendar, Brain } from 'lucide-react';
import { ImmersiveLayout } from './ImmersiveLayout';
import { parseDateString, formatDateDisplay, isValidDate } from '../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

export const Zodiac = () => {
  const { userProfile, updateUserProfile, setStep } = useApp();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [localDate, setLocalDate] = useState('');
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();

  const getZodiacSign = (dateString: string) => {
    const date = parseDateString(dateString);
    if (!date) return "Không xác định";
    const { day, month } = date;

    if ((month === 1 && day <= 19) || (month === 12 && day >= 22)) return "Ma Kết";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Bảo Bình";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Song Ngư";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Bạch Dương";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Kim Ngưu";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Song Tử";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cự Giải";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Sư Tử";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Xử Nữ";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Thiên Bình";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Bọ Cạp";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Nhân Mã";
    return "Không xác định";
  };

  const handleAnalyze = async () => {
    if (!userProfile.birthDate) return;
    setLoading(true);
    try {
      const sign = getZodiacSign(userProfile.birthDate);
      const data = await generateEntertainmentContent('zodiac', { 
        birthDate: userProfile.birthDate,
        sign
      });
      setResult({ ...data, sign });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDate = () => {
    if (!isValidDate(localDate)) {
      setDateError('Ngày sinh không hợp lệ');
      return;
    }
    updateUserProfile({ birthDate: localDate });
    setDateError('');
  };

  if (!userProfile.birthDate) {
    return (
      <ImmersiveLayout title="Cung Hoàng Đạo" subtitle="Khám phá bản thân" theme="zodiac" onBack={() => navigate('/entertainment')}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 max-w-md w-full">
            <Star className="w-12 h-12 text-purple-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Nhập ngày sinh của bạn</h3>
            <p className="text-purple-200 mb-6">Để AI xác định cung hoàng đạo và phân tích tính cách chính xác.</p>
            
            <div className="space-y-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-purple-300" />
                <input
                  type="date"
                  value={localDate}
                  onChange={(e) => setLocalDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-purple-300/30 rounded-xl text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
                />
              </div>
              {dateError && <p className="text-red-400 text-sm">{dateError}</p>}
              
              <button 
                onClick={handleSaveDate}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-purple-900/50"
              >
                Bắt đầu khám phá
              </button>
            </div>
          </div>
        </div>
      </ImmersiveLayout>
    );
  }

  return (
    <ImmersiveLayout title="Cung Hoàng Đạo" subtitle="Khám phá bản thân" theme="zodiac" onBack={() => navigate('/entertainment')}>
      <div className="space-y-8">
        {!result && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-8">
             <div className="space-y-2">
               <p className="text-purple-300 uppercase tracking-widest text-sm">Ngày sinh của bạn</p>
               <p className="text-4xl font-bold text-white">{formatDateDisplay(userProfile.birthDate)}</p>
               <p className="text-2xl text-purple-200 mt-2">Cung: <span className="font-bold text-white">{getZodiacSign(userProfile.birthDate)}</span></p>
             </div>
             
             <button
              onClick={handleAnalyze}
              disabled={loading}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold text-lg shadow-lg shadow-purple-900/50 hover:shadow-purple-700/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {loading ? 'Đang kết nối vũ trụ...' : 'Giải mã tính cách ngay'}
              </span>
            </button>
          </div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20"
          >
            {/* Main Card */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10" />
                <div className="relative z-10">
                  <div className="inline-block p-4 rounded-full bg-white/10 mb-6 border border-white/20">
                    <Star className="w-12 h-12 text-purple-300" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{result.sign}</h2>
                  <p className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
                    "{result.title}"
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <h3 className="text-lg font-bold text-purple-300 mb-4 uppercase tracking-wider">Tính cách nổi bật</h3>
                <p className="text-stone-300 leading-relaxed">{result.content}</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">✨ Thông điệp vũ trụ</h3>
                <p className="text-purple-200 italic">"{result.lucky_message}"</p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-emerald-300 mb-4 uppercase tracking-wider">Lời khuyên phát triển</h3>
                  <p className="text-stone-300 leading-relaxed">{result.advice}</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-amber-300 mb-4 uppercase tracking-wider">Nghề nghiệp phù hợp</h3>
                  <ul className="space-y-2">
                    {result.career_suggestions.map((c: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-stone-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Cross-link to Holland Test */}
            <div className="lg:col-span-3 mt-8 text-center">
              <p className="text-purple-200 mb-4">Bạn muốn khám phá nghề nghiệp dựa trên khoa học?</p>
              <button
                onClick={() => {
                  setStep(3); // Go to Holland Test
                  navigate('/');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all"
              >
                <Brain className="w-5 h-5" />
                Làm trắc nghiệm Holland ngay
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </ImmersiveLayout>
  );
};
