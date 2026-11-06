import React, { useState, useEffect, useMemo } from 'react';
import { 
  Store, 
  CheckCircle2, 
  Clock, 
  Boxes, 
  Receipt, 
  Send, 
  ShieldCheck, 
  UserCheck, 
  Filter, 
  Sparkles,
  PhoneCall,
  Printer,
  ChevronDown,
  ChevronLeft,
  Search,
  MessageSquare,
  Lock,
  ArrowLeft,
  RotateCcw,
  Check,
  ShoppingBag
} from 'lucide-react';
import { Pharmacy, PrescriptionOrder } from '../types/pharmacy';
import { TAFT_PHARMACIES } from '../data/taftData';

interface PharmacyAdminPanelProps {
  orders: PrescriptionOrder[];
  selectedPharmacyId: string;
  onUpdateOrderStatus: (orderId: string, newStepIndex: number) => void;
  onOpenInstallmentForOrder?: (order: PrescriptionOrder) => void;
  lang?: 'fa' | 'en';
}

export const PharmacyAdminPanel: React.FC<PharmacyAdminPanelProps> = ({
  orders,
  selectedPharmacyId,
  onUpdateOrderStatus,
  onOpenInstallmentForOrder,
  lang = 'fa',
}) => {
  // Pharmacy tab - automatically synced with user selection
  const [activePharmacyId, setActivePharmacyId] = useState<string>(selectedPharmacyId);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  // Search & Status filters for online orders queue
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isOtherPharmaciesOpen, setIsOtherPharmaciesOpen] = useState<boolean>(false);
  const [smsResentToast, setSmsResentToast] = useState<boolean>(false);

  // Keep in sync when user registers order for another pharmacy
  useEffect(() => {
    setActivePharmacyId(selectedPharmacyId);
  }, [selectedPharmacyId]);

  // Top 3 popular pharmacies
  const TOP_3_IDS = ['biuki', 'mahmoudi', 'dehghani'];
  const top3Pharmacies = TAFT_PHARMACIES.filter(p => TOP_3_IDS.includes(p.id));
  const otherPharmacies = TAFT_PHARMACIES.filter(p => !TOP_3_IDS.includes(p.id));

  const activePharmacy = TAFT_PHARMACIES.find(p => p.id === activePharmacyId) || TAFT_PHARMACIES[0];
  const pharmacyOrders = orders.filter(o => o.pharmacyId === activePharmacyId);

  // Filtered orders in queue
  const filteredOrders = useMemo(() => {
    return pharmacyOrders.filter(order => {
      // Status filter
      if (statusFilter !== 'all') {
        const stepNum = parseInt(statusFilter, 10);
        if (!isNaN(stepNum) && order.currentStepIndex !== stepNum) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesCode = order.trackingCode.toLowerCase().includes(q);
        const matchesPatientCode = order.patientCode.toLowerCase().includes(q);
        const matchesNationalId = order.patientNationalId ? order.patientNationalId.includes(q) : false;
        const matchesPhone = order.patientPhone ? order.patientPhone.includes(q) : false;
        return matchesCode || matchesPatientCode || matchesNationalId || matchesPhone;
      }

      return true;
    });
  }, [pharmacyOrders, statusFilter, searchQuery]);

  // Default selected order
  const selectedOrder = filteredOrders.find(o => o.id === selectedOrderId) 
    || pharmacyOrders.find(o => o.id === selectedOrderId)
    || filteredOrders[0] 
    || pharmacyOrders[0] 
    || null;

  const STEPS = [
    { index: 0, title: lang === 'fa' ? 'ثبت سفارش اولیه' : 'Order Registered', desc: lang === 'fa' ? 'دریافت نسخه از بیمار' : 'Patient submitted prescription' },
    { index: 1, title: lang === 'fa' ? 'بررسی دوز پزشک' : 'Doctor Dose Review', desc: lang === 'fa' ? 'تطابق بالینی و تایید داروساز' : 'Clinical validation & approval' },
    { index: 2, title: lang === 'fa' ? 'کنترل انبار تفت' : 'Inventory Control', desc: lang === 'fa' ? 'رزرو اقلام از موجودی قفسه' : 'Stock reserved in pharmacy' },
    { index: 3, title: lang === 'fa' ? 'چیدمان و بسته' : 'Medication Packing', desc: lang === 'fa' ? 'بسته‌بندی و الصاق بارکد' : 'Packing & barcode labeling' },
    { index: 4, title: lang === 'fa' ? 'صدور فاکتور و پیامک' : 'Invoice & SMS Issued', desc: lang === 'fa' ? 'محاسبه بیمه و ارسال پیامک' : 'Insurance calculated & SMS sent' },
    { index: 5, title: lang === 'fa' ? 'آماده تحویل باجه اکسپرس' : 'Ready for Express Pickup', desc: lang === 'fa' ? 'تحویل ۲ دقیقه‌ای بدون صف' : '2-minute queue-free pickup' },
  ];

  const getStepBadge = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: return { label: lang === 'fa' ? 'ثبت اولیه' : 'Registered', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' };
      case 1: return { label: lang === 'fa' ? 'بررسی دوز' : 'Dose Review', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' };
      case 2: return { label: lang === 'fa' ? 'کنترل انبار' : 'Inventory', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' };
      case 3: return { label: lang === 'fa' ? 'چیدمان و بسته' : 'Packing', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' };
      case 4: return { label: lang === 'fa' ? 'صدور فاکتور' : 'Invoiced', color: 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300' };
      case 5: return { label: lang === 'fa' ? 'آماده تحویل' : 'Ready', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' };
      default: return { label: lang === 'fa' ? 'در حال اقدام' : 'In Progress', color: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300' };
    }
  };

  const getNextActionText = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return lang === 'fa' ? 'تأیید نسخه و شروع بررسی دوز توسط پزشک (گام ۱) ➔' : 'Confirm Prescription & Begin Dose Review (Step 1) ➔';
      case 1:
        return lang === 'fa' ? 'تأیید دوز و آغاز استعلام موجودی انبار تفت (گام ۲) ➔' : 'Confirm Dose & Check Taft Inventory (Step 2) ➔';
      case 2:
        return lang === 'fa' ? 'تأیید موجودی و ارسال به میز چیدمان و بسته‌بندی (گام ۳) ➔' : 'Confirm Stock & Send to Packing Station (Step 3) ➔';
      case 3:
        return lang === 'fa' ? 'تأیید بسته‌بندی دارو و صدور فاکتور و ارسال پیامک (گام ۴) ➔' : 'Confirm Packing, Issue Invoice & Send SMS (Step 4) ➔';
      case 4:
        return lang === 'fa' ? 'اعلام آماده‌سازی نهایی و انتقال به باجه اکسپرس ۲ دقیقه‌ای (گام ۵) ★' : 'Final Ready: Transfer to 2-Min Express Counter (Step 5) ★';
      default:
        return lang === 'fa' ? 'کلیه مراحل تکمیل شده است ✓' : 'All Steps Completed ✓';
    }
  };

  const handleResendSms = () => {
    setSmsResentToast(true);
    setTimeout(() => setSmsResentToast(false), 3500);
  };

  return (
    <section id="pharmacy-panel" className="py-6 bg-white dark:bg-[#14030d] relative text-right">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdf0f7] dark:bg-[#38040e] border border-[#e0b1cb] dark:border-[#7209b7] text-[#590d22] dark:text-[#f72585] text-xs font-black mb-3">
            <Store size={14} className="text-[#f72585]" />
            {lang === 'fa' ? 'کارتابل متصدیان و داروسازان تفت' : 'Taft Pharmacist Operations Desk'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#38040e] dark:text-white">
            {lang === 'fa' ? 'پنل تریاژ و مدیریت داروخانه‌ها' : 'Pharmacy Triage & Order Management'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#6e5564] dark:text-[#d8b4cc] font-medium leading-relaxed">
            {lang === 'fa' 
              ? 'داروسازان محترم تفت می‌توانند سفارش‌ها را به صورت گام‌به‌گام بررسی، تأیید دوز، کنترل موجودی، صدور پیامک و به باجه اکسپرس ۲ دقیقه‌ای هدایت فرمایند.' 
              : 'Pharmacists in Taft can progressively review doses, check local inventory, issue transparent invoices, trigger instant SMS alerts, and route to express 2-min pickup.'}
          </p>
        </div>

        {/* 1. TOP PHARMACY SELECTOR: TOP 3 POPULAR + SEARCH/DROPDOWN FOR OTHERS (Requirement 6) */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {/* Top 3 Popular Pharmacies */}
            {top3Pharmacies.map((pharmacy) => {
              const isTabActive = activePharmacyId === pharmacy.id;
              const count = orders.filter(o => o.pharmacyId === pharmacy.id).length;
              return (
                <button
                  key={pharmacy.id}
                  onClick={() => {
                    setActivePharmacyId(pharmacy.id);
                    setSelectedOrderId(null);
                  }}
                  className={`py-3 px-5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border-2 cursor-pointer ${
                    isTabActive
                      ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-lg shadow-[#590d22]/20 scale-[1.02]'
                      : 'bg-[#faf4f8] dark:bg-[#1f0714] text-[#2b091f] dark:text-[#d8b4cc] border-[#ecd3e5] dark:border-[#590d22] hover:bg-white'
                  }`}
                >
                  <Store size={15} className={isTabActive ? 'text-white' : 'text-[#f72585]'} />
                  <span>{pharmacy.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isTabActive ? 'bg-white/20 text-white' : 'bg-[#ecd3e5] dark:bg-[#38040e] text-[#590d22] dark:text-[#f72585]'
                  }`}>
                    {count} {lang === 'fa' ? 'سفارش' : 'orders'}
                  </span>
                </button>
              );
            })}

            {/* Other Pharmacies Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsOtherPharmaciesOpen(!isOtherPharmaciesOpen)}
                className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border-2 cursor-pointer ${
                  otherPharmacies.some(p => p.id === activePharmacyId)
                    ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-lg scale-[1.02]'
                    : 'bg-[#faf4f8] dark:bg-[#1f0714] text-[#2b091f] dark:text-[#d8b4cc] border-[#ecd3e5] dark:border-[#590d22] hover:bg-white'
                }`}
              >
                <span>
                  {otherPharmacies.some(p => p.id === activePharmacyId)
                    ? activePharmacy.name
                    : (lang === 'fa' ? 'سایر داروخانه‌های تفت...' : 'Other Taft Pharmacies...')}
                </span>
                <ChevronDown size={14} className={`transition-transform ${isOtherPharmaciesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isOtherPharmaciesOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-[#1f0714] rounded-2xl p-2 border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-2xl z-30 space-y-1 animate-fade-in text-right">
                  <span className="text-[10px] font-black text-stone-400 px-3 py-1 block">
                    {lang === 'fa' ? 'سایر مراکز همکار در شهرستان تفت:' : 'Other collaborating centers in Taft:'}
                  </span>
                  {otherPharmacies.map((pharmacy) => {
                    const isSelected = activePharmacyId === pharmacy.id;
                    const count = orders.filter(o => o.pharmacyId === pharmacy.id).length;
                    return (
                      <button
                        key={pharmacy.id}
                        onClick={() => {
                          setActivePharmacyId(pharmacy.id);
                          setSelectedOrderId(null);
                          setIsOtherPharmaciesOpen(false);
                        }}
                        className={`w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between text-right cursor-pointer ${
                          isSelected
                            ? 'bg-[#fdf0f7] dark:bg-[#38040e] text-[#f72585] font-black'
                            : 'hover:bg-[#faf4f8] dark:hover:bg-[#2b091f] text-[#2b091f] dark:text-[#d8b4cc]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Store size={14} className="text-[#7209b7]" />
                          <span>{pharmacy.name}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ecd3e5] dark:bg-[#38040e] text-[#590d22] dark:text-[#f72585]">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Active Pharmacy Info Banner */}
        <div className="bg-[#fcf9f5] dark:bg-[#1f0714] p-4 sm:p-5 rounded-3xl border border-[#ecd3e5] dark:border-[#590d22] mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-right">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-base font-black text-[#38040e] dark:text-white">{activePharmacy.name}</h3>
              <span className="text-xs text-[#7209b7] dark:text-[#f72585] font-bold">({activePharmacy.pharmacist})</span>
            </div>
            <p className="text-xs text-[#6e5564] dark:text-[#d8b4cc]">
              {activePharmacy.address} | {lang === 'fa' ? 'تلفن هماهنگی:' : 'Phone:'} {activePharmacy.phone}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
              {lang === 'fa' ? 'ساعت کاری:' : 'Hours:'} {activePharmacy.hours}
            </span>
          </div>
        </div>

        {/* MAIN WORK AREA: ORDER QUEUE (LEFT 5 COLS) & ORDER DETAIL CONSOLE (RIGHT 7 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 2. صف سفارش‌های آنلاین (Requirement 6: Matching Screenshot) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#1f0714] rounded-3xl p-5 border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-sm space-y-4">
            
            {/* Queue Header: Badge + Status Dropdown */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-[#f72585]" />
                <h4 className="text-sm font-black text-[#38040e] dark:text-white">
                  {lang === 'fa' ? 'صف سفارش‌های آنلاین' : 'Online Orders Queue'}
                </h4>
                <span className="w-6 h-6 rounded-full bg-[#fdf0f7] dark:bg-[#38040e] text-[#f72585] font-black text-xs flex items-center justify-center border border-[#ecd3e5] dark:border-[#7209b7]">
                  {pharmacyOrders.length}
                </span>
              </div>

              {/* Status Filter Dropdown */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#faf4f8] dark:bg-[#250918] text-xs font-bold text-[#590d22] dark:text-[#f72585] py-1.5 px-3 rounded-xl border border-[#dfc2d7] dark:border-[#590d22] focus:outline-none cursor-pointer"
                >
                  <option value="all">{lang === 'fa' ? 'همه وضعیت‌ها ⌵' : 'All Statuses ⌵'}</option>
                  <option value="0">{lang === 'fa' ? '۱. ثبت اولیه' : '1. Registered'}</option>
                  <option value="1">{lang === 'fa' ? '۲. بررسی دوز پزشک' : '2. Dose Review'}</option>
                  <option value="2">{lang === 'fa' ? '۳. کنترل انبار تفت' : '3. Inventory'}</option>
                  <option value="3">{lang === 'fa' ? '۴. چیدمان و بسته' : '4. Packing'}</option>
                  <option value="4">{lang === 'fa' ? '۵. صدور فاکتور و پیامک' : '5. Invoiced'}</option>
                  <option value="5">{lang === 'fa' ? '۶. آماده باجه اکسپرس' : '6. Ready'}</option>
                </select>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'fa' ? 'جستجو با کدملی، نام یا کد رهگیری...' : 'Search by national ID, name or tracking code...'}
                className="w-full bg-[#faf4f8] dark:bg-[#250918] text-xs text-[#38040e] dark:text-white placeholder-[#a88a9e] rounded-xl pr-9 pl-4 py-2.5 border border-[#dfc2d7] dark:border-[#590d22] focus:outline-none focus:border-[#f72585]"
              />
              <Search size={15} className="absolute right-3 top-3 text-[#a88a9e]" />
            </div>

            {/* Cards List */}
            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-0.5">
              {filteredOrders.length === 0 ? (
                <div className="bg-[#faf4f8] dark:bg-[#250918] p-8 rounded-2xl border-2 border-dashed border-[#dfc2d7] dark:border-[#590d22] text-center text-xs text-[#6e5564] dark:text-[#d8b4cc] font-bold">
                  {lang === 'fa' ? 'سفارشی با این فیلتر یافت نشد.' : 'No orders match this filter.'}
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const isSelected = selectedOrder?.id === order.id;
                  const statusInfo = getStepBadge(order.currentStepIndex);
                  return (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrderId(order.id)}
                      className={`cursor-pointer rounded-2xl p-3.5 border-2 transition-all text-right ${
                        isSelected
                          ? 'bg-[#fff0f5] dark:bg-[#38040e] border-[#f72585] shadow-md shadow-[#f72585]/15 scale-[1.01]'
                          : 'bg-white dark:bg-[#1f0714] border-[#ecd3e5] dark:border-[#590d22] hover:bg-[#faf4f8] dark:hover:bg-[#2b091f]'
                      }`}
                    >
                      {/* Card Row 1: Tracking code + Patient code */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm text-[#590d22] dark:text-[#f72585]">{order.trackingCode}</span>
                          <span className="px-2 py-0.5 rounded-lg bg-[#f3e5f5] dark:bg-[#250918] text-[#7209b7] dark:text-[#f72585] font-mono font-black text-xs">
                            #{order.patientCode}
                          </span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>

                      {/* Card Row 2: Medications count + Time */}
                      <div className="flex items-center justify-between text-xs text-[#6e5564] dark:text-[#d8b4cc] py-1">
                        <span>{order.items.length} {lang === 'fa' ? 'قلم دارو تجویزی' : 'items'}</span>
                        <span className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
                          <Clock size={11} />
                          {order.createdAt}
                        </span>
                      </div>

                      {/* Card Row 3: Price in Pink */}
                      <div className="mt-2 pt-2 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between text-xs">
                        <span className="text-[11px] text-[#7209b7] dark:text-[#f72585] font-bold">
                          {lang === 'fa' ? `گام ${order.currentStepIndex + 1} از ۶` : `Step ${order.currentStepIndex + 1} of 6`}
                        </span>
                        <strong className="text-sm font-black text-[#f72585]">
                          {order.finalAmount.toLocaleString('fa-IR')} {lang === 'fa' ? 'تومان' : 'Toman'}
                        </strong>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* 3. ACTIVE ORDER PHARMACIST CONSOLE (RIGHT 7 COLS) */}
          <div className="lg:col-span-7">
            {selectedOrder ? (
              <div className="bg-[#fcf9f5] dark:bg-[#1f0714] rounded-3xl p-6 sm:p-7 border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-lg text-right space-y-6">
                
                {/* Header of Active Order */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#ebd4e5] dark:border-[#590d22]">
                  <div>
                    <span className="text-[11px] font-bold text-[#6e5564] dark:text-[#d8b4cc] block">
                      {lang === 'fa' ? 'بررسی و صدور نسخه فعال:' : 'Active Prescription Inspection:'}
                    </span>
                    <h4 className="text-lg font-black text-[#38040e] dark:text-white flex items-center gap-2">
                      <span>{lang === 'fa' ? 'سفارش' : 'Order'} {selectedOrder.trackingCode}</span>
                      <span className="px-2.5 py-0.5 rounded-xl bg-[#7209b7] text-white text-xs font-mono font-bold">
                        #{selectedOrder.patientCode}
                      </span>
                    </h4>
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-[#6e5564] dark:text-[#d8b4cc] block">
                      {lang === 'fa' ? 'زمان مراجعه دلخواه:' : 'Pickup Time:'}
                    </span>
                    <strong className="text-xs font-bold text-[#590d22] dark:text-[#f72585]">{selectedOrder.pickupTime}</strong>
                  </div>
                </div>

                {/* 4. GREEN SMS NOTIFICATION BANNER (Requirement 6: Matching Screenshot) */}
                {selectedOrder.currentStepIndex >= 4 && (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs space-y-2.5 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <MessageSquare size={15} />
                        </div>
                        <span className="font-black text-xs text-emerald-950 dark:text-emerald-100">
                          {lang === 'fa' 
                            ? `پیامک به شماره ${selectedOrder.patientPhone || '۰۹۱۳۱۵۲۴۴۸۰'} ارسال شد:`
                            : `SMS sent to ${selectedOrder.patientPhone || '09131524480'}:`}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-100">
                        {lang === 'fa' ? 'ارسال موفق ✓' : 'Sent ✓'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/90 dark:bg-[#14030d]/80 border border-emerald-200 dark:border-emerald-800 text-[11px] leading-relaxed font-medium">
                      {lang === 'fa'
                        ? `«همشهری گرامی، داروی شما در ${activePharmacy.name} آماده است. با کد ${selectedOrder.trackingCode} به باجه اکسپرس مراجعه فرمایید.»`
                        : `«Dear citizen, your prescription is prepared at ${activePharmacy.name}. Please present code ${selectedOrder.trackingCode} at the 2-minute express counter.»`}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400">
                        {lang === 'fa' ? 'سامانه پیام‌کوتاه تفت | شناسه رهگیری پیام: SMS-88912' : 'Taft SMS Gateway | Ref ID: SMS-88912'}
                      </span>
                      <button
                        onClick={handleResendSms}
                        className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 underline hover:no-underline cursor-pointer"
                      >
                        {smsResentToast 
                          ? (lang === 'fa' ? '✓ پیامک مجدداً مخابره شد' : '✓ SMS Resent')
                          : (lang === 'fa' ? 'ارسال مجدد پیامک' : 'Resend SMS')}
                      </button>
                    </div>
                  </div>
                )}

                {/* Items Table */}
                <div>
                  <h5 className="text-xs font-black text-[#590d22] dark:text-[#f72585] mb-2 flex items-center gap-1.5">
                    <Boxes size={14} className="text-[#7209b7]" />
                    {lang === 'fa' ? 'اقلام نسخه جهت کنترل موجودی و چیدمان:' : 'Prescription Items for Inventory & Packing:'}
                  </h5>
                  <div className="bg-white dark:bg-[#250918] rounded-2xl border border-[#dfc2d7] dark:border-[#590d22] overflow-hidden">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-[#f7eef7] dark:bg-[#38040e] text-[#38040e] dark:text-white font-black">
                        <tr>
                          <th className="p-3">{lang === 'fa' ? 'نام دارو' : 'Drug Name'}</th>
                          <th className="p-3">{lang === 'fa' ? 'دوز / شکل' : 'Dosage'}</th>
                          <th className="p-3">{lang === 'fa' ? 'دستور مصرف' : 'Instructions'}</th>
                          <th className="p-3">{lang === 'fa' ? 'قیمت مصوب' : 'Price'}</th>
                          <th className="p-3 text-center">{lang === 'fa' ? 'وضعیت انبار' : 'Stock'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f3e5f0] dark:divide-[#590d22]">
                        {selectedOrder.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-3 font-bold text-[#38040e] dark:text-white">{item.name}</td>
                            <td className="p-3 text-[#6e5564] dark:text-[#d8b4cc]">{item.dosage}</td>
                            <td className="p-3 text-[#6e5564] dark:text-[#d8b4cc]">{item.instructions}</td>
                            <td className="p-3 font-bold text-[#7209b7] dark:text-[#f72585]">{item.priceEstimate.toLocaleString('fa-IR')} ت</td>
                            <td className="p-3 text-center">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                                {lang === 'fa' ? 'تأیید موجودی' : 'In Stock'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Financial Summary & Payment Breakdown */}
                <div className="bg-white dark:bg-[#250918] p-4 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22] space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[#6e5564] dark:text-[#d8b4cc]">
                    <span>{lang === 'fa' ? 'کل مبلغ ناخالص نسخه:' : 'Gross Total:'}</span>
                    <strong className="text-[#2b091f] dark:text-white">{selectedOrder.finalAmount.toLocaleString('fa-IR')} {lang === 'fa' ? 'تومان' : 'Toman'}</strong>
                  </div>
                  <div className="flex justify-between items-center text-[#6e5564] dark:text-[#d8b4cc]">
                    <span>{lang === 'fa' ? 'سهم پرداختی بیمه سلامت / تأمین اجتماعی:' : 'Insurance Share:'}</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">{selectedOrder.insuranceShare.toLocaleString('fa-IR')} {lang === 'fa' ? 'تومان-' : 'Toman-'}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#f3e5f0] dark:border-[#590d22] text-sm font-black text-[#590d22] dark:text-[#f72585]">
                    <span>{lang === 'fa' ? 'سهم خالص بیمار:' : 'Patient Share:'}</span>
                    <span>{selectedOrder.patientShare.toLocaleString('fa-IR')} {lang === 'fa' ? 'تومان' : 'Toman'}</span>
                  </div>

                  {selectedOrder.paymentMethod === 'installment' && (
                    <div className="p-2.5 bg-[#fdf0f7] dark:bg-[#38040e] rounded-xl border border-[#e0b1cb] dark:border-[#7209b7] flex items-center justify-between mt-2">
                      <span className="text-[11px] font-bold text-[#7209b7] dark:text-white">
                        {lang === 'fa' 
                          ? `طرح تقسیط ${selectedOrder.installmentMonths || 4} ماهه انتخاب شده است:`
                          : `${selectedOrder.installmentMonths || 4}-Month Installment Plan Active:`}
                      </span>
                      {onOpenInstallmentForOrder && (
                        <button
                          onClick={() => onOpenInstallmentForOrder(selectedOrder)}
                          className="px-2.5 py-1 rounded-lg bg-[#7209b7] text-white text-[10px] font-black hover:bg-[#590d22] cursor-pointer"
                        >
                          {lang === 'fa' ? 'مشاهده و ویرایش اقساط' : 'View Installments'}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* 5. STEP-BY-STEP PROGRESSIVE WORKFLOW (Requirement 6: Step by Step, Not all buttons exposed at once) */}
                <div className="pt-4 border-t border-[#ebd4e5] dark:border-[#590d22] space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-[#38040e] dark:text-white block">
                        {lang === 'fa' ? 'گردش‌کار مرحله‌به‌مرحله داروساز:' : 'Pharmacist Step-by-Step Workflow:'}
                      </span>
                      <span className="text-[10px] text-[#6e5564] dark:text-[#d8b4cc]">
                        {lang === 'fa' 
                          ? 'هر مرحله پس از تأیید کامل، گام بعدی را فعال می‌نماید.' 
                          : 'Each step activates the next only after clinical confirmation.'}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-xl bg-[#fdf0f7] dark:bg-[#38040e] text-[#f72585] text-xs font-black border border-[#ecd3e5] dark:border-[#7209b7]">
                      {lang === 'fa' ? `گام فعال: ${selectedOrder.currentStepIndex + 1} از ۶` : `Active Step: ${selectedOrder.currentStepIndex + 1} of 6`}
                    </span>
                  </div>

                  {/* Stepper Checklist Visualization */}
                  <div className="space-y-2">
                    {STEPS.map((step) => {
                      const isCompleted = selectedOrder.currentStepIndex > step.index;
                      const isCurrent = selectedOrder.currentStepIndex === step.index;
                      const isPending = selectedOrder.currentStepIndex < step.index;

                      return (
                        <div
                          key={step.index}
                          className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                            isCurrent
                              ? 'bg-gradient-to-r from-[#fdf0f7] to-white dark:from-[#38040e] dark:to-[#1f0714] border-[#f72585] shadow-sm'
                              : isCompleted
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                              : 'bg-[#faf4f8]/50 dark:bg-[#250918]/30 border-dashed border-[#dfc2d7] dark:border-[#590d22]/50 opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                              isCompleted
                                ? 'bg-emerald-500 text-white'
                                : isCurrent
                                ? 'bg-[#f72585] text-white animate-pulse'
                                : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                            }`}>
                              {isCompleted ? <Check size={14} /> : isPending ? <Lock size={12} /> : step.index + 1}
                            </div>
                            <div>
                              <h6 className={`text-xs font-black ${
                                isCurrent
                                  ? 'text-[#590d22] dark:text-[#f72585]'
                                  : isCompleted
                                  ? 'text-emerald-900 dark:text-emerald-200'
                                  : 'text-stone-500 dark:text-stone-400'
                              }`}>
                                {step.title}
                              </h6>
                              <span className="text-[10px] text-[#6e5564] dark:text-[#d8b4cc] block">
                                {step.desc}
                              </span>
                            </div>
                          </div>

                          <div>
                            {isCompleted && (
                              <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-lg">
                                {lang === 'fa' ? 'انجام شد ✓' : 'Done ✓'}
                              </span>
                            )}
                            {isCurrent && (
                              <span className="text-[10px] font-black text-[#f72585] bg-[#fdf0f7] dark:bg-[#38040e] px-2 py-0.5 rounded-lg border border-[#f72585]/30">
                                {lang === 'fa' ? 'در انتظار اقدام' : 'Action Required'}
                              </span>
                            )}
                            {isPending && (
                              <span className="text-[10px] text-stone-400 flex items-center gap-1">
                                <Lock size={10} />
                                {lang === 'fa' ? 'قفل' : 'Locked'}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Primary Progressive Action Button */}
                  <div className="pt-2">
                    {selectedOrder.currentStepIndex < 5 ? (
                      <button
                        onClick={() => onUpdateOrderStatus(selectedOrder.id, selectedOrder.currentStepIndex + 1)}
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#f72585] to-[#7209b7] hover:from-[#590d22] hover:to-[#f72585] text-white font-black text-sm shadow-xl shadow-[#f72585]/20 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Sparkles size={16} />
                        <span>{getNextActionText(selectedOrder.currentStepIndex)}</span>
                      </button>
                    ) : (
                      <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-emerald-900 dark:text-emerald-200 font-black text-sm">
                          <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                          <span>{lang === 'fa' ? 'سفارش در باجه ۲ دقیقه‌ای تفت آماده تحویل به بیمار است!' : 'Order is ready at the 2-minute express counter!'}</span>
                        </div>
                        <p className="text-xs text-emerald-800 dark:text-emerald-300">
                          {lang === 'fa' 
                            ? 'بیمار با ارائه کد عددی بدون معطلی و در کمتر از ۲ دقیقه داروی خود را دریافت می‌نماید.' 
                            : 'Patient presents numeric code to receive medication in under 2 minutes.'}
                        </p>
                        <button
                          onClick={() => onUpdateOrderStatus(selectedOrder.id, 0)}
                          className="mt-2 py-1.5 px-3 rounded-xl bg-white dark:bg-black/30 hover:bg-emerald-50 text-[11px] font-bold text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center gap-1 mx-auto cursor-pointer"
                        >
                          <RotateCcw size={12} />
                          <span>{lang === 'fa' ? 'بازنشانی گام‌ها (جهت شبیه‌سازی مجدد دمو)' : 'Reset steps for demo'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            ) : (
              <div className="bg-[#faf4f8] dark:bg-[#1f0714] p-12 rounded-3xl border-2 border-dashed border-[#dfc2d7] dark:border-[#590d22] text-center text-xs text-[#6e5564] dark:text-[#d8b4cc] font-bold">
                {lang === 'fa' 
                  ? 'یک سفارش را از صف سمت راست انتخاب کنید تا جزئیات داروها و پیش‌فاکتور نمایش یابد.' 
                  : 'Select an order from the queue to inspect drugs and invoices.'}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
