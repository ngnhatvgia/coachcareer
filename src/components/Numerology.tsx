import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { generateEntertainmentContent } from '../services/ai';
import { Sparkles, Hash, Loader2, Calendar, Star, Zap, Heart, Crown, Brain, User, TrendingUp } from 'lucide-react';
import { ImmersiveLayout } from './ImmersiveLayout';
import { formatDateDisplay, isValidDate } from '../utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Numerology Calculation Helpers
const LETTER_VALUES: Record<string, number> = {
  'a': 1, 'j': 1, 's': 1,
  'b': 2, 'k': 2, 't': 2,
  'c': 3, 'l': 3, 'u': 3,
  'd': 4, 'm': 4, 'v': 4,
  'e': 5, 'n': 5, 'w': 5,
  'f': 6, 'o': 6, 'x': 6,
  'g': 7, 'p': 7, 'y': 7,
  'h': 8, 'q': 8, 'z': 8,
  'i': 9, 'r': 9
};

const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y'];

const reduceNumber = (num: number): number => {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return num;
};

const calculateNameNumber = (name: string, type: 'all' | 'vowels' | 'consonants'): number => {
  const normalized = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let sum = 0;
  for (const char of normalized) {
    if (LETTER_VALUES[char]) {
      const isVowel = VOWELS.includes(char);
      if (type === 'all' || (type === 'vowels' && isVowel) || (type === 'consonants' && !isVowel)) {
        sum += LETTER_VALUES[char];
      }
    }
  }
  return reduceNumber(sum);
};

const calculateDateNumber = (dateString: string): number => {
  const digits = dateString.replace(/-/g, '').split('').map(Number);
  return reduceNumber(digits.reduce((a, b) => a + b, 0));
};

const calculateAttitudeNumber = (dateString: string): number => {
  const [year, month, day] = dateString.split('-').map(Number);
  return reduceNumber(day + month);
};

const calculatePersonalYear = (dateString: string, year: number): number => {
  const [_, month, day] = dateString.split('-').map(Number);
  // Personal Year = Day + Month + Current Year
  // First reduce Day + Month
  // Then reduce Year
  // Then sum and reduce
  // Standard formula: Reduce(Day + Month + Reduce(Year))
  // Or simply sum all digits of Day + Month + Year and reduce.
  // Let's use the sum of digits method.
  return reduceNumber(day + month + year);
};

export const Numerology = () => {
  const { userProfile, updateUserProfile, setStep } = useApp();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [localDate, setLocalDate] = useState('');
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();

  // Derived Numbers
  const lifePathNumber = userProfile.birthDate ? calculateDateNumber(userProfile.birthDate) : 0;
  const soulNumber = userProfile.name ? calculateNameNumber(userProfile.name, 'vowels') : 0;
  const personalityNumber = userProfile.name ? calculateNameNumber(userProfile.name, 'consonants') : 0;
  const destinyNumber = userProfile.name ? calculateNameNumber(userProfile.name, 'all') : 0;
  const attitudeNumber = userProfile.birthDate ? calculateAttitudeNumber(userProfile.birthDate) : 0;
  const maturityNumber = reduceNumber(lifePathNumber + destinyNumber);
  
  // Rational Thought: Day + First Name Sum (Simplified logic: taking first word of name)
  const firstName = userProfile.name ? userProfile.name.trim().split(' ').pop() || '' : '';
  const firstNameSum = calculateNameNumber(firstName, 'all');
  const dayOfBirth = userProfile.birthDate ? parseInt(userProfile.birthDate.split('-')[2]) : 0;
  const rationalThoughtNumber = reduceNumber(dayOfBirth + firstNameSum);

  // Personal Year Chart Data
  const personalYearData = useMemo(() => {
    if (!userProfile.birthDate) return [];
    const currentYear = new Date().getFullYear();
    const data = [];
    for (let i = 0; i < 10; i++) {
      const year = currentYear + i;
      const value = calculatePersonalYear(userProfile.birthDate, year);
      data.push({ year, value });
    }
    return data;
  }, [userProfile.birthDate]);

  const handleAnalyze = async () => {
    if (!userProfile.birthDate) return;
    setLoading(true);
    try {
      const data = await generateEntertainmentContent('numerology', { 
        birthDate: userProfile.birthDate,
        lifePathNumber,
        soulNumber,
        destinyNumber
      });
      setResult({ ...data, lifePathNumber });
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
      <ImmersiveLayout title="Thần Số Học" subtitle="Giải mã cuộc đời" theme="numerology" onBack={() => navigate('/entertainment')}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 pt-20">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 max-w-md w-full animate-in fade-in zoom-in duration-500">
            <Hash className="w-12 h-12 text-purple-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Nhập ngày sinh của bạn</h3>
            <p className="text-purple-200 mb-6">Để AI tính toán số chủ đạo và phân tích bản đồ sao của bạn.</p>
            
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
    <ImmersiveLayout title="Thần Số Học" subtitle="Bản đồ vũ trụ cá nhân" theme="numerology" onBack={() => navigate('/entertainment')}>
      <div className="flex flex-col items-center w-full max-w-6xl mx-auto pb-20 px-4">
        
        {/* Header Info */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-2"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 tracking-wide uppercase drop-shadow-lg">{userProfile.name}</h2>
          <p className="text-purple-300 text-lg font-light tracking-[0.2em]">{formatDateDisplay(userProfile.birthDate)}</p>
        </motion.div>

        {/* Main Life Path Number Hero */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1.5 }}
          className="relative mb-20 group cursor-pointer"
          onClick={handleAnalyze}
        >
          {/* Outer Glow Rings */}
          <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-[60px] animate-pulse" />
          <div className="absolute -inset-8 rounded-full border border-purple-500/20 animate-[spin_20s_linear_infinite]" />
          <div className="absolute -inset-4 rounded-full border-2 border-dashed border-pink-500/20 animate-[spin_30s_linear_infinite_reverse]" />
          
          {/* Main Circle */}
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#2a0a4a] via-[#1a052e] to-black border border-purple-400/30 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.5)] relative z-10 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
            <span className="text-purple-300 text-sm md:text-base uppercase tracking-[0.3em] mb-2 font-medium z-10">Số Chủ Đạo</span>
            <span className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-300 drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] font-serif z-10 leading-none pb-4">
              {lifePathNumber}
            </span>
            <Sparkles className="absolute top-10 right-10 w-6 h-6 text-purple-200 animate-pulse z-10" />
            <Star className="absolute bottom-10 left-10 w-4 h-4 text-pink-300 animate-bounce z-10" />
          </div>
        </motion.div>

        {/* Secondary Numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-16">
          <NumberCard title="Linh Hồn" number={soulNumber} icon={Heart} color="from-purple-900/40 to-pink-900/40" delay={0.1} />
          <NumberCard title="Sứ Mệnh" number={destinyNumber} icon={Crown} color="from-indigo-900/40 to-purple-900/40" delay={0.2} />
          <NumberCard title="Thái Độ" number={attitudeNumber} icon={Zap} color="from-blue-900/40 to-indigo-900/40" delay={0.3} />
          <NumberCard title="Nhân Cách" number={personalityNumber} icon={User} color="from-cyan-900/40 to-blue-900/40" delay={0.4} />
          <NumberCard title="Trưởng Thành" number={maturityNumber} icon={Star} color="from-teal-900/40 to-cyan-900/40" delay={0.5} />
          <NumberCard title="Tư Duy" number={rationalThoughtNumber} icon={Brain} color="from-emerald-900/40 to-teal-900/40" delay={0.6} />
        </div>

        {/* Personal Year Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full mb-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">Chu Kỳ Vận Số (10 Năm)</h3>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={personalYearData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  stroke="rgba(255,255,255,0.5)" 
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)" 
                  domain={[1, 9]} 
                  ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#4ade80' }}
                  labelStyle={{ color: '#ccc', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4ade80" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={2000}
                  dot={{ stroke: '#4ade80', strokeWidth: 2, r: 4, fill: '#1b0033' }}
                  activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                  label={{ position: 'top', fill: '#fff', fontSize: 12, dy: -5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-white/40 text-sm mt-4 italic">Biểu đồ thể hiện năng lượng cá nhân qua từng năm (Chu kỳ 9 năm)</p>
        </motion.div>

        {/* AI Analysis Button & Result */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full max-w-md px-4"
          >
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2 text-white">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {loading ? 'Đang kết nối vũ trụ...' : 'Giải mã chi tiết từ AI'}
              </span>
            </button>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors shadow-2xl">
              <h3 className="text-xl font-bold text-purple-300 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Phân tích chuyên sâu
              </h3>
              <p className="text-stone-200 leading-relaxed text-lg">{result.content}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-3">✨ Lời khuyên phát triển</h3>
                <p className="text-purple-100 leading-relaxed">{result.advice}</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-lg">
                 <h3 className="text-lg font-bold text-blue-300 mb-4 uppercase tracking-wider">Nghề nghiệp phù hợp</h3>
                 <div className="flex flex-wrap gap-2">
                   {result.career_suggestions?.map((career: string, idx: number) => (
                     <span key={idx} className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-200 text-sm">
                       {career}
                     </span>
                   ))}
                 </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-3xl p-6 text-center shadow-lg">
               <p className="text-amber-200 italic text-lg">"{result.lucky_message}"</p>
            </div>
          </motion.div>
        )}

        {/* Cross-link to Holland Test */}
        <div className="mt-20 text-center">
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
      </div>
    </ImmersiveLayout>
  );
};

const NumberCard = ({ title, number, icon: Icon, color, delay }: { title: string, number: number, icon: any, color: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -10, scale: 1.03 }}
    className={`bg-gradient-to-br ${color} backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.3)] transition-all duration-300 cursor-default group`}
  >
    <div className="mb-3 p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
      <Icon className="w-6 h-6 text-white/90" />
    </div>
    <span className="text-xs md:text-sm text-white/70 uppercase tracking-widest font-semibold mb-2">{title}</span>
    <span className="text-4xl md:text-5xl font-bold text-white font-serif drop-shadow-md">{number}</span>
  </motion.div>
);
