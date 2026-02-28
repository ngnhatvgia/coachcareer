import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface ModuleBannerProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'orange' | 'purple' | 'blue' | 'emerald';
  pattern?: 'stars' | 'numbers' | 'cards' | 'sun';
}

export const ModuleBanner: React.FC<ModuleBannerProps> = ({ title, description, icon: Icon, color, pattern }) => {
  const getGradient = () => {
    switch (color) {
      case 'orange': return 'from-orange-500 to-amber-600';
      case 'purple': return 'from-purple-600 to-indigo-600';
      case 'blue': return 'from-blue-500 to-cyan-600';
      case 'emerald': return 'from-emerald-500 to-teal-600';
      default: return 'from-stone-700 to-stone-900';
    }
  };

  const getPattern = () => {
    // Simple SVG patterns as background
    switch (pattern) {
      case 'stars':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-20" width="100%" height="100%">
            <pattern id="stars" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="white" />
              <circle cx="10" cy="10" r="0.5" fill="white" />
              <circle cx="30" cy="30" r="0.5" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#stars)" />
          </svg>
        );
      case 'numbers':
        return (
          <div className="absolute inset-0 opacity-10 font-mono text-4xl font-bold text-white overflow-hidden select-none">
            <span className="absolute top-4 left-10">3</span>
            <span className="absolute top-12 right-20">7</span>
            <span className="absolute bottom-8 left-1/4">9</span>
            <span className="absolute top-1/3 right-10">11</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative w-full h-48 rounded-3xl overflow-hidden mb-8 shadow-lg bg-gradient-to-r ${getGradient()}`}
    >
      {getPattern()}
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium uppercase tracking-wider opacity-80">Góc giải trí & Khám phá</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
        <p className="text-white/90 text-lg max-w-xl">{description}</p>
      </div>
    </motion.div>
  );
};
