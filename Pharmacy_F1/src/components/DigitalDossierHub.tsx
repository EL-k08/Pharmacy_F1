import React, { useState } from 'react';
import { 
  ArrowRight, 
  FileText, 
  Layers, 
  HelpCircle, 
  AlertTriangle, 
  Filter, 
  Flame, 
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Building2,
  CheckCircle2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Workflow,
  Split
} from 'lucide-react';
import { BmcCanvas } from './BmcCanvas';
import { ProcessBoundaries } from './ProcessBoundaries';
import { QuestionsPharmacy4 } from './QuestionsPharmacy4';
import { FrictionsPharmacy4 } from './FrictionsPharmacy4';
import { FUNNEL_STEPS } from '../data/taftData';

interface DigitalDossierHubProps {
  onBackToHome: () => void;
  initialTab?: 'bmc' | 'blueprint' | 'questions' | 'frictions' | 'funnel';
  lang: 'fa' | 'en';
}

export const DigitalDossierHub: React.FC<DigitalDossierHubProps> = ({
  onBackToHome,
  initialTab = 'bmc',
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'bmc' | 'blueprint' | 'questions' | 'frictions' | 'funnel'>(initialTab);
  const [activeFunnelStep, setActiveFunnelStep] = useState<number>(1);
  const currentFunnel = FUNNEL_STEPS.find(f => f.step === activeFunnelStep) || FUNNEL_STEPS[0];

  const TABS = [
    {
      id: 'bmc' as const,
      title: lang === 'fa' ? 'بوم مدل کسب‌وکار (BMC)' : 'Business Model Canvas',
      subtitle: lang === 'fa' ? '۹ بلوک استراتژیک تفت' : '9 strategic blocks',
      iconClass: 'fa-diagram-project',
    },
    {
      id: 'blueprint' as const,
      title: lang === 'fa' ? 'مرزبندی فرایندها و معماری' : 'Process Boundaries',
      subtitle: lang === 'fa' ? '۴ لایه عملیاتی و خطوط مرز' : '4-tier service architecture',
      iconClass: 'fa-network-wired',
    },
    {
      id: 'questions' as const,
      title: lang === 'fa' ? 'پرسش‌های ۸گانه ایده بالغ' : '8 Mature Questions',
      subtitle: lang === 'fa' ? 'طرح تحلیلی دانشگاهی' : 'Pharmacy4 analysis',
      iconClass: 'fa-list-check',
    },
    {
      id: 'frictions' as const,
      title: lang === 'fa' ? 'اصطکاک‌ها و کارکرد واسطه' : 'Frictions & Intermediary',
      subtitle: lang === 'fa' ? 'چالش‌ها ⬅ راهکار واسطه' : 'Frictions vs solutions',
      iconClass: 'fa-fire-flame-curved',
    },
    {
      id: 'funnel' as const,
      title: lang === 'fa' ? 'قیف فروش ۷ مرحله‌ای' : '7-Stage Sales Funnel',
      subtitle: lang === 'fa' ? 'هرم تبدیل مخاطبان تفت' : 'Conversion pyramid',
      iconClass: 'fa-filter',
    },
  ];

  // Exact English percent labels matching user screenshot "فرمت اعداد در قیف فروش.png"
  const FUNNEL_PERCENTS = ['100%', '90%', '80%', '70%', '60%', '50%', '40%'];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto text-right">
      
      {/* MOBILE COMPACT HEADER */}
      <div className="lg:hidden mb-6 space-y-3">
        <div className="bg-white dark:bg-[#1f0714] rounded-2xl p-4 border border-[#ecd3e5] dark:border-[#590d22] flex items-center justify-between">
          <h2 className="text-sm font-black text-[#38040e] dark:text-white flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7209b7] animate-pulse" />
            <span>{lang === 'fa' ? 'پرونده دیجیتال سلامت تفت' : 'Taft Digital Dossier'}</span>
          </h2>
          <button
            onClick={onBackToHome}
            className="py-1.5 px-3 rounded-xl bg-[#faf4f8] dark:bg-[#38040e] text-xs font-bold text-[#590d22] dark:text-[#f72585] flex items-center gap-1 border border-[#e0b1cb] dark:border-[#7209b7]"
          >
            <ArrowRight size={14} />
            <span>{lang === 'fa' ? 'صفحه اصلی' : 'Home'}</span>
          </button>
        </div>

        {/* Mobile horizontal scrolling chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-md'
                    : 'bg-white dark:bg-[#1f0714] text-[#2b091f] dark:text-[#d8b4cc] border-[#ecd3e5] dark:border-[#590d22]'
                }`}
              >
                <i className={`fa-solid ${tab.iconClass}`}></i>
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DESKTOP SPLIT LAYOUT: CONTENT ON RIGHT/CENTER, SLEEK NAVIGATION DOCK ON THE LEFT */}
      {/* In RTL: flex-row-reverse places the dock on the physical LEFT side, leaving the right side open! */}
      <div className="flex flex-col lg:flex-row-reverse lg:items-start lg:gap-8">
        
        {/* LEFT SIDE DOCK (Requirement 2: Sleek, non-obstructive left navigation) */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-24 space-y-4 text-right">
          
          {/* Left Dock Header Card */}
          <div className="bg-white/95 dark:bg-[#1f0714]/95 backdrop-blur-md rounded-3xl p-5 border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7209b7] animate-pulse" />
                <h3 className="text-sm font-black text-[#38040e] dark:text-white">
                  {lang === 'fa' ? 'پرونده دیجیتال' : 'Strategic Dossier'}
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fdf0f7] dark:bg-[#38040e] text-[#7209b7] dark:text-[#f72585]">
                {lang === 'fa' ? '۵ سند تحلیلی' : '5 Models'}
              </span>
            </div>

            <p className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] leading-relaxed font-medium">
              {lang === 'fa' 
                ? 'تحلیل استراتژیک، بوم کسب‌وکار، مرزبندی فرایندها و شواهد میدانی تفت' 
                : 'Strategic analysis, BMC, process boundaries, and field evidence'}
            </p>

            <button
              onClick={onBackToHome}
              className="w-full py-2.5 px-3 rounded-2xl bg-[#faf4f8] dark:bg-[#38040e] hover:bg-[#f7eef7] dark:hover:bg-[#590d22] text-xs font-black text-[#590d22] dark:text-[#f72585] border border-[#e0b1cb] dark:border-[#7209b7] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <ArrowRight size={14} />
              <span>{lang === 'fa' ? 'بازگشت به صفحه اصلی' : 'Back to Home'}</span>
            </button>
          </div>

          {/* 5 Vertical Subpage Navigation Buttons */}
          <div className="bg-white/95 dark:bg-[#1f0714]/95 backdrop-blur-md rounded-3xl p-3 border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-md space-y-2">
            <span className="text-[10px] font-black text-stone-400 dark:text-stone-500 px-3 block pt-1">
              {lang === 'fa' ? 'فهرست اسناد تحلیلی:' : 'Analytical Documents:'}
            </span>

            {TABS.map((tab) => {
              const isSelected = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full p-3 rounded-2xl text-right transition-all flex items-center justify-between border-2 cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-lg shadow-[#590d22]/20 scale-[1.02]'
                      : 'bg-[#faf4f8] dark:bg-[#250918]/60 text-[#2b091f] dark:text-[#d8b4cc] border-[#ecd3e5] dark:border-[#590d22] hover:bg-white dark:hover:bg-[#2b091f]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white dark:bg-[#1f0714] text-[#7209b7] dark:text-[#f72585] border border-[#ecd3e5] dark:border-[#590d22]'
                    }`}>
                      <i className={`fa-solid ${tab.iconClass} text-sm`}></i>
                    </div>
                    <div className="min-w-0 text-right">
                      <h4 className="text-xs font-black truncate">{tab.title}</h4>
                      <span className={`text-[10px] block truncate ${isSelected ? 'text-white/80' : 'text-[#6e5564] dark:text-[#d8b4cc]'}`}>
                        {tab.subtitle}
                      </span>
                    </div>
                  </div>

                  <ChevronLeft size={15} className={`shrink-0 transition-transform ${isSelected ? 'text-white translate-x-[-2px]' : 'text-stone-400 group-hover:translate-x-[-2px]'}`} />
                </button>
              );
            })}
          </div>

          {/* Regional Proof Badge */}
          <div className="p-3.5 rounded-2xl bg-[#fff0f5] dark:bg-[#38040e]/50 border border-[#fcd0df] dark:border-[#7209b7] text-[11px] text-[#590d22] dark:text-[#f72585] font-bold text-center">
            {lang === 'fa' ? '🎯 مصوب پایلوت سلامت شهرستان تفت' : '🎯 Approved Taft Health Pilot'}
          </div>

        </aside>

        {/* MAIN CONTENT AREA ON THE RIGHT (Spacious, unobstructed height) */}
        <main className="flex-1 min-w-0 space-y-8 animate-fade-in">
          
          {/* ALWAYS VISIBLE AT TOP: شواهد شکست رقبای کشوری در تفت */}
          <div className="space-y-4">
            {/* Proof Header Banner */}
            <div className="bg-gradient-to-r from-[#fff0f5] via-[#fffaff] to-[#fbf2ff] dark:from-[#250918] dark:via-[#1f0714] dark:to-[#2b091f] border-r-6 border-[#f72585] rounded-3xl p-6 shadow-md border border-[#ecd3e5] dark:border-[#590d22] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-black text-[#590d22] dark:text-[#f72585] flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation text-[#f72585]"></i>
                  <span>{lang === 'fa' ? 'شواهد و اسناد میدانی شکست سامانه‌های کشوری در شهرستان تفت' : 'Field Proof of National Platforms Failure in Taft'}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#6e5564] dark:text-[#d8b4cc] leading-relaxed">
                  {lang === 'fa'
                    ? 'تست‌های میدانی در محله‌های تفت (بلوار شهدای پرواز، خیابان ساحلی، شهرک قدس، گرمسیر) نشان می‌دهد پلتفرم‌های تهرانی این شهر را خارج از محدوده اعلام می‌کنند:'
                    : 'Field experiments across Taft (Shohadaye Parvaz Blvd, Saheli St, Qods town) confirm national platforms reject orders in Taft:'}
                </p>
              </div>
              <span className="shrink-0 px-4 py-2 rounded-full bg-[#f72585] text-white text-xs font-black shadow-md shadow-[#f72585]/30">
                {lang === 'fa' ? 'خلأ ۱۰۰٪ رقیب مستقیم در تفت' : '100% Competitor Gap in Taft'}
              </span>
            </div>

            {/* 4 Competitor Failure Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Snapp Doctor */}
              <div className="bg-white dark:bg-[#1f0714] rounded-3xl border-2 border-[#e8cee2] dark:border-[#590d22] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="bg-[#faf4f8] dark:bg-[#2b091f] p-4 border-b border-[#ebd4e5] dark:border-[#590d22] flex items-center justify-between">
                    <h5 className="font-black text-xs sm:text-sm text-[#590d22] dark:text-white flex items-center gap-2">
                      <i className="fa-solid fa-mobile-screen-button text-[#7209b7]"></i>
                      اسنپ‌دکتر (Snapp Doctor)
                    </h5>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-black text-[10px]">
                      عدم سرویس‌دهی
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="text-[11px] font-bold text-stone-600 dark:text-stone-300">
                      موقعیت تستی: تفت، خیابان دارایی، کوچه دیبا
                    </div>
                    <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-800 dark:text-rose-300 font-bold leading-relaxed flex items-center gap-2">
                      <i className="fa-solid fa-circle-xmark text-rose-600 shrink-0"></i>
                      <span>«آدرس انتخابی شما در محدوده سرویس‌دهی نمی‌باشد»</span>
                    </div>
                  </div>
                </div>
                <div className="p-3.5 bg-[#fdfafc] dark:bg-[#250918]/60 border-t border-[#f3e5f0] dark:border-[#590d22] text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
                  <strong className="text-[#590d22] dark:text-[#f72585]">نتیجه میدانی:</strong> هیچ داروخانه‌ای در تفت قادر به پذیرش سفارش از اسنپ‌دکتر نیست.
                </div>
              </div>

              {/* Card 2: Snapp Food */}
              <div className="bg-white dark:bg-[#1f0714] rounded-3xl border-2 border-[#e8cee2] dark:border-[#590d22] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="bg-[#faf4f8] dark:bg-[#2b091f] p-4 border-b border-[#ebd4e5] dark:border-[#590d22] flex items-center justify-between">
                    <h5 className="font-black text-xs sm:text-sm text-[#590d22] dark:text-white flex items-center gap-2">
                      <i className="fa-solid fa-bag-shopping text-[#7209b7]"></i>
                      اسنپ‌فود (داروخانه تفت)
                    </h5>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-black text-[10px]">
                      فروشگاه صفر
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="text-[11px] font-bold text-stone-600 dark:text-stone-300">
                      بخش اقلام بهداشتی و OTC تفت
                    </div>
                    <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-800 dark:text-rose-300 font-bold leading-relaxed flex items-center gap-2">
                      <i className="fa-solid fa-box-open text-rose-600 shrink-0"></i>
                      <span>«فروشگاهی با موقعیت انتخابی اعمال شده پیدا نشد»</span>
                    </div>
                  </div>
                </div>
                <div className="p-3.5 bg-[#fdfafc] dark:bg-[#250918]/60 border-t border-[#f3e5f0] dark:border-[#590d22] text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
                  <strong className="text-[#590d22] dark:text-[#f72585]">نتیجه میدانی:</strong> حتی اقلام بدون نسخه در دسترس شهروندان تفتی نیست.
                </div>
              </div>

              {/* Card 3: Tapsi Daroo */}
              <div className="bg-white dark:bg-[#1f0714] rounded-3xl border-2 border-[#e8cee2] dark:border-[#590d22] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="bg-[#faf4f8] dark:bg-[#2b091f] p-4 border-b border-[#ebd4e5] dark:border-[#590d22] flex items-center justify-between">
                    <h5 className="font-black text-xs sm:text-sm text-[#590d22] dark:text-white flex items-center gap-2">
                      <i className="fa-solid fa-car-side text-[#7209b7]"></i>
                      تپسی‌دارو (Tapsi Daroo)
                    </h5>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-black text-[10px]">
                      خارج از ناوگان
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="text-[11px] font-bold text-stone-600 dark:text-stone-300">
                      موقعیت: یزد، تفت، بلوار شهدای پرواز
                    </div>
                    <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-800 dark:text-rose-300 font-bold leading-relaxed flex items-center gap-2">
                      <i className="fa-solid fa-ban text-rose-600 shrink-0"></i>
                      <span>«آدرس خارج از محدوده تحت پوشش ناوگان»</span>
                    </div>
                  </div>
                </div>
                <div className="p-3.5 bg-[#fdfafc] dark:bg-[#250918]/60 border-t border-[#f3e5f0] dark:border-[#590d22] text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
                  <strong className="text-[#590d22] dark:text-[#f72585]">نتیجه میدانی:</strong> تحویل ناوگانی تپسی در تفت پشتیبانی نمی‌شود.
                </div>
              </div>

              {/* Card 4: Postal / Darukade */}
              <div className="bg-white dark:bg-[#1f0714] rounded-3xl border-2 border-[#e8cee2] dark:border-[#590d22] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="bg-[#faf4f8] dark:bg-[#2b091f] p-4 border-b border-[#ebd4e5] dark:border-[#590d22] flex items-center justify-between">
                    <h5 className="font-black text-xs sm:text-sm text-[#590d22] dark:text-white flex items-center gap-2">
                      <i className="fa-solid fa-globe text-[#7209b7]"></i>
                      داروخانه‌های آنلاین پستی
                    </h5>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-black text-[10px]">
                      صرفاً پستی / پایتخت
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="text-[11px] font-bold text-stone-600 dark:text-stone-300">
                      شهرهای مجاز: صرفاً تهران و کلان‌شهرها
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-xs text-amber-900 dark:text-amber-300 font-bold leading-relaxed flex items-center gap-2">
                      <i className="fa-solid fa-clock-rotate-left text-amber-600 shrink-0"></i>
                      <span>«انتظار پستی ۲-۳ روزه با هزینه ارسال گزاف»</span>
                    </div>
                  </div>
                </div>
                <div className="p-3.5 bg-[#fdfafc] dark:bg-[#250918]/60 border-t border-[#f3e5f0] dark:border-[#590d22] text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
                  <strong className="text-[#590d22] dark:text-[#f72585]">نتیجه میدانی:</strong> عدم پذیرش نسخه تجویزی و تأخیر زمانی بحرانی برای بیمار.
                </div>
              </div>

            </div>
          </div>

          {/* ACTIVE ANALYTICAL MODEL */}
          <div className="animate-fade-in">
            {/* SUBPAGE 1: BMC CANVAS */}
            {activeTab === 'bmc' && (
              <div className="bg-white dark:bg-[#1f0714] p-6 sm:p-8 rounded-[32px] border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-sm">
                <BmcCanvas />
              </div>
            )}

            {/* SUBPAGE 2: PROCESS BOUNDARIES & SERVICE ARCHITECTURE */}
            {activeTab === 'blueprint' && (
              <ProcessBoundaries />
            )}

            {/* SUBPAGE 3: 8 QUESTIONS (Pharmacy4 PDF) */}
            {activeTab === 'questions' && (
              <QuestionsPharmacy4 />
            )}

            {/* SUBPAGE 4: FRICTIONS & INTERMEDIARY VALUE (Pharmacy4 PDF) */}
            {activeTab === 'frictions' && (
              <FrictionsPharmacy4 />
            )}

            {/* SUBPAGE 5: 7-STAGE SALES FUNNEL (Requirement 8: Matches فرمت اعداد در قیف فروش.png) */}
            {activeTab === 'funnel' && (
              <div className="bg-white dark:bg-[#1f0714] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border-2 border-[#ecd3e5] dark:border-[#590d22] space-y-6">
                
                <div className="pb-4 border-b border-[#f3e5f0] dark:border-[#590d22]">
                  <span className="text-[11px] font-bold text-[#f72585] block">{lang === 'fa' ? 'مدل تبدیل مخاطبان تفت' : 'Taft Conversion Model'}</span>
                  <h3 className="text-xl font-black text-[#38040e] dark:text-white">
                    {lang === 'fa' ? 'قیف فروش ۷ مرحله‌ای و هرم تبدیل بیماران به مروجان سلامت' : '7-Stage Sales Funnel & Conversion Pyramid'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Funnel Visual Stack with exact formatting matching user screenshot: "فرمت اعداد در قیف فروش.png" */}
                  <div className="lg:col-span-6 space-y-2.5 flex flex-col items-center w-full">
                    {FUNNEL_STEPS.map((step, idx) => {
                      const isSelected = activeFunnelStep === step.step;
                      const widths = ['w-full', 'w-[93%]', 'w-[86%]', 'w-[79%]', 'w-[72%]', 'w-[65%]', 'w-[58%]'];
                      const widthClass = widths[step.step - 1] || 'w-full';
                      const percentLabel = FUNNEL_PERCENTS[idx] || `${step.percent}%`;

                      return (
                        <div
                          key={step.step}
                          onClick={() => setActiveFunnelStep(step.step)}
                          className={`${widthClass} cursor-pointer py-3 px-4 rounded-xl font-black text-xs text-white transition-all duration-300 flex items-center justify-between shadow-sm relative ${
                            isSelected 
                              ? 'ring-4 ring-[#f72585]/40 scale-[1.03] shadow-lg' 
                              : 'opacity-90 hover:opacity-100 hover:scale-[1.01]'
                          }`}
                          style={{
                            background: isSelected 
                              ? 'linear-gradient(90deg, #f72585, #7209b7)'
                              : 'linear-gradient(90deg, #7209b7, #590d22)'
                          }}
                        >
                          <span className="truncate">{step.title}</span>
                          
                          {/* Exact format from screenshot: 100%, 90%, 80%, etc. in Latin digits/font */}
                          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg shrink-0 mr-2 bg-black/25 text-white tracking-wider">
                            {percentLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step Details */}
                  <div className="lg:col-span-6 bg-[#faf3f9] dark:bg-[#2b091f]/50 p-6 rounded-3xl border-2 border-[#ecd3e5] dark:border-[#590d22] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#dfc2d7] dark:border-[#590d22]">
                      <span className="px-3 py-1 rounded-full bg-[#f72585] text-white text-xs font-black">
                        {currentFunnel.badge}
                      </span>
                      <span className="text-xs font-bold text-[#7209b7] dark:text-[#f72585]">
                        {lang === 'fa' ? `گام ${currentFunnel.step} از ۷` : `Step ${currentFunnel.step} of 7`}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-black text-[#38040e] dark:text-white">
                      {currentFunnel.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#2b091f] dark:text-[#d8b4cc] leading-relaxed">
                      {currentFunnel.desc}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-white dark:bg-[#1f0714] p-3.5 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22] text-center">
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold block mb-1">
                          {lang === 'fa' ? 'کانال بازاریابی:' : 'Channel:'}
                        </span>
                        <strong className="text-xs font-black text-[#590d22] dark:text-white">{currentFunnel.channel}</strong>
                      </div>
                      <div className="bg-white dark:bg-[#1f0714] p-3.5 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22] text-center">
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold block mb-1">
                          {lang === 'fa' ? 'ارزش ملموس در تفت:' : 'Local Impact:'}
                        </span>
                        <strong className="text-xs font-black text-[#f72585]">{currentFunnel.impact}</strong>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-400 dark:text-stone-500 text-center pt-1">
                      {lang === 'fa' 
                        ? 'روی سطوح مختلف هرم کلیک نمایید تا جزئیات جذب و نرخ تبدیل آن نمایش یابد.' 
                        : 'Click on different levels of the funnel to inspect conversion rates and strategies.'}
                    </p>
                  </div>

                </div>

              </div>
            )}
          </div>

        </main>

      </div>

    </div>
  );
};
