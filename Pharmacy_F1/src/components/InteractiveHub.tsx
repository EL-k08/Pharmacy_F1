import React, { useState } from 'react';
import { 
  Activity, 
  Send, 
  Users, 
  Store, 
  Calculator, 
  ArrowRight, 
  Sparkles,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { LiveTrackingSection } from './LiveTrackingSection';
import { PrescriptionSection } from './PrescriptionSection';
import { LiveOrderQueue } from './LiveOrderQueue';
import { PharmacyAdminPanel } from './PharmacyAdminPanel';
import { ServicesSection } from './ServicesSection';
import { PrescriptionOrder } from '../types/pharmacy';

interface InteractiveHubProps {
  onBackToHome: () => void;
  patientCode: string;
  orders: PrescriptionOrder[];
  activeTrackingOrder: PrescriptionOrder | null;
  focusedPharmacyId: string;
  onOrderCreated: (newOrder: PrescriptionOrder, triggerInstallmentModal?: boolean) => void;
  onOpenInstallmentForOrder: (order: PrescriptionOrder) => void;
  onUpdateOrderStatus: (orderId: string, newStepIndex: number) => void;
  onSelectOrderToTrack: (order: PrescriptionOrder) => void;
  initialTab?: 'tracking' | 'prescription' | 'queue' | 'pharmacy' | 'services';
  lang?: 'fa' | 'en';
}

export const InteractiveHub: React.FC<InteractiveHubProps> = ({
  onBackToHome,
  patientCode,
  orders,
  activeTrackingOrder,
  focusedPharmacyId,
  onOrderCreated,
  onOpenInstallmentForOrder,
  onUpdateOrderStatus,
  onSelectOrderToTrack,
  initialTab = 'tracking',
  lang = 'fa',
}) => {
  const [activeTab, setActiveTab] = useState<'tracking' | 'prescription' | 'queue' | 'pharmacy' | 'services'>(initialTab);

  const TABS = [
    {
      id: 'tracking' as const,
      title: lang === 'fa' ? 'پایش زنده نوبت بدون صف' : 'Live Queue Tracking',
      subtitle: lang === 'fa' ? 'رهگیری گام‌به‌گام باجه' : 'Step-by-step progress',
      icon: Activity,
    },
    {
      id: 'prescription' as const,
      title: lang === 'fa' ? 'ثبت نسخه و OCR هوشمند' : 'Prescription & AI OCR',
      subtitle: lang === 'fa' ? 'ورود کد رهگیری یا عکس' : 'Online submission',
      icon: Send,
    },
    {
      id: 'queue' as const,
      title: lang === 'fa' ? 'صف سفارشات (کد عددی)' : 'Anonymous Orders Queue',
      subtitle: lang === 'fa' ? 'مانیتورینگ عمومی بدون نام' : 'Privacy-first queue',
      icon: Users,
    },
    {
      id: 'pharmacy' as const,
      title: lang === 'fa' ? 'پنل داروخانه‌ها' : 'Pharmacy Admin Panel',
      subtitle: lang === 'fa' ? 'میز کار داروساز و صدور فاکتور' : 'Pharmacist console',
      icon: Store,
    },
    {
      id: 'services' as const,
      title: lang === 'fa' ? 'خدمات اقساط و مکمل' : 'Installment & Services',
      subtitle: lang === 'fa' ? 'صندوق مهربانی و وام سلامت' : 'BNPL & Charity fund',
      icon: Calculator,
    },
  ];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      
      {/* MOBILE COMPACT HEADER (Visible on small screens) */}
      <div className="lg:hidden mb-6 space-y-3">
        <div className="bg-white dark:bg-[#1f0714] rounded-2xl p-4 border border-[#ecd3e5] dark:border-[#590d22] flex items-center justify-between text-right">
          <div>
            <h2 className="text-sm font-black text-[#38040e] dark:text-white flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f72585] animate-ping" />
              <span>{lang === 'fa' ? 'کارتابل دمو تعاملی داروتفت' : 'Taft Interactive Hub'}</span>
            </h2>
          </div>
          <button
            onClick={onBackToHome}
            className="py-1.5 px-3 rounded-xl bg-[#faf4f8] dark:bg-[#38040e] text-xs font-bold text-[#590d22] dark:text-[#f72585] flex items-center gap-1 border border-[#e0b1cb] dark:border-[#7209b7]"
          >
            <ArrowRight size={14} />
            <span>{lang === 'fa' ? 'صفحه اصلی' : 'Home'}</span>
          </button>
        </div>

        {/* Mobile horizontal scrolling chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-md'
                    : 'bg-white dark:bg-[#1f0714] text-[#2b091f] dark:text-[#d8b4cc] border-[#ecd3e5] dark:border-[#590d22]'
                }`}
              >
                <Icon size={14} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DESKTOP SPLIT LAYOUT: CONTENT ON RIGHT/CENTER, SLEEK NAVIGATION DOCK ON THE LEFT */}
      {/* In RTL: flex-row-reverse places the dock on the physical LEFT side, leaving the right side open! */}
      <div className="flex flex-col lg:flex-row-reverse lg:items-start lg:gap-8">
        
        {/* LEFT SIDE DOCK (Requirement 2: Sleek, non-obstructive left navigation) */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-24 space-y-4 text-right">
          
          {/* Left Dock Header Card */}
          <div className="bg-white/95 dark:bg-[#1f0714]/95 backdrop-blur-md rounded-3xl p-5 border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#f3e5f0] dark:border-[#590d22]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f72585] animate-ping" />
                <h3 className="text-sm font-black text-[#38040e] dark:text-white">
                  {lang === 'fa' ? 'کارتابل عملیاتی' : 'Operations Hub'}
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fdf0f7] dark:bg-[#38040e] text-[#f72585]">
                {lang === 'fa' ? 'تفت و یزد' : 'Taft'}
              </span>
            </div>

            <p className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc] leading-relaxed font-medium">
              {lang === 'fa' 
                ? 'سامانه‌های اجرایی خدمات داروخانه و بیماران در شهرستان تفت' 
                : 'Execution sub-systems for pharmacies and patients'}
            </p>

            <button
              onClick={onBackToHome}
              className="w-full py-2.5 px-3 rounded-2xl bg-[#faf4f8] dark:bg-[#38040e] hover:bg-[#f7eef7] dark:hover:bg-[#590d22] text-xs font-black text-[#590d22] dark:text-[#f72585] border border-[#e0b1cb] dark:border-[#7209b7] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <ArrowRight size={14} />
              <span>{lang === 'fa' ? 'بازگشت به صفحه اصلی' : 'Back to Home'}</span>
            </button>
          </div>

          {/* 5 Vertical Subpage Navigation Buttons */}
          <div className="bg-white/95 dark:bg-[#1f0714]/95 backdrop-blur-md rounded-3xl p-3 border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-md space-y-2">
            <span className="text-[10px] font-black text-stone-400 dark:text-stone-500 px-3 block pt-1">
              {lang === 'fa' ? 'بخش‌های اجرایی سامانه:' : 'Subsystems Menu:'}
            </span>

            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full p-3 rounded-2xl text-right transition-all flex items-center justify-between border-2 cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white border-transparent shadow-lg shadow-[#590d22]/20 scale-[1.02]'
                      : 'bg-[#faf4f8] dark:bg-[#250918]/60 text-[#2b091f] dark:text-[#d8b4cc] border-[#ecd3e5] dark:border-[#590d22] hover:bg-white dark:hover:bg-[#2b091f]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white dark:bg-[#1f0714] text-[#7209b7] dark:text-[#f72585] border border-[#ecd3e5] dark:border-[#590d22]'
                    }`}>
                      <Icon size={17} />
                    </div>
                    <div className="min-w-0 text-right">
                      <h4 className="text-xs font-black truncate">{tab.title}</h4>
                      <span className={`text-[10px] block truncate ${isSelected ? 'text-white/80' : 'text-[#6e5564] dark:text-[#d8b4cc]'}`}>
                        {tab.subtitle}
                      </span>
                    </div>
                  </div>

                  <ChevronLeft size={15} className={`shrink-0 transition-transform ${isSelected ? 'text-white translate-x-[-2px]' : 'text-stone-400 group-hover:translate-x-[-2px]'}`} />
                </button>
              );
            })}
          </div>

          {/* Trust Mini Banner */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-300 font-bold text-center">
            {lang === 'fa' ? '⚡ تحویل ۲ دقیقه‌ای باجه اکسپرس تفت' : '⚡ 2-Minute Express Taft Counter'}
          </div>

        </aside>

        {/* MAIN CONTENT AREA ON THE RIGHT (Spacious, clean, unrestricted height) */}
        <main className="flex-1 min-w-0 animate-fade-in">
          {activeTab === 'tracking' && (
            <LiveTrackingSection
              activeOrder={activeTrackingOrder}
              patientCode={patientCode}
              allOrders={orders}
            />
          )}

          {activeTab === 'prescription' && (
            <PrescriptionSection
              patientCode={patientCode}
              onOrderCreated={(order, isInstallment) => {
                onOrderCreated(order, isInstallment);
              }}
              onOpenInstallmentForOrder={onOpenInstallmentForOrder}
              onNavigateToPharmacy={() => {
                setActiveTab('pharmacy');
              }}
            />
          )}

          {activeTab === 'queue' && (
            <LiveOrderQueue
              orders={orders}
              currentUserCode={patientCode}
              onSelectOrderToTrack={(order) => {
                onSelectOrderToTrack(order);
                setActiveTab('tracking');
              }}
              onOpenInstallment={onOpenInstallmentForOrder}
            />
          )}

          {activeTab === 'pharmacy' && (
            <PharmacyAdminPanel
              orders={orders}
              selectedPharmacyId={focusedPharmacyId}
              onUpdateOrderStatus={onUpdateOrderStatus}
              onOpenInstallmentForOrder={onOpenInstallmentForOrder}
              lang={lang}
            />
          )}

          {activeTab === 'services' && (
            <ServicesSection />
          )}
        </main>

      </div>

    </div>
  );
};
