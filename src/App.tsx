/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function App() {
  const targetUrl = "https://ai.studio/apps/e358ea7e-18ab-493d-a581-90520c172e45?fullscreenApplet=true";

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace(targetUrl);
    }, 3000);

    return () => clearTimeout(timer);
  }, [targetUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-black flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-lg w-full"
      >
        {/* Mascot Container - REMOVED as per request */}
        {/* 
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full scale-110" />
          
          <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center">
             <img 
               src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800" 
               alt="Gym Mascot" 
               className="w-full h-full object-contain drop-shadow-2xl filter brightness-110 hover:scale-105 transition-transform duration-500"
               referrerPolicy="no-referrer"
             />
          </div>
        </motion.div>
        */}

        {/* Description Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-6 mb-10"
        >
          <p className="text-amber-400 text-xl md:text-2xl font-bold leading-relaxed">
            ⚠️ Ứng dụng đã được cập nhật.
          </p>
          <p className="text-gray-300 text-lg md:text-xl">
            Bạn sẽ được chuyển sang phiên bản mới trong vài giây...
          </p>
        </motion.div>

        {/* Call to Action Button / Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-gray-400 text-sm md:text-base">
            Nếu không được chuyển hướng tự động, vui lòng bấm vào đây
          </p>
          
          <motion.a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 w-full sm:w-auto min-w-[200px]"
          >
            <span>Truy cập ngay</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-[shine_1s_ease-in-out]" />
            </div>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Footer text (optional, very subtle) */}
      <div className="absolute bottom-6 text-white/10 text-xs font-mono">
        CareerCoach &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}

