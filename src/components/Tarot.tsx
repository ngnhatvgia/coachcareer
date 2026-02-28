import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { generateEntertainmentContent } from '../services/ai';
import { Sparkles, ArrowRight, Brain, Star, Moon, Sun, Loader2 } from 'lucide-react';
import { ImmersiveLayout } from './ImmersiveLayout';
import { useNavigate } from 'react-router-dom';

// Mapping for Major Arcana images (using Wikimedia Commons)
const TAROT_IMAGES: Record<string, string> = {
  "The Fool": "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
  "The Magician": "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
  "The High Priestess": "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
  "The Empress": "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
  "The Emperor": "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
  "The Hierophant": "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
  "The Lovers": "https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg",
  "The Chariot": "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
  "Strength": "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
  "The Hermit": "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
  "Wheel of Fortune": "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
  "Justice": "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
  "The Hanged Man": "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
  "Death": "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
  "Temperance": "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
  "The Devil": "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
  "The Tower": "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
  "The Star": "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
  "The Moon": "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
  "The Sun": "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
  "Judgement": "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
  "The World": "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg"
};

const CardBack = () => (
  <div className="w-full h-full bg-[#0a1128] rounded-xl border-[1px] border-[#d4af37]/60 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl group-hover:border-[#d4af37] transition-colors">
    {/* Inner Border */}
    <div className="absolute inset-1 border-[1px] border-[#d4af37]/30 rounded-lg" />
    
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40" />
    <div className="absolute inset-0 bg-gradient-to-br from-[#1a103c]/80 to-[#050505]/80" />

    {/* Center Motif */}
    <div className="relative z-10 flex flex-col items-center gap-3 transform group-hover:scale-110 transition-transform duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-[#d4af37] blur-xl opacity-20 rounded-full" />
        <div className="w-12 h-12 rounded-full border border-[#d4af37] flex items-center justify-center bg-[#0a1128] relative z-10">
          <Sun className="w-6 h-6 text-[#d4af37]" />
        </div>
      </div>
      <div className="flex gap-3 text-[#d4af37]/60">
        <Moon className="w-3 h-3" />
        <Star className="w-3 h-3" />
        <Moon className="w-3 h-3 rotate-180" />
      </div>
    </div>

    {/* Corner Decorations - Intricate */}
    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#d4af37]/40" />
    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#d4af37]/40" />
    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#d4af37]/40" />
    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#d4af37]/40" />
  </div>
);

export const Tarot = () => {
  const { userProfile, setStep } = useApp();
  const [question, setQuestion] = useState('');
  const [gameState, setGameState] = useState<'input' | 'shuffle' | 'spread' | 'reveal' | 'result'>('input');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  // Generate 22 cards for the spread (Major Arcana count)
  const deck = Array.from({ length: 22 }, (_, i) => i);

  const handleQuestionSubmit = () => {
    if (!question.trim()) return;
    setGameState('shuffle');
    setTimeout(() => setGameState('spread'), 2000);
  };

  const handleCardSelect = async (index: number) => {
    if (selectedCards.length >= 1) return; 
    
    setSelectedCards([index]);
    setGameState('reveal');

    try {
      const data = await generateEntertainmentContent('tarot', { 
        action: 'draw_cards',
        question,
        userProfile
      });
      setResult(data);
      
      setTimeout(() => setIsFlipped(true), 800);
      setTimeout(() => setGameState('result'), 2500);
    } catch (error) {
      console.error(error);
      setGameState('input');
    }
  };

  const getCardImage = (cardNameEn: string) => {
    const key = Object.keys(TAROT_IMAGES).find(k => cardNameEn.includes(k));
    return key ? TAROT_IMAGES[key] : TAROT_IMAGES["The Fool"];
  };

  return (
    <ImmersiveLayout title="" subtitle="" theme="tarot" onBack={() => navigate('/entertainment')}>
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center relative font-serif overflow-hidden">
        
        {/* Background Ambient Effects */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        </div>

        {/* State 1: Question Input */}
        <AnimatePresence mode="wait">
          {gameState === 'input' && (
            <motion.div 
              key="input"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl text-center space-y-10 z-20 px-4"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                    <h2 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#ffe58f] to-[#d4af37] font-cormorant tracking-wider drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                    Tarot Oracle
                    </h2>
                </motion.div>
                <p className="text-[#d4af37]/80 text-lg md:text-xl font-playfair italic tracking-wide">
                  "Vũ trụ luôn có câu trả lời, bạn chỉ cần đặt câu hỏi."
                </p>
              </div>

              <div className="relative group max-w-xl mx-auto">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Bạn đang băn khoăn điều gì?"
                  className="w-full bg-[#0a1128]/80 border border-[#d4af37]/40 rounded-full py-6 px-8 text-xl text-[#d4af37] placeholder-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all text-center font-playfair backdrop-blur-md"
                  onKeyDown={(e) => e.key === 'Enter' && handleQuestionSubmit()}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuestionSubmit}
                disabled={!question.trim()}
                className="px-12 py-4 bg-gradient-to-r from-[#d4af37] to-[#b4941f] text-[#0a1128] rounded-full font-bold text-lg tracking-[0.2em] shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase font-cormorant"
              >
                Gửi vào vũ trụ
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* State 2: Shuffle Animation */}
        <AnimatePresence>
          {gameState === 'shuffle' && (
            <motion.div
              key="shuffle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-20"
            >
              <div className="relative w-48 h-72">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-xl shadow-2xl border border-[#d4af37]/20"
                    animate={{
                      x: [0, (i % 2 === 0 ? 60 : -60), 0],
                      y: [0, (i < 2 ? -30 : 30), 0],
                      rotate: [0, (i % 2 === 0 ? 15 : -15), 0],
                      scale: [1, 1.05, 1],
                      zIndex: [i, 5-i, i]
                    }}
                    transition={{ duration: 0.6, repeat: 3, ease: "easeInOut" }}
                  >
                    <CardBack />
                  </motion.div>
                ))}
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 text-[#d4af37] font-cormorant tracking-[0.3em] text-lg animate-pulse"
              >
                ĐANG KẾT NỐI NĂNG LƯỢNG...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* State 3: Card Spread (Arc) */}
        <AnimatePresence>
          {gameState === 'spread' && (
            <motion.div
              key="spread"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              className="absolute inset-0 flex flex-col items-center justify-end z-20 pb-12 overflow-hidden"
            >
              <motion.h3 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-[20%] text-[#d4af37] font-cormorant text-2xl md:text-3xl tracking-widest text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                HÃY CHỌN 1 LÁ BÀI THU HÚT BẠN NHẤT
              </motion.h3>
              
              <div className="relative w-full h-[400px] flex justify-center items-end perspective-1000">
                {deck.map((i) => {
                  const total = deck.length;
                  const mid = (total - 1) / 2;
                  const offset = i - mid;
                  const rotate = offset * 4; // Degrees
                  const x = offset * 25; // Horizontal spacing
                  const y = Math.abs(offset) * 6; // Vertical curve (edges lower)
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ y: 500, opacity: 0, rotate: 0 }}
                      animate={{ 
                        y: y, 
                        x: x,
                        rotate: rotate,
                        opacity: 1 
                      }}
                      transition={{ 
                        delay: i * 0.05, 
                        type: "spring", 
                        stiffness: 120,
                        damping: 20
                      }}
                      whileHover={{ 
                        y: y - 60, 
                        scale: 1.15, 
                        zIndex: 100,
                        transition: { duration: 0.2 } 
                      }}
                      onClick={() => handleCardSelect(i)}
                      className="absolute bottom-24 w-32 h-52 cursor-pointer origin-bottom transform-gpu rounded-xl shadow-[-10px_10px_20px_rgba(0,0,0,0.5)] group"
                      style={{ 
                        zIndex: i,
                      }}
                    >
                      <CardBack />
                      {/* Hover Glow */}
                      <div className="absolute inset-0 rounded-xl bg-[#d4af37]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* State 4 & 5: Reveal & Result */}
        {(gameState === 'reveal' || gameState === 'result') && (
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center z-30 pt-10">
            {/* The Card */}
            <div className="h-[500px] w-full flex items-center justify-center perspective-1000 mb-8 relative">
              {/* Loading Indicator inside Reveal phase if result not ready */}
              {!result && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#d4af37] flex flex-col items-center gap-2 z-50">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <span className="font-cormorant text-sm tracking-widest">ĐANG GIẢI MÃ...</span>
                  </div>
              )}

              <motion.div
                initial={{ scale: 0.5, y: 200, rotateY: 0 }}
                animate={{ 
                    scale: 1, 
                    y: 0, 
                    rotateY: isFlipped ? 180 : 0,
                    boxShadow: isFlipped ? "0 0 50px rgba(212,175,55,0.4)" : "none"
                }}
                transition={{ duration: 0.8, type: "spring", damping: 20 }}
                className="w-80 h-[480px] relative preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Back */}
                <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                  <CardBack />
                </div>
                
                {/* Front (Image) */}
                <div 
                  className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border-[3px] border-[#d4af37] bg-black"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {result && (
                    <img 
                      src={getCardImage(result.card_name_en || '')} 
                      alt="Tarot Card" 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-6 w-full text-center px-4">
                    <p className="text-[#d4af37] font-cormorant text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-wide">
                      {result?.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Result Content */}
            <AnimatePresence>
              {gameState === 'result' && result && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-6 pb-20"
                >
                  {/* Left: Message */}
                  <div className="space-y-8">
                    <div className="relative pl-8 py-2">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent" />
                      <h3 className="text-[#d4af37] font-cormorant text-sm tracking-[0.3em] uppercase mb-4 opacity-80">
                        Thông điệp từ vũ trụ
                      </h3>
                      <p className="text-white/95 font-playfair text-2xl md:text-3xl leading-relaxed italic drop-shadow-md">
                        "{result.lucky_message}"
                      </p>
                    </div>
                    
                    <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 p-8 rounded-2xl backdrop-blur-md hover:bg-[#d4af37]/10 transition-colors">
                      <h4 className="text-[#d4af37] font-bold mb-4 flex items-center gap-3 text-lg font-cormorant">
                        <Sparkles className="w-5 h-5" /> Ý NGHĨA LÁ BÀI
                      </h4>
                      <p className="text-gray-300 leading-relaxed font-light text-lg">
                        {result.card_meaning || result.content}
                      </p>
                    </div>
                  </div>

                  {/* Right: Advice & Career */}
                  <div className="space-y-8">
                    <div className="bg-gradient-to-br from-[#1a103c]/80 to-black/80 border border-[#d4af37]/20 p-8 rounded-2xl shadow-xl">
                      <h4 className="text-[#d4af37] font-bold mb-6 flex items-center gap-3 uppercase tracking-wider text-sm font-cormorant">
                        <Brain className="w-5 h-5" /> Lời khuyên sự nghiệp
                      </h4>
                      <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                        {result.advice}
                      </p>
                      
                      <div className="space-y-3">
                        <p className="text-[#d4af37]/60 text-xs uppercase tracking-widest font-bold">Gợi ý nghề nghiệp:</p>
                        <div className="flex flex-wrap gap-3">
                            {result.career_suggestions?.map((career: string, idx: number) => (
                            <span key={idx} className="px-4 py-2 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg text-[#d4af37] text-sm font-medium hover:bg-[#d4af37]/20 transition-colors cursor-default">
                                {career}
                            </span>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 text-center space-y-6">
                      <p className="text-gray-400 text-sm font-cormorant tracking-wide">
                        BẠN MUỐN MỘT LỘ TRÌNH KHOA HỌC HƠN?
                      </p>
                      <button
                        onClick={() => {
                          setStep(3); // Go to Holland Test
                          navigate('/');
                        }}
                        className="group relative inline-flex items-center gap-3 px-10 py-4 bg-transparent border border-[#d4af37] text-[#d4af37] rounded-full overflow-hidden transition-all hover:bg-[#d4af37] hover:text-[#0a1128]"
                      >
                        <span className="relative z-10 font-bold tracking-[0.15em] uppercase text-sm font-cormorant">
                          Khám phá Holland Test
                        </span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-[#d4af37]/20 blur-xl group-hover:opacity-100 opacity-0 transition-opacity" />
                      </button>
                    </div>
                    
                    <div className="text-center">
                       <button
                        onClick={() => {
                            setGameState('input');
                            setQuestion('');
                            setSelectedCards([]);
                            setResult(null);
                            setIsFlipped(false);
                        }}
                        className="text-[#d4af37]/40 hover:text-[#d4af37] text-xs uppercase tracking-[0.2em] transition-colors mt-2 font-cormorant"
                       >
                           Đặt câu hỏi khác
                       </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </ImmersiveLayout>
  );
};
