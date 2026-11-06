import React, { useState } from 'react';
import { 
  Calculator, 
  Heart, 
  Accessibility, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft,
  CreditCard,
  Building,
  HeartHandshake
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  // 3-tab selector: 1: installment, 2: charity, 3: equipment
  const [activeTab, setActiveTab] = useState<'installment' | 'charity' | 'equipment'>('charity');

  // Tab 1: Installment state
  const [loanAmount, setLoanAmount] = useState<number>(3500000);
  const [loanMonths, setLoanMonths] = useState<number>(4);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanRequested, setLoanRequested] = useState<boolean>(false);

  const downPayment = Math.round((loanAmount * downPaymentPercent) / 100);
  const remainingPrincipal = loanAmount - downPayment;
  const loanFee = Math.round(remainingPrincipal * (0.02 * (loanMonths / 12)));
  const monthlyPay = Math.round((remainingPrincipal + loanFee) / loanMonths);

  // Tab 2: Charity donation state (Image 2)
  const [selectedDonation, setSelectedDonation] = useState<number | 'custom'>(100000);
  const [customDonationInput, setCustomDonationInput] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
  const [donatedAmount, setDonatedAmount] = useState<number>(100000);

  // Tab 3: Equipment reservation state
  const [reservedItem, setReservedItem] = useState<string | null>(null);

  const handleDonationSubmit = () => {
    let finalAmount = 0;
    if (selectedDonation === 'custom') {
      finalAmount = parseInt(customDonationInput);
      if (!finalAmount || finalAmount <= 0) {
        alert('لطفاً مبلغ موردنظر خود را به تومان وارد فرمایید.');
        return;
      }
    } else {
      finalAmount = selectedDonation;
    }
    setDonatedAmount(finalAmount);
    setDonationSuccess(true);
    setTimeout(() => {
      setDonationSuccess(false);
    }, 6000);
  };

  return (
    <section id="services-section" className="py-14 bg-[#FCF9F5] dark:bg-[#14030d] relative text-right">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* EXACT SECTION HEADER FROM SCREENSHOT 2 */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#38040e] dark:text-white">
            امکانات جامع و مکمل درمانی (طراحی مجزا و تفکیک‌شده)
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#6e5564] dark:text-[#d8b4cc] font-medium leading-relaxed">
            برای جلوگیری از سردرگمی مراجعان، ۳ خدمت حیاتی سامانه در بخش‌های کاملاً مستقل تفکیک شده‌اند: وام و اقساط سلامت، صندوق خیریه دارویی و اجاره تجهیزات پزشکی.
          </p>
        </div>

        {/* EXACT 3 TOP TAB CARDS FROM SCREENSHOT 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          {/* TAB 1 (Right): سرویس مالی - ۱. پرداخت اقساطی درمان */}
          <div
            onClick={() => setActiveTab('installment')}
            className={`cursor-pointer rounded-3xl p-5 border-2 transition-all duration-300 flex items-center justify-between ${
              activeTab === 'installment'
                ? 'bg-white dark:bg-[#1f0714] border-[#f72585] shadow-lg ring-2 ring-[#f72585]/20 scale-[1.01]'
                : 'bg-white dark:bg-[#1f0714] border-[#ecd3e5] dark:border-[#590d22] hover:border-[#dfc2d7]'
            }`}
          >
            <div>
              <span className="text-[11px] font-bold text-[#7209b7] dark:text-[#f72585] block">سرویس مالی</span>
              <h4 className="text-sm sm:text-base font-black text-[#38040e] dark:text-white mt-0.5">
                ۱. پرداخت اقساطی درمان
              </h4>
              <p className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] mt-1 font-medium">
                تقسیط نسخه و داروهای دوره‌ای ۲ الی ۱۲ ماه
              </p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              activeTab === 'installment'
                ? 'bg-[#7209b7] text-white shadow-md'
                : 'bg-[#faf4f8] dark:bg-[#2b091f] text-[#7209b7] border border-[#ecd3e5] dark:border-[#590d22]'
            }`}>
              <Calculator size={22} />
            </div>
          </div>

          {/* TAB 2 (Center): مسئولیت اجتماعی - ۲. صندوق مهربانی دارویی تفت */}
          <div
            onClick={() => setActiveTab('charity')}
            className={`cursor-pointer rounded-3xl p-5 border-2 transition-all duration-300 flex items-center justify-between ${
              activeTab === 'charity'
                ? 'bg-white dark:bg-[#1f0714] border-[#f72585] shadow-lg ring-2 ring-[#f72585]/20 scale-[1.01]'
                : 'bg-white dark:bg-[#1f0714] border-[#ecd3e5] dark:border-[#590d22] hover:border-[#dfc2d7]'
            }`}
          >
            <div>
              <span className="text-[11px] font-bold text-[#f72585] block">مسئولیت اجتماعی</span>
              <h4 className="text-sm sm:text-base font-black text-[#38040e] dark:text-white mt-0.5">
                ۲. صندوق مهربانی دارویی تفت
              </h4>
              <p className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] mt-1 font-medium">
                حمایت از بیماران بی‌بضاعت منطقه
              </p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              activeTab === 'charity'
                ? 'bg-[#f72585] text-white shadow-md shadow-[#f72585]/30'
                : 'bg-[#fff0f5] dark:bg-[#2b091f] text-[#f72585] border border-[#ecd3e5] dark:border-[#590d22]'
            }`}>
              <Heart size={22} className="fill-current" />
            </div>
          </div>

          {/* TAB 3 (Left): تجهیزات درمانی - ۳. اجاره و خرید تجهیزات */}
          <div
            onClick={() => setActiveTab('equipment')}
            className={`cursor-pointer rounded-3xl p-5 border-2 transition-all duration-300 flex items-center justify-between ${
              activeTab === 'equipment'
                ? 'bg-white dark:bg-[#1f0714] border-[#f72585] shadow-lg ring-2 ring-[#f72585]/20 scale-[1.01]'
                : 'bg-white dark:bg-[#1f0714] border-[#ecd3e5] dark:border-[#590d22] hover:border-[#dfc2d7]'
            }`}
          >
            <div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">تجهیزات درمانی</span>
              <h4 className="text-sm sm:text-base font-black text-[#38040e] dark:text-white mt-0.5">
                ۳. اجاره و خرید تجهیزات
              </h4>
              <p className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] mt-1 font-medium">
                کپسول اکسیژن، ویلچر و تخت در منزل
              </p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              activeTab === 'equipment'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-emerald-50 dark:bg-[#2b091f] text-emerald-600 border border-emerald-200 dark:border-[#590d22]'
            }`}>
              <Accessibility size={22} />
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* TAB 2 VIEW: EXACT MATCH FOR USER SCREENSHOT 2 (صندوق مهربانی) */}
        {/* ============================================================== */}
        {activeTab === 'charity' && (
          <div className="bg-white dark:bg-[#1f0714] rounded-[32px] p-6 sm:p-8 lg:p-10 border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-sm animate-fade-in space-y-8">
            
            {/* Header of Charity view */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#f72585] block">
                  پویش همدلی و نیکوکاری دارویی تفت
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#38040e] dark:text-white">
                  صندوق مهربانی: تأمین داروی بیماران نیازمند منطقه
                </h3>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-[#ffeef4] dark:bg-[#38040e] text-[#f72585] text-xs font-black border border-[#fcd0df] dark:border-[#7209b7]">
                ۱۰۰٪ مبالغ مستقیماً به نسخه بیماران اختصاص می‌یابد
              </span>
            </div>

            {/* 2 COLUMNS FROM SCREENSHOT 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* RIGHT COLUMN (approx 7 cols): Donation controls & form */}
              <div className="lg:col-span-7 bg-[#fdfbfd] dark:bg-[#250918]/60 p-6 sm:p-7 rounded-3xl border border-[#ecd3e5] dark:border-[#590d22] space-y-6">
                
                <p className="text-xs sm:text-sm text-[#38040e] dark:text-[#d8b4cc] leading-relaxed font-medium">
                  برخی از همشهریان سالمند و بیماران مزمن تفت به دلیل مشکلات معیشتی، از دریافت کامل داروهای قلبی یا دیابت خود بازمی‌مانند. شما می‌توانید با هر مبلغ دلخواه در تأمین داروهای این عزیزان سهیم شوید.
                </p>

                <div className="space-y-3">
                  <label className="text-xs font-black text-[#38040e] dark:text-white block">
                    انتخاب مبلغ هدیه دارویی:
                  </label>

                  {/* 4 preset pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <button
                      type="button"
                      onClick={() => { setSelectedDonation(50000); setShowCustomInput(false); }}
                      className={`py-3 px-3 rounded-2xl text-xs font-black border-2 transition-all ${
                        selectedDonation === 50000
                          ? 'bg-[#d81159] text-white border-[#d81159] shadow-md'
                          : 'bg-white dark:bg-[#1f0714] text-[#38040e] dark:text-white border-[#dfc2d7] dark:border-[#590d22] hover:border-[#f72585]'
                      }`}
                    >
                      ۵۰,۰۰۰ تومان
                    </button>

                    <button
                      type="button"
                      onClick={() => { setSelectedDonation(100000); setShowCustomInput(false); }}
                      className={`py-3 px-3 rounded-2xl text-xs font-black border-2 transition-all ${
                        selectedDonation === 100000
                          ? 'bg-[#d81159] text-white border-[#d81159] shadow-md'
                          : 'bg-white dark:bg-[#1f0714] text-[#38040e] dark:text-white border-[#dfc2d7] dark:border-[#590d22] hover:border-[#f72585]'
                      }`}
                    >
                      ۱۰۰,۰۰۰ تومان
                    </button>

                    <button
                      type="button"
                      onClick={() => { setSelectedDonation(200000); setShowCustomInput(false); }}
                      className={`py-3 px-3 rounded-2xl text-xs font-black border-2 transition-all ${
                        selectedDonation === 200000
                          ? 'bg-[#d81159] text-white border-[#d81159] shadow-md'
                          : 'bg-white dark:bg-[#1f0714] text-[#38040e] dark:text-white border-[#dfc2d7] dark:border-[#590d22] hover:border-[#f72585]'
                      }`}
                    >
                      ۲۰۰,۰۰۰ تومان
                    </button>

                    <button
                      type="button"
                      onClick={() => { setSelectedDonation(50000); setShowCustomInput(false); }}
                      className={`py-3 px-3 rounded-2xl text-xs font-black border-2 transition-all ${
                        selectedDonation === 500000
                          ? 'bg-[#d81159] text-white border-[#d81159] shadow-md'
                          : 'bg-white dark:bg-[#1f0714] text-[#38040e] dark:text-white border-[#dfc2d7] dark:border-[#590d22] hover:border-[#f72585]'
                      }`}
                    >
                      ۵۰۰,۰۰۰ تومان
                    </button>
                  </div>

                  {/* Custom link */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCustomInput(!showCustomInput);
                        setSelectedDonation('custom');
                      }}
                      className="text-xs font-bold text-[#6e5564] dark:text-[#d8b4cc] hover:text-[#f72585] underline underline-offset-4"
                    >
                      یا وارد کردن مبلغ دلخواه دیگر...
                    </button>

                    {showCustomInput && (
                      <div className="mt-3 animate-fade-in">
                        <input
                          type="number"
                          dir="ltr"
                          value={customDonationInput}
                          onChange={(e) => setCustomDonationInput(e.target.value)}
                          placeholder="مثلاً: ۳۵۰۰۰۰ به تومان"
                          className="w-full text-center py-3 px-4 rounded-2xl border-2 border-[#dfc2d7] dark:border-[#590d22] bg-white dark:bg-[#1f0714] text-sm font-bold text-[#2b091f] dark:text-white focus:outline-none focus:border-[#f72585]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Big Magenta CTA Button */}
                <button
                  type="button"
                  onClick={handleDonationSubmit}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#d81159] to-[#8f2d56] hover:opacity-95 text-white font-black text-sm shadow-lg shadow-[#d81159]/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Heart size={18} className="fill-current text-white" />
                  <span>پرداخت آنلاین و مشارکت در صندوق مهربانی</span>
                </button>

                {donationSuccess && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 rounded-2xl text-xs font-bold text-emerald-800 dark:text-emerald-300 animate-fade-in flex items-center gap-2">
                    <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
                    <span>مبلغ {donatedAmount.toLocaleString('fa-IR')} تومان به صندوق داروی بیماران تفت واریز شد. دعای خیر بیماران بدرقه راه شماست.</span>
                  </div>
                )}

              </div>

              {/* LEFT COLUMN (approx 5 cols): Transparency Report from Screenshot 2 */}
              <div className="lg:col-span-5 bg-white dark:bg-[#1f0714] p-6 rounded-3xl border-2 border-[#ecd3e5] dark:border-[#590d22] space-y-4">
                
                <div className="flex items-center justify-between pb-2 border-b border-[#f3e5f0] dark:border-[#590d22]">
                  <h4 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white">
                    گزارش شفافیت زنده صندوق خیریه دارویی تفت
                  </h4>
                  <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-400">
                    ۸۷٪ هدف ماه جاری محقق شده
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#f3e5f0] dark:bg-[#38040e] h-2.5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#f72585] to-[#7209b7] rounded-full w-[87%]" />
                </div>

                {/* Exact 3 transparency items from Screenshot 2 */}
                <div className="space-y-3 pt-2">
                  
                  {/* Item 1 */}
                  <div className="p-3 rounded-2xl bg-[#fdfbfd] dark:bg-[#250918]/60 border border-[#ecd3e5] dark:border-[#590d22] flex items-center justify-between gap-3">
                    <div>
                      <h5 className="text-xs font-black text-[#38040e] dark:text-white">
                        تأمین قلم انسولین لانتوس برای مادر دیابتی در شهرک قدس تفت
                      </h5>
                      <span className="text-[10px] text-[#6e5564] dark:text-[#d8b4cc] block mt-0.5">
                        ۲ ساعت پیش · داروخانه شبانه‌روزی تفت
                      </span>
                    </div>
                    <span className="text-xs font-black text-[#d81159] dark:text-[#f72585] shrink-0 font-mono">
                      ۵۲۰,۰۰۰ تومان
                    </span>
                  </div>

                  {/* Item 2 */}
                  <div className="p-3 rounded-2xl bg-[#fdfbfd] dark:bg-[#250918]/60 border border-[#ecd3e5] dark:border-[#590d22] flex items-center justify-between gap-3">
                    <div>
                      <h5 className="text-xs font-black text-[#38040e] dark:text-white">
                        اجاره ۱ ماهه دستگاه اکسیژن‌ساز برای جانباز تنفسی در اسلامیه تفت
                      </h5>
                      <span className="text-[10px] text-[#6e5564] dark:text-[#d8b4cc] block mt-0.5">
                        امروز صبح · داروخانه شبانه‌روزی تفت
                      </span>
                    </div>
                    <span className="text-xs font-black text-[#d81159] dark:text-[#f72585] shrink-0 font-mono">
                      ۱,۲۰۰,۰۰۰ تومان
                    </span>
                  </div>

                  {/* Item 3 */}
                  <div className="p-3 rounded-2xl bg-[#fdfbfd] dark:bg-[#250918]/60 border border-[#ecd3e5] dark:border-[#590d22] flex items-center justify-between gap-3">
                    <div>
                      <h5 className="text-xs font-black text-[#38040e] dark:text-white">
                        پرداخت فرانشیز داروهای قلبی بیمار بازنشسته در خیابان ساحلی
                      </h5>
                      <span className="text-[10px] text-[#6e5564] dark:text-[#d8b4cc] block mt-0.5">
                        دیروز · داروخانه شبانه‌روزی تفت
                      </span>
                    </div>
                    <span className="text-xs font-black text-[#d81159] dark:text-[#f72585] shrink-0 font-mono">
                      ۴۵۰,۰۰۰ تومان
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 1 VIEW: DEDICATED INSTALLMENT CALCULATOR & LOAN SERVICE */}
        {/* ============================================================== */}
        {activeTab === 'installment' && (
          <div className="bg-white dark:bg-[#1f0714] rounded-[32px] p-6 sm:p-8 lg:p-10 border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-sm animate-fade-in space-y-8">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#7209b7] dark:text-[#f72585] block">
                  طرح رفاه و سلامت شهروندان تفت
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#38040e] dark:text-white">
                  پرداخت اقساطی و وام درمان: تقسیط ۲ تا ۱۲ ماهه
                </h3>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-[#fdf0f7] dark:bg-[#38040e] text-[#7209b7] dark:text-[#f72585] text-xs font-black border border-[#e0b1cb] dark:border-[#7209b7]">
                بدون چک و بدون ضامن بانکی | کارمزد قرض‌الحسنه ۲٪
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Sliders (7 cols) */}
              <div className="lg:col-span-7 bg-[#fdfbfd] dark:bg-[#250918]/60 p-6 sm:p-7 rounded-3xl border border-[#ecd3e5] dark:border-[#590d22] space-y-6">
                
                {/* Slider 1: Loan Amount */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-[#38040e] dark:text-white">
                    <span>مبلغ کل برآورد نسخه یا تجهیزات:</span>
                    <strong className="text-sm font-black text-[#f72585] font-mono">
                      {loanAmount.toLocaleString('fa-IR')} تومان
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="15000000"
                    step="250000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-[#f72585] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-bold">
                    <span>۵۰۰ هزار تومان</span>
                    <span>۵ میلیون</span>
                    <span>۱۰ میلیون</span>
                    <span>۱۵ میلیون تومان</span>
                  </div>
                </div>

                {/* Slider 2: Months */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-[#38040e] dark:text-white">
                    <span>تعداد ماه‌های اقساط:</span>
                    <strong className="text-sm font-black text-[#7209b7] dark:text-[#f72585]">
                      {loanMonths.toLocaleString('fa-IR')} ماهه
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="1"
                    value={loanMonths}
                    onChange={(e) => setLoanMonths(Number(e.target.value))}
                    className="w-full accent-[#7209b7] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-bold">
                    <span>۲ ماه</span>
                    <span>۴ ماه</span>
                    <span>۶ ماه</span>
                    <span>۹ ماه</span>
                    <span>۱۲ ماه</span>
                  </div>
                </div>

                {/* Slider 3: Down payment */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-[#38040e] dark:text-white">
                    <span>درصد پیش‌پرداخت نقدی:</span>
                    <strong className="text-sm font-black text-emerald-700 dark:text-emerald-400">
                      {downPaymentPercent}٪ ({downPayment.toLocaleString('fa-IR')} تومان)
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-bold">
                    <span>بدون پیش‌پرداخت (۰٪)</span>
                    <span>۲۰٪</span>
                    <span>۳۵٪</span>
                    <span>۵۰٪</span>
                  </div>
                </div>

              </div>

              {/* Summary Card (5 cols) */}
              <div className="lg:col-span-5 bg-white dark:bg-[#1f0714] p-6 rounded-3xl border-2 border-[#ecd3e5] dark:border-[#590d22] space-y-4">
                <h4 className="text-sm font-black text-[#38040e] dark:text-white pb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
                  پیش‌فاکتور شفاف تسهیلات سلامت
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-[#6e5564] dark:text-[#d8b4cc]">
                    <span>مبلغ پیش‌پرداخت اولیه:</span>
                    <strong className="text-[#38040e] dark:text-white font-bold">{downPayment.toLocaleString('fa-IR')} تومان</strong>
                  </div>
                  <div className="flex justify-between text-[#6e5564] dark:text-[#d8b4cc]">
                    <span>کارمزد قرض‌الحسنه سلامت (۲٪):</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{loanFee.toLocaleString('fa-IR')} تومان</strong>
                  </div>
                  <div className="flex justify-between text-[#6e5564] dark:text-[#d8b4cc]">
                    <span>سررسید اولین قسط:</span>
                    <strong className="text-[#7209b7] dark:text-[#f72585] font-bold">۳۰ روز پس از تحویل دارو</strong>
                  </div>

                  <div className="pt-3 border-t border-[#ebd4e5] dark:border-[#590d22] flex justify-between items-center">
                    <span className="text-sm font-black text-[#590d22] dark:text-white">مبلغ هر قسط ماهانه:</span>
                    <strong className="text-xl font-black text-[#7209b7] dark:text-[#f72585] font-mono">
                      {monthlyPay.toLocaleString('fa-IR')} تومان
                    </strong>
                  </div>
                </div>

                <div className="pt-2">
                  {loanRequested ? (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 rounded-2xl text-center text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      درخواست اقساط شما با موفقیت ثبت شد. هنگام مراجعه به باجه داروخانه، قرارداد اعتباری فعال می‌گردد.
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setLoanRequested(true)}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#590d22] via-[#7209b7] to-[#f72585] text-white font-black text-xs shadow-md hover:opacity-95 transition-all"
                    >
                      ثبت درخواست و فعال‌سازی وام سلامت
                    </button>
                  )}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3 VIEW: DEDICATED MEDICAL EQUIPMENT RENTAL & PURCHASE */}
        {/* ============================================================== */}
        {activeTab === 'equipment' && (
          <div className="bg-white dark:bg-[#1f0714] rounded-[32px] p-6 sm:p-8 lg:p-10 border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-sm animate-fade-in space-y-8">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
                  تجهیزات پزشکی و توانبخشی بیمار در منزل
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#38040e] dark:text-white">
                  اجاره و خرید فوری ملزومات مراقبت و تنفسی در تفت
                </h3>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-[#1f2937] text-emerald-700 dark:text-emerald-400 text-xs font-black border border-emerald-200 dark:border-emerald-800">
                تحویل اکسپرس ۲ ساعته در درب منزل در تفت و حومه
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Item 1 */}
              <div className="bg-[#fdfbfd] dark:bg-[#250918]/60 p-4 rounded-3xl border border-[#ecd3e5] dark:border-[#590d22] hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80"
                    alt="دستگاه اکسیژن ساز"
                    className="w-full h-36 object-cover rounded-2xl mb-3"
                  />
                  <h5 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white">
                    دستگاه اکسیژن‌ساز ۵ لیتری (خلوص ۹۵٪)
                  </h5>
                  <p className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] mt-1 leading-relaxed">
                    مخصوص بیماران تنفسی و ریوی، کم‌صدا به همراه فیلترهای استریل نو
                  </p>
                  <div className="mt-3 pt-2 border-t border-[#f3e5f0] dark:border-[#590d22] flex justify-between items-center text-xs">
                    <span className="text-stone-500 font-bold">اجاره ماهانه:</span>
                    <strong className="font-black text-[#f72585]">۱,۴۰۰,۰۰۰ ت</strong>
                  </div>
                </div>
                <button
                  onClick={() => setReservedItem('دستگاه اکسیژن‌ساز')}
                  className="w-full mt-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                >
                  {reservedItem === 'دستگاه اکسیژن‌ساز' ? 'رزرو شد ✓' : 'رزرو و تحویل درب منزل'}
                </button>
              </div>

              {/* Item 2 */}
              <div className="bg-[#fdfbfd] dark:bg-[#250918]/60 p-4 rounded-3xl border border-[#ecd3e5] dark:border-[#590d22] hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=400&q=80"
                    alt="تخت بیمارستانی"
                    className="w-full h-36 object-cover rounded-2xl mb-3"
                  />
                  <h5 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white">
                    تخت بیمارستانی ۳ شکن برقی + تشک مواج
                  </h5>
                  <p className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] mt-1 leading-relaxed">
                    تنظیم برقی زیر سر و پا، حفاظ‌های تاشو ایمن و تشک ضد زخم‌بستر
                  </p>
                  <div className="mt-3 pt-2 border-t border-[#f3e5f0] dark:border-[#590d22] flex justify-between items-center text-xs">
                    <span className="text-stone-500 font-bold">اجاره ماهانه:</span>
                    <strong className="font-black text-[#f72585]">۱,۱۰۰,۰۰۰ ت</strong>
                  </div>
                </div>
                <button
                  onClick={() => setReservedItem('تخت بیمارستانی')}
                  className="w-full mt-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                >
                  {reservedItem === 'تخت بیمارستانی' ? 'رزرو شد ✓' : 'رزرو و تحویل درب منزل'}
                </button>
              </div>

              {/* Item 3 */}
              <div className="bg-[#fdfbfd] dark:bg-[#250918]/60 p-4 rounded-3xl border border-[#ecd3e5] dark:border-[#590d22] hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80"
                    alt="ویلچر تاشو"
                    className="w-full h-36 object-cover rounded-2xl mb-3"
                  />
                  <h5 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white">
                    ویلچر تاشو ارتوپدی سبک و مقاوم
                  </h5>
                  <p className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] mt-1 leading-relaxed">
                    جاپایی و دسته‌های متحرک، ترمزهای دوبل، مناسب حرکت در منزل و سفر
                  </p>
                  <div className="mt-3 pt-2 border-t border-[#f3e5f0] dark:border-[#590d22] flex justify-between items-center text-xs">
                    <span className="text-stone-500 font-bold">اجاره روزانه:</span>
                    <strong className="font-black text-[#f72585]">۴۵,۰۰۰ ت</strong>
                  </div>
                </div>
                <button
                  onClick={() => setReservedItem('ویلچر تاشو')}
                  className="w-full mt-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                >
                  {reservedItem === 'ویلچر تاشو' ? 'رزرو شد ✓' : 'رزرو و تحویل درب منزل'}
                </button>
              </div>

              {/* Item 4 */}
              <div className="bg-[#fdfbfd] dark:bg-[#250918]/60 p-4 rounded-3xl border border-[#ecd3e5] dark:border-[#590d22] hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80"
                    alt="واکر عصا"
                    className="w-full h-36 object-cover rounded-2xl mb-3"
                  />
                  <h5 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white">
                    دستگاه ساکشن خانگی + واکر چرخ‌دار
                  </h5>
                  <p className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] mt-1 leading-relaxed">
                    مکش استاندارد ترشحات، فیلتر آنتی‌باکتریال به همراه واکر تاشو
                  </p>
                  <div className="mt-3 pt-2 border-t border-[#f3e5f0] dark:border-[#590d22] flex justify-between items-center text-xs">
                    <span className="text-stone-500 font-bold">اجاره ماهانه:</span>
                    <strong className="font-black text-[#f72585]">۸۵۰,۰۰۰ ت</strong>
                  </div>
                </div>
                <button
                  onClick={() => setReservedItem('دستگاه ساکشن')}
                  className="w-full mt-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                >
                  {reservedItem === 'دستگاه ساکشن' ? 'رزرو شد ✓' : 'رزرو و تحویل درب منزل'}
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
