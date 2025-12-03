import React from "react";

export default function ResumeLoader() {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-fadeIn">
      
      {/* Spinning Circle */}
      <div className="w-20 h-20 border-4 border-bright-sun-300 border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-6 text-bright-sun-200 text-2xl font-semibold animate-pulse">
        Generating your resume...
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
