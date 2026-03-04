import React, { useEffect } from 'react';

export default function App() {
  const targetUrl = "https://ai.studio/apps/e358ea7e-18ab-493d-a581-90520c172e45";

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace(targetUrl);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          ⚠️ Ứng dụng đã được cập nhật
        </h1>
        <p className="text-gray-600 mb-6">
          Bạn sẽ được chuyển sang phiên bản mới trong vài giây...
        </p>
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <p className="text-sm text-gray-500">
          Nếu không được chuyển hướng tự động,{' '}
          <a 
            href={targetUrl}
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            vui lòng bấm vào đây
          </a>
        </p>
      </div>
    </div>
  );
}
