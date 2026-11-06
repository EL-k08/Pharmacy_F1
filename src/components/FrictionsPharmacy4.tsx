import React, { useState } from 'react';

interface FrictionData {
  id: number;
  type: 'problem' | 'solution';
  tagLabel: string;
  tagSubtitle: string;
  title: string;
  desc: string;
  icon: string;
  iconColor: string;
  actionText: string;
}

const FRICTION_CARDS: FrictionData[] = [
  {
    id: 1,
    type: 'problem',
    tagLabel: 'اصطکاک سنتی ۱',
    tagSubtitle: 'اتلاف وقت مفرط',
    title: '۴۵ دقیقه معطلی کلافه‌کننده در صف',
    desc: 'بیمار یا همراه او در ساعات اوج شلوغی عصر ناچار است دقایق طولانی روبروی پیشخوان داروخانه بایستد تا نوبت نسخه‌پیچی او فرا برسد.',
    icon: 'fa-hourglass-end',
    iconColor: '#e63946',
    actionText: 'صفر کردن انتظار؛ تحویل ۲ دقیقه‌ای با باجه سریع.',
  },
  {
    id: 2,
    type: 'problem',
    tagLabel: 'اصطکاک سنتی ۲',
    tagSubtitle: 'عدم قطعیت و سرگردانی',
    title: 'کسری داروها پس از انتظار طولانی',
    desc: 'بیمار پس از نیم ساعت صف، متوجه می‌شود داروخانه یکی از اقلام حیاتی نسخه را موجود ندارد و باید مجدداً به جستجو در سایر داروخانه‌ها بپردازد.',
    icon: 'fa-triangle-exclamation',
    iconColor: '#e63946',
    actionText: 'استعلام پیش از حضور؛ انبارگردانی آنلاین و رزرو قطعی دارو.',
  },
  {
    id: 3,
    type: 'problem',
    tagLabel: 'اصطکاک سنتی ۳',
    tagSubtitle: 'عدم شفافیت مالی',
    title: 'شوک ناگهانی قیمت در پای صندوق',
    desc: 'بیمار تا آخرین لحظه از مبلغ نهایی دارو و سهم بیمه بی‌اطلاع است و گاهی با هزینه‌ای بالاتر از توان پرداخت نقدی خود غافلگیر می‌شود.',
    icon: 'fa-money-bill-wave',
    iconColor: '#e63946',
    actionText: 'صدور پیش‌فاکتور دیجیتال قبل از خروج و امکان پرداخت اقساطی.',
  },
  {
    id: 4,
    type: 'solution',
    tagLabel: 'کارکرد واسطه ۴',
    tagSubtitle: 'واسطه مالی و حمایتی',
    title: 'تأمین مالی اقساط و صندوق مهربانی',
    desc: 'پلتفرم به عنوان واسطه مالی، امکان تقسیط هزینه‌های درمان و اتصال نسخه‌های بیماران نیازمند به صندوق خیریه دارویی تفت را مهیا می‌سازد.',
    icon: 'fa-hand-holding-dollar',
    iconColor: '#2b8a3e',
    actionText: 'تسهیل درمان بدون دغدغه مالی برای همه همشهریان تفتی.',
  },
  {
    id: 5,
    type: 'solution',
    tagLabel: 'کارکرد واسطه ۵',
    tagSubtitle: 'واسطه اطلاعاتی و فنی',
    title: 'اتصال مستقیم به سامانه نسخه الکترونیک',
    desc: 'بررسی سیستمی کدهای رهگیری بیمه سلامت و تأمین اجتماعی و بررسی تداخلات و جایگزینی داروی ژنریک در صورت تمایل بیمار.',
    icon: 'fa-code-compare',
    iconColor: '#2b8a3e',
    actionText: 'حذف خطاهای انسانی در نسخه‌خوانی و ارتقای دقت تجویز.',
  },
  {
    id: 6,
    type: 'solution',
    tagLabel: 'کارکرد واسطه ۶',
    tagSubtitle: 'هماهنگ‌کننده یکپارچه',
    title: 'رضایت دوطرفه (بیمار و کادر داروخانه)',
    desc: 'کاهش فشار کاری شدید بر پرسنل داروخانه در ساعات پیک و توزیع آرام فرآیند چیدمان در کنار تجربه بدون استرس برای شهروندان تفت.',
    icon: 'fa-people-arrows',
    iconColor: '#2b8a3e',
    actionText: 'ایجاد توازن مدرن در چرخه بهداشت و داروی شهرستان.',
  },
];

export const FrictionsPharmacy4: React.FC = () => {
  const [viewMode, setViewMode] = useState<'all' | 'friction' | 'value'>('all');

  const filteredCards = FRICTION_CARDS.filter((card) => {
    if (viewMode === 'all') return true;
    if (viewMode === 'friction') return card.type === 'problem';
    if (viewMode === 'value') return card.type === 'solution';
    return true;
  });

  return (
    <div className="bg-white dark:bg-[#1f0714] rounded-[30px] border-2 border-[#ecd3e5] dark:border-[#590d22] p-6 sm:p-8 lg:p-10 shadow-sm text-right">
      
      {/* Title */}
      <div className="mb-6 pb-4 border-b border-[#f3e5f0] dark:border-[#590d22]">
        <span className="text-[11px] font-bold text-[#f72585] block">
          تب ۴ پرونده تحلیلی Pharmacy4
        </span>
        <h3 className="text-xl font-black text-[#38040e] dark:text-white">
          اصطکاک‌ها و کارکردهای چندگانه واسطه - ماتریس مقایسه‌ای و تبدیل چالش به راهکار
        </h3>
      </div>

      {/* View Switcher matching Pharmacy4 */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setViewMode('all')}
          className={`py-2.5 px-5 rounded-full text-xs font-black transition-all flex items-center gap-2 border-2 ${
            viewMode === 'all'
              ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-md'
              : 'bg-[#faf4f8] dark:bg-[#2b091f] text-[#6e5564] dark:text-[#d8b4cc] border-[#ecd3e5] dark:border-[#590d22]'
          }`}
        >
          <i className="fa-solid fa-right-left"></i>
          <span>مقایسه کامل (چالش ⬅ راهکار واسطه)</span>
        </button>

        <button
          onClick={() => setViewMode('friction')}
          className={`py-2.5 px-5 rounded-full text-xs font-black transition-all flex items-center gap-2 border-2 ${
            viewMode === 'friction'
              ? 'bg-[#e63946] text-white border-transparent shadow-md'
              : 'bg-[#faf4f8] dark:bg-[#2b091f] text-[#6e5564] dark:text-[#d8b4cc] border-[#ecd3e5] dark:border-[#590d22]'
          }`}
        >
          <i className="fa-solid fa-fire text-[#e63946]"></i>
          <span>فقط اصطکاک‌های مدل سنتی</span>
        </button>

        <button
          onClick={() => setViewMode('value')}
          className={`py-2.5 px-5 rounded-full text-xs font-black transition-all flex items-center gap-2 border-2 ${
            viewMode === 'value'
              ? 'bg-[#2b8a3e] text-white border-transparent shadow-md'
              : 'bg-[#faf4f8] dark:bg-[#2b091f] text-[#6e5564] dark:text-[#d8b4cc] border-[#ecd3e5] dark:border-[#590d22]'
          }`}
        >
          <i className="fa-solid fa-shield-halved text-[#2b8a3e]"></i>
          <span>فقط کارکردهای ۶گانه واسطه</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="bg-[#fdfbfd] dark:bg-[#250918]/60 rounded-[20px] p-5 border border-[#ecd3e5] dark:border-[#590d22] shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Top */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#f3e5f0] dark:border-[#590d22]">
                <span className={`text-[11px] font-black px-3 py-1 rounded-xl ${
                  card.type === 'problem' 
                    ? 'bg-[#ffe5ec] text-[#d90429]' 
                    : 'bg-[#e8f5e9] text-[#2b8a3e]'
                }`}>
                  {card.tagLabel}
                </span>
                <span className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
                  {card.tagSubtitle}
                </span>
              </div>

              {/* Title */}
              <h5 className="text-sm font-black text-[#38040e] dark:text-white mb-2 flex items-center gap-2">
                <i className={`fa-solid ${card.icon}`} style={{ color: card.iconColor }}></i>
                <span>{card.title}</span>
              </h5>

              {/* Desc */}
              <p className="text-xs text-[#6e5564] dark:text-[#d8b4cc] leading-relaxed mb-4">
                {card.desc}
              </p>
            </div>

            {/* Action Bar matching Pharmacy4 */}
            <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
              card.type === 'problem'
                ? 'bg-[#faf4f8] dark:bg-[#38040e]/40 text-[#7209b7] dark:text-[#f72585] border-r-4 border-[#c70039]'
                : 'bg-[#eef9f0] dark:bg-emerald-950/40 text-[#2b8a3e] dark:text-emerald-300 border-r-4 border-[#2b8a3e]'
            }`}>
              <i className="fa-solid fa-circle-arrow-left text-sm shrink-0"></i>
              <span>
                {card.type === 'problem' && <strong>پاسخ واسطه داروتفت: </strong>}
                {card.actionText}
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
