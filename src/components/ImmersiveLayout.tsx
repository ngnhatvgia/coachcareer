import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ImmersiveLayoutProps {
  title: string;
  subtitle?: string;
  theme: 'zodiac' | 'numerology' | 'tarot' | 'daily';
  children: React.ReactNode;
  onBack?: () => void;
}

export const ImmersiveLayout: React.FC<ImmersiveLayoutProps> = ({ title, subtitle, theme, children, onBack }) => {
  const navigate = useNavigate();

  const getThemeStyles = () => {
    switch (theme) {
      case 'zodiac':
        return {
          bg: 'bg-slate-900',
          gradient: 'from-indigo-900 via-purple-900 to-slate-900',
          accent: 'text-purple-400',
          overlay: 'bg-purple-900/20',
          pattern: (
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
            </div>
          )
        };
      case 'numerology':
        return {
          // Updated to use the requested cosmic radial gradient
          bg: 'bg-[radial-gradient(circle_at_top,_#1b0033,_#000000)] bg-fixed bg-cover',
          gradient: '', // Handled by bg
          accent: 'text-purple-300',
          overlay: 'bg-indigo-950/30',
          pattern: (
            <div className="absolute inset-0 opacity-60 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=60&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
            </div>
          )
        };
      case 'tarot':
        return {
          bg: 'bg-[#050505]',
          gradient: 'from-[#1a103c] via-[#050505] to-black',
          accent: 'text-[#d4af37]',
          overlay: 'bg-[#d4af37]/10',
          pattern: (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Stars/Dust effect */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse" />
              
              {/* Deep Purple Glow (Top Center) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
              
              {/* Golden Glow (Bottom Center - behind cards) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#d4af37]/5 rounded-full blur-[100px]" />
              
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
            </div>
          )
        };
      case 'daily':
        return {
          bg: 'bg-sky-900',
          gradient: 'from-sky-900 via-blue-900 to-slate-900',
          accent: 'text-sky-300',
          overlay: 'bg-sky-900/20',
          pattern: (
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
            </div>
          )
        };
      default:
        return {
          bg: 'bg-slate-900',
          gradient: 'from-slate-800 to-slate-900',
          accent: 'text-white',
          overlay: 'bg-white/5',
          pattern: null
        };
    }
  };

  const styles = getThemeStyles();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  return (
    // Added -mt-16 to pull background behind navbar, and pt-32 to push content below navbar
    <div className={`min-h-screen w-full relative overflow-hidden ${styles.bg} text-white flex flex-col -mt-16 pt-32`}>
      {/* Background Layer */}
      {styles.gradient && <div className={`fixed inset-0 bg-gradient-to-br ${styles.gradient} z-0`} />}
      <div className="fixed inset-0 z-0">{styles.pattern}</div>
      
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col flex-grow w-full">
        {/* Header - Relative positioning to prevent covering content */}
        <div className="px-4 py-4 md:px-8 md:py-6 flex items-center justify-between backdrop-blur-md bg-black/10 border-b border-white/5 relative z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-wide text-white">{title}</h1>
              {subtitle && <p className={`text-xs md:text-sm ${styles.accent} font-medium uppercase tracking-wider`}>{subtitle}</p>}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow w-full max-w-7xl mx-auto px-4 py-6 md:py-12 flex flex-col"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
