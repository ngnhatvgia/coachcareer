import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ChatInterface } from './ChatInterface';
import { Briefcase, Map, Target, Quote, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';
import { CareerCard } from './CareerCard';
import { useNavigate } from 'react-router-dom';
import { CareerFeed } from './CareerFeed';
import { UniversityDiscovery } from './UniversityDiscovery';
import { ExpertConsultation } from './ExpertConsultation';

export const ResultsDashboard = () => {
  const { analysisResult, userProfile, setStep } = useApp();
  const navigate = useNavigate();

  if (!analysisResult) return null;

  const handleCareerClick = (title: string) => {
    navigate(`/career/${encodeURIComponent(title)}`);
  };

  // Mock compatibility score based on Holland types (just for demo visualization)
  const compatibilityScore = 85; 
  const compatibilityLabel = compatibilityScore >= 80 ? "Rất phù hợp" : compatibilityScore >= 60 ? "Phù hợp" : "Cần cân nhắc";
  const compatibilityColor = compatibilityScore >= 80 ? "text-green-600" : compatibilityScore >= 60 ? "text-orange-600" : "text-yellow-600";
  const compatibilityBg = compatibilityScore >= 80 ? "bg-green-500" : compatibilityScore >= 60 ? "bg-orange-500" : "bg-yellow-500";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto py-8 px-4 space-y-12"
    >
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
          Hồ sơ hướng nghiệp của bạn
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-stone-900">
          Khám phá tiềm năng <span className="text-orange-600">{userProfile.topHollandTypes?.join(" & ")}</span>
        </h1>
        <p className="text-xl text-stone-600 max-w-3xl mx-auto italic">
          "{analysisResult.quote}"
        </p>
      </div>

      {/* Ideal Self Banner */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <Sparkles className="w-10 h-10 text-yellow-300 mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Phiên bản lý tưởng của bạn</h2>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
          "Bạn không chỉ chọn một ngành học, bạn đang xây dựng phiên bản lý tưởng của chính mình. 
          Hãy để những lựa chọn hôm nay kiến tạo nên con người bạn muốn trở thành trong tương lai."
        </p>
      </motion.div>

      {/* Career Compatibility */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            Mức độ tương thích nghề nghiệp
          </h3>
          <span className={`font-bold ${compatibilityColor}`}>{compatibilityLabel} ({compatibilityScore}%)</span>
        </div>
        <div className="w-full bg-stone-100 rounded-full h-4 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${compatibilityScore}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`h-full ${compatibilityBg} relative`}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </motion.div>
        </div>
        <p className="text-sm text-stone-500 mt-2">
          Dựa trên phân tích tổng hợp từ Sở thích, Kỹ năng, Giá trị cốt lõi và Kết quả trắc nghiệm Holland của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personality & Analysis */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-500" />
              Phân tích tính cách
            </h3>
            <p className="text-stone-600 leading-relaxed mb-6">
              {analysisResult.personalityDescription}
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-emerald-600 text-sm uppercase mb-2">Điểm mạnh</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.strengths.map((s, i) => (
                    <span key={i} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-sm font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-amber-600 text-sm uppercase mb-2">Cần cải thiện</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.weaknesses.map((w, i) => (
                    <span key={i} className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg text-sm font-medium">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-600 to-amber-600 p-6 rounded-2xl text-white shadow-lg">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              Lời khuyên từ AI Coach
            </h3>
            <p className="text-orange-50 leading-relaxed">
              {analysisResult.advice}
            </p>
          </div>
        </div>

        {/* Middle Column: Career Suggestions */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-stone-900 flex items-center gap-2 mb-6">
              <Briefcase className="w-6 h-6 text-orange-600" />
              Top Nghề nghiệp phù hợp
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisResult.careers.map((career, idx) => (
                <CareerCard 
                  key={idx} 
                  career={career} 
                  onClick={() => handleCareerClick(career.title)} 
                />
              ))}
            </div>
          </div>

          {/* Roadmap Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Map className="w-5 h-5 text-orange-500" />
              Lộ trình phát triển
            </h3>
            
            <div className="relative border-l-2 border-orange-100 ml-3 space-y-8 pl-8 py-2">
              {analysisResult.roadmap.map((stage, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-orange-600 border-4 border-white shadow-sm flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full" />
                  </span>
                  <h4 className="text-lg font-bold text-stone-900 mb-3">{stage.stage}</h4>
                  <ul className="space-y-2">
                    {stage.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-stone-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* University Discovery Section */}
      <UniversityDiscovery />

      {/* Career Feed Section */}
      <CareerFeed />

      {/* Expert Consultation Section */}
      <ExpertConsultation />

      {/* Chat Section */}
      <div className="mt-12">
        <ChatInterface />
      </div>

      <div className="text-center py-8 flex items-center justify-center gap-6">
        <button
          onClick={() => setStep(1)}
          className="text-stone-500 hover:text-orange-600 text-sm font-medium transition-colors"
        >
          Chỉnh sửa thông tin
        </button>
        <div className="w-px h-4 bg-stone-300"></div>
        <button
          onClick={() => setStep(0)}
          className="text-stone-400 hover:text-stone-600 text-sm underline"
        >
          Làm lại từ đầu
        </button>
      </div>
    </motion.div>
  );
};
