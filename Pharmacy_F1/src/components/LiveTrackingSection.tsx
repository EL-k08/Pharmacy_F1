import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Clock, 
  Store, 
  FileCheck2, 
  Boxes, 
  BellRing, 
  BadgeCheck, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Radio, 
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { PrescriptionOrder } from '../types/pharmacy';

interface LiveTrackingSectionProps {
  activeOrder: PrescriptionOrder | null;
  patientCode: string;
  onSelectOrder?: (order: PrescriptionOrder) => void;
  allOrders?: PrescriptionOrder[];
}

export const TRACKING_STEPS = [
  {
    index: 0,
    title: '۱. ثبت نسخه',
    subtitle: 'دریافت آنلاین و صدور شناسه',
    icon: FileCheck2,
    desc: 'نسخه با کد رهگیری یا عکس در سامانه ثبت و به کارتابل داروساز ارجاع داده شد.',
    tag: 'مرحله ۱: دریافت سیستم',
    estMinutes: 0.5,
  },
  {
    index: 1,
    title: '۲. بررسی دکتر داروساز',
    subtitle: 'کنترل اصالت و دوز درمانی',
    icon: ShieldCheck,
    desc: 'دکتر داروساز دوزهای دارویی، دستورات مصرف و بیمه سلامت را صحه‌گذاری نمود.',
    tag: 'مرحله ۲: تأیید بالینی',
    estMinutes: 1,
  },
  {
    index: 2,
    title: '۳. استعلام موجودی',
    subtitle: 'انبارگردانی و رزرو قطعی',
    icon: Store,
    desc: 'موجودی انبار داروخانه منتخب تفت بررسی و تمامی اقلام نسخه به صورت اختصاصی رزرو شدند.',
    tag: 'مرحله ۳: تضمین اقلام',
    estMinutes: 1.5,
  },
  {
    index: 3,
    title: '۴. چیدمان و آماده‌سازی',
    subtitle: 'بسته‌بندی در باجه اختصاصی',
    icon: Boxes,
    desc: 'اقلام دارویی در سبد اختصاصی با برچسب کد عددی بیمار چیدمان و مهر و موم شدند.',
    tag: 'مرحله ۴: تریاژ و چیدمان',
    estMinutes: 2,
  },
  {
    index: 4,
    title: '۵. فاکتور و پیامک اطلاع',
    subtitle: 'ارسال پیامک با بارکد تحویل',
    icon: BellRing,
    desc: 'پیش‌فاکتور شفاف صادر و پیامک حاوی بارکد تحویل به شماره بیمار مخابره گردید.',
    tag: 'مرحله ۵: اطلاع‌رسانی',
    estMinutes: 2.5,
  },
  {
    index: 5,
    title: '۶. تحویل باجه اکسپرس',
    subtitle: 'تحویل ۲ دقیقه‌ای بدون صف',
    icon: BadgeCheck,
    desc: 'بسته دارویی در باجه اختصاصی بدون صف آماده است؛ با اعلام کد عددی در ۲ دقیقه تحویل بگیرید.',
    tag: 'مرحله نهایی: تحویل آنی',
    estMinutes: 3,
  },
];

export const LiveTrackingSection: React.FC<LiveTrackingSectionProps> = ({
  activeOrder,
  patientCode,
}) => {
  // Current active live step (0 to 5) - truly dynamic
  const [currentStep, setCurrentStep] = useState<number>(activeOrder ? activeOrder.currentStepIndex : 2);
  const [isAutoSimulating, setIsAutoSimulating] = useState<boolean>(true);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(45);

  // Sync when active order changes
  useEffect(() => {
    if (activeOrder) {
      setCurrentStep(activeOrder.currentStepIndex);
    }
  }, [activeOrder]);

  // Elapsed timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-simulation timer: advance step every 7 seconds if auto mode is ON
  useEffect(() => {
    if (!isAutoSimulating) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < TRACKING_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoSimulating]);

  const handleNextStep = () => {
    if (currentStep < TRACKING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setElapsedSeconds(0);
  };

  const currentStepData = TRACKING_STEPS[currentStep] || TRACKING_STEPS[0];
  const progressPercent = ((currentStep + 1) / TRACKING_STEPS.length) * 100;

  // Format elapsed time MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="live-tracking" className="py-12 bg-gradient-to-b from-[#FCF9F5] to-[#fcf0f7] dark:from-[#14030d] dark:to-[#1a050f] relative text-right">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#2b091f] border border-[#e0b1cb] dark:border-[#590d22] text-[#f72585] text-xs font-black mb-3 shadow-xs">
            <Radio size={14} className="animate-pulse text-[#f72585]" />
            رهگیری زنده و هوشمند دارو
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#38040e] dark:text-white">
            داشبورد زنده پایش بدون صف
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6e5564] dark:text-[#d8b4cc] font-medium leading-relaxed">
            از لحظه ثبت کد رهگیری تا بسته‌بندی نهایی در باجه تحویل، وضعیت آماده‌سازی نسخه را به‌صورت زنده و گام‌به‌گام مشاهده کنید. هر مرحله پس از اتمام تیک سبز خورده و سیستم خودکار به مرحله بعدی منتقل می‌شود.
          </p>
        </div>

        {/* Main Tracker Card */}
        <div className="bg-white dark:bg-[#1f0714] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border-2 border-[#ecd3e5] dark:border-[#590d22] relative overflow-hidden">
          
          {/* Top Bar: Order & Patient Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#f3e5f0] dark:border-[#590d22]">
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-[#fdf0f7] dark:bg-[#2b091f] border border-[#dfc2d7] dark:border-[#590d22] px-4 py-2 rounded-2xl">
                <span className="text-xs text-[#6e5564] dark:text-[#d8b4cc] font-bold block">شماره سفارش:</span>
                <strong className="text-base font-black text-[#590d22] dark:text-[#f72585] tracking-wider font-mono">
                  {activeOrder ? activeOrder.trackingCode : 'DFT-9842'}
                </strong>
              </div>

              {/* Patient Numerical Code Display (Requirement 5 - NEVER name, only code!) */}
              <div className="bg-[#f3e5f5] dark:bg-[#38040e] border border-[#d8b4cc] dark:border-[#7209b7] px-4 py-2 rounded-2xl">
                <span className="text-xs text-[#6e5564] dark:text-[#e0b1cb] font-bold flex items-center gap-1">
                  <UserCheck size={12} className="text-[#7209b7] dark:text-[#f72585]" />
                  کد اختصاصی سلامت بیمار:
                </span>
                <strong className="text-base font-black text-[#7209b7] dark:text-[#f72585] tracking-widest font-mono">
                  #{activeOrder ? activeOrder.patientCode : patientCode}
                </strong>
              </div>
            </div>

            {/* Selected Pharmacy Indicator */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#fff0f5] to-[#f7eef7] dark:from-[#250918] dark:to-[#38040e] border border-[#e0b1cb] dark:border-[#590d22] px-4 py-2 rounded-2xl text-right">
                <span className="text-xs text-[#6e5564] dark:text-[#d8b4cc] font-bold block">داروخانه منتخب تحویل:</span>
                <span className="text-sm font-black text-[#590d22] dark:text-white flex items-center gap-1.5">
                  <Store size={14} className="text-[#f72585]" />
                  {activeOrder ? activeOrder.pharmacyName : 'داروخانه دکتر حسینی بیوکی'}
                </span>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center gap-1.5 bg-[#fcf9f5] dark:bg-[#2b091f] p-1.5 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22]">
                <button
                  onClick={() => setIsAutoSimulating(!isAutoSimulating)}
                  title={isAutoSimulating ? 'توقف موقت پایش خودکار' : 'ادامه پایش خودکار'}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isAutoSimulating 
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-200' 
                      : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200'
                  }`}
                >
                  {isAutoSimulating ? <Pause size={15} /> : <Play size={15} />}
                </button>
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  title="مرحله قبل"
                  className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#38040e] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronRight size={15} />
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={currentStep === TRACKING_STEPS.length - 1}
                  title="مرحله بعد (تیک زدن و پیشروی)"
                  className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#38040e] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  onClick={handleReset}
                  title="شروع مجدد شبیه‌سازی"
                  className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#38040e] transition-colors cursor-pointer"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>

          </div>

          {/* Stepper Progress Bar */}
          <div className="mt-8 mb-6">
            <div className="flex justify-between items-center text-xs font-bold text-[#6e5564] dark:text-[#d8b4cc] mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                وضعیت: {currentStepData.title} ({currentStepData.subtitle})
              </span>
              <span>پیشرفت فرآیند: {Math.round(progressPercent)}٪</span>
            </div>
            <div className="w-full h-3 bg-[#f3e5f0] dark:bg-[#38040e] rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-[#7209b7] via-[#b5179e] to-[#f72585] rounded-full transition-all duration-700 ease-out shadow-xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 6 Step Visual Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 my-6">
            {TRACKING_STEPS.map((step) => {
              const isCompleted = step.index < currentStep;
              const isActive = step.index === currentStep;
              const isUpcoming = step.index > currentStep;
              const IconComp = step.icon;

              return (
                <div
                  key={step.index}
                  onClick={() => setCurrentStep(step.index)}
                  className={`cursor-pointer rounded-2xl p-3.5 text-center transition-all duration-300 relative border-2 ${
                    isActive
                      ? 'bg-gradient-to-b from-[#fff0f5] to-white dark:from-[#38040e] dark:to-[#1f0714] border-[#f72585] shadow-lg shadow-[#f72585]/15 -translate-y-1'
                      : isCompleted
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                      : 'bg-[#faf4f8] dark:bg-[#250918]/60 border-stone-200/80 dark:border-[#590d22] opacity-60 hover:opacity-100'
                  }`}
                >
                  {/* Step Bubble Icon */}
                  <div className="relative mx-auto mb-2 w-11 h-11 flex items-center justify-center">
                    {isCompleted ? (
                      <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
                        <Check size={20} className="stroke-[3]" />
                      </div>
                    ) : isActive ? (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#f72585] to-[#7209b7] text-white flex items-center justify-center shadow-lg shadow-[#f72585]/40 animate-pulse">
                        <IconComp size={20} />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-stone-100 dark:bg-[#38040e] text-stone-500 dark:text-stone-300 border border-stone-300 dark:border-[#590d22] flex items-center justify-center font-bold text-xs">
                        {step.index + 1}
                      </div>
                    )}
                  </div>

                  <h6 className={`text-xs font-black leading-tight ${
                    isActive ? 'text-[#f72585]' : isCompleted ? 'text-emerald-800 dark:text-emerald-300' : 'text-[#2b091f] dark:text-[#f7eef7]'
                  }`}>
                    {step.title}
                  </h6>
                  <p className="text-[10px] text-[#6e5564] dark:text-[#d8b4cc] mt-1 font-medium line-clamp-1">
                    {isCompleted ? 'تکمیل شد ✓' : isActive ? 'در حال انجام...' : 'در انتظار'}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Step Details Panel */}
          <div className="bg-gradient-to-r from-[#fff9fc] to-[#fbf2ff] dark:from-[#250918] dark:to-[#38040e] p-5 sm:p-6 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22] mt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="space-y-1.5 text-right">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#590d22] dark:bg-[#7209b7] text-white text-xs font-bold">
                    {currentStepData.tag}
                  </span>
                  <span className="text-xs text-[#7209b7] dark:text-[#f72585] font-bold flex items-center gap-1">
                    <Clock size={13} />
                    زمان سپری‌شده: {formatTime(elapsedSeconds)}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-[#38040e] dark:text-white">
                  {currentStepData.title} - {currentStepData.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-[#6e5564] dark:text-[#d8b4cc] leading-relaxed">
                  {currentStepData.desc}
                </p>
              </div>

              {/* Action Confirmation */}
              <div className="shrink-0 flex flex-col items-center md:items-end justify-center bg-white dark:bg-[#1a050f] p-3.5 rounded-xl border border-[#dfc2d7] dark:border-[#590d22] shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black text-[#590d22] dark:text-[#f72585] mb-1">
                  <Sparkles size={15} className="text-[#f72585]" />
                  <span>باجه تحویل ویژه تفت:</span>
                </div>
                <p className="text-xs text-[#6e5564] dark:text-[#d8b4cc] font-medium text-center md:text-left">
                  {currentStep === 5 ? (
                    <strong className="text-emerald-700 dark:text-emerald-400 font-black">
                      هم‌اکنون بسته شما در باجه حاضر است! با اعلام کد #{activeOrder ? activeOrder.patientCode : patientCode} تحویل بگیرید.
                    </strong>
                  ) : (
                    <span>
                      تحویل بدون ایستادن در صف؛ زمان تخمینی باقی‌مانده: <strong className="text-[#f72585]">{(5 - currentStep) * 30} ثانیه</strong>
                    </span>
                  )}
                </p>
              </div>

            </div>
          </div>

          {/* Bottom helper tip */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#6e5564] dark:text-[#d8b4cc] pt-3 border-t border-[#f3e5f0] dark:border-[#590d22]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              تیک‌های سبز رنگ نشان‌دهنده مراحل تأییدشده هستند.
            </span>
            <span className="font-bold text-[#7209b7] dark:text-[#f72585]">
              سرویس اختصاصی داروخانه‌های شهر تفت (خیابان ساحلی، بلوار شهید بهشتی و بلوار کوثر)
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
