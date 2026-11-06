import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Clock, 
  Store, 
  Search, 
  Filter, 
  Sparkles, 
  CreditCard, 
  ChevronRight,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PrescriptionOrder } from '../types/pharmacy';
import { TAFT_PHARMACIES } from '../data/taftData';

interface LiveOrderQueueProps {
  orders: PrescriptionOrder[];
  currentUserCode: string;
  onSelectOrderToTrack: (order: PrescriptionOrder) => void;
  onOpenInstallment: (order: PrescriptionOrder) => void;
}

export const LiveOrderQueue: React.FC<LiveOrderQueueProps> = ({
  orders,
  currentUserCode,
  onSelectOrderToTrack,
  onOpenInstallment,
}) => {
  const [filterPharmacy, setFilterPharmacy] = useState<string>('all');
  const [searchCode, setSearchCode] = useState<string>('');

  const filteredOrders = orders.filter((order) => {
    const matchesPharmacy = filterPharmacy === 'all' || order.pharmacyId === filterPharmacy;
    const matchesCode = !searchCode || order.patientCode.includes(searchCode) || order.trackingCode.toLowerCase().includes(searchCode.toLowerCase());
    return matchesPharmacy && matchesCode;
  });

  // Dynamic step-by-step badge that updates immediately as pharmacist checks steps (Requirement 6)
  const getStatusBadge = (order: PrescriptionOrder) => {
    const step = order.currentStepIndex;

    switch (step) {
      case 5:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 animate-pulse">
            <CheckCircle2 size={13} />
            آماده تحویل در باجه ۲ دقیقه‌ای ✓
          </span>
        );
      case 4:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
            فاکتور صادر شد (ارسال پیامک با بارکد)
          </span>
        );
      case 3:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-[#fff0f5] dark:bg-[#38040e] text-[#f72585] border border-[#ecd3e5] dark:border-[#7209b7]">
            <span className="w-2 h-2 rounded-full bg-[#f72585] animate-ping" />
            در حال چیدمان و بسته‌بندی محرمانه
          </span>
        );
      case 2:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
            استعلام و رزرو موجودی انبار تفت
          </span>
        );
      case 1:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700">
            بررسی دوز و اصالت بیمه توسط پزشک
          </span>
        );
      case 0:
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
            ثبت اولیه نسخه در سیستم
          </span>
        );
    }
  };

  return (
    <section id="order-queue" className="py-14 bg-[#FCF9F5] dark:bg-[#14030d] relative text-right">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#2b091f] border border-[#e0b1cb] dark:border-[#590d22] text-[#7209b7] dark:text-[#f72585] text-xs font-black mb-3 shadow-xs">
            <Users size={14} className="text-[#f72585]" />
            شفافیت و احترام به نوبت بیماران
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#38040e] dark:text-white">
            صف مانیتورینگ سفارش‌های برخط داروخانه‌های تفت
          </h2>
          <p className="mt-3 text-sm text-[#6e5564] dark:text-[#d8b4cc] font-medium leading-relaxed">
            جهت حفظ کامل حریم خصوصی سلامت، در این مانیتور <strong className="text-[#590d22] dark:text-[#f72585]">هیچ نام و نام‌خانوادگی درج نمی‌شود</strong> و سفارش‌ها صرفاً با <strong className="text-[#7209b7] dark:text-[#f72585]">کد عددی اختصاصی بیمار</strong> نمایش داده می‌شوند.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-[#1f0714] p-4 rounded-3xl border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-md mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Pharmacy Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-[#6e5564] dark:text-[#d8b4cc] ml-2 hidden sm:inline">فیلتر داروخانه:</span>
            <button
              onClick={() => setFilterPharmacy('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterPharmacy === 'all'
                  ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white shadow-xs'
                  : 'bg-[#faf4f8] dark:bg-[#250918] text-[#2b091f] dark:text-[#d8b4cc] hover:bg-[#f7eef7]'
              }`}
            >
              همه داروخانه‌ها ({orders.length})
            </button>
            {TAFT_PHARMACIES.map((p) => (
              <button
                key={p.id}
                onClick={() => setFilterPharmacy(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterPharmacy === p.id
                    ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white shadow-xs'
                    : 'bg-[#faf4f8] dark:bg-[#250918] text-[#2b091f] dark:text-[#d8b4cc] hover:bg-[#f7eef7]'
                }`}
              >
                {p.name.replace('داروخانه', '')}
              </button>
            ))}
          </div>

          {/* Search by Patient Code */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="جستجوی کد عددی یا DFT..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full text-right text-xs font-bold py-2.5 pr-9 pl-4 rounded-xl border border-[#dfc2d7] dark:border-[#590d22] bg-[#fdfbfd] dark:bg-[#250918] text-[#2b091f] dark:text-white focus:border-[#7209b7] focus:outline-none"
            />
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
          </div>

        </div>

        {/* Queue Table */}
        <div className="bg-white dark:bg-[#1f0714] rounded-3xl border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#f7eef7] dark:bg-[#250918] text-[#38040e] dark:text-white font-black border-b border-[#dfc2d7] dark:border-[#590d22]">
                <tr>
                  <th className="p-4">نوبت</th>
                  <th className="p-4">شناسه سفارش</th>
                  <th className="p-4">
                    <span className="flex items-center gap-1.5 text-[#7209b7] dark:text-[#f72585]">
                      <ShieldCheck size={14} />
                      کد اختصاصی سلامت (بیمار)
                    </span>
                  </th>
                  <th className="p-4">داروخانه منتخب تفت</th>
                  <th className="p-4">وضعیت آماده‌سازی گام‌به‌گام</th>
                  <th className="p-4">زمان تحویل</th>
                  <th className="p-4">شیوه تسویه</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3e5f0] dark:divide-[#590d22]">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-stone-500 font-bold">
                      هیچ سفارشی مطابق فیلتر انتخابی یافت نشد.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, idx) => {
                    const isMyOrder = order.patientCode === currentUserCode;
                    return (
                      <tr 
                        key={order.id} 
                        className={`transition-colors ${
                          isMyOrder 
                            ? 'bg-pink-50/70 dark:bg-[#38040e]/60 hover:bg-pink-50 dark:hover:bg-[#38040e] font-bold' 
                            : 'hover:bg-[#fcf9f5] dark:hover:bg-[#250918]'
                        }`}
                      >
                        <td className="p-4 font-black text-stone-500 dark:text-stone-400">
                          {idx + 1}
                        </td>
                        <td className="p-4 font-mono font-bold text-[#590d22] dark:text-[#f72585]">
                          {order.trackingCode}
                        </td>
                        <td className="p-4">
                          <div className="inline-flex items-center gap-1.5 bg-[#f5effb] dark:bg-[#38040e] border border-[#d8b4cc] dark:border-[#7209b7] px-3 py-1 rounded-xl">
                            <span className="text-[#f72585] font-black font-mono text-sm tracking-widest">
                              #{order.patientCode}
                            </span>
                            {isMyOrder && (
                              <span className="bg-[#f72585] text-white text-[9px] px-1.5 py-0.5 rounded-md font-black">
                                شما
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 font-bold text-[#2b091f] dark:text-[#f7eef7]">
                          <span className="flex items-center gap-1">
                            <Store size={13} className="text-[#7209b7] dark:text-[#f72585]" />
                            {order.pharmacyName}
                          </span>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(order)}
                        </td>
                        <td className="p-4 text-[#6e5564] dark:text-[#d8b4cc] font-medium">
                          {order.pickupTime}
                        </td>
                        <td className="p-4">
                          {order.paymentMethod === 'installment' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#fdf0f7] dark:bg-[#38040e] text-[#7209b7] dark:text-[#f72585]">
                              <CreditCard size={11} />
                              اقساط سلامت ({order.installmentMonths || 4} ماهه)
                            </span>
                          ) : order.paymentMethod === 'online' ? (
                            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">آنلاین شتاب</span>
                          ) : (
                            <span className="text-[11px] font-bold text-stone-600 dark:text-stone-300">حضوری در باجه</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => onSelectOrderToTrack(order)}
                              title="مشاهده در پایش زنده"
                              className="p-2 rounded-xl bg-white dark:bg-[#250918] border border-[#dfc2d7] dark:border-[#590d22] hover:border-[#7209b7] text-[#7209b7] hover:text-[#f72585] transition-colors cursor-pointer"
                            >
                              <Eye size={14} />
                            </button>

                            {order.paymentMethod === 'installment' && !order.isInstallmentApproved && (
                              <button
                                onClick={() => onOpenInstallment(order)}
                                className="px-2.5 py-1 rounded-xl bg-[#7209b7] text-white font-bold text-[10px] hover:bg-[#590d22] transition-colors shadow-xs cursor-pointer"
                              >
                                تنظیم اقساط
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
