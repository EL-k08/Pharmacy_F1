import React, { useState } from 'react';
import { QUESTIONS_DATA } from '../data/taftData';

export const QuestionsPharmacy4: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentQ = QUESTIONS_DATA[currentIndex];
  const progressPercent = ((currentIndex + 1) / 8) * 100;

  const nextQuestion = () => {
    if (currentIndex < 7) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1f0714] rounded-[28px] border-2 border-[#ecd3e5] dark:border-[#590d22] p-6 sm:p-8 shadow-sm text-right relative">
      
      {/* Title */}
      <div className="mb-6 pb-4 border-b border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#f72585] block">تحلیل دانشگاهی و ارزیابی موشکافانه طرح</span>
          <h3 className="text-xl font-black text-[#38040e] dark:text-white">
            پرسش‌های هشت‌گانه ایده بالغ (Interactive Questions)
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#fdf0f7] dark:bg-[#38040e] text-[#7209b7] dark:text-[#f72585] font-black text-xs">
          ۸ از ۸ شاخص
        </span>
      </div>

      {/* Progress Bar Wrapper */}
      <div className="bg-[#f3e5f0] dark:bg-[#38040e] rounded-full h-2 w-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#f72585] to-[#7209b7] rounded-full transition-all duration-400 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Nav Chips (Exact 8 items from Pharmacy4) */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {QUESTIONS_DATA.map((q, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={q.num}
              onClick={() => setCurrentIndex(idx)}
              className={`py-2 px-3.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shrink-0 border ${
                isActive
                  ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-md -translate-y-0.5'
                  : 'bg-[#faf4f8] dark:bg-[#2b091f]/60 text-[#6e5564] dark:text-[#d8b4cc] border-[#ecd3e5] dark:border-[#590d22] hover:bg-[#f7eef7]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold ${
                isActive ? 'bg-white text-[#7209b7]' : 'bg-black/10 dark:bg-white/10 text-inherit'
              }`}>
                {idx + 1}
              </span>
              <span>{q.category.replace('بررسی ', '').replace('تحلیل ', '')}</span>
            </button>
          );
        })}
      </div>

      {/* Display Card */}
      <div className="bg-gradient-to-tr from-[#fff9fc] to-[#faf3f9] dark:from-[#250918] dark:to-[#1a050f] border-2 border-[#ecd3e5] dark:border-[#590d22] rounded-[24px] p-6 sm:p-8 space-y-4">
        
        {/* Header with Category Pill & Counter */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="bg-[#fdf0f7] dark:bg-[#38040e] border border-[#e0b1cb] dark:border-[#7209b7] text-[#f72585] text-xs font-black px-3.5 py-1 rounded-full">
            {currentQ.category}
          </span>
          <span className="text-xs font-black text-[#7209b7] dark:text-[#e0b1cb]">
            سوال {currentIndex + 1} از ۸
          </span>
        </div>

        {/* Title */}
        <h4 className="text-base sm:text-lg font-black text-[#38040e] dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-circle-question text-[#f72585]"></i>
          <span>{currentQ.title}</span>
        </h4>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#2b091f] dark:text-[#d8b4cc] leading-loose font-medium">
          {currentQ.desc}
        </p>

        {/* Insight Box */}
        <div className="bg-white dark:bg-[#1f0714] border-r-4 border-[#7209b7] border-y border-l border-[#ecd3e5] dark:border-[#590d22] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#6e5564] dark:text-[#e0b1cb]">
            <i className="fa-solid fa-lightbulb text-[#e0a96d] text-base shrink-0"></i>
            <span>{currentQ.insight}</span>
          </div>
          <span className="shrink-0 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black px-3 py-1 rounded-xl">
            {currentQ.status}
          </span>
        </div>

      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#f3e5f0] dark:border-[#590d22]">
        <button
          onClick={nextQuestion}
          disabled={currentIndex === 7}
          className="py-2.5 px-5 rounded-full bg-white dark:bg-[#2b091f] border border-[#dfc2d7] dark:border-[#590d22] text-[#590d22] dark:text-white font-black text-xs hover:border-[#f72585] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-xs"
        >
          <span>سوال بعدی</span>
          <i className="fa-solid fa-arrow-left text-xs"></i>
        </button>

        <span className="text-xs text-[#6e5564] dark:text-[#d8b4cc] font-medium hidden sm:inline">
          روی هر سوال کلیک کنید یا با دکمه‌ها مرور نمایید
        </span>

        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="py-2.5 px-5 rounded-full bg-white dark:bg-[#2b091f] border border-[#dfc2d7] dark:border-[#590d22] text-[#590d22] dark:text-white font-black text-xs hover:border-[#f72585] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-xs"
        >
          <i className="fa-solid fa-arrow-right text-xs"></i>
          <span>سوال قبلی</span>
        </button>
      </div>

    </div>
  );
};
