import React, { useState } from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  X, 
  Sparkles,
  Clock,
  Store,
  FileText,
  Eye,
  Activity,
  ArrowLeft,
  CreditCard,
  ChevronLeft,
  Receipt,
  Phone,
  Calendar,
  Check,
  Building2,
  DollarSign
} from 'lucide-react';
import { PrescriptionOrder } from '../types/pharmacy';

interface UserHealthCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCode: string;
  onSaveCode: (newCode: string) => boolean;
  existingCodes: string[];
  orders?: PrescriptionOrder[];
  onTrackOrder?: (order: PrescriptionOrder) => void;
  lang?: 'fa' | 'en';
}

export const UserHealthCodeModal: React.FC<UserHealthCodeModalProps> = ({
  isOpen,
  onClose,
  currentCode,
  onSaveCode,
  existingCodes,
  orders = [],
  onTrackOrder,
  lang = 'fa',
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'installments' | 'code'>('history');
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<PrescriptionOrder | null>(null);
  const [inputCode, setInputCode] = useState(currentCode);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [paidInstallments, setPaidInstallments] = useState<Record<string, boolean>>({
    'inst-1': true,
  });

  if (!isOpen) return null;

  // Filter orders belonging to this patient
  const patientOrders = orders.filter(o => o.patientCode === currentCode);
  const latestOrder = patientOrders[0] || null;

  const handleGenerateRandom = () => {
    let code = '';
    do {
      code = Math.floor(100000 + Math.random() * 900000).toString();
    } while (existingCodes.includes(code));
    setInputCode(code);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputCode.trim();

    if (!/^\d+$/.test(trimmed)) {
      setError(lang === 'fa' ? 'کد اختصاصی سلامت باید کاملاً عددی باشد (بدون حروف یا علامت).' : 'Health code must be purely numeric.');
      return;
    }

    if (trimmed.length < 5 || trimmed.length > 8) {
      setError(lang === 'fa' ? 'طول کد عددی باید بین ۵ تا ۸ رقم باشد (توصیه: ۶ رقم).' : 'Code must be 5 to 8 digits.');
      return;
    }

    if (trimmed !== currentCode && existingCodes.includes(trimmed)) {
      setError(lang === 'fa' ? 'این کد عددی قبلاً توسط بیمار دیگری در تفت ثبت شده است. لطفاً کد دیگری انتخاب کنید.' : 'Code already registered in Taft.');
      return;
    }

    const saved = onSaveCode(trimmed);
    if (saved) {
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        setSuccess(false);
      }, 1200);
    }
  };

  const getStepText = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: return lang === 'fa' ? '۱. ثبت اولیه نسخه در سامانه' : '1. Initial Registration';
      case 1: return lang === 'fa' ? '۲. بررسی دوز و اصالت بیمه توسط پزشک' : '2. Doctor & Insurance Review';
      case 2: return lang === 'fa' ? '۳. استعلام و رزرو قطعی در انبار تفت' : '3. Inventory Reserve in Taft';
      case 3: return lang === 'fa' ? '۴. چیدمان و بسته‌بندی در باجه تریاژ' : '4. Packaging in Triage';
      case 4: return lang === 'fa' ? '۵. صدور پیش‌فاکتور و پیامک با بارکد' : '5. Invoice & SMS with Barcode';
      case 5: return lang === 'fa' ? '۶. آماده تحویل در باجه ۲ دقیقه‌ای اکسپرس ✓' : '6. Ready at 2-Min Express Counter ✓';
      default: return lang === 'fa' ? 'در حال فرآوری' : 'Processing';
    }
  };

  // Mocked/calculated installments based on patient's orders
  const installmentOrders = patientOrders.filter(o => o.paymentMethod === 'installment' || o.isInstallmentApproved);

  const installmentSchedules = [
    {
      id: 'inst-1',
      orderId: installmentOrders[0]?.trackingCode || 'DFT-1588',
      pharmacyName: installmentOrders[0]?.pharmacyName || 'داروخانه دکتر دهقانی',
      installmentNum: 1,
      totalInstallments: 4,
      amount: 60000,
      dueDate: '۱۵ آذر ۱۴۰۳',
      isPaid: paidInstallments['inst-1'] || false,
    },
    {
      id: 'inst-2',
      orderId: installmentOrders[0]?.trackingCode || 'DFT-1588',
      pharmacyName: installmentOrders[0]?.pharmacyName || 'داروخانه دکتر دهقانی',
      installmentNum: 2,
      totalInstallments: 4,
      amount: 60000,
      dueDate: '۱۵ دی ۱۴۰۳',
      isPaid: paidInstallments['inst-2'] || false,
    },
    {
      id: 'inst-3',
      orderId: installmentOrders[0]?.trackingCode || 'DFT-1588',
      pharmacyName: installmentOrders[0]?.pharmacyName || 'داروخانه دکتر دهقانی',
      installmentNum: 3,
      totalInstallments: 4,
      amount: 60000,
      dueDate: '۱۵ بهمن ۱۴۰۳',
      isPaid: paidInstallments['inst-3'] || false,
    },
    {
      id: 'inst-4',
      orderId: installmentOrders[0]?.trackingCode || 'DFT-1588',
      pharmacyName: installmentOrders[0]?.pharmacyName || 'داروخانه دکتر دهقانی',
      installmentNum: 4,
      totalInstallments: 4,
      amount: 60000,
      dueDate: '۱۵ اسفند ۱۴۰۳',
      isPaid: paidInstallments['inst-4'] || false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in text-right">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a050f] rounded-[32px] p-6 sm:p-8 shadow-2xl border-2 border-[#ecd3e5] dark:border-[#590d22] max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-[#38040e] transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#f3e5f0] dark:border-[#590d22]">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#590d22] to-[#f72585] text-white flex items-center justify-center shadow-lg shadow-[#f72585]/20">
            <KeyRound size={22} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#38040e] dark:text-white">
              {lang === 'fa' ? `کارتابل پرونده سلامت بیمار #${currentCode}` : `Patient Health Record #${currentCode}`}
            </h3>
            <p className="text-xs text-[#6e5564] dark:text-[#d8b4cc]">
              {lang === 'fa' 
                ? 'مشاهده فاکتور و جزئیات هر نسخه، جدول اقساط و شناسه سلامت تفت' 
                : 'View invoice & details of each prescription, installment schedule, and Taft health code'}
            </p>
          </div>
        </div>

        {/* 3 Tabs: History & Invoices, Installments, Code Management */}
        <div className="flex gap-2 p-1 bg-[#faf4f8] dark:bg-[#250918] rounded-2xl border border-[#ecd3e5] dark:border-[#590d22] mb-6">
          <button
            onClick={() => {
              setActiveTab('history');
              setSelectedOrderForDetail(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white shadow-sm'
                : 'text-[#6e5564] dark:text-[#d8b4cc] hover:text-[#590d22]'
            }`}
          >
            <Activity size={14} />
            <span>{lang === 'fa' ? `نسخه‌ها و فاکتورها (${patientOrders.length})` : `Prescriptions (${patientOrders.length})`}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('installments');
              setSelectedOrderForDetail(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'installments'
                ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white shadow-sm'
                : 'text-[#6e5564] dark:text-[#d8b4cc] hover:text-[#590d22]'
            }`}
          >
            <CreditCard size={14} />
            <span>{lang === 'fa' ? 'اقساط و تسهیلات سلامت' : 'Health Installments'}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('code');
              setSelectedOrderForDetail(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'code'
                ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white shadow-sm'
                : 'text-[#6e5564] dark:text-[#d8b4cc] hover:text-[#590d22]'
            }`}
          >
            <KeyRound size={14} />
            <span>{lang === 'fa' ? 'مدیریت کد عددی' : 'Manage Code'}</span>
          </button>
        </div>

        {/* TAB 1: PRESCRIPTION HISTORY & FULL INVOICE INSPECTION (Requirement 1) */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            
            {/* If user clicked a specific order: Show full Invoice & Prescription Details */}
            {selectedOrderForDetail ? (
              <div className="bg-[#fff9fc] dark:bg-[#250918]/80 p-5 sm:p-6 rounded-3xl border-2 border-[#f72585]/40 shadow-sm space-y-5 animate-fade-in">
                
                {/* Back to list button */}
                <div className="flex items-center justify-between pb-3 border-b border-[#ecd3e5] dark:border-[#590d22]">
                  <button
                    onClick={() => setSelectedOrderForDetail(null)}
                    className="py-1.5 px-3 rounded-xl bg-white dark:bg-[#38040e] border border-[#dfc2d7] dark:border-[#7209b7] text-xs font-black text-[#590d22] dark:text-[#f72585] flex items-center gap-1.5 hover:bg-[#faf4f8] cursor-pointer"
                  >
                    <ArrowLeft size={14} />
                    <span>{lang === 'fa' ? 'بازگشت به لیست تمام نسخه‌ها' : 'Back to Prescriptions List'}</span>
                  </button>

                  <span className="font-mono text-sm font-black text-[#590d22] dark:text-[#f72585]">
                    {selectedOrderForDetail.trackingCode}
                  </span>
                </div>

                {/* Top Details Card */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white dark:bg-[#1f0714] p-3 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22]">
                    <span className="text-stone-400 font-bold block mb-0.5">{lang === 'fa' ? 'داروخانه تحویل:' : 'Pharmacy:'}</span>
                    <strong className="text-[#38040e] dark:text-white font-black truncate block">{selectedOrderForDetail.pharmacyName}</strong>
                  </div>
                  <div className="bg-white dark:bg-[#1f0714] p-3 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22]">
                    <span className="text-stone-400 font-bold block mb-0.5">{lang === 'fa' ? 'زمان ثبت:' : 'Registered:'}</span>
                    <strong className="text-[#38040e] dark:text-white font-black">{selectedOrderForDetail.createdAt}</strong>
                  </div>
                  <div className="bg-white dark:bg-[#1f0714] p-3 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22]">
                    <span className="text-stone-400 font-bold block mb-0.5">{lang === 'fa' ? 'شیوه تسویه:' : 'Payment:'}</span>
                    <strong className="text-[#7209b7] dark:text-[#f72585] font-black">
                      {selectedOrderForDetail.paymentMethod === 'installment' ? (lang === 'fa' ? 'اقساطی سلامت' : 'Installment') : (lang === 'fa' ? 'نقدی آنلاین' : 'Online')}
                    </strong>
                  </div>
                  <div className="bg-white dark:bg-[#1f0714] p-3 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22]">
                    <span className="text-stone-400 font-bold block mb-0.5">{lang === 'fa' ? 'وضعیت فرآیند:' : 'Status:'}</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-black">
                      {selectedOrderForDetail.currentStepIndex >= 5 ? (lang === 'fa' ? 'تحویل شده ✓' : 'Ready ✓') : (lang === 'fa' ? `گام ${selectedOrderForDetail.currentStepIndex + 1} از ۶` : `Step ${selectedOrderForDetail.currentStepIndex + 1}`)}
                    </strong>
                  </div>
                </div>

                {/* Medications Table (فاکتور اقلام دارویی) */}
                <div className="space-y-2">
                  <h5 className="text-xs font-black text-[#590d22] dark:text-[#f72585] flex items-center gap-1.5">
                    <Receipt size={14} />
                    <span>{lang === 'fa' ? 'ریز اقلام دارویی و دستور مصرف نسخه:' : 'Medications Breakdown:'}</span>
                  </h5>

                  <div className="overflow-x-auto rounded-2xl border border-[#ecd3e5] dark:border-[#590d22]">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-[#f7eef7] dark:bg-[#38040e] text-[#38040e] dark:text-white font-black border-b border-[#dfc2d7] dark:border-[#590d22]">
                        <tr>
                          <th className="p-2.5">#</th>
                          <th className="p-2.5">{lang === 'fa' ? 'نام دارو' : 'Drug'}</th>
                          <th className="p-2.5">{lang === 'fa' ? 'دوز و شکل' : 'Dosage'}</th>
                          <th className="p-2.5">{lang === 'fa' ? 'تعداد' : 'Qty'}</th>
                          <th className="p-2.5">{lang === 'fa' ? 'دستور مصرف' : 'Instructions'}</th>
                          <th className="p-2.5">{lang === 'fa' ? 'قیمت مصوب' : 'Price'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f3e5f0] dark:divide-[#590d22] bg-white dark:bg-[#1f0714]">
                        {selectedOrderForDetail.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-[#fcf9f5] dark:hover:bg-[#2b091f]/50">
                            <td className="p-2.5 font-bold text-stone-500">{idx + 1}</td>
                            <td className="p-2.5 font-black text-[#590d22] dark:text-white">{item.name}</td>
                            <td className="p-2.5 text-stone-600 dark:text-stone-300">{item.dosage}</td>
                            <td className="p-2.5 font-bold text-[#7209b7] dark:text-[#f72585]">{item.quantity}</td>
                            <td className="p-2.5 text-stone-500 dark:text-stone-400">{item.instructions}</td>
                            <td className="p-2.5 font-mono font-bold text-[#f72585]">
                              {(item.priceEstimate || 45000).toLocaleString('fa-IR')} ت
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Financial Summary (پیش‌فاکتور شفاف) */}
                <div className="bg-white dark:bg-[#1f0714] p-4 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22] space-y-2 text-xs">
                  <div className="flex justify-between items-center text-stone-600 dark:text-stone-300">
                    <span>{lang === 'fa' ? 'مبلغ کل نسخه و داروها:' : 'Total Amount:'}</span>
                    <span className="font-mono font-bold">{selectedOrderForDetail.finalAmount.toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-700 dark:text-emerald-400 font-bold">
                    <span>{lang === 'fa' ? 'سهم بیمه سلامت / تأمین اجتماعی:' : 'Insurance Coverage:'}</span>
                    <span className="font-mono">- {selectedOrderForDetail.insuranceShare.toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <div className="pt-2 border-t border-[#f3e5f0] dark:border-[#590d22] flex justify-between items-center text-sm font-black text-[#590d22] dark:text-[#f72585]">
                    <span>{lang === 'fa' ? 'مبلغ نهایی پرداختی بیمار:' : 'Patient Share Payable:'}</span>
                    <span className="font-mono">{selectedOrderForDetail.patientShare.toLocaleString('fa-IR')} تومان</span>
                  </div>
                </div>

                {/* Action button: Go to live tracking */}
                {onTrackOrder && (
                  <button
                    onClick={() => {
                      onTrackOrder(selectedOrderForDetail);
                      onClose();
                    }}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#590d22] via-[#7209b7] to-[#f72585] text-white font-black text-xs shadow-md flex items-center justify-center gap-2 hover:opacity-95 cursor-pointer"
                  >
                    <Eye size={16} />
                    <span>{lang === 'fa' ? 'رهگیری زنده این نسخه در داشبورد پایش بدون صف' : 'Track This Order in Live Dashboard'}</span>
                  </button>
                )}

              </div>
            ) : (
              <>
                {/* LATEST ACTIVE PRESCRIPTION STATUS BANNER */}
                {latestOrder && (
                  <div className="bg-gradient-to-r from-[#fff0f5] to-[#fbf2ff] dark:from-[#250918] dark:to-[#38040e] p-5 rounded-3xl border-2 border-[#f72585]/40 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#f72585] text-white text-[11px] font-black flex items-center gap-1 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        {lang === 'fa' ? 'وضعیت آخرین نسخه فعال شما' : 'Latest Active Prescription Status'}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#7209b7] dark:text-[#f72585]">
                        {latestOrder.trackingCode}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[#6e5564] dark:text-[#d8b4cc] flex items-center gap-1">
                        <Store size={14} className="text-[#f72585]" />
                        {latestOrder.pharmacyName}
                      </span>
                      <span className="font-bold text-[#38040e] dark:text-white font-mono">
                        {latestOrder.finalAmount.toLocaleString('fa-IR')} تومان
                      </span>
                    </div>

                    {/* Progress highlight */}
                    <div className="bg-white/90 dark:bg-[#1a050f]/80 p-3 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-500 block">{lang === 'fa' ? 'گام فعلی آماده‌سازی:' : 'Current Step:'}</span>
                        <strong className="text-xs font-black text-[#590d22] dark:text-[#f72585]">
                          {getStepText(latestOrder.currentStepIndex)}
                        </strong>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrderForDetail(latestOrder)}
                          className="py-1.5 px-3 rounded-xl bg-[#fdf0f7] dark:bg-[#38040e] text-[#590d22] dark:text-[#f72585] border border-[#e0b1cb] dark:border-[#7209b7] text-[11px] font-black flex items-center gap-1 hover:bg-white cursor-pointer"
                        >
                          <FileText size={12} />
                          <span>{lang === 'fa' ? 'مشاهده فاکتور' : 'View Invoice'}</span>
                        </button>

                        {onTrackOrder && (
                          <button
                            onClick={() => {
                              onTrackOrder(latestOrder);
                              onClose();
                            }}
                            className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white text-[11px] font-black flex items-center gap-1 hover:opacity-95 cursor-pointer"
                          >
                            <Eye size={12} />
                            <span>{lang === 'fa' ? 'پایش زنده' : 'Track'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* FULL ORDER HISTORY LIST - CLICKABLE TO VIEW INVOICE */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white flex items-center gap-1.5">
                      <Clock size={16} className="text-[#7209b7]" />
                      <span>{lang === 'fa' ? `تاریخچه سفارشات (#{currentCode}) - برای مشاهده فاکتور کلیک کنید:` : `Order History (#{currentCode}) - Click to inspect:`}</span>
                    </h4>
                    <span className="text-[10px] text-stone-400">{patientOrders.length} {lang === 'fa' ? 'نسخه' : 'Orders'}</span>
                  </div>

                  {patientOrders.length === 0 ? (
                    <div className="bg-[#faf4f8] dark:bg-[#250918] p-6 rounded-3xl border border-dashed border-[#dfc2d7] dark:border-[#590d22] text-center text-xs text-[#6e5564] dark:text-[#d8b4cc]">
                      {lang === 'fa' ? 'هنوز نسخه‌ای با این کد سلامت ثبت نشده است.' : 'No prescriptions registered with this health code yet.'}
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                      {patientOrders.map((order) => (
                        <div
                          key={order.id}
                          onClick={() => setSelectedOrderForDetail(order)}
                          className="p-3.5 rounded-2xl bg-white dark:bg-[#250918] border border-[#ecd3e5] dark:border-[#590d22] hover:border-[#f72585] dark:hover:border-[#f72585] hover:shadow-md transition-all flex items-center justify-between gap-3 text-xs cursor-pointer group"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <strong className="font-mono text-[#590d22] dark:text-[#f72585] font-black group-hover:underline">
                                {order.trackingCode}
                              </strong>
                              <span className="text-[10px] text-stone-500 font-medium">
                                {order.createdAt}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] block mt-0.5">
                              {order.pharmacyName} · {order.items.length} {lang === 'fa' ? 'قلم دارو' : 'items'}
                            </span>
                          </div>

                          <div className="text-left flex flex-col items-end gap-1">
                            <span className="font-mono font-bold text-[#38040e] dark:text-white">
                              {order.finalAmount.toLocaleString('fa-IR')} {lang === 'fa' ? 'ت' : 'T'}
                            </span>
                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${
                              order.currentStepIndex >= 5 
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' 
                                : 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300'
                            }`}>
                              {order.currentStepIndex >= 5 ? (lang === 'fa' ? 'تحویل شده ✓' : 'Completed ✓') : (lang === 'fa' ? `گام ${order.currentStepIndex + 1} از ۶` : `Step ${order.currentStepIndex + 1}`)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

          </div>
        )}

        {/* TAB 2: HEALTH INSTALLMENTS SCHEDULE (Requirement 3) */}
        {activeTab === 'installments' && (
          <div className="space-y-5 animate-fade-in text-right">
            
            {/* Installments Overview Card */}
            <div className="bg-gradient-to-r from-[#fff0f5] via-[#faf0ff] to-[#fbf2ff] dark:from-[#250918] dark:to-[#38040e] p-5 rounded-3xl border border-[#ecd3e5] dark:border-[#590d22] space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#7209b7] text-white text-[11px] font-black flex items-center gap-1.5">
                  <CreditCard size={12} />
                  <span>{lang === 'fa' ? 'تسهیلات اقساطی سلامت تفت (BNPL)' : 'Taft Health BNPL Facility'}</span>
                </span>
                <span className="text-xs font-bold text-[#590d22] dark:text-[#f72585]">
                  {lang === 'fa' ? 'بدون ضامن و بهره' : '0% Interest'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                <div className="bg-white/80 dark:bg-[#1f0714]/80 p-2.5 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22]">
                  <span className="text-[10px] text-stone-500 block mb-0.5">{lang === 'fa' ? 'کل وام تخصیصی:' : 'Total Loan:'}</span>
                  <strong className="text-xs font-black text-[#590d22] dark:text-white font-mono">۲۴۰,۰۰۰ ت</strong>
                </div>
                <div className="bg-white/80 dark:bg-[#1f0714]/80 p-2.5 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22]">
                  <span className="text-[10px] text-stone-500 block mb-0.5">{lang === 'fa' ? 'مبلغ هر قسط:' : 'Monthly:'}</span>
                  <strong className="text-xs font-black text-[#7209b7] dark:text-[#f72585] font-mono">۶۰,۰۰۰ ت</strong>
                </div>
                <div className="bg-white/80 dark:bg-[#1f0714]/80 p-2.5 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22]">
                  <span className="text-[10px] text-stone-500 block mb-0.5">{lang === 'fa' ? 'اقساط باقی‌مانده:' : 'Remaining:'}</span>
                  <strong className="text-xs font-black text-amber-600 font-mono">۳ از ۴ قسط</strong>
                </div>
              </div>
            </div>

            {/* Installments Schedule List */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-black text-[#38040e] dark:text-white flex items-center gap-1.5">
                <Calendar size={16} className="text-[#f72585]" />
                <span>{lang === 'fa' ? 'جدول و تقویم پرداخت اقساط بیمار:' : 'Installment Schedule & Payments:'}</span>
              </h4>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {installmentSchedules.map((inst) => {
                  const isPaid = paidInstallments[inst.id];
                  return (
                    <div
                      key={inst.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#250918] border border-[#ecd3e5] dark:border-[#590d22] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md font-black text-[10px] ${
                            isPaid 
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' 
                              : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          }`}>
                            {isPaid ? (lang === 'fa' ? 'پرداخت شده ✓' : 'Paid ✓') : (lang === 'fa' ? 'سررسید آتی' : 'Upcoming')}
                          </span>
                          <strong className="text-[#590d22] dark:text-white font-black">
                            {lang === 'fa' ? `قسط ${inst.installmentNum} از ${inst.totalInstallments}` : `Installment ${inst.installmentNum}/${inst.totalInstallments}`}
                          </strong>
                          <span className="text-stone-400 font-mono">({inst.orderId})</span>
                        </div>
                        <div className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] flex items-center gap-2">
                          <span>{lang === 'fa' ? 'تاریخ سررسید:' : 'Due Date:'} <strong className="text-[#38040e] dark:text-white">{inst.dueDate}</strong></span>
                          <span>·</span>
                          <span>{inst.pharmacyName}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-[#f3e5f0] dark:border-[#590d22]">
                        <span className="font-mono font-black text-sm text-[#7209b7] dark:text-[#f72585]">
                          {inst.amount.toLocaleString('fa-IR')} تومان
                        </span>

                        {isPaid ? (
                          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1">
                            <Check size={14} />
                            <span>{lang === 'fa' ? 'تسویه شد' : 'Settled'}</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              setPaidInstallments(prev => ({ ...prev, [inst.id]: true }));
                            }}
                            className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white font-bold text-xs hover:opacity-95 shadow-xs cursor-pointer flex items-center gap-1"
                          >
                            <CreditCard size={12} />
                            <span>{lang === 'fa' ? 'پرداخت آنلاین' : 'Pay Now'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: CODE MANAGEMENT */}
        {activeTab === 'code' && (
          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in text-right">
            <div className="bg-gradient-to-r from-[#fff0f5] to-[#fbf2ff] dark:from-[#250918] dark:to-[#38040e] p-4 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22] text-sm text-[#2b091f] dark:text-[#e0b1cb]">
              <div className="flex items-start gap-2">
                <Sparkles className="text-[#f72585] shrink-0 mt-0.5" size={18} />
                <p className="text-xs leading-relaxed text-[#6e5564] dark:text-[#d8b4cc]">
                  {lang === 'fa'
                    ? 'به منظور حفظ کامل حریم خصوصی شما، در مانیتور صف داروخانه هرگز نام شما نمایش داده نمی‌شود و تنها این کد عددی درج می‌گردد.'
                    : 'To ensure complete privacy, your name is never displayed publicly on queue monitors; only your dedicated health code is shown.'}
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-[#38040e] dark:text-white">
                  {lang === 'fa' ? 'کد عددی شخصی شما:' : 'Your Personal Numeric Code:'}
                </label>
                <button
                  type="button"
                  onClick={handleGenerateRandom}
                  className="text-xs text-[#7209b7] dark:text-[#f72585] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw size={13} />
                  <span>{lang === 'fa' ? 'تولید کد رندم جدید' : 'Generate Random Code'}</span>
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  dir="ltr"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value.replace(/\D/g, ''));
                    setError(null);
                  }}
                  maxLength={8}
                  placeholder="مثلاً: 984210"
                  className="w-full text-center tracking-widest text-2xl font-black py-3 px-4 rounded-2xl border-2 border-[#dfc2d7] dark:border-[#590d22] bg-[#fdfbfd] dark:bg-[#250918] text-[#590d22] dark:text-white focus:border-[#7209b7] focus:outline-none"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">#</span>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-300 text-xs font-bold">
                <AlertTriangle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{lang === 'fa' ? 'کد اختصاصی شما با موفقیت در شبکه سلامت تفت ثبت و یکتا شد!' : 'Your dedicated code was successfully registered in Taft E-Health!'}</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#590d22] to-[#7209b7] hover:opacity-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck size={18} />
                <span>{lang === 'fa' ? 'ثبت و ذخیره کد جدید' : 'Save New Code'}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-2xl bg-stone-100 dark:bg-[#2b091f] hover:bg-stone-200 text-stone-700 dark:text-white font-bold text-sm cursor-pointer"
              >
                {lang === 'fa' ? 'انصراف' : 'Cancel'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
