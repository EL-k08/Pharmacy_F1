import React, { useState } from 'react';
import { 
  Calculator, 
  CreditCard, 
  ShieldCheck, 
  Calendar, 
  Percent, 
  CheckCircle2, 
  X, 
  ArrowLeft, 
  Lock, 
  Sparkles,
  Building,
  AlertCircle
} from 'lucide-react';
import { PrescriptionOrder } from '../types/pharmacy';

interface InstallmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: PrescriptionOrder | null;
  onConfirmInstallment: (orderId: string, installmentDetails: {
    months: number;
    monthlyAmount: number;
    downPayment: number;
    totalPayable: number;
  }) => void;
}

export const InstallmentModal: React.FC<InstallmentModalProps> = ({
  isOpen,
  onClose,
  order,
  onConfirmInstallment,
}) => {
  // If no order passed, fallback to standard sample
  const baseAmount = order ? (order.patientShare > 0 ? order.patientShare : order.finalAmount) : 350000;
  
  const [months, setMonths] = useState<number>(4);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [gatewayStep, setGatewayStep] = useState<'calculator' | 'gateway' | 'success'>('calculator');
  const [cardNumber, setCardNumber] = useState('6037-9971-4521-8812');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const totalAmount = baseAmount;
  const downPayment = Math.round((totalAmount * downPaymentPercent) / 100);
  const remainingPrincipal = totalAmount - downPayment;

  // 2% annual administration fee as per PDF
  const feeRate = 0.02;
  const totalInterest = Math.round(remainingPrincipal * (feeRate * (months / 12)));
  const totalFinanced = remainingPrincipal + totalInterest;
  const monthlyInstallment = Math.round(totalFinanced / months);
  const totalPayableOverall = downPayment + totalFinanced;

  const handleProceedToGateway = () => {
    setGatewayStep('gateway');
  };

  const handlePayDownPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setGatewayStep('success');
      if (order) {
        onConfirmInstallment(order.id, {
          months,
          monthlyAmount: monthlyInstallment,
          downPayment,
          totalPayable: totalPayableOverall,
        });
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#ecd3e5] my-6">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X size={20} />
        </button>

        {/* STEP 1: INSTALLMENT CALCULATOR */}
        {gatewayStep === 'calculator' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7209b7] to-[#f72585] text-white flex items-center justify-center shadow-lg">
                <Calculator size={24} />
              </div>
              <div className="text-right">
                <span className="text-[11px] font-black text-[#f72585] uppercase tracking-wider block">
                  طرح رفاه درمان شهرستان تفت
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#38040e]">
                  سرویس مالی و تقسیط نسخه دارویی
                </h3>
              </div>
            </div>

            {/* Prescription Cost Verification Card */}
            <div className="bg-gradient-to-r from-[#fff9fc] to-[#fbf2ff] p-4 rounded-2xl border border-[#ecd3e5] mb-5 text-right">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-[#6e5564] font-bold">شماره نسخه:</span>
                <strong className="text-xs font-black text-[#590d22]">{order?.trackingCode || 'DFT-9842'}</strong>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-[#6e5564] font-bold">داروخانه ارائه‌دهنده:</span>
                <span className="text-xs font-black text-[#7209b7]">{order?.pharmacyName || 'داروخانه منتخب تفت'}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#ebd4e5]">
                <span className="text-sm font-black text-[#38040e]">مبلغ تأییدشده نسخه (سهم قابل پرداخت):</span>
                <strong className="text-lg font-black text-[#590d22]">
                  {totalAmount.toLocaleString('fa-IR')} تومان
                </strong>
              </div>
            </div>

            {/* Slider 1: Installment Months */}
            <div className="space-y-4 mb-6">
              <div className="bg-[#fdfafc] p-4 rounded-2xl border border-[#ecd3e5]">
                <div className="flex justify-between items-center mb-2 text-right">
                  <label className="text-xs font-bold text-[#38040e]">تعداد ماه‌های اقساط:</label>
                  <strong className="text-sm font-black text-[#7209b7] bg-[#f5effb] px-3 py-1 rounded-xl border border-[#d8b4cc]">
                    {months.toLocaleString('fa-IR')} ماهه
                  </strong>
                </div>
                <input
                  type="range"
                  min={2}
                  max={12}
                  step={1}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full accent-[#7209b7] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#6e5564] font-bold mt-1">
                  <span>۲ ماه</span>
                  <span>۴ ماه</span>
                  <span>۶ ماه</span>
                  <span>۹ ماه</span>
                  <span>۱۲ ماه</span>
                </div>
              </div>

              {/* Slider 2: Down Payment */}
              <div className="bg-[#fdfafc] p-4 rounded-2xl border border-[#ecd3e5]">
                <div className="flex justify-between items-center mb-2 text-right">
                  <label className="text-xs font-bold text-[#38040e]">درصد پیش‌پرداخت نقدی:</label>
                  <strong className="text-sm font-black text-[#f72585] bg-[#fff0f5] px-3 py-1 rounded-xl border border-[#ecd3e5]">
                    {downPaymentPercent.toLocaleString('fa-IR')}٪ ({downPayment.toLocaleString('fa-IR')} تومان)
                  </strong>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#f72585] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#6e5564] font-bold mt-1">
                  <span>بدون پیش‌پرداخت (۰٪)</span>
                  <span>۲۰٪</span>
                  <span>۳۰٪</span>
                  <span>۵۰٪</span>
                </div>
              </div>
            </div>

            {/* Calculation Result Breakdown */}
            <div className="bg-[#faf4f8] rounded-2xl p-4 border border-[#ecd3e5] space-y-2.5 mb-6 text-right">
              <div className="flex justify-between items-center text-xs text-[#6e5564]">
                <span>مبلغ پیش‌پرداخت نقدی اولیه:</span>
                <strong className="text-[#38040e] font-bold">{downPayment.toLocaleString('fa-IR')} تومان</strong>
              </div>
              <div className="flex justify-between items-center text-xs text-[#6e5564]">
                <span>کارمزد تسهیلات قرض‌الحسنه سلامت (۲٪):</span>
                <span className="text-emerald-700 font-bold">{totalInterest.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#6e5564]">
                <span>سررسید اولین قسط:</span>
                <span className="text-[#7209b7] font-bold">۳۰ روز پس از تحویل دارو</span>
              </div>
              <div className="pt-2 border-t border-[#ebd4e5] flex justify-between items-center">
                <span className="text-sm font-black text-[#590d22]">مبلغ هر قسط ماهانه:</span>
                <div className="text-left">
                  <strong className="text-xl font-black text-[#7209b7]">{monthlyInstallment.toLocaleString('fa-IR')}</strong>
                  <span className="text-xs text-[#6e5564] mr-1">تومان / ماه</span>
                </div>
              </div>
            </div>

            {/* Bottom Proceed Button */}
            <button
              onClick={handleProceedToGateway}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#590d22] via-[#7209b7] to-[#f72585] hover:opacity-95 text-white font-black text-sm shadow-xl shadow-[#7209b7]/25 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <CreditCard size={18} />
              <span>تأیید طرح و پرداخت پیش‌پرداخت ({downPayment.toLocaleString('fa-IR')} تومان)</span>
              <ArrowLeft size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: SIMULATED SHAPARAK PAYMENT GATEWAY */}
        {gatewayStep === 'gateway' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Building className="text-sky-700" size={24} />
                <span className="font-black text-sm text-stone-800">درگاه پرداخت الکترونیک شاپرک</span>
              </div>
              <span className="text-xs text-stone-500 font-mono">امنیت SSL 256-bit</span>
            </div>

            <div className="bg-sky-50 p-3.5 rounded-2xl border border-sky-200 text-xs text-sky-900 flex items-center justify-between">
              <span>مبلغ قابل پرداخت پیش‌پرداخت:</span>
              <strong className="text-sm font-black text-sky-950">{downPayment.toLocaleString('fa-IR')} تومان</strong>
            </div>

            <div className="space-y-3 text-right">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">شماره کارت بانکی:</label>
                <input
                  type="text"
                  dir="ltr"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full text-center font-mono font-bold tracking-widest py-2.5 px-3 rounded-xl border border-stone-300 focus:border-sky-600 focus:outline-none text-stone-800 bg-stone-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">کد CVV2:</label>
                  <input
                    type="password"
                    dir="ltr"
                    defaultValue="824"
                    maxLength={4}
                    className="w-full text-center font-mono font-bold py-2.5 px-3 rounded-xl border border-stone-300 focus:border-sky-600 focus:outline-none text-stone-800 bg-stone-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">رمز پویا (یکبار مصرف):</label>
                  <input
                    type="password"
                    dir="ltr"
                    defaultValue="981452"
                    maxLength={8}
                    className="w-full text-center font-mono font-bold py-2.5 px-3 rounded-xl border border-stone-300 focus:border-sky-600 focus:outline-none text-stone-800 bg-stone-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handlePayDownPayment}
                disabled={isProcessing}
                className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>در حال اعتبارسنجی تراکنش...</span>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>پرداخت و فعال‌سازی اقساط</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setGatewayStep('calculator')}
                className="py-3.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs"
              >
                بازگشت
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {gatewayStep === 'success' && (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="text-xl font-black text-emerald-800">
              طرح اقساط سلامت با موفقیت فعال شد!
            </h3>

            <p className="text-xs text-[#6e5564] max-w-sm mx-auto leading-relaxed">
              پیش‌پرداخت دریافت گردید و قرارداد تقسیط {months} ماهه برای نسخه شما در سیستم دارویی تفت ثبت شد. نسخه هم‌اکنون به باجه آماده‌سازی ارسال گردید.
            </p>

            <div className="bg-[#fcf9f5] p-4 rounded-2xl border border-[#ecd3e5] text-right space-y-1.5 text-xs text-[#38040e]">
              <div className="flex justify-between">
                <span>شماره پیگیری مالی:</span>
                <strong className="font-mono text-[#7209b7]">BNPL-TFT-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </div>
              <div className="flex justify-between">
                <span>تعداد اقساط:</span>
                <strong>{months} قسط ماهانه {monthlyInstallment.toLocaleString('fa-IR')} تومانی</strong>
              </div>
              <div className="flex justify-between">
                <span>شناسه سلامت جهت تحویل در داروخانه:</span>
                <strong className="font-mono text-[#f72585]">#{order?.patientCode}</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white font-bold text-sm shadow-md hover:opacity-95"
            >
              بستن و پیگیری در داشبورد زنده
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
