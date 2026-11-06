export type Language = 'fa' | 'en';

export const t = {
  // Brand & Header
  brandTitle: { fa: 'نسخه‌یار | نسخه آنلاین', en: 'NoskheYar | Online Rx' },
  brandSubtitle: { fa: 'سامانه تخصصی سلامت الکترونیک تفت', en: 'Taft Specialized E-Health System' },
  navHome: { fa: 'صفحه اصلی', en: 'Home' },
  navInteractive: { fa: 'دمو تعاملی عملیاتی', en: 'Interactive Demo' },
  navDossier: { fa: 'پرونده دیجیتال تفت', en: 'Digital Dossier' },
  quickRx: { fa: 'ثبت سریع نسخه', en: 'Quick Rx' },
  patientCodeLabel: { fa: 'کد سلامت:', en: 'Health Code:' },
  searchPlaceholder: { fa: 'جستجوی داروخانه و خدمات تفت...', en: 'Search pharmacies and services...' },
  backToHome: { fa: 'بازگشت به صفحه اصلی', en: 'Back to Home' },

  // Hero Section
  heroBadge: { 
    fa: 'طرح اختصاصی اعتبارسنجی شده شهرستان تفت و استان یزد', 
    en: 'Validated Dedicated Healthcare Project for Taft County & Yazd' 
  },
  heroTitle1: { fa: 'پایان معطلی در صف داروخانه!', en: 'No More Waiting in Pharmacy Lines!' },
  heroTitle2: { fa: 'نسخه‌ات رو آنلاین بفرست،', en: 'Send Your Rx Online,' },
  heroTitle3: { fa: 'فقط ۲ دقیقه‌ای تحویل بگیر! 💊', en: 'Pick It Up in Just 2 Minutes! 💊' },
  heroDesc: {
    fa: 'پلتفرم‌های کشوری مثل اسنپ‌دکتر و تپسی‌دارو، شهرستان تفت را خارج از محدوده سرویس‌دهی می‌دانند! سامانه «نسخه‌یار» این خلأ بزرگ را با هوش مصنوعی OCR، هماهنگی داروخانه‌های معتمد خیابان ساحلی و بلوار بهشتی، باجه تحویل سریع و تسهیلات اقساطی پوشش داده است.',
    en: 'National platforms like Snapp Doctor and Tapsi Daroo consider Taft outside their service coverage! NoskheYar bridges this gap with AI OCR, verified local pharmacies, 2-minute express pickup counters, and flexible installment healthcare loans.'
  },
  btnSubmitRx: { fa: 'ثبت و استعلام نسخه پیش از مراجعه', en: 'Submit & Inquire Rx Before Visit' },
  btnTestOcr: { fa: 'تست OCR هوشمند دست‌خط نسخه', en: 'Test AI Handwriting Rx OCR' },
  heroCheck1: { fa: 'کاهش زمان انتظار از ۴۵ به ۲ دقیقه', en: 'Wait time reduced from 45 to 2 mins' },
  heroCheck2: { fa: 'امکان تقسیط بدون ضامن', en: 'Installments without bank guarantor' },
  heroCheck3: { fa: 'پوشش کامل مناطق شهرستان تفت', en: 'Full coverage across Taft county' },
  liveStatusTitle: { fa: 'وضعیت زنده شبکه داروخانه‌ای تفت', en: 'Taft Pharmacy Network Live Status' },
  liveStatusBadge: { fa: 'آماده‌باش و متصل', en: 'Ready & Connected' },
  stat2Mins: { fa: '۲ دقیقه', en: '2 Mins' },
  stat2MinsLabel: { fa: 'میانگین معطلی در باجه', en: 'Average counter wait' },
  stat4Pharmacies: { fa: '۴ داروخانه', en: '4 Pharmacies' },
  stat4PharmaciesLabel: { fa: 'شعب فعال در تفت', en: 'Active branches in Taft' },
  stat100Percent: { fa: '۱۰۰٪', en: '100%' },
  stat100PercentLabel: { fa: 'شفافیت قیمت قبل از مراجعه', en: 'Pre-visit price transparency' },
  statActiveCharity: { fa: 'فعال ❤️', en: 'Active ❤️' },
  statActiveCharityLabel: { fa: 'صندوق مهربانی دارویی', en: 'Charity medication fund' },
  btnViewQueueCounter: { fa: 'مشاهده میز کار و صف ورودی داروخانه', en: 'View Pharmacy Counter & Queue' },

  // Gateways on Landing
  portalsHeading: { fa: 'انتخاب مسیر ورود به بخش‌های تخصصی', en: 'Choose Your Specialized Destination' },
  portalsSubheading: { 
    fa: 'جهت جلوگیری از سردرگمی، امکانات عملیاتی و اسناد تحلیلی به دو فضای مستقل تفکیک شده‌اند:',
    en: 'To avoid clutter, operational features and strategic documents are segregated into two distinct hubs:'
  },
  portal1Title: { fa: 'مشاهده دمو تعاملی عملیاتی', en: 'Interactive Operational Demo' },
  portal1Desc: {
    fa: 'ورود به کارتابل اجرایی داروخانه و بیمار؛ پایش زنده نوبت بدون صف، ثبت هوشمند نسخه با هوش مصنوعی OCR، صف سفارشات بر اساس کد عددی، پنل مدیریت داروخانه‌های تفت، و سرویس تسهیلات اقساطی.',
    en: 'Live queue-free tracking, OCR prescription upload, anonymous queue table, pharmacy multi-store console, and loan simulator.'
  },
  portal2Title: { fa: 'مشاهده پرونده دیجیتال و مستندات تفت', en: 'Digital Dossier & Taft Documents' },
  portal2Desc: {
    fa: 'دسترسی به پرونده تحلیلی و شواهد میدانی تفت؛ بوم مدل کسب‌وکار (BMC دقیقاً مطابق طرح تصویری)، پرسش‌های ۸گانه ایده بالغ (طرح Pharmacy4)، اصطکاک‌ها و کارکردهای واسطه، قیف فروش ۷ مرحله‌ای، و ادله شکست رقبای کشوری.',
    en: 'Business Model Canvas (BMC), 8 questions from Pharmacy4, friction matrix, 7-stage conversion funnel, and field proof of competitor failure in Taft.'
  },

  // Interactive Hub Tabs
  tabTracking: { fa: 'پایش زنده نوبت بدون صف', en: 'Live Queue-Free Tracking' },
  tabPrescription: { fa: 'ثبت نسخه و OCR هوشمند', en: 'Submit Rx & Smart OCR' },
  tabQueue: { fa: 'صف سفارشات (کد عددی)', en: 'Order Queue (Code)' },
  tabPharmacy: { fa: 'پنل داروخانه‌ها', en: 'Pharmacy Panel' },
  tabServices: { fa: 'خدمات اقساط و مکمل', en: 'Installments & Services' },

  // Dossier Tabs
  tabBmc: { fa: 'بوم مدل کسب‌وکار (BMC)', en: 'Business Model Canvas (BMC)' },
  tabBlueprint: { fa: 'مرزبندی فرایندها و معماری سرویس', en: 'Process Boundaries & Architecture' },
  tabQuestions: { fa: 'پرسش‌های ۸گانه ایده بالغ', en: '8 Mature Idea Questions' },
  tabFrictions: { fa: 'اصطکاک‌ها و کارکرد واسطه', en: 'Frictions & Intermediary Value' },
  tabFunnel: { fa: 'قیف فروش ۷ مرحله‌ای', en: '7-Stage Sales Funnel' },
  tabEvidence: { fa: 'ادله شکست رقبا در تفت', en: 'Competitor Failure Proof' },
};
