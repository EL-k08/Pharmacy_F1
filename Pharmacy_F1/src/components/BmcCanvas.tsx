import React, { useState } from 'react';
import { 
  Handshake, 
  Cog, 
  Database, 
  Gem, 
  Heart, 
  Share2, 
  Users, 
  Receipt, 
  Coins, 
  LayoutGrid, 
  UserCheck, 
  Store, 
  CheckCircle2, 
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';

type LensType = 'all' | 'patient' | 'pharmacy' | 'finance';

interface BmcBlockDetail {
  id: string;
  title: string;
  category: string;
  icon: any;
  iconBg: string;
  bulletItems: string[];
  extraItemsCount?: number;
  metric: string;
  isCenterHighlight?: boolean;
  strategicAnalysis: string;
  taftEcosystemRole: string;
}

export const BMC_BLOCKS: BmcBlockDetail[] = [
  {
    id: 'partners',
    title: 'شرکای کلیدی',
    category: 'شبکه همکاران',
    icon: Handshake,
    iconBg: 'bg-[#7209b7]',
    bulletItems: [
      'داروخانه‌های شهرستان تفت و استان یزد',
      'درگاه‌های پرداخت الکترونیک و سرویس‌های اعتباری (BNPL)',
      'مراکز خیریه سلامت و حامیان نیکوکار',
    ],
    extraItemsCount: 1,
    metric: '۳ داروخانه همکار در فاز نخست',
    strategicAnalysis: 'اتصال رسمی داروخانه‌های دکتر محمودی، دکتر حسینی بیوکی، دکتر دوانی و دکتر دهقانی به همراه سرویس اعتباری سلامت جهت پوشش کامل شهرستان تفت.',
    taftEcosystemRole: 'تضمین پایداری زنجیره تأمین دارو و رفع انحصار پلتفرم‌های تهرانی.',
  },
  {
    id: 'activities',
    title: 'فعالیت‌های کلیدی',
    category: 'عملیات پلتفرم',
    icon: Cog,
    iconBg: 'bg-[#7209b7]',
    bulletItems: [
      'دریافت و پردازش تصویر و کد نسخه الکترونیک',
      'استعلام زنده موجودی و قیمت‌گذاری داروخانه',
      'اطلاع‌رسانی وضعیت آماده‌سازی پیامکی',
    ],
    extraItemsCount: 1,
    metric: 'پردازش میانگین ۳ دقیقه‌ای هر...',
    strategicAnalysis: 'راستی‌آزمایی برخط نسخه‌های بیمه سلامت و تأمین اجتماعی، انبارگردانی خودکار و مدیریت باجه تحویل سریع.',
    taftEcosystemRole: 'صفر کردن صف و خطا در نسخه‌خوانی.',
  },
  {
    id: 'resources',
    title: 'منابع کلیدی',
    category: 'زیرساخت و دارایی‌ها',
    icon: Database,
    iconBg: 'bg-[#7209b7]',
    bulletItems: [
      'زیرساخت ابری امن و وب‌اپلیکیشن کاربردی واکنش‌گرا',
      'پایگاه داده دارویی و کدگذاری نسخ الکترونیک',
      'شبکه داروخانه‌داران همکار در تفت',
    ],
    extraItemsCount: 1,
    metric: 'آپ‌تایم ۹۹.۹٪ سرورها',
    strategicAnalysis: 'سرورهای متمرکز استعلام کشوری، پایگاه دانش ژنریک و تداخل دارویی، و متصدیان آموزش‌دیده در شعب تفت.',
    taftEcosystemRole: 'زیرساخت بومی پایدار بدون وابستگی به اپلیکیشن‌های مسدودکننده خارجی.',
  },
  {
    id: 'value',
    title: 'ارزش‌های پیشنهادی',
    category: 'ارزش هسته',
    icon: Gem,
    iconBg: 'bg-[#f72585]',
    isCenterHighlight: true,
    bulletItems: [
      'حذف کامل صف: تحویل آنی دارو با ارائه کد تحویل ویژه در تفت',
      'شفافیت مالی: استعلام اقلام و هزینه دقیق پیش از مراجعه',
      'خرید اقساطی: کاهش فشار مالی داروهای گران‌قیمت و بیماری‌های مزمن',
      'مسئولیت اجتماعی: امکان مشارکت آسان در هزینه داروی نیازمندان',
    ],
    metric: 'صرفه‌جویی بیش از ۴۰ دقیقه د...',
    strategicAnalysis: 'بزرگ‌ترین ارزش‌آفرینی داروتفت، رفع کامل ۴۵ دقیقه معطلی کلافه‌کننده صف در عصر و شب‌های تفت و ایجاد امنیت روانی برای بیمار قبل از خروج از منزل است.',
    taftEcosystemRole: 'تبدیل تفت به اولین شهر پایلوت دریافت داروی بدون صف در استان یزد.',
  },
  {
    id: 'relationships',
    title: 'ارتباط با مشتریان',
    category: 'تعامل و وفاداری',
    icon: Heart,
    iconBg: 'bg-[#38040e]',
    bulletItems: [
      'پنل کاربری پیگیری لحظه‌ای سفارش با کد اختصاصی',
      'پشتیبانی آنلاین و پاسخگویی تلفنی بومی',
      'ارسال خودکار پیامک در لحظه بسته‌بندی دارو',
    ],
    extraItemsCount: 1,
    metric: 'نرخ رضایت ۹۴٪ بیماران',
    strategicAnalysis: 'ارتباط دوسویه مبتنی بر احترام به وقت بیمار، حفظ محرمانگی نام بیمار با کد عددی اختصاصی، و یادآوری دوره‌ای تمدید نسخ بیماران مزمن.',
    taftEcosystemRole: 'کسب اعتماد کامل جامعه بومی و سالمندان تفت.',
  },
  {
    id: 'channels',
    title: 'کانال‌های دسترسی و توزیع',
    category: 'کانال‌ها',
    icon: Share2,
    iconBg: 'bg-[#e0a96d]',
    bulletItems: [
      'وب‌اپلیکیشن موبایل نسخه‌یار (PWA بدون نیاز به نصب)',
      'استندهای QR در ورودی داروخانه‌ها و مطب‌های تفت',
      'سامانه پیامکی اطلاع‌رسانی وضعیت',
    ],
    extraItemsCount: 1,
    metric: 'دسترسی ۱۰۰٪ بدون نیاز به دانل...',
    strategicAnalysis: 'دسترسی فوری بدون نیاز به گوگل‌پلی یا بازار با تکنولوژی وب‌اپلیکیشن، استندهای فیزیکی در خیابان ساحلی و بلوار شهید بهشتی تفت.',
    taftEcosystemRole: 'پوشش ۱۰۰ درصدی تمام اقشار بدون سواد دیجیتال پیچیده.',
  },
  {
    id: 'segments',
    title: 'بخش مشتریان',
    category: 'مخاطبان هدف',
    icon: Users,
    iconBg: 'bg-[#2b091f]',
    bulletItems: [
      'بیماران و خانواده‌های ساکن تفت و حومه',
      'سالمندان و بیماران مبتلا به بیماری‌های خاص یا مزمن',
      'داروخانه‌هایی که به دنبال نظم‌دهی و کاهش ازدحام هستند',
    ],
    extraItemsCount: 1,
    metric: 'بیش از ۳۵,۰۰۰ جمعیت تحت...',
    strategicAnalysis: 'جامعه هدف شامل شهروندان شهر تفت، روستاهای تابعه (اسلامیه، نصرآباد، دهشیر)، بیماران دیابتی و قلبی، و داروخانه‌داران خواهان توزیع متوازن بار کاری.',
    taftEcosystemRole: 'عدالت در سلامت برای همه ساکنان مناطق تحت پوشش شهرستان.',
  },
  {
    id: 'costs',
    title: 'ساختار هزینه‌ها',
    category: 'هزینه‌ها',
    icon: Receipt,
    iconBg: 'bg-[#d81159]',
    bulletItems: [
      'هزینه‌های سرور ابری، هاست و پنل پیامک خدماتی تفت',
      'حقوق و پاداش تیم نظارت، داروسازان و پشتیبانی محلی',
      'نصب و نگهداری استندهای رول‌آپ و تبلیغات محیطی در تفت',
    ],
    extraItemsCount: 1,
    metric: 'هزینه سرانه بسیار پایین به ازای هر سفارش',
    strategicAnalysis: 'ساختار هزینه سبک بدون انبارداری دارویی؛ پلتفرم داروتفت از دارایی فیزیکی داروخانه‌های موجود استفاده کرده و هزینه انبارداری را به صفر رسانده است.',
    taftEcosystemRole: 'مدل اقتصادی به‌صرفه و بهینه‌سازی‌شده برای شهرهای متوسط.',
  },
  {
    id: 'revenue',
    title: 'جریان‌های درآمدی',
    category: 'درآمدها',
    icon: Coins,
    iconBg: 'bg-[#2b8a3e]',
    bulletItems: [
      'حق اشتراک ماهانه نرم‌افزاری داروخانه‌های عضو شبکه تفت',
      'کارمزد جزئی از پرونده‌های تسهیلات اقساطی سلامت (BNPL)',
      'پورسانت واسطه‌گری اجاره و تأمین تجهیزات پزشکی (تخت، اکسیژن)',
    ],
    extraItemsCount: 1,
    metric: 'جریان درآمدی پایدار و چندگانه',
    strategicAnalysis: 'درآمد پایدار از آبونمان داروخانه‌ها، کارمزد تسهیلات اعتباری بانکی، و اجاره تجهیزات پزشکی بدون تحمیل بار مالی اضافی بر بیمار.',
    taftEcosystemRole: 'خودکفایی مالی و توسعه به سایر شهرستان‌های استان یزد.',
  },
];

export const BmcCanvas: React.FC = () => {
  const [activeLens, setActiveLens] = useState<LensType>('all');
  const [selectedBlock, setSelectedBlock] = useState<BmcBlockDetail | null>(null);

  // Helper to find block by id
  const getBlock = (id: string) => BMC_BLOCKS.find((b) => b.id === id)!;

  const partners = getBlock('partners');
  const activities = getBlock('activities');
  const resources = getBlock('resources');
  const value = getBlock('value');
  const relationships = getBlock('relationships');
  const channels = getBlock('channels');
  const segments = getBlock('segments');
  const costs = getBlock('costs');
  const revenue = getBlock('revenue');

  // Lens highlight check
  const isBlockDimmed = (id: string) => {
    if (activeLens === 'all') return false;
    if (activeLens === 'patient') {
      return !['value', 'relationships', 'channels', 'segments'].includes(id);
    }
    if (activeLens === 'pharmacy') {
      return !['partners', 'activities', 'resources', 'value'].includes(id);
    }
    if (activeLens === 'finance') {
      return !['costs', 'revenue', 'value'].includes(id);
    }
    return false;
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* EXACT TOP HEADER FROM USER SCREENSHOT 1 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#ebd4e5] dark:border-[#590d22]">
        
        {/* Right side: Title & Subtitle */}
        <div className="space-y-1">
          <span className="text-[11px] font-black text-[#7209b7] dark:text-[#f72585] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7209b7]" />
            معماری بوم مدل کسب‌وکار (۹- BUSINESS MODEL CANVAS گانه استراتژیک)
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#38040e] dark:text-white">
            بوم تعاملی و چندبعدی ارزش‌آفرینی سلامت الکترونیک تفت
          </h2>
          <p className="text-xs text-[#6e5564] dark:text-[#d8b4cc]">
            برای مشاهده جزئیات عملیاتی و سناریوی تفت روی هر بلوک کلیک کنید یا لنزهای تحلیلی را تغییر دهید.
          </p>
        </div>

        {/* Left side: Focus Lenses Pills */}
        <div className="flex items-center gap-2 bg-white dark:bg-[#2b091f] p-1.5 rounded-full border border-[#dfc2d7] dark:border-[#590d22] self-start lg:self-center shadow-xs">
          <span className="text-xs font-bold text-[#6e5564] dark:text-[#e0b1cb] px-2 hidden sm:inline">
            لنز تمرکز:
          </span>

          <button
            onClick={() => setActiveLens('all')}
            className={`py-1.5 px-3.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
              activeLens === 'all'
                ? 'bg-[#590d22] text-white shadow-xs'
                : 'text-[#6e5564] dark:text-[#e0b1cb] hover:bg-[#f7eef7] dark:hover:bg-[#38040e]'
            }`}
          >
            <LayoutGrid size={13} />
            <span>نمای کامل بوم</span>
          </button>

          <button
            onClick={() => setActiveLens('patient')}
            className={`py-1.5 px-3.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
              activeLens === 'patient'
                ? 'bg-[#7209b7] text-white shadow-xs'
                : 'text-[#6e5564] dark:text-[#e0b1cb] hover:bg-[#f7eef7] dark:hover:bg-[#38040e]'
            }`}
          >
            <span>جریان ارزش بیمار</span>
          </button>

          <button
            onClick={() => setActiveLens('pharmacy')}
            className={`py-1.5 px-3.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
              activeLens === 'pharmacy'
                ? 'bg-[#7209b7] text-white shadow-xs'
                : 'text-[#6e5564] dark:text-[#e0b1cb] hover:bg-[#f7eef7] dark:hover:bg-[#38040e]'
            }`}
          >
            <Store size={13} />
            <span>شراکت داروخانه‌ها</span>
          </button>

          <button
            onClick={() => setActiveLens('finance')}
            className={`py-1.5 px-3.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
              activeLens === 'finance'
                ? 'bg-[#2b8a3e] text-white shadow-xs'
                : 'text-[#6e5564] dark:text-[#e0b1cb] hover:bg-[#f7eef7] dark:hover:bg-[#38040e]'
            }`}
          >
            <span>جریان مالی و سودآوری</span>
          </button>
        </div>

      </div>

      {/* EXACT 5-COLUMN / 9-BLOCK BMC GRID FROM USER SCREENSHOT 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 items-stretch">
        
        {/* COL 1 (Right): بخش مشتریان (Customer Segments) */}
        <div
          onClick={() => setSelectedBlock(segments)}
          className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
            isBlockDimmed('segments') ? 'opacity-30' : 'opacity-100 hover:shadow-lg'
          } bg-white dark:bg-[#1f0714] border-[#ecd3e5] dark:border-[#590d22]`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
              <h4 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white flex items-center gap-2">
                <span>{segments.title}</span>
              </h4>
              <div className="w-8 h-8 rounded-xl bg-[#2b091f] text-white flex items-center justify-center">
                <Users size={16} />
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-[#2b091f] dark:text-[#e0b1cb] leading-relaxed">
              {segments.bulletItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f72585] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <span className="text-[11px] font-bold text-[#f72585] block mt-2 hover:underline">
              +۱ مورد دیگر (کلیک برای مشاهده)...
            </span>
          </div>

          <div className="pt-3 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
            <span>شاخص:</span>
            <strong className="text-[#38040e] dark:text-white font-bold">{segments.metric}</strong>
          </div>
        </div>

        {/* COL 2: ارتباط با مشتریان (Top) + کانال‌های دسترسی (Bottom) */}
        <div className="flex flex-col gap-3.5">
          {/* Top: ارتباط با مشتریان */}
          <div
            onClick={() => setSelectedBlock(relationships)}
            className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between flex-1 ${
              isBlockDimmed('relationships') ? 'opacity-30' : 'opacity-100 hover:shadow-lg'
            } bg-white dark:bg-[#1f0714] border-[#ecd3e5] dark:border-[#590d22]`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
                <h4 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white">
                  {relationships.title}
                </h4>
                <div className="w-8 h-8 rounded-xl bg-[#38040e] text-white flex items-center justify-center">
                  <Heart size={16} />
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#2b091f] dark:text-[#e0b1cb] leading-relaxed">
                {relationships.bulletItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f72585] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <span className="text-[11px] font-bold text-[#f72585] block mt-2 hover:underline">
                +۱ مورد دیگر (کلیک برای مشاهده)...
              </span>
            </div>

            <div className="pt-3 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
              <span>شاخص:</span>
              <strong className="text-[#7209b7] dark:text-[#f72585] font-bold">{relationships.metric}</strong>
            </div>
          </div>

          {/* Bottom: کانال‌های دسترسی و توزیع */}
          <div
            onClick={() => setSelectedBlock(channels)}
            className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between flex-1 ${
              isBlockDimmed('channels') ? 'opacity-30' : 'opacity-100 hover:shadow-lg'
            } bg-white dark:bg-[#1f0714] border-[#ecd3e5] dark:border-[#590d22]`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
                <h4 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white">
                  {channels.title}
                </h4>
                <div className="w-8 h-8 rounded-xl bg-[#e0a96d] text-white flex items-center justify-center">
                  <Share2 size={16} />
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#2b091f] dark:text-[#e0b1cb] leading-relaxed">
                {channels.bulletItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f72585] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <span className="text-[11px] font-bold text-[#f72585] block mt-2 hover:underline">
                +۱ مورد دیگر (کلیک برای مشاهده)...
              </span>
            </div>

            <div className="pt-3 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
              <span>شاخص:</span>
              <strong className="text-[#38040e] dark:text-white font-bold">{channels.metric}</strong>
            </div>
          </div>
        </div>

        {/* COL 3 (Center, Highlighted): ارزش‌های پیشنهادی (Value Propositions) */}
        <div
          onClick={() => setSelectedBlock(value)}
          className={`cursor-pointer rounded-3xl p-5 border-3 transition-all flex flex-col justify-between ${
            isBlockDimmed('value') ? 'opacity-30' : 'opacity-100 shadow-xl'
          } bg-white dark:bg-[#1f0714] border-[#f72585] ring-4 ring-[#f72585]/10`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
              <h4 className="text-xs sm:text-sm font-black text-[#590d22] dark:text-[#f72585] flex items-center gap-2">
                <span>{value.title}</span>
              </h4>
              <div className="w-8 h-8 rounded-xl bg-[#f72585] text-white flex items-center justify-center shadow-md">
                <Gem size={16} />
              </div>
            </div>

            <ul className="space-y-3 text-xs text-[#2b091f] dark:text-[#e0b1cb] leading-relaxed">
              {value.bulletItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f72585] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
            <span>شاخص:</span>
            <strong className="text-[#f72585] font-black">{value.metric}</strong>
          </div>
        </div>

        {/* COL 4: فعالیت‌های کلیدی (Top) + منابع کلیدی (Bottom) */}
        <div className="flex flex-col gap-3.5">
          {/* Top: فعالیت‌های کلیدی */}
          <div
            onClick={() => setSelectedBlock(activities)}
            className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between flex-1 ${
              isBlockDimmed('activities') ? 'opacity-30' : 'opacity-100 hover:shadow-lg'
            } bg-white dark:bg-[#1f0714] border-[#ecd3e5] dark:border-[#590d22]`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
                <h4 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white">
                  {activities.title}
                </h4>
                <div className="w-8 h-8 rounded-xl bg-[#7209b7] text-white flex items-center justify-center">
                  <Cog size={16} />
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#2b091f] dark:text-[#e0b1cb] leading-relaxed">
                {activities.bulletItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f72585] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <span className="text-[11px] font-bold text-[#f72585] block mt-2 hover:underline">
                +۱ مورد دیگر (کلیک برای مشاهده)...
              </span>
            </div>

            <div className="pt-3 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
              <span>شاخص:</span>
              <strong className="text-[#7209b7] dark:text-[#f72585] font-bold">{activities.metric}</strong>
            </div>
          </div>

          {/* Bottom: منابع کلیدی */}
          <div
            onClick={() => setSelectedBlock(resources)}
            className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between flex-1 ${
              isBlockDimmed('resources') ? 'opacity-30' : 'opacity-100 hover:shadow-lg'
            } bg-white dark:bg-[#1f0714] border-[#ecd3e5] dark:border-[#590d22]`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
                <h4 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white">
                  {resources.title}
                </h4>
                <div className="w-8 h-8 rounded-xl bg-[#7209b7] text-white flex items-center justify-center">
                  <Database size={16} />
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#2b091f] dark:text-[#e0b1cb] leading-relaxed">
                {resources.bulletItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f72585] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <span className="text-[11px] font-bold text-[#f72585] block mt-2 hover:underline">
                +۱ مورد دیگر (کلیک برای مشاهده)...
              </span>
            </div>

            <div className="pt-3 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
              <span>شاخص:</span>
              <strong className="text-[#38040e] dark:text-white font-bold">{resources.metric}</strong>
            </div>
          </div>
        </div>

        {/* COL 5 (Left): شرکای کلیدی (Key Partners) */}
        <div
          onClick={() => setSelectedBlock(partners)}
          className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
            isBlockDimmed('partners') ? 'opacity-30' : 'opacity-100 hover:shadow-lg'
          } bg-white dark:bg-[#1f0714] border-[#ecd3e5] dark:border-[#590d22]`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
              <h4 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white">
                {partners.title}
              </h4>
              <div className="w-8 h-8 rounded-xl bg-[#7209b7] text-white flex items-center justify-center">
                <Handshake size={16} />
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-[#2b091f] dark:text-[#e0b1cb] leading-relaxed">
              {partners.bulletItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f72585] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <span className="text-[11px] font-bold text-[#f72585] block mt-2 hover:underline">
              +۱ مورد دیگر (کلیک برای مشاهده)...
            </span>
          </div>

          <div className="pt-3 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
            <span>شاخص:</span>
            <strong className="text-[#7209b7] dark:text-[#f72585] font-bold">{partners.metric}</strong>
          </div>
        </div>

      </div>

      {/* BOTTOM ROW: ساختار هزینه‌ها (Right) + جریان‌های درآمدی (Left) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        
        {/* ساختار هزینه‌ها */}
        <div
          onClick={() => setSelectedBlock(costs)}
          className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
            isBlockDimmed('costs') ? 'opacity-30' : 'opacity-100 hover:shadow-lg'
          } bg-white dark:bg-[#1f0714] border-[#ecd3e5] dark:border-[#590d22]`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
              <h4 className="text-xs sm:text-sm font-black text-[#d81159]">
                {costs.title}
              </h4>
              <div className="w-8 h-8 rounded-xl bg-[#d81159] text-white flex items-center justify-center">
                <Receipt size={16} />
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2b091f] dark:text-[#e0b1cb]">
              {costs.bulletItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d81159] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 mt-3 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
            <span>شاخص مالی:</span>
            <strong className="text-[#d81159] font-bold">{costs.metric}</strong>
          </div>
        </div>

        {/* جریان‌های درآمدی */}
        <div
          onClick={() => setSelectedBlock(revenue)}
          className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
            isBlockDimmed('revenue') ? 'opacity-30' : 'opacity-100 hover:shadow-lg'
          } bg-white dark:bg-[#1f0714] border-[#ecd3e5] dark:border-[#590d22]`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
              <h4 className="text-xs sm:text-sm font-black text-[#2b8a3e]">
                {revenue.title}
              </h4>
              <div className="w-8 h-8 rounded-xl bg-[#2b8a3e] text-white flex items-center justify-center">
                <Coins size={16} />
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2b091f] dark:text-[#e0b1cb]">
              {revenue.bulletItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2b8a3e] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 mt-3 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
            <span>شاخص مالی:</span>
            <strong className="text-[#2b8a3e] font-bold">{revenue.metric}</strong>
          </div>
        </div>

      </div>

      {/* STRATEGIC INSPECTION MODAL UPON CLICKING ANY BLOCK */}
      {selectedBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white dark:bg-[#1f0714] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#ecd3e5] dark:border-[#7209b7] text-right space-y-5">
            
            <button
              onClick={() => setSelectedBlock(null)}
              className="absolute top-5 left-5 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-[#38040e]"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl ${selectedBlock.iconBg} text-white flex items-center justify-center shadow-lg`}>
                <selectedBlock.icon size={24} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#f72585] block">{selectedBlock.category}</span>
                <h3 className="text-xl font-black text-[#38040e] dark:text-white">{selectedBlock.title}</h3>
              </div>
            </div>

            <div className="bg-[#fcf9f5] dark:bg-[#2b091f]/50 p-4 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22] space-y-2">
              <span className="text-xs font-black text-[#590d22] dark:text-[#f72585] block">
                تحلیل استراتژیک در اکوسیستم تفت:
              </span>
              <p className="text-xs sm:text-sm text-[#2b091f] dark:text-[#e0b1cb] leading-relaxed">
                {selectedBlock.strategicAnalysis}
              </p>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-1">
              <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 block">
                نقش اختصاصی در پوشش خلأ منطقه‌ای تفت:
              </span>
              <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed font-medium">
                {selectedBlock.taftEcosystemRole}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedBlock(null)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white font-bold text-xs shadow-md hover:opacity-95"
              >
                بستن و ادامه بررسی بوم
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
