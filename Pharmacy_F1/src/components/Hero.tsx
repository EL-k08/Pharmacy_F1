import React from 'react';
import { 
  CheckCircle2, 
  Send, 
  Zap, 
  Store, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onStartPrescription: () => void;
  onOpenOcrTest: () => void;
  onOpenPharmacyQueue: () => void;
  lang: 'fa' | 'en';
}

export const Hero: React.FC<HeroProps> = ({
  onStartPrescription,
  onOpenOcrTest,
  onOpenPharmacyQueue,
  lang,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Card Container matching User Screenshot 2 */}
        <div className="bg-[#fff9fc]/80 dark:bg-[#250918]/60 border border-[#ecd3e5] dark:border-[#590d22] rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-sm relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Right Column: Text, Title & Actions (matching screenshot 2 right side) */}
            <div className="lg:col-span-7 text-right space-y-6 order-2 lg:order-1">
              
              {/* Outline rounded badge at top */}
              <div className="inline-block">
                <span className="inline-flex items-center px-4 py-1 rounded-full border border-[#dfc2d7] dark:border-[#7209b7] text-[11px] sm:text-xs font-bold text-[#590d22] dark:text-[#f72585] bg-white/70 dark:bg-[#38040e]/50">
                  {lang === 'fa' 
                    ? 'طرح اختصاصی اعتبارسنجی شده شهرستان تفت و استان یزد' 
                    : 'Validated Dedicated Project for Taft County & Yazd Province'}
                </span>
              </div>

              {/* Exact Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2b091f] dark:text-white leading-[1.35] tracking-tight">
                {lang === 'fa' ? (
                  <>
                    پایان معطلی در صف داروخانه! <br />
                    <span className="bg-gradient-to-l from-[#f72585] via-[#9d4edd] to-[#7209b7] bg-clip-text text-transparent">
                      نسخه‌ات رو آنلاین بفرست،
                    </span> <br />
                    فقط ۲ دقیقه‌ای تحویل بگیر! 💊
                  </>
                ) : (
                  <>
                    No More Waiting in Pharmacy Lines! <br />
                    <span className="bg-gradient-to-l from-[#f72585] via-[#9d4edd] to-[#7209b7] bg-clip-text text-transparent">
                      Send Your Rx Online,
                    </span> <br />
                    Pick It Up in Just 2 Minutes! 💊
                  </>
                )}
              </h2>

              {/* Exact Paragraph from Screenshot 2 */}
              <p className="text-xs sm:text-sm lg:text-base text-[#6e5564] dark:text-[#d8b4cc] leading-relaxed font-medium max-w-2xl">
                {lang === 'fa' ? (
                  <>
                    پلتفرم‌های کشوری مثل اسنپ‌دکتر و تپسی‌دارو، شهرستان تفت را خارج از محدوده سرویس‌دهی می‌دانند! 
                    سامانه «نسخه‌یار» این خلأ بزرگ را با هوش مصنوعی OCR، هماهنگی داروخانه‌های معتمد خیابان ساحلی و بلوار بهشتی، باجه تحویل سریع و تسهیلات اقساطی پوشش داده است.
                  </>
                ) : (
                  <>
                    National platforms like Snapp Doctor and Tapsi Daroo consider Taft outside their service coverage! 
                    NoskheYar bridges this gap with AI OCR, verified local pharmacies, 2-minute express pickup counters, and flexible installment healthcare loans.
                  </>
                )}
              </p>

              {/* Exact Two CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={onStartPrescription}
                  className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#590d22] via-[#7209b7] to-[#f72585] hover:opacity-95 text-white font-black text-xs sm:text-sm shadow-lg shadow-[#f72585]/20 flex items-center gap-2.5 transition-all hover:-translate-y-0.5"
                >
                  <Send size={16} />
                  <span>{lang === 'fa' ? 'ثبت و استعلام نسخه پیش از مراجعه' : 'Submit & Inquire Rx Before Visit'}</span>
                </button>

                <button
                  onClick={onOpenOcrTest}
                  className="py-3.5 px-5 rounded-2xl bg-white dark:bg-[#38040e] border-2 border-[#7209b7] text-[#7209b7] dark:text-[#f72585] hover:bg-[#f7eef7] dark:hover:bg-[#590d22]/50 font-black text-xs sm:text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5"
                >
                  <Zap size={16} className="text-[#f72585]" />
                  <span>{lang === 'fa' ? 'تست OCR هوشمند دست‌خط نسخه' : 'Test AI Handwriting Rx OCR'}</span>
                </button>
              </div>

              {/* Exact 3 Bottom Checkmarks with green icons */}
              <div className="flex flex-wrap items-center gap-4 pt-3 text-xs font-bold text-[#2b091f] dark:text-[#e0b1cb]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <span>{lang === 'fa' ? 'کاهش زمان انتظار از ۴۵ به ۲ دقیقه' : 'Wait reduced from 45 to 2 mins'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <span>{lang === 'fa' ? 'امکان تقسیط بدون ضامن' : 'Installments without bank guarantor'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <span>{lang === 'fa' ? 'پوشش کامل مناطق شهرستان تفت' : 'Full coverage across Taft county'}</span>
                </div>
              </div>

            </div>

            {/* Left Column: Exact Floating Card from Screenshot 2 */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="bg-white dark:bg-[#1f0714] rounded-3xl p-5 sm:p-6 shadow-xl border border-[#ecd3e5] dark:border-[#590d22] text-right space-y-4">
                
                {/* Card Top Status Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
                  <div className="flex items-center gap-2 text-xs font-black text-[#2b091f] dark:text-white">
                    <Store size={16} className="text-emerald-600" />
                    <span>{lang === 'fa' ? 'وضعیت زنده شبکه داروخانه‌ای تفت' : 'Taft Pharmacy Network Live Status'}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                    {lang === 'fa' ? 'آماده‌باش و متصل' : 'Ready & Connected'}
                  </span>
                </div>

                {/* 4 Large Tiles (2x2 Grid) */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  
                  {/* Tile 1: 2 Minutes */}
                  <div className="bg-[#fcf9f5] dark:bg-[#2b091f]/60 p-4 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22]">
                    <strong className="block text-2xl sm:text-3xl font-black text-[#f72585] tracking-tight">
                      {lang === 'fa' ? '۲ دقیقه' : '2 Mins'}
                    </strong>
                    <span className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] font-medium block mt-1">
                      {lang === 'fa' ? 'میانگین معطلی در باجه' : 'Avg. counter wait'}
                    </span>
                  </div>

                  {/* Tile 2: 4 Pharmacies */}
                  <div className="bg-[#fcf9f5] dark:bg-[#2b091f]/60 p-4 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22]">
                    <strong className="block text-2xl sm:text-3xl font-black text-[#7209b7] dark:text-[#9d4edd] tracking-tight">
                      {lang === 'fa' ? '۴ داروخانه' : '4 Pharmacies'}
                    </strong>
                    <span className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] font-medium block mt-1">
                      {lang === 'fa' ? 'شعب فعال در تفت' : 'Active Taft branches'}
                    </span>
                  </div>

                  {/* Tile 3: 100% Transparency */}
                  <div className="bg-[#fcf9f5] dark:bg-[#2b091f]/60 p-4 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22]">
                    <strong className="block text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 tracking-tight">
                      ۱۰۰٪
                    </strong>
                    <span className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] font-medium block mt-1">
                      {lang === 'fa' ? 'شفافیت قیمت قبل از مراجعه' : 'Pre-visit price transparency'}
                    </span>
                  </div>

                  {/* Tile 4: Charity Active */}
                  <div className="bg-[#fcf9f5] dark:bg-[#2b091f]/60 p-4 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22]">
                    <strong className="block text-xl sm:text-2xl font-black text-[#d81159] dark:text-[#f72585] tracking-tight pt-1">
                      {lang === 'fa' ? 'فعال ❤️' : 'Active ❤️'}
                    </strong>
                    <span className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] font-medium block mt-1">
                      {lang === 'fa' ? 'صندوق مهربانی دارویی' : 'Charity fund'}
                    </span>
                  </div>

                </div>

                {/* Bottom Card Action Button */}
                <button
                  onClick={onOpenPharmacyQueue}
                  className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-[#2b091f] hover:bg-[#fdf0f7] dark:hover:bg-[#38040e] border border-[#e0b1cb] dark:border-[#7209b7] text-xs font-bold text-[#590d22] dark:text-[#f72585] flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Store size={15} />
                  <span>{lang === 'fa' ? 'مشاهده میز کار و صف ورودی داروخانه' : 'View Pharmacy Counter & Queue'}</span>
                  <ArrowLeft size={14} />
                </button>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
