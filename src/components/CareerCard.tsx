import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, DollarSign, TrendingUp, Tag } from 'lucide-react';
import { CareerSuggestion } from '../services/ai';

interface CareerCardProps {
  career: CareerSuggestion;
  onClick: () => void;
}

export const CareerCard: React.FC<CareerCardProps> = ({ career, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 flex flex-col h-full transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
          {career.title}
        </h3>
        <p className="text-stone-500 text-sm mt-2 line-clamp-2">
          {career.reason}
        </p>
      </div>

      <div className="space-y-3 mb-6 flex-grow">
        <div className="flex items-center gap-2 text-sm text-stone-700">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="font-medium">{career.income}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-stone-700">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-medium">{career.trend}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {career.skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-medium rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {skill}
            </span>
          ))}
          {career.skills.length > 3 && (
            <span className="px-3 py-1 bg-stone-100 text-stone-500 text-xs font-medium rounded-full">
              +{career.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      <button className="w-full py-3 rounded-xl bg-orange-50 text-orange-700 font-semibold text-sm group-hover:bg-orange-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
        Xem chi tiết
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
