import React, { useState } from 'react';
import { 
  Users, 
  Cpu, 
  Store, 
  ShieldCheck, 
  ArrowDown, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Lock, 
  Activity,
  Workflow,
  Server,
  Zap,
  Split,
  Eye,
  ScanLine
} from 'lucide-react';

interface TierData {
  id: string;
  level: string;
  title: string;
  subtitle: string;
  icon: any;
  iconColor: string;
  badgeBg: string;
  borderClass: string;
  bgLight: string;
  bgDark: string;
  boundaryLine: {
    name: string;
    description: string;
    role: string;
  };
  responsibilities: {
    title: string;
    desc: string;
    kpi: string;
  }[];
  taftAdvantage: string;
}

const TIERS: TierData[] = [
  {
    id: 'patient_layer',
    level: 'سطح ۱',
    title: 'لایه تعاملات خط مقدم بیمار (Patient Frontstage Touchpoints)',
    subtitle: 'نقاط تماس دیجیتال و فیزیکی بیمار بدون ایجاد اصطکاک و صف',
    icon: Users,
    iconColor: '#f72585',
    badgeBg: 'bg-[#f72585]',
    borderClass: 'border-[#f72585]',
    bgLight: 'bg-[#fff5f9]',
    bgDark: 'dark:bg-[#2b091f]/60',
    boundaryLine: {
      name: 'خط تعامل (Line of Interaction)',
      description: 'مرز مستقیم بین تجربه بیمار و واسطه هوشمند؛ تفکیک ارتباط دیجیتال از حضور فیزیکی در داروخانه',
      role: 'حذف کامل نیاز به ایستادن در صف و استعلام تلفنی حضوری',
    },
    responsibilities: [
      {
        title: 'ثبت و بارگذاری نسخه (PWA)',
        desc: 'ثبت کد رهگیری نسخه الکترونیک یا تصویر نسخه کاغذی توسط بیمار یا همراه از منزل یا مطب',
        kpi: 'زمان ثبت کمتر از ۹۰ ثانیه',
      },
      {
        title: 'داشبورد زنده پایش نوبت بدون صف',
        desc: 'رهگیری گام‌به‌گام و ۶ مرحله‌ای آماده‌سازی نسخه با تایمر زنده و هشدارهای پیامکی',
        kpi: 'دقت وضعیت‌دهی ۱۰۰٪ لحظه‌ای',
      },
      {
        title: 'شناسه سلامت اختصاصی عددی',
        desc: 'حفظ حریم خصوصی کامل بیمار با کد عددی (عدم فراخوانی نام بیمار یا نام دارو در داروخانه)',
        kpi: 'محرمانگی کامل اطلاعات سلامت',
      },
      {
        title: 'باجه تحویل اکسپرس ۲ دقیقه‌ای',
        desc: 'مراجعه مستقیم به باجه شماره ۲ داروخانه تفت و تحویل بسته مهروموم‌شده صرفاً با اعلام کد',
        kpi: 'تحویل در کمتر از ۲ دقیقه',
      },
    ],
    taftAdvantage: 'رفع کامل معطلی ۴۵ دقیقه‌ای عصرها در خیابان ساحلی و بلوار بهشتی تفت.',
  },
  {
    id: 'platform_layer',
    level: 'سطح ۲',
    title: 'لایه پلتفرم و اتوماسیون هوشمند (NoskheYar Intermediary Engine)',
    subtitle: 'موتور پردازش، راستی‌آزمایی برخط، هوش مصنوعی و توازن تقاضا',
    icon: Cpu,
    iconColor: '#7209b7',
    badgeBg: 'bg-[#7209b7]',
    borderClass: 'border-[#7209b7]',
    bgLight: 'bg-[#faf0ff]',
    bgDark: 'dark:bg-[#1f0a2e]/60',
    boundaryLine: {
      name: 'خط شفافیت و نظارت (Line of Visibility)',
      description: 'مرز میان اطلاعات قابل رویت برای بیمار (پیش‌فاکتور، وضعیت) و فرآیندهای فنی داخلی پلتفرم',
      role: 'ایجاد شفافیت ۱۰۰٪ در قیمت و اقلام پیش از خروج بیمار از خانه',
    },
    responsibilities: [
      {
        title: 'موتور هوش مصنوعی OCR پزشکی',
        desc: 'استخراج هوشمند اقلام دارویی از تصویر نسخه، تشخیص دوز و تبدیل فوری به داده ساخت‌یافته',
        kpi: 'دقت بازخوانی دست‌خط بالای ۹۶٪',
      },
      {
        title: 'تریاژ و توازن هوشمند بار کاری',
        desc: 'ارسال نسخه به داروخانه منتخب کاربر و مدیریت توازن صف میان ۴ داروخانه فعال تفت',
        kpi: 'جلوگیری از انباشت بیش از حد نسخه',
      },
      {
        title: 'سرویس مالی اقساط (BNPL سلامت)',
        desc: 'محاسبه سهم بیمه و تسهیلات اقساطی ۲ تا ۱۲ ماهه بدون ضامن جهت رفاه بیماران مزمن تفت',
        kpi: 'صدور مصوبه اقساط در کمتر از ۳ دقیقه',
      },
      {
        title: 'سامانه اطلاع‌رسانی پیامکی خودکار',
        desc: 'ارسال خودکار پیامک حاوی بارکد تحویل، مبلغ نهایی و نام داروخانه به تلفن همراه بیمار',
        kpi: 'نرخ تحویل پیامک ۹۹.۸٪',
      },
    ],
    taftAdvantage: 'ایجاد زیرساخت پردازشی ابری بدون نیاز به هزینه سرور برای داروخانه‌های بومی تفت.',
  },
  {
    id: 'pharmacy_layer',
    level: 'سطح ۳',
    title: 'لایه عملیات داروخانه‌های شبکه تفت (Taft Pharmacies Backstage)',
    subtitle: 'تریاژ تخصصی داروساز، کنترل تداخلات، انبارگردانی و چیدمان محرمانه',
    icon: Store,
    iconColor: '#590d22',
    badgeBg: 'bg-[#590d22]',
    borderClass: 'border-[#590d22]',
    bgLight: 'bg-[#fff0f4]',
    bgDark: 'dark:bg-[#250918]/60',
    boundaryLine: {
      name: 'خط تعاملات داخلی داروخانه (Line of Internal Interaction)',
      description: 'مرز میان تریاژ بالینی دکتر داروساز و امور انبارگردانی فیزیکی قفسه‌ها',
      role: 'جداسازی نسخه‌پیچی متمرکز از استرس شلوغی باجه‌های پیشخوان',
    },
    responsibilities: [
      {
        title: 'تأیید بالینی دکتر داروساز',
        desc: 'بررسی علمی نسخه توسط داروسازان مجرب (دکتر حسینی بیوکی، محمودی، دهقانی، دوانی)',
        kpi: 'کنترل دوز و تداخلات دارویی',
      },
      {
        title: 'رزرو قطعی و کنترل انبار محلی',
        desc: 'کسر سیستمی اقلام از موجودی انبار داروخانه و آماده‌سازی فوری قبل از حضور بیمار',
        kpi: 'به صفر رساندن کسری دارویی در باجه',
      },
      {
        title: 'بسته‌بندی محرمانه با برچسب کد',
        desc: 'قرار دادن داروها در بسته‌بندی پلمپ‌شده با برچسب شناسه عددی جهت حفظ کرامت بیمار',
        kpi: 'چیدمان استاندارد و محرمانه',
      },
      {
        title: 'باجه اختصاصی تحویل نسخه‌یار',
        desc: 'استقرار پیشخوان مجزا در ورودی داروخانه برای تحویل سریع بدون نیاز به نوبت‌گیری سنتی',
        kpi: 'تحویل زیر ۲ دقیقه با پایش نهایی',
      },
    ],
    taftAdvantage: 'کاهش ۶۵ درصدی استرس پرسنل داروخانه و توزیع یکنواخت سفارشات در طول شیفت کاری.',
  },
  {
    id: 'infra_layer',
    level: 'سطح ۴',
    title: 'لایه زیرساخت، رگولاتوری و زنجیره حامیان (Support & Infrastructure)',
    subtitle: 'سازمان‌های بیمه‌گر، درگاه‌های بانکی، تیتک و صندوق نیکوکاری تفت',
    icon: Server,
    iconColor: '#2b8a3e',
    badgeBg: 'bg-[#2b8a3e]',
    borderClass: 'border-[#2b8a3e]',
    bgLight: 'bg-[#f0fbf3]',
    bgDark: 'dark:bg-[#0c2514]/60',
    boundaryLine: {
      name: 'مرز حقوقی و حاکمیتی (Line of Governance & Compliance)',
      description: 'انطباق کامل با دستورالعمل‌های سازمان غذا و دارو، قوانین نظام پزشکی و پروتکل‌های بانکی',
      role: 'تضمین اصالت داروها، پوشش بیمه‌ای رسمی و حمایت از نیازمندان',
    },
    responsibilities: [
      {
        title: 'سامانه استعلام کشوری تیتک و بیمه',
        desc: 'ارتباط امن وب‌سرویسی با سامانه‌های بیمه سلامت، تأمین اجتماعی و رهگیری اصالت دارو',
        kpi: 'آپ‌تایم ۹۹.۹٪ اتصال سیستمی',
      },
      {
        title: 'شبکه پرداخت بانکی شتاب و شاپرک',
        desc: 'تسویه مالی آنی، صدور شناسه واریز و اتصال درگاه‌های بانکی عضو شتاب',
        kpi: 'امنیت ۱۰۰٪ تراکنش‌های مالی',
      },
      {
        title: 'صندوق مهربانی و نیکوکاری دارویی تفت',
        desc: 'تخصیص کمک‌های خیرین و پوشش فرانشیز بیماران کم‌بضاعت و سالمندان بی‌بضاعت منطقه',
        kpi: 'پوشش فرانشیز ۱۰۰ درصدی نیازمندان',
      },
      {
        title: 'زیرساخت ابری بومی یزد/تفت',
        desc: 'سرورهای میزبانی اختصاصی با تأخیر شبکه زیر ۱۰ میلی‌ثانیه برای تمام شعب شهرستان تفت',
        kpi: 'سرعت پاسخ کمتر از ۳۰۰ میلی‌ثانیه',
      },
    ],
    taftAdvantage: 'بومی‌سازی کامل داده‌ها در استان یزد و استقلال کامل از اختلالات اینترنت بین‌الملل.',
  },
];

export const ProcessBoundaries: React.FC = () => {
  const [activeTierId, setActiveTierId] = useState<string>('patient_layer');
  const activeTier = TIERS.find(t => t.id === activeTierId) || TIERS[0];

  return (
    <div className="bg-white dark:bg-[#1f0714] rounded-[32px] border-2 border-[#ecd3e5] dark:border-[#590d22] p-6 sm:p-8 lg:p-10 shadow-sm text-right space-y-8 animate-fade-in">
      
      {/* Title & Introduction */}
      <div className="border-b border-[#f3e5f0] dark:border-[#590d22] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f72585] animate-ping" />
            <span className="text-xs font-bold text-[#f72585]">
              معماری سرویس و مرزبندی ۴ لایه عملیاتی (Service Blueprint & Process Boundaries)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#38040e] dark:text-white">
            مرزبندی دقیق فرایندها و خطوط تعاملی پلتفرم داروتفت
          </h3>
          <p className="text-xs sm:text-sm text-[#6e5564] dark:text-[#d8b4cc] font-medium leading-relaxed max-w-3xl">
            تفکیک وظایف، مرزهای حریم خصوصی و زنجیره ارزش از لحظه ثبت نسخه در مطب یا منزل تا تحویل اکسپرس در باجه، بر اساس استاندارد Service Blueprint و نیازهای بومی شهرستان تفت.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 bg-[#fdf0f7] dark:bg-[#38040e] px-4 py-2.5 rounded-2xl border border-[#ecd3e5] dark:border-[#7209b7]">
          <Workflow size={18} className="text-[#f72585]" />
          <span className="text-xs font-black text-[#590d22] dark:text-[#f72585]">
            مدل ۴ سطحی تفت
          </span>
        </div>
      </div>

      {/* 4 Interactive Tier Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TIERS.map((tier) => {
          const isSelected = activeTierId === tier.id;
          const TierIcon = tier.icon;

          return (
            <button
              key={tier.id}
              onClick={() => setActiveTierId(tier.id)}
              className={`p-4 rounded-2xl text-right transition-all border-2 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-tr from-[#590d22] to-[#7209b7] text-white border-transparent shadow-lg shadow-[#7209b7]/25 scale-[1.02]'
                  : 'bg-[#faf4f8] dark:bg-[#2b091f]/60 text-[#2b091f] dark:text-[#d8b4cc] border-[#ecd3e5] dark:border-[#590d22] hover:bg-white dark:hover:bg-[#38040e]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#f3e5f0] dark:bg-[#38040e] text-[#7209b7] dark:text-[#f72585]'
                }`}>
                  {tier.level}
                </span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-white text-[#7209b7]' : 'bg-white dark:bg-[#1f0714] text-inherit shadow-2xs'
                }`}>
                  <TierIcon size={16} />
                </div>
              </div>

              <div>
                <h5 className="text-xs font-black leading-snug line-clamp-2">
                  {tier.title.split('(')[0]}
                </h5>
                <span className="text-[10px] opacity-75 block mt-1">
                  کلیک جهت مشاهده مرزبندی و شرح وظایف
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Tier Detailed Display */}
      <div className={`${activeTier.bgLight} ${activeTier.bgDark} p-6 sm:p-8 rounded-3xl border-2 ${activeTier.borderClass} space-y-6 transition-all`}>
        
        {/* Tier Header with Boundary Line Indicator */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#ebd4e5] dark:border-[#590d22]">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl ${activeTier.badgeBg} text-white flex items-center justify-center shadow-lg`}>
              <activeTier.icon size={24} />
            </div>
            <div>
              <span className="text-[11px] font-black text-[#f72585] block">{activeTier.level}</span>
              <h4 className="text-base sm:text-lg font-black text-[#38040e] dark:text-white">
                {activeTier.title}
              </h4>
            </div>
          </div>

          {/* Boundary Line Badge */}
          <div className="bg-white dark:bg-[#1f0714] px-4 py-2.5 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22] flex items-center gap-2 self-start lg:self-center shadow-xs">
            <Split size={16} className="text-[#f72585]" />
            <div className="text-right">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold block">خط مرز سرویس:</span>
              <strong className="text-xs font-black text-[#590d22] dark:text-[#f72585]">
                {activeTier.boundaryLine.name}
              </strong>
            </div>
          </div>
        </div>

        {/* Boundary Line Description Card */}
        <div className="bg-white/80 dark:bg-[#1f0714]/80 p-4 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs leading-relaxed">
          <div className="space-y-0.5">
            <span className="font-bold text-[#590d22] dark:text-[#f72585] block">
              تعریف مرز عملیاتی در تفت:
            </span>
            <p className="text-[#6e5564] dark:text-[#d8b4cc]">
              {activeTier.boundaryLine.description}
            </p>
          </div>
          <span className="shrink-0 font-bold px-3 py-1 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300">
            {activeTier.boundaryLine.role}
          </span>
        </div>

        {/* Responsibilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeTier.responsibilities.map((resp, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-[#1f0714] p-4 sm:p-5 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22] shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#fdf0f7] dark:bg-[#38040e] text-[#7209b7] dark:text-[#f72585] flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </span>
                  <h6 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white">
                    {resp.title}
                  </h6>
                </div>
                <p className="text-xs text-[#6e5564] dark:text-[#d8b4cc] leading-relaxed">
                  {resp.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between text-[11px]">
                <span className="text-stone-400 font-bold">شاخص کلیدی (KPI):</span>
                <span className="font-black text-[#f72585]">{resp.kpi}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Taft Strategic Advantage */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border-r-4 border-emerald-600 dark:border-emerald-500 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span><strong>دست‌آورد اختصاصی برای شهروندان تفت: </strong> {activeTier.taftAdvantage}</span>
          </div>
          <span className="hidden sm:inline-block shrink-0 px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
            تأییدشده
          </span>
        </div>

      </div>

      {/* Comparison Flow: Traditional Pharmacy vs. NoskheYar Bounded Architecture */}
      <div className="bg-[#faf3f9] dark:bg-[#250918]/60 p-6 sm:p-8 rounded-3xl border border-[#ecd3e5] dark:border-[#590d22] space-y-4">
        <h4 className="text-sm sm:text-base font-black text-[#38040e] dark:text-white flex items-center gap-2">
          <Activity size={18} className="text-[#f72585]" />
          <span>مقایسه جریان عملیات: روال سنتی پرمعطلی در برابر معماری مرزبندی‌شده نسخه‌یار</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Traditional flow */}
          <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 space-y-2">
            <span className="font-black text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <i className="fa-solid fa-circle-xmark text-rose-600"></i>
              روال سنتی و ناکارآمد فعلی (بدون مرزبندی):
            </span>
            <p className="text-rose-900/80 dark:text-rose-200 leading-relaxed font-medium">
              ۱. خروج از خانه بدون اطلاع از موجودی ⬅ ۲. ورود به صف طولانی عصرها (۴۵ دقیقه انتظار) ⬅ ۳. ارائه فیزیکی نسخه ⬅ ۴. اعلام احتمالی کسری دارو پای باجه ⬅ ۵. پرداخت نقدی سنگین ناگهانی.
            </p>
          </div>

          {/* NoskheYar flow */}
          <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 space-y-2">
            <span className="font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <i className="fa-solid fa-circle-check text-emerald-600"></i>
              روال هوشمند با معماری نسخه‌یار تفت:
            </span>
            <p className="text-emerald-900/80 dark:text-emerald-200 leading-relaxed font-medium">
              ۱. ثبت نسخه از مطب/منزل ⬅ ۲. استعلام برخط انبار تفت و تریاژ داروساز ⬅ ۳. صدور پیش‌فاکتور شفاف و امکان تقسیط ⬅ ۴. چیدمان در باجه ۲ ⬅ ۵. تحویل بدون صف در ۲ دقیقه با کد رهگیری.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
