import React from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-8"
      >
        <Loader2 className="w-16 h-16 text-orange-600" />
      </motion.div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">
        AI đang phân tích hồ sơ của bạn...
      </h2>
      <p className="text-stone-500 max-w-md mx-auto">
        Hệ thống đang tổng hợp dữ liệu từ trắc nghiệm Holland và thông tin cá nhân để tìm ra lộ trình phù hợp nhất.
      </p>
      
      <div className="mt-8 space-y-2 w-full max-w-xs">
        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="h-full bg-orange-500"
          />
        </div>
        <div className="flex justify-between text-xs text-stone-400">
          <span>Đang xử lý dữ liệu...</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};
