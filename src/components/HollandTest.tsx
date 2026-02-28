import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { HOLLAND_QUESTIONS, HOLLAND_TYPES } from '../data/holland';
import { generateCareerAdvice } from '../services/ai';
import { ArrowRight, CheckCircle2, Sparkles, Star, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HollandTest = () => {
  const { setStep, updateUserProfile, userProfile, setAnalysisResult, setIsLoading } = useApp();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleScoreChange = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const calculateResults = () => {
    const scores: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    
    HOLLAND_QUESTIONS.forEach((q) => {
      const score = answers[q.id] || 0;
      scores[q.group] += score;
    });

    // Sort to find top 2
    const sortedTypes = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([type]) => HOLLAND_TYPES[type as keyof typeof HOLLAND_TYPES]);

    const top2 = sortedTypes.slice(0, 2);

    return { scores, top2 };
  };

  const handleSubmit = async () => {
    const { scores, top2 } = calculateResults();
    
    // Update profile with test results
    const updatedProfile = {
      ...userProfile,
      hollandScores: scores,
      topHollandTypes: top2,
    };
    updateUserProfile(updatedProfile);
    
    // Move to loading state
    setStep(3);
    setIsLoading(true);

    try {
      // Call AI
      const result = await generateCareerAdvice(updatedProfile);
      setAnalysisResult(result);
      setStep(4); // Go to results
    } catch (error) {
      console.error("AI Error:", error);
      alert("Có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại.");
      setStep(2); // Go back to test if error
    } finally {
      setIsLoading(false);
    }
  };

  const allAnswered = HOLLAND_QUESTIONS.every((q) => answers[q.id] !== undefined);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto py-8 px-4"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Bước 2: Trắc nghiệm Holland Mini</h2>
        <p className="text-stone-600">Đánh giá mức độ phù hợp của bạn với từng câu hỏi (1: Rất không đúng - 5: Rất đúng)</p>
      </div>

      <div className="space-y-8">
        {HOLLAND_QUESTIONS.map((q, index) => (
          <div key={q.id} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1 block">Câu hỏi {index + 1}</span>
                <p className="text-lg text-stone-800 font-medium">{q.text}</p>
              </div>
              
              <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    onClick={() => handleScoreChange(q.id, score)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
                      answers[q.id] === score
                        ? 'bg-orange-600 text-white shadow-md scale-110'
                        : 'bg-white text-stone-400 hover:bg-orange-50 border border-stone-200'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`
            text-xl font-medium py-4 px-12 rounded-2xl transition-all shadow-lg flex items-center gap-3
            ${allAnswered 
              ? 'bg-orange-600 hover:bg-orange-700 text-white hover:shadow-xl cursor-pointer' 
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'}
          `}
        >
          {allAnswered ? (
            <>
              Hoàn thành & Phân tích
              <CheckCircle2 className="w-6 h-6" />
            </>
          ) : (
            `Vui lòng trả lời hết (${Object.keys(answers).length}/${HOLLAND_QUESTIONS.length})`
          )}
        </button>
        
        <button 
          onClick={() => setStep(1)}
          className="text-stone-500 hover:text-orange-600 font-medium transition-colors flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-stone-100"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Quay lại điền thông tin
        </button>
      </div>

      {/* Cross-links to Entertainment */}
      <div className="mt-20 border-t border-stone-200 pt-10">
        <h3 className="text-center text-stone-500 font-medium mb-6">Hoặc khám phá bản thân qua góc nhìn khác</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/tarot')}
            className="flex items-center justify-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl transition-colors border border-purple-100"
          >
            <Sparkles className="w-5 h-5" /> Tarot Định Hướng
          </button>
          <button 
            onClick={() => navigate('/numerology')}
            className="flex items-center justify-center gap-2 p-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition-colors border border-indigo-100"
          >
            <Star className="w-5 h-5" /> Thần Số Học
          </button>
          <button 
            onClick={() => navigate('/zodiac')}
            className="flex items-center justify-center gap-2 p-4 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-xl transition-colors border border-pink-100"
          >
            <Moon className="w-5 h-5" /> Cung Hoàng Đạo
          </button>
        </div>
      </div>
    </motion.div>
  );
};
