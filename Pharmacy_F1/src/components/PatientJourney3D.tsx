import React, { useState } from 'react';
import { 
  Stethoscope, 
  Send, 
  SearchCheck, 
  Boxes, 
  Receipt, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Clock,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const JOURNEY_STEPS = [
  {
    step: 1,
    title: 'گام اول: ویزیت پزشک و دریافت کد رهگیری',
    shortTitle: '۱. ویزیت و کد رهگیری',
    icon: Stethoscope,
    badge: 'شروع سفر سلامت',
    time: 'در مطب یا درمانگاه تفت',
    desc: 'بیمار پس از ویزیت توسط پزشک معالج در مطب یا درمانگاه‌های تفت، پیامک حاوی کد رهگیری الکترونیک (بیمه سلامت یا تأمین اجتماعی) را دریافت می‌کند یا عکس نسخه کاغذی را مهیا می‌سازد.',
    perk: 'عدم نیاز به برگه کاغذی نسخه',
    kpi: '۱۰۰٪ دیجیتال و مستند',
    heroImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    characterLabel: 'دکتر داروساز و متخصص داخلی',
    accentTag: 'مطب دکتر در تفت',
  },
  {
    step: 2,
    title: 'گام دوم: ثبت آنلاین و انتخاب داروخانه محلی تفت',
    shortTitle: '۲. ثبت و انتخاب داروخانه',
    icon: Send,
    badge: 'انتخاب آگاهانه',
    time: 'زیر ۶۰ ثانیه از هر نقطه تفت',
    desc: 'بیمار بدون خروج از منزل یا بلافاصله پس از ترک مطب، وارد سامانه داروتفت شده و داروخانه معتمد محلی (دکتر محمودی، دکتر حسینی بیوکی، دکتر دوانی یا دکتر دهقانی) را متناسب با موقعیت مکانی خود برمی‌گزیند.',
    perk: 'پوشش تمام مناطق تفت و حومه',
    kpi: 'دسترسی فوری بدون نصب اپ',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    characterLabel: 'ثبت دیجیتال نسخه با گوشی',
    accentTag: 'خیابان ساحلی و بلوار بهشتی',
  },
  {
    step: 3,
    title: 'گام سوم: استعلام آنلاین، کنترل تداخل و رزرو موجودی',
    shortTitle: '۳. استعلام برخط و رزرو',
    icon: SearchCheck,
    badge: 'تضمین صددرصدی',
    time: 'ظرف کمتر از ۱ دقیقه',
    desc: 'سامانه داروتفت با انبار مکانیزه داروخانه منتخب ارتباط هوشمند برقرار کرده و تمامی اقلام نسخه را از نظر دوز، تداخلات دارویی و موجودی قطعی بررسی و به صورت اختصاصی برای بیمار رزرو می‌نماید.',
    perk: 'پایان سرگردانی در داروخانه‌ها',
    kpi: 'تضمین قطعی موجودی دارو',
    heroImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
    characterLabel: 'انبار مکانیزه و رزرو سیستمی',
    accentTag: 'عدم کسری دارو در تفت',
  },
  {
    step: 4,
    title: 'گام چهارم: چیدمان فیزیکی و بسته‌بندی در تریاژ داروخانه',
    shortTitle: '۴. چیدمان در باجه تریاژ',
    icon: Boxes,
    badge: 'آماده‌سازی محرمانه',
    time: 'پیش از حضور بیمار',
    desc: 'پرسنل مجرب داروخانه اقلام را از قفسه‌ها چیدمان کرده و در کیسه بهداشتی و پلمپ‌شده با برچسب کد عددی اختصاصی بیمار (بدون درج نام جهت حفظ محرمانگی) در باجه ویژه داروتفت قرار می‌دهند.',
    perk: 'حفظ ۱۰۰٪ حریم خصوصی بیمار',
    kpi: 'برچسب‌گذاری با کد عددی',
    heroImage: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=600&q=80',
    characterLabel: 'تیم تریاژ و بسته‌بندی محرمانه',
    accentTag: 'باجه اختصاصی شماره ۱',
  },
  {
    step: 5,
    title: 'گام پنجم: ارسال پیش‌فاکتور شفاف و انتخاب شیوه تسویه',
    shortTitle: '۵. فاکتور شفاف و اقساط',
    icon: Receipt,
    badge: 'انعطاف‌پذیری مالی',
    time: 'اطلاع‌رسانی لحظه‌ای پیامکی',
    desc: 'پیش‌فاکتور شفاف با تفکیک دقیق سهم سازمان‌های بیمه‌گر و سهم پرداختی بیمار صادر شده و پیامک به همراه بارکد ارسال می‌شود. بیمار می‌تواند وجه را نقداً پرداخت کرده یا از تسهیلات اقساطی سلامت (۲ تا ۱۲ ماه بدون ضامن) بهره‌مند شود.',
    perk: 'طرح اقساط سلامت ۲ تا ۱۲ ماهه',
    kpi: 'شفافیت ریالی قبل از حرکت',
    heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    characterLabel: 'فاکتور شفاف و وام قرض‌الحسنه',
    accentTag: 'طرح رفاه سلامت تفت',
  },
  {
    step: 6,
    title: 'گام ششم: تحویل اکسپرس ۲ دقیقه‌ای در باجه اختصاصی بدون صف',
    shortTitle: '۶. تحویل فوری در باجه',
    icon: Zap,
    badge: 'مقصد نهایی و رهایی از صف',
    time: 'کمتر از ۲ دقیقه در داروخانه',
    desc: 'بیمار در زمان تعیین‌شده به باجه اکسپرس داروتفت در داروخانه منتخب مراجعه نموده و صرفاً با ارائه کد عددی اختصاصی، بسته آماده خود را بدون ایستادن در صف‌های طولانی و بدون کوچک‌ترین معطلی تحویل می‌گیرد.',
    perk: 'کاهش زمان انتظار از ۴۵ به ۲ دقیقه',
    kpi: '۰ دقیقه معطلی در صف',
    heroImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    characterLabel: 'بیمار در حال دریافت ۲ دقیقه‌ای',
    accentTag: 'باجه اکسپرس بدون صف',
  },
];

interface PatientJourney3DProps {
  lang?: 'fa' | 'en';
}

export const PatientJourney3D: React.FC<PatientJourney3DProps> = ({ lang = 'fa' }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = JOURNEY_STEPS[activeStepIndex];

  return (
    <section className="py-16 bg-gradient-to-b from-[#fff8fc] to-[#FCF9F5] dark:from-[#1f0714] dark:to-[#14030d] relative overflow-hidden text-right">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 right-5 w-72 h-72 bg-[#f72585]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#7209b7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#2b091f] border border-[#e0b1cb] dark:border-[#590d22] text-[#f72585] text-xs font-black mb-3 shadow-xs">
            <Sparkles size={14} className="text-[#f72585]" />
            {lang === 'fa' ? 'تجربه متمایز درمان الکترونیک تفت' : 'Distinctive Taft E-Health Experience'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#38040e] dark:text-white">
            {lang === 'fa' ? 'سفر ۶ گام بیمار؛ از خانه تا باجه تحویل ۲ دقیقه‌ای' : '6-Step Patient Journey: Home to 2-Min Pickup'}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#6e5564] dark:text-[#d8b4cc] font-medium leading-relaxed">
            {lang === 'fa' 
              ? 'فرآیند بازطراحی شده دریافت دارو در شهرستان تفت؛ چگونه با حذف واسطه‌ها و اتصال هوشمند به داروخانه‌های بومی، ۴۵ دقیقه معطلی کلافه‌کننده صف به صفر می‌رسد.'
              : 'Redesigned medicine pickup in Taft county; direct connection to local pharmacies turns 45-minute lines into 2-minute express pickup.'}
          </p>
        </div>

        {/* 6 Steps Horizontal Selector Bar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {JOURNEY_STEPS.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            const Icon = step.icon;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex-1 min-w-[130px] sm:min-w-[160px] py-3.5 px-3 rounded-2xl border-2 transition-all duration-300 text-center flex flex-col items-center gap-1.5 relative ${
                  isSelected
                    ? 'bg-white dark:bg-[#250918] border-[#f72585] shadow-xl shadow-[#f72585]/20 -translate-y-1'
                    : 'bg-white/70 dark:bg-[#1a050f]/80 border-[#ecd3e5] dark:border-[#590d22] text-[#2b091f] dark:text-[#d8b4cc] hover:bg-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                  isSelected 
                    ? 'bg-gradient-to-r from-[#590d22] to-[#f72585] text-white shadow-md' 
                    : 'bg-[#faf4f8] dark:bg-[#38040e] text-[#7209b7] dark:text-[#f72585]'
                }`}>
                  <Icon size={16} />
                </div>
                <span className={`text-xs font-black truncate w-full ${isSelected ? 'text-[#590d22] dark:text-[#f72585]' : 'text-[#6e5564] dark:text-[#d8b4cc]'}`}>
                  {step.shortTitle}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#f72585] absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
                )}
              </button>
            );
          })}
        </div>

        {/* 3D Visual Stage Showcase */}
        <div className="bg-white dark:bg-[#1f0714] rounded-[36px] p-6 sm:p-8 lg:p-10 shadow-2xl border-2 border-[#ecd3e5] dark:border-[#590d22] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Right: Step Details (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full bg-[#fdf0f7] dark:bg-[#38040e] text-[#f72585] font-black text-xs border border-[#ecd3e5] dark:border-[#7209b7]">
                  {activeStep.badge}
                </span>
                <span className="text-xs font-bold text-[#7209b7] dark:text-[#e0b1cb] flex items-center gap-1">
                  <Clock size={13} />
                  {activeStep.time}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#38040e] dark:text-white leading-snug">
                {activeStep.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#6e5564] dark:text-[#d8b4cc] leading-relaxed font-medium">
                {activeStep.desc}
              </p>

              {/* 2 Key Value Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#fcf9f5] dark:bg-[#2b091f]/50 border border-[#ecd3e5] dark:border-[#590d22] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold block">مزیت کلیدی:</span>
                    <strong className="text-xs font-black text-[#590d22] dark:text-white">{activeStep.perk}</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#fcf9f5] dark:bg-[#2b091f]/50 border border-[#ecd3e5] dark:border-[#590d22] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#f5effb] dark:bg-[#38040e] text-[#7209b7] dark:text-[#f72585] flex items-center justify-center shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold block">شاخص عملکردی:</span>
                    <strong className="text-xs font-black text-[#7209b7] dark:text-[#f72585]">{activeStep.kpi}</strong>
                  </div>
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#f3e5f0] dark:border-[#590d22]">
                <button
                  onClick={() => setActiveStepIndex((prev) => Math.min(JOURNEY_STEPS.length - 1, prev + 1))}
                  disabled={activeStepIndex === JOURNEY_STEPS.length - 1}
                  className="py-2.5 px-5 rounded-full bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white font-bold text-xs shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 hover:opacity-95 transition-opacity"
                >
                  <span>گام بعدی</span>
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeStepIndex === 0}
                  className="py-2.5 px-4 rounded-full bg-stone-100 dark:bg-[#2b091f] text-stone-700 dark:text-white font-bold text-xs hover:bg-stone-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight size={16} />
                  <span>گام قبل</span>
                </button>

                <span className="text-xs text-stone-400 mr-auto font-bold">
                  گام {activeStepIndex + 1} از ۶
                </span>
              </div>

            </div>

            {/* Left: 3D Isometric Character & Scene Showcase (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="relative group perspective-[1000px]">
                
                {/* 3D Container with Tilt & Shadows */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/40 dark:border-[#590d22] bg-gradient-to-tr from-[#38040e] via-[#590d22] to-[#7209b7] transform transition-transform duration-700 hover:rotate-y-6 hover:rotate-x-2">
                  
                  {/* High Quality Scene Photography / Illustration */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={activeStep.heroImage}
                      alt={activeStep.characterLabel}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#220108] via-[#38040e]/40 to-transparent" />
                  </div>

                  {/* Floating 3D Info Overlay */}
                  <div className="p-5 text-white space-y-2 relative">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-3 py-0.5 rounded-full bg-[#f72585] font-black text-[10px] shadow-sm">
                        {activeStep.accentTag}
                      </span>
                      <span className="text-[#ecd3e5] font-bold text-[11px]">
                        مرحله {activeStep.step} از ۶
                      </span>
                    </div>

                    <h4 className="text-base font-black text-white">
                      {activeStep.characterLabel}
                    </h4>

                    <div className="bg-white/15 backdrop-blur-md p-2.5 rounded-xl border border-white/20 text-xs font-bold text-white flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 size={13} />
                        تأییدیه سیستم سلامت تفت
                      </span>
                      <span className="text-[#e0b1cb]">بدون معطلی حضوری</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
