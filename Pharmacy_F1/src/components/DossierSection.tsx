import React, { useState } from 'react';
import { 
  FolderOpen, 
  AlertTriangle, 
  CheckCircle2, 
  ListCheck, 
  LayoutGrid, 
  Filter, 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  Lightbulb, 
  Building2, 
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Search,
  Sparkles
} from 'lucide-react';
import { QUESTIONS_DATA, FUNNEL_STEPS, BMC_CARDS, FRICTION_ITEMS } from '../data/taftData';

export const DossierSection: React.FC = () => {
  const [activeDossierTab, setActiveDossierTab] = useState<'questions' | 'canvas' | 'funnel' | 'frictions'>('questions');
  
  // Tab 1: 8 Questions state
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const activeQuestion = QUESTIONS_DATA[activeQuestionIndex];

  // Tab 2: BMC Canvas state
  const [bmcFilter, setBmcFilter] = useState<'all' | 'customer' | 'value' | 'ops' | 'finance'>('all');
  const [inspectedBmc, setInspectedBmc] = useState<{ title: string; detail: string }>({
    title: 'ارزش‌های پیشنهادی منحصربه‌فرد',
    detail: 'ارزش پیشنهادی محوری: حذف ۱۰۰٪ معطلی در صف داروخانه، شفافیت ریالی پیش از مراجعه و تقسیط منعطف داروهای گران‌قیمت در بافت بومی تفت.',
  });

  // Tab 3: Funnel Pyramid state
  const [activeFunnelStep, setActiveFunnelStep] = useState<number>(1);
  const currentFunnel = FUNNEL_STEPS.find(f => f.step === activeFunnelStep) || FUNNEL_STEPS[0];

  // Tab 4: Frictions Matrix state
  const [frictionMode, setFrictionMode] = useState<'all' | 'friction' | 'value'>('all');

  return (
    <section id="dossier" className="py-16 bg-gradient-to-b from-[#fff9fc] to-[#f6ecf6] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e0b1cb] text-[#f72585] text-xs font-black mb-3 shadow-xs">
            <i className="fa-solid fa-folder-open text-[#f72585]"></i>
            پرونده تحلیلی، ارزیابی میدانی و نقشه رقبا
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#38040e]">
            چرا شهرستان تفت به این سامانه اختصاصی نیاز دارد؟
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6e5564] font-medium leading-relaxed">
            بررسی عملی و میدانی ما نشان داد هیچ‌یک از سامانه‌های بزرگ تحویل داروی کشوری، تفت را تحت پوشش قرار نداده‌اند. در ادامه مستندات اسکرین‌شات‌ها، تحلیل رقبا، ۸ سؤال ایده بالغ و بوم مدل کسب‌وکار آمده است.
          </p>
        </div>

        {/* Proof Banner (From PDF page 84-85) */}
        <div className="bg-gradient-to-r from-[#fff0f5] to-[#fffaff] border-r-6 border-[#f72585] rounded-3xl p-5 sm:p-6 shadow-md border border-[#ecd3e5] mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-right">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-black text-[#590d22] flex items-center gap-2">
              <i className="fa-solid fa-triangle-exclamation text-[#f72585]"></i>
              سند رسمی عدم پوشش تفت توسط رقبای بزرگ کشوری
            </h4>
            <p className="text-xs sm:text-sm text-[#6e5564] leading-relaxed">
              با استناد به تست‌های میدانی روی لوکیشن تفت (از جمله بلوار شهدای پرواز، شهرک قدس و مناطق مرکزی)، خطاهای زیر مستند شده است:
            </p>
          </div>
          <span className="shrink-0 px-4 py-2 rounded-full bg-[#f72585] text-white text-xs font-black shadow-md shadow-[#f72585]/30">
            اثبات عدم وجود رقیب مستقیم در تفت
          </span>
        </div>

        {/* Competitor Evidence Grid (From PDF page 85-88) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          
          {/* Card 1: Snapp Doctor */}
          <div className="bg-white rounded-3xl border border-[#e8cee2] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between text-right">
            <div>
              <div className="bg-[#faf4f8] p-4 border-b border-[#ebd4e5] flex items-center justify-between">
                <h5 className="font-black text-xs sm:text-sm text-[#590d22] flex items-center gap-2">
                  <i className="fa-solid fa-mobile-screen-button text-[#7209b7]"></i>
                  اسنپ‌دکتر (Snapp Doctor)
                </h5>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-black text-[10px]">
                  عدم سرویس‌دهی
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="text-[11px] font-bold text-stone-600">
                  موقعیت آزموده شده: تفت، خیابان دارایی، کوچه دیبا
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-bold leading-relaxed flex items-center gap-2">
                  <i className="fa-solid fa-circle-xmark text-rose-600 shrink-0"></i>
                  <span>«آدرس انتخابی شما در محدوده سرویس‌دهی نمی‌باشد»</span>
                </div>
              </div>
            </div>
            <div className="p-3.5 bg-[#fdfafc] border-t border-[#f3e5f0] text-[11px] text-[#6e5564]">
              <strong className="text-[#590d22]">نتیجه میدانی:</strong> هیچ داروخانه‌ای در تفت قادر به پذیرش سفارش از طریق اسنپ‌دکتر نیست و بیمار ناچار به مراجعه حضوری است.
            </div>
          </div>

          {/* Card 2: Snapp Food */}
          <div className="bg-white rounded-3xl border border-[#e8cee2] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between text-right">
            <div>
              <div className="bg-[#faf4f8] p-4 border-b border-[#ebd4e5] flex items-center justify-between">
                <h5 className="font-black text-xs sm:text-sm text-[#590d22] flex items-center gap-2">
                  <i className="fa-solid fa-bag-shopping text-[#7209b7]"></i>
                  اسنپ‌فود (داروخانه تفت)
                </h5>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-black text-[10px]">
                  فروشگاه صفر
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="text-[11px] font-bold text-stone-600">
                  بخش اقلام بهداشتی و بدون نسخه تفت
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-bold leading-relaxed flex items-center gap-2">
                  <i className="fa-solid fa-box-open text-rose-600 shrink-0"></i>
                  <span>«فروشگاهی با موقعیت انتخابی اعمال شده پیدا نشد»</span>
                </div>
              </div>
            </div>
            <div className="p-3.5 bg-[#fdfafc] border-t border-[#f3e5f0] text-[11px] text-[#6e5564]">
              <strong className="text-[#590d22]">نتیجه میدانی:</strong> حتی اقلام بدون نسخه (OTC) و بهداشتی نیز در دسترس ساکنان تفت قرار ندارد.
            </div>
          </div>

          {/* Card 3: Tapsi Daroo */}
          <div className="bg-white rounded-3xl border border-[#e8cee2] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between text-right">
            <div>
              <div className="bg-[#faf4f8] p-4 border-b border-[#ebd4e5] flex items-center justify-between">
                <h5 className="font-black text-xs sm:text-sm text-[#590d22] flex items-center gap-2">
                  <i className="fa-solid fa-car-side text-[#7209b7]"></i>
                  تپسی‌دارو (Tapsi Daroo)
                </h5>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-black text-[10px]">
                  خارج از محدوده
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="text-[11px] font-bold text-stone-600">
                  موقعیت: یزد، تفت، بلوار شهدای پرواز
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-bold leading-relaxed flex items-center gap-2">
                  <i className="fa-solid fa-ban text-rose-600 shrink-0"></i>
                  <span>«آدرس خارج از محدوده تحت پوشش ناوگان»</span>
                </div>
              </div>
            </div>
            <div className="p-3.5 bg-[#fdfafc] border-t border-[#f3e5f0] text-[11px] text-[#6e5564]">
              <strong className="text-[#590d22]">نتیجه میدانی:</strong> سیستم نقشه تپسی امکان جستجو و تحویل دارو برای شهروندان تفت را غیرممکن اعلام می‌کند.
            </div>
          </div>

          {/* Card 4: Darukade / PezeshkBook */}
          <div className="bg-white rounded-3xl border border-[#e8cee2] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between text-right">
            <div>
              <div className="bg-[#faf4f8] p-4 border-b border-[#ebd4e5] flex items-center justify-between">
                <h5 className="font-black text-xs sm:text-sm text-[#590d22] flex items-center gap-2">
                  <i className="fa-solid fa-globe text-[#7209b7]"></i>
                  داروخانه‌های آنلاین پستی
                </h5>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-black text-[10px]">
                  صرفاً پستی / پایتخت
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="text-[11px] font-bold text-stone-600">
                  شهرهای مجاز: صرفاً تهران، کرج، مشهد
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-bold leading-relaxed flex items-center gap-2">
                  <i className="fa-solid fa-clock-rotate-left text-amber-600 shrink-0"></i>
                  <span>«انتظار پستی ۲-۳ روزه با هزینه ارسال گزاف»</span>
                </div>
              </div>
            </div>
            <div className="p-3.5 bg-[#fdfafc] border-t border-[#f3e5f0] text-[11px] text-[#6e5564]">
              <strong className="text-[#590d22]">نتیجه میدانی:</strong> داروکده فاقد ثبت نسخه درمانی است و هزینه ارسال پستی فراتر از خود اقلام است.
            </div>
          </div>

        </div>

        {/* 4 Dossier Navigation Tabs (From PDF page 89) */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveDossierTab('questions')}
            className={`py-3 px-6 rounded-full font-black text-xs sm:text-sm transition-all flex items-center gap-2 border-2 ${
              activeDossierTab === 'questions'
                ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-lg shadow-[#590d22]/25 scale-105'
                : 'bg-white text-[#590d22] border-[#e0b1cb] hover:bg-[#f7eef7]'
            }`}
          >
            <i className="fa-solid fa-list-check"></i>
            پرسش‌های هشت‌گانه ایده بالغ
          </button>

          <button
            onClick={() => setActiveDossierTab('canvas')}
            className={`py-3 px-6 rounded-full font-black text-xs sm:text-sm transition-all flex items-center gap-2 border-2 ${
              activeDossierTab === 'canvas'
                ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-lg shadow-[#590d22]/25 scale-105'
                : 'bg-white text-[#590d22] border-[#e0b1cb] hover:bg-[#f7eef7]'
            }`}
          >
            <i className="fa-solid fa-diagram-project"></i>
            بوم مدل کسب‌وکار (BMC تعاملی)
          </button>

          <button
            onClick={() => setActiveDossierTab('funnel')}
            className={`py-3 px-6 rounded-full font-black text-xs sm:text-sm transition-all flex items-center gap-2 border-2 ${
              activeDossierTab === 'funnel'
                ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-lg shadow-[#590d22]/25 scale-105'
                : 'bg-white text-[#590d22] border-[#e0b1cb] hover:bg-[#f7eef7]'
            }`}
          >
            <i className="fa-solid fa-filter"></i>
            قیف فروش ۷ مرحله‌ای و هرم تبدیل
          </button>

          <button
            onClick={() => setActiveDossierTab('frictions')}
            className={`py-3 px-6 rounded-full font-black text-xs sm:text-sm transition-all flex items-center gap-2 border-2 ${
              activeDossierTab === 'frictions'
                ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-lg shadow-[#590d22]/25 scale-105'
                : 'bg-white text-[#590d22] border-[#e0b1cb] hover:bg-[#f7eef7]'
            }`}
          >
            <i className="fa-solid fa-fire-flame-curved"></i>
            اصطکاک‌ها و ماتریس ارزش واسطه‌ای
          </button>
        </div>

        {/* TAB 1: 8 QUESTIONS OF MATURE IDEA (From PDF page 90-92, 127-132) */}
        {activeDossierTab === 'questions' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border-2 border-[#ecd3e5] animate-fade-in text-right">
            
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-bold text-[#6e5564] mb-2">
                <span>پیشرفت پرسش‌های ایده بالغ:</span>
                <span>سوال {activeQuestionIndex + 1} از ۸</span>
              </div>
              <div className="w-full h-2.5 bg-[#f3e5f0] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#f72585] to-[#7209b7] rounded-full transition-all duration-300"
                  style={{ width: `${((activeQuestionIndex + 1) / 8) * 100}%` }}
                />
              </div>
            </div>

            {/* 8 Question Navigation Chips */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
              {QUESTIONS_DATA.map((q, idx) => (
                <button
                  key={q.num}
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`py-2 px-3.5 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 border ${
                    activeQuestionIndex === idx
                      ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-md'
                      : 'bg-[#faf4f8] text-[#6e5564] border-[#ecd3e5] hover:bg-[#f7eef7]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    activeQuestionIndex === idx ? 'bg-white text-[#7209b7]' : 'bg-white/60 text-[#6e5564]'
                  }`}>
                    {idx + 1}
                  </span>
                  <span>{q.category}</span>
                </button>
              ))}
            </div>

            {/* Active Question Display Card */}
            <div className="bg-gradient-to-tr from-[#fff9fc] to-[#faf3f9] p-6 sm:p-8 rounded-3xl border-2 border-[#ecd3e5] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3.5 py-1 rounded-full bg-[#fdf0f7] text-[#f72585] text-xs font-black border border-[#e0b1cb]">
                  {activeQuestion.category}
                </span>
                <span className="text-xs font-bold text-[#7209b7]">
                  سوال {activeQuestionIndex + 1} از ۸
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-[#38040e]">
                {activeQuestion.title}
              </h3>

              <p className="text-sm sm:text-base text-[#2b091f] leading-loose font-medium">
                {activeQuestion.desc}
              </p>

              <div className="p-4 bg-white rounded-2xl border-r-4 border-[#7209b7] border-y border-l border-[#ecd3e5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#6e5564] font-bold">
                  <Lightbulb size={18} className="text-[#e0a96d] shrink-0" />
                  <span>{activeQuestion.insight}</span>
                </div>
                <span className="shrink-0 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black">
                  {activeQuestion.status}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#f3e5f0]">
              <button
                onClick={() => setActiveQuestionIndex(prev => Math.min(7, prev + 1))}
                disabled={activeQuestionIndex === 7}
                className="py-2.5 px-5 rounded-full bg-white border border-[#dfc2d7] text-[#590d22] font-bold text-xs hover:border-[#f72585] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                <span>سوال بعدی</span>
                <ChevronLeft size={16} />
              </button>

              <span className="text-xs text-[#6e5564] font-medium hidden sm:inline">
                روی هر چیپ کلیک کنید یا با دکمه‌ها مرور فرمایید
              </span>

              <button
                onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={activeQuestionIndex === 0}
                className="py-2.5 px-5 rounded-full bg-white border border-[#dfc2d7] text-[#590d22] font-bold text-xs hover:border-[#f72585] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                <ChevronRight size={16} />
                <span>سوال قبلی</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 2: BUSINESS MODEL CANVAS (BMC) (From PDF page 93-99, 133-134) */}
        {activeDossierTab === 'canvas' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#ecd3e5] animate-fade-in text-right">
            
            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-8">
              <button
                onClick={() => setBmcFilter('all')}
                className={`py-2 px-4 rounded-full text-xs font-black transition-all ${
                  bmcFilter === 'all'
                    ? 'bg-[#7209b7] text-white shadow-md'
                    : 'bg-[#faf4f8] text-[#6e5564] hover:bg-[#f7eef7]'
                }`}
              >
                همه ۹ بخش بوم
              </button>
              <button
                onClick={() => setBmcFilter('customer')}
                className={`py-2 px-4 rounded-full text-xs font-black transition-all ${
                  bmcFilter === 'customer'
                    ? 'bg-[#7209b7] text-white shadow-md'
                    : 'bg-[#faf4f8] text-[#6e5564] hover:bg-[#f7eef7]'
                }`}
              >
                سمت مشتری و بازار
              </button>
              <button
                onClick={() => setBmcFilter('value')}
                className={`py-2 px-4 rounded-full text-xs font-black transition-all ${
                  bmcFilter === 'value'
                    ? 'bg-[#7209b7] text-white shadow-md'
                    : 'bg-[#faf4f8] text-[#6e5564] hover:bg-[#f7eef7]'
                }`}
              >
                ارزش‌های پیشنهادی
              </button>
              <button
                onClick={() => setBmcFilter('ops')}
                className={`py-2 px-4 rounded-full text-xs font-black transition-all ${
                  bmcFilter === 'ops'
                    ? 'bg-[#7209b7] text-white shadow-md'
                    : 'bg-[#faf4f8] text-[#6e5564] hover:bg-[#f7eef7]'
                }`}
              >
                زیرساخت و عملیات
              </button>
              <button
                onClick={() => setBmcFilter('finance')}
                className={`py-2 px-4 rounded-full text-xs font-black transition-all ${
                  bmcFilter === 'finance'
                    ? 'bg-[#7209b7] text-white shadow-md'
                    : 'bg-[#faf4f8] text-[#6e5564] hover:bg-[#f7eef7]'
                }`}
              >
                جریان‌های مالی و درآمد
              </button>
            </div>

            {/* Dynamic Grid of BMC blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {BMC_CARDS.map((card) => {
                const isVisible = bmcFilter === 'all' || card.category === bmcFilter;
                const isSelected = inspectedBmc.title === card.title;
                if (!isVisible) return null;

                return (
                  <div
                    key={card.id}
                    onClick={() => setInspectedBmc({ title: card.title, detail: card.strategicDetail })}
                    className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative ${
                      card.span2 ? 'lg:col-span-2' : ''
                    } ${
                      isSelected
                        ? 'bg-white border-[#7209b7] shadow-xl shadow-[#7209b7]/15 -translate-y-1'
                        : 'bg-[#fdfafc] border-[#e8cee2] hover:bg-white hover:border-[#dfc2d7]'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-dashed border-[#ebd4e5]">
                      <h4 className="text-xs sm:text-sm font-black text-[#590d22] flex items-center gap-2">
                        <i className={`fa-solid ${card.icon} text-[#7209b7]`}></i>
                        {card.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-lg bg-[#f7eef7] text-[#7209b7] text-[10px] font-black">
                        {card.categoryLabel}
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs text-[#2b091f]">
                      {card.items.map((it, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <i className="fa-solid fa-check text-[#f72585] text-[11px] mt-1 shrink-0"></i>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Inspector Box (From PDF page 99) */}
            <div className="mt-8 bg-gradient-to-r from-[#fff0f5] to-[#fbf2ff] p-5 sm:p-6 rounded-3xl border-2 border-[#e0b1cb] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h5 className="text-sm sm:text-base font-black text-[#590d22] flex items-center gap-2">
                  <i className="fa-solid fa-magnifying-glass-chart text-[#f72585]"></i>
                  تحلیل استراتژیک: {inspectedBmc.title}
                </h5>
                <p className="text-xs sm:text-sm text-[#6e5564] leading-relaxed">
                  {inspectedBmc.detail}
                </p>
              </div>
              <span className="shrink-0 px-3.5 py-1.5 rounded-full bg-white text-[#590d22] text-xs font-black border border-[#e0b1cb]">
                تحلیل بومی تفت
              </span>
            </div>

          </div>
        )}

        {/* TAB 3: FUNNEL PYRAMID (From PDF page 100-102, 135-138) */}
        {activeDossierTab === 'funnel' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border-2 border-[#ecd3e5] animate-fade-in text-right">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Funnel Visual Stack (Left 6 Cols) */}
              <div className="lg:col-span-6 space-y-2 flex flex-col items-center w-full">
                {FUNNEL_STEPS.map((step) => {
                  const isSelected = activeFunnelStep === step.step;
                  // Dynamic widths decreasing for pyramid shape
                  const widths = ['w-full', 'w-[93%]', 'w-[86%]', 'w-[79%]', 'w-[72%]', 'w-[65%]', 'w-[58%]'];
                  const widthClass = widths[step.step - 1] || 'w-full';

                  return (
                    <div
                      key={step.step}
                      onClick={() => setActiveFunnelStep(step.step)}
                      className={`${widthClass} cursor-pointer py-3 px-4 rounded-xl font-black text-xs text-white transition-all duration-300 flex items-center justify-between shadow-sm relative ${
                        isSelected 
                          ? 'ring-4 ring-[#f72585]/40 scale-[1.03] shadow-lg' 
                          : 'opacity-90 hover:opacity-100'
                      }`}
                      style={{
                        background: isSelected 
                          ? 'linear-gradient(90deg, #f72585, #7209b7)'
                          : 'linear-gradient(90deg, #7209b7, #590d22)'
                      }}
                    >
                      <span className="truncate">{step.title}</span>
                      <span className="text-[11px] bg-black/25 px-2 py-0.5 rounded-md font-mono shrink-0 mr-2">
                        {step.percent}٪
                      </span>
                      {isSelected && (
                        <span className="absolute -left-3 text-[#f72585] text-sm hidden sm:inline">
                          ◀
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Funnel Details Panel (Right 6 Cols) */}
              <div className="lg:col-span-6 bg-[#faf3f9] p-6 rounded-3xl border-2 border-[#ecd3e5] space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#dfc2d7]">
                  <span className="px-3 py-1 rounded-full bg-[#f72585] text-white text-xs font-black">
                    {currentFunnel.badge}
                  </span>
                  <span className="text-xs font-bold text-[#7209b7]">موتور رشد و تبدیل کاربر</span>
                </div>

                <h4 className="text-base sm:text-lg font-black text-[#38040e]">
                  {currentFunnel.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#2b091f] leading-relaxed">
                  {currentFunnel.desc}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3.5 rounded-2xl border border-[#ecd3e5] text-center">
                    <span className="text-[10px] text-stone-500 font-bold block mb-1">کانال ارتباطی اصلی:</span>
                    <strong className="text-xs font-black text-[#590d22]">{currentFunnel.channel}</strong>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-[#ecd3e5] text-center">
                    <span className="text-[10px] text-stone-500 font-bold block mb-1">ارزش منحصربه‌فرد تفت:</span>
                    <strong className="text-xs font-black text-[#f72585]">{currentFunnel.impact}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-stone-400 text-center pt-2">
                  برای مشاهده منطق بازاریابی هر فاز، روی سطوح قیف کلیک نمایید.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: FRICTIONS & TRANSFORMATION MATRIX (From PDF page 103-107, 138-139) */}
        {activeDossierTab === 'frictions' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border-2 border-[#ecd3e5] animate-fade-in text-right">
            
            {/* View Switcher */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setFrictionMode('all')}
                className={`py-2.5 px-5 rounded-full text-xs font-black transition-all flex items-center gap-2 border ${
                  frictionMode === 'all'
                    ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-md'
                    : 'bg-[#faf4f8] text-[#6e5564] border-[#ecd3e5] hover:bg-[#f7eef7]'
                }`}
              >
                <i className="fa-solid fa-right-left"></i>
                مقایسه کامل (چالش سنتی ⬅ راهکار واسطه داروتفت)
              </button>

              <button
                onClick={() => setFrictionMode('friction')}
                className={`py-2.5 px-5 rounded-full text-xs font-black transition-all flex items-center gap-2 border ${
                  frictionMode === 'friction'
                    ? 'bg-rose-700 text-white border-transparent shadow-md'
                    : 'bg-[#faf4f8] text-rose-800 border-[#ecd3e5] hover:bg-rose-50'
                }`}
              >
                <i className="fa-solid fa-fire text-rose-500"></i>
                فقط اصطکاک‌های مدل سنتی
              </button>

              <button
                onClick={() => setFrictionMode('value')}
                className={`py-2.5 px-5 rounded-full text-xs font-black transition-all flex items-center gap-2 border ${
                  frictionMode === 'value'
                    ? 'bg-emerald-700 text-white border-transparent shadow-md'
                    : 'bg-[#faf4f8] text-emerald-800 border-[#ecd3e5] hover:bg-emerald-50'
                }`}
              >
                <i className="fa-solid fa-shield-halved text-emerald-600"></i>
                فقط کارکردهای ۶گانه واسطه داروتفت
              </button>
            </div>

            {/* Friction Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FRICTION_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#fdfbfd] rounded-3xl p-5 border-2 border-[#ecd3e5] shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#f3e5f0]">
                      <span className="px-3 py-1 rounded-xl bg-rose-100 text-rose-800 font-black text-[11px]">
                        {item.categoryProblem}
                      </span>
                      <i className={`fa-solid ${item.iconProblem} text-rose-600`}></i>
                    </div>

                    {/* Problem */}
                    {frictionMode !== 'value' && (
                      <div className="space-y-1 mb-4">
                        <h4 className="text-sm font-black text-[#38040e]">
                          {item.titleProblem}
                        </h4>
                        <p className="text-xs text-[#6e5564] leading-relaxed">
                          {item.descProblem}
                        </p>
                      </div>
                    )}

                    {/* Solution */}
                    {frictionMode !== 'friction' && (
                      <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-1.5 text-right">
                        <div className="flex items-center gap-2 text-emerald-900 font-black">
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                          <span>{item.solutionTitle}</span>
                        </div>
                        <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
                          {item.solutionDesc}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#f3e5f0] flex items-center justify-between text-[10px] text-[#7209b7] font-bold">
                    <span>{item.solutionTag}</span>
                    <i className="fa-solid fa-circle-arrow-left text-[#f72585]"></i>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
