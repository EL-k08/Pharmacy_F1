import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PatientJourney3D } from './components/PatientJourney3D';
import { InteractiveHub } from './components/InteractiveHub';
import { DigitalDossierHub } from './components/DigitalDossierHub';
import { InstallmentModal } from './components/InstallmentModal';
import { UserHealthCodeModal } from './components/UserHealthCodeModal';
import { Footer } from './components/Footer';
import { PrescriptionOrder } from './types/pharmacy';
import { INITIAL_QUEUE_ORDERS } from './data/taftData';
import { 
  Layers, 
  FileText, 
  Activity, 
  Send, 
  Users, 
  Store, 
  Calculator, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function App() {
  // Navigation View State: 'landing' | 'interactive' | 'dossier' (Requirement 8 & 9)
  const [currentView, setCurrentView] = useState<'landing' | 'interactive' | 'dossier'>('landing');

  // Interactive Hub sub-tab initial selector
  const [interactiveTab, setInteractiveTab] = useState<'tracking' | 'prescription' | 'queue' | 'pharmacy' | 'services'>('tracking');
  
  // Digital Dossier sub-tab initial selector
  const [dossierTab, setDossierTab] = useState<'bmc' | 'blueprint' | 'questions' | 'frictions' | 'funnel'>('bmc');

  // Dark Mode State (Requirement 4)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('taft_theme') === 'dark';
  });

  // Language State (Requirement 4)
  const [lang, setLang] = useState<'fa' | 'en'>(() => {
    return (localStorage.getItem('taft_lang') as 'fa' | 'en') || 'fa';
  });

  // Dedicated Patient Numerical Health Code (Requirement 5)
  const [patientCode, setPatientCode] = useState<string>(() => {
    return localStorage.getItem('taft_patient_code') || '984210';
  });
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);

  // Global Orders List
  const [orders, setOrders] = useState<PrescriptionOrder[]>(() => {
    const saved = localStorage.getItem('taft_orders');
    return saved ? JSON.parse(saved) : INITIAL_QUEUE_ORDERS;
  });

  // Active Order tracked in Live Stepper (Requirement 1)
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<PrescriptionOrder | null>(
    orders[0] || null
  );

  // Currently selected pharmacy for pharmacy console (Requirement 2)
  const [focusedPharmacyId, setFocusedPharmacyId] = useState<string>('mahmoudi');

  // Installment Modal state (Requirement 3)
  const [installmentModalOrder, setInstallmentModalOrder] = useState<PrescriptionOrder | null>(null);
  const [isInstallmentModalOpen, setIsInstallmentModalOpen] = useState<boolean>(false);

  // Sync Dark Mode class with root HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('taft_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('taft_theme', 'light');
    }
  }, [isDarkMode]);

  // Sync Language
  useEffect(() => {
    localStorage.setItem('taft_lang', lang);
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Save orders to localStorage on change
  useEffect(() => {
    localStorage.setItem('taft_orders', JSON.stringify(orders));
  }, [orders]);

  // Existing codes across all orders to ensure uniqueness (Requirement 5)
  const existingCodes = orders.map(o => o.patientCode);

  const handleSavePatientCode = (newCode: string): boolean => {
    setPatientCode(newCode);
    localStorage.setItem('taft_patient_code', newCode);
    return true;
  };

  // When patient creates a new prescription
  const handleOrderCreated = (newOrder: PrescriptionOrder, triggerInstallmentModal = false) => {
    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    setFocusedPharmacyId(newOrder.pharmacyId); // Faithful pharmacy focus (Requirement 2)

    if (triggerInstallmentModal) {
      setInstallmentModalOrder(newOrder);
      setIsInstallmentModalOpen(true);
    }
  };

  // Open Installment Modal for a specific order (Requirement 3)
  const handleOpenInstallmentForOrder = (order: PrescriptionOrder) => {
    setInstallmentModalOrder(order);
    setIsInstallmentModalOpen(true);
  };

  // Update order status from Pharmacist panel or simulation
  const handleUpdateOrderStatus = (orderId: string, newStepIndex: number) => {
    const statusMap: Record<number, PrescriptionOrder['status']> = {
      0: 'registered',
      1: 'doctor_review',
      2: 'inventory_check',
      3: 'packing',
      4: 'invoice_ready',
      5: 'ready_for_pickup',
    };

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updated: PrescriptionOrder = {
            ...ord,
            currentStepIndex: newStepIndex,
            status: statusMap[newStepIndex] || ord.status,
          };
          if (activeTrackingOrder?.id === orderId) {
            setActiveTrackingOrder(updated);
          }
          return updated;
        }
        return ord;
      })
    );
  };

  // Confirm installment from modal
  const handleConfirmInstallment = (
    orderId: string,
    installmentDetails: {
      months: number;
      monthlyAmount: number;
      downPayment: number;
      totalPayable: number;
    }
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            installmentMonths: installmentDetails.months,
            monthlyInstallment: installmentDetails.monthlyAmount,
            isInstallmentApproved: true,
            currentStepIndex: 3, // Advances to packing
            status: 'packing',
          };
        }
        return ord;
      })
    );
  };

  // Navigation handlers
  const navigateToInteractive = (tab: 'tracking' | 'prescription' | 'queue' | 'pharmacy' | 'services' = 'tracking') => {
    setInteractiveTab(tab);
    setCurrentView('interactive');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDossier = (tab: 'bmc' | 'blueprint' | 'questions' | 'frictions' | 'funnel' = 'bmc') => {
    setDossierTab(tab);
    setCurrentView('dossier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#14030d] text-[#f7eef7]' : 'bg-[#FCF9F5] text-[#2b091f]'} selection:bg-[#f72585] selection:text-white transition-colors duration-300`}>
      
      {/* 1. Header with simplified 2-3 links, patient health code, dark/light and lang switch */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartQuickPrescription={() => navigateToInteractive('prescription')}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        lang={lang}
        onToggleLang={() => setLang(lang === 'fa' ? 'en' : 'fa')}
        patientCode={patientCode}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
      />

      {/* VIEW 1: LANDING PAGE (Clean, unburdened, featuring the 2 big portal buttons requested in items 8 & 9) */}
      {currentView === 'landing' && (
        <div className="animate-fade-in space-y-12 pb-16">
          
          {/* Hero Section matching Screenshot 2 */}
          <Hero
            onStartPrescription={() => navigateToInteractive('prescription')}
            onOpenOcrTest={() => navigateToInteractive('prescription')}
            onOpenPharmacyQueue={() => navigateToInteractive('pharmacy')}
            lang={lang}
          />

          {/* REQUIREMENT 9: TWO PROMINENT GATEWAY BUTTONS / CARDS ON LANDING PAGE */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="text-xs font-black text-[#f72585] bg-[#fdf0f7] dark:bg-[#38040e] px-4 py-1.5 rounded-full border border-[#ecd3e5] dark:border-[#7209b7] inline-block mb-2">
                {lang === 'fa' ? 'درگاه‌های اصلی سامانه سلامت تفت' : 'Main Portals of Taft E-Health'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#38040e] dark:text-white">
                {lang === 'fa' ? 'انتخاب مسیر ورود به بخش‌های تخصصی' : 'Choose Your Specialized Destination'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6e5564] dark:text-[#d8b4cc] mt-2">
                {lang === 'fa' 
                  ? 'جهت جلوگیری از شلوغی صفحه، امکانات عملیاتی و اسناد تحلیلی به دو فضای مستقل تفکیک شده‌اند:' 
                  : 'Operational features and strategic documents are segregated into two distinct hubs:'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* BUTTON 1: DEMO TA’AMOLI (Interactive Demo Hub) */}
              <div 
                onClick={() => navigateToInteractive('tracking')}
                className="group cursor-pointer bg-white dark:bg-[#1f0714] rounded-[32px] p-7 sm:p-9 border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-sm hover:shadow-2xl hover:border-[#f72585] transition-all duration-300 flex flex-col justify-between text-right relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#f72585]/10 rounded-br-full pointer-events-none group-hover:scale-125 transition-transform" />
                
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3.5 py-1 rounded-full bg-[#fdf0f7] dark:bg-[#38040e] text-[#f72585] font-black text-xs border border-[#ecd3e5] dark:border-[#7209b7]">
                      {lang === 'fa' ? 'بخش ۱: عملیات و ثبت نسخه' : 'Section 1: Operations'}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#590d22] to-[#f72585] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Layers size={22} />
                    </div>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black text-[#38040e] dark:text-white group-hover:text-[#f72585] transition-colors">
                    {lang === 'fa' ? 'مشاهده دمو تعاملی عملیاتی' : 'Interactive Operational Demo'}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#6e5564] dark:text-[#d8b4cc] leading-relaxed mt-2.5 font-medium">
                    {lang === 'fa' 
                      ? 'ورود به کارتابل اجرایی داروخانه و بیمار؛ پایش زنده نوبت بدون صف، ثبت هوشمند نسخه با هوش مصنوعی OCR، صف سفارشات بر اساس کد عددی، پنل مدیریت داروخانه‌های تفت، و سرویس تسهیلات اقساطی.'
                      : 'Live queue-free tracking, OCR prescription upload, anonymous queue table, pharmacy multi-store console, and loan simulator.'}
                  </p>

                  {/* Sub-items chips */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#faf4f8] dark:bg-[#2b091f] text-[#590d22] dark:text-[#e0b1cb] border border-[#ecd3e5] dark:border-[#590d22] flex items-center gap-1">
                      <Activity size={12} className="text-[#f72585]" />
                      پایش زنده بدون صف
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#faf4f8] dark:bg-[#2b091f] text-[#590d22] dark:text-[#e0b1cb] border border-[#ecd3e5] dark:border-[#590d22] flex items-center gap-1">
                      <Send size={12} className="text-[#f72585]" />
                      ثبت نسخه و OCR
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#faf4f8] dark:bg-[#2b091f] text-[#590d22] dark:text-[#e0b1cb] border border-[#ecd3e5] dark:border-[#590d22] flex items-center gap-1">
                      <Users size={12} className="text-[#f72585]" />
                      صف سفارشات (کد عددی)
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#faf4f8] dark:bg-[#2b091f] text-[#590d22] dark:text-[#e0b1cb] border border-[#ecd3e5] dark:border-[#590d22] flex items-center gap-1">
                      <Store size={12} className="text-[#f72585]" />
                      پنل داروخانه‌ها
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#faf4f8] dark:bg-[#2b091f] text-[#590d22] dark:text-[#e0b1cb] border border-[#ecd3e5] dark:border-[#590d22] flex items-center gap-1">
                      <Calculator size={12} className="text-[#f72585]" />
                      تجهیزات، صندوق و اقساط
                    </span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between">
                  <span className="text-xs font-black text-[#f72585] flex items-center gap-1.5 group-hover:translate-x-[-4px] transition-transform">
                    <span>{lang === 'fa' ? 'ورود به کارتابل دمو تعاملی' : 'Enter Interactive Demo'}</span>
                    <ArrowLeft size={16} />
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
              </div>

              {/* BUTTON 2: DIGITAL DOSSIER (Digital Dossier Hub) */}
              <div 
                onClick={() => navigateToDossier('bmc')}
                className="group cursor-pointer bg-white dark:bg-[#1f0714] rounded-[32px] p-7 sm:p-9 border-2 border-[#ecd3e5] dark:border-[#590d22] shadow-sm hover:shadow-2xl hover:border-[#7209b7] transition-all duration-300 flex flex-col justify-between text-right relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#7209b7]/10 rounded-br-full pointer-events-none group-hover:scale-125 transition-transform" />
                
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3.5 py-1 rounded-full bg-[#fdf0f7] dark:bg-[#38040e] text-[#7209b7] dark:text-[#f72585] font-black text-xs border border-[#ecd3e5] dark:border-[#7209b7]">
                      {lang === 'fa' ? 'بخش ۲: مستندات استراتژیک' : 'Section 2: Strategic Dossier'}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#590d22] to-[#7209b7] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <FileText size={22} />
                    </div>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black text-[#38040e] dark:text-white group-hover:text-[#7209b7] dark:group-hover:text-[#f72585] transition-colors">
                    {lang === 'fa' ? 'مشاهده پرونده دیجیتال و مستندات تفت' : 'Digital Dossier & Taft Documents'}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#6e5564] dark:text-[#d8b4cc] leading-relaxed mt-2.5 font-medium">
                    {lang === 'fa' 
                      ? 'دسترسی به پرونده تحلیلی و شواهد میدانی تفت؛ بوم مدل کسب‌وکار (BMC دقیقاً مطابق طرح تصویری)، پرسش‌های ۸گانه ایده بالغ (طرح Pharmacy4)، اصطکاک‌ها و کارکردهای واسطه، قیف فروش ۷ مرحله‌ای، و ادله شکست رقبای کشوری.'
                      : 'Business Model Canvas (BMC), 8 questions from Pharmacy4, friction matrix, 7-stage conversion funnel, and field proof of competitor failure in Taft.'}
                  </p>

                  {/* Sub-items chips */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#faf4f8] dark:bg-[#2b091f] text-[#590d22] dark:text-[#e0b1cb] border border-[#ecd3e5] dark:border-[#590d22] flex items-center gap-1">
                      <i className="fa-solid fa-diagram-project text-[#7209b7]"></i>
                      بوم مدل کسب‌وکار (BMC)
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#faf4f8] dark:bg-[#2b091f] text-[#590d22] dark:text-[#e0b1cb] border border-[#ecd3e5] dark:border-[#590d22] flex items-center gap-1">
                      <i className="fa-solid fa-list-check text-[#7209b7]"></i>
                      پرسش‌های ۸گانه ایده بالغ
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#faf4f8] dark:bg-[#2b091f] text-[#590d22] dark:text-[#e0b1cb] border border-[#ecd3e5] dark:border-[#590d22] flex items-center gap-1">
                      <i className="fa-solid fa-fire text-[#7209b7]"></i>
                      اصطکاک‌های مدل سنتی
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#faf4f8] dark:bg-[#2b091f] text-[#590d22] dark:text-[#e0b1cb] border border-[#ecd3e5] dark:border-[#590d22] flex items-center gap-1">
                      <i className="fa-solid fa-filter text-[#7209b7]"></i>
                      قیف فروش ۷ مرحله‌ای
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#faf4f8] dark:bg-[#2b091f] text-[#590d22] dark:text-[#e0b1cb] border border-[#ecd3e5] dark:border-[#590d22] flex items-center gap-1">
                      <i className="fa-solid fa-triangle-exclamation text-[#7209b7]"></i>
                      ادله شکست رقبای کشوری
                    </span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between">
                  <span className="text-xs font-black text-[#7209b7] dark:text-[#f72585] flex items-center gap-1.5 group-hover:translate-x-[-4px] transition-transform">
                    <span>{lang === 'fa' ? 'ورود به پرونده دیجیتال و مستندات' : 'Enter Digital Dossier'}</span>
                    <ArrowLeft size={16} />
                  </span>
                  <span className="text-xs font-bold text-stone-400">۵ بخش استراتژیک</span>
                </div>
              </div>

            </div>
          </section>

          {/* REQUIREMENT 6: 3D Patient Journey (with isometric perspective and character artwork) */}
          <PatientJourney3D lang={lang} />

          {/* Quick Regional Trust Banner */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#590d22] via-[#7209b7] to-[#f72585] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-right">
              <div className="space-y-1.5">
                <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full inline-block">
                  تضمین سلامت شهرستان تفت
                </span>
                <h4 className="text-lg sm:text-xl font-black">
                  شبکه ۴ داروخانه معتمد محلی آماده دریافت نسخه‌های شماست
                </h4>
                <p className="text-xs text-white/80 max-w-xl">
                  پوشش کامل بلوار شهید بهشتی، خیابان ساحلی، بیمارستان شهید بهشتی تفت، اسلامیه، نصرآباد و مناطق ییلاقی شیرکوه بدون صف و در ۲ دقیقه.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => navigateToInteractive('prescription')}
                  className="py-3 px-5 rounded-2xl bg-white text-[#590d22] font-black text-xs shadow-md hover:bg-[#fcf9f5] transition-colors"
                >
                  ثبت سریع نسخه
                </button>
                <button
                  onClick={() => navigateToDossier('bmc')}
                  className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-black text-xs transition-colors"
                >
                  مشاهده بوم کسب‌وکار
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: DEDICATED INTERACTIVE HUB (Requirement 8 & 9: Live Tracking, Prescription, Queue, Pharmacy, Services) */}
      {currentView === 'interactive' && (
        <InteractiveHub
          onBackToHome={() => {
            setCurrentView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          patientCode={patientCode}
          orders={orders}
          activeTrackingOrder={activeTrackingOrder}
          focusedPharmacyId={focusedPharmacyId}
          onOrderCreated={handleOrderCreated}
          onOpenInstallmentForOrder={handleOpenInstallmentForOrder}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onSelectOrderToTrack={(order) => {
            setActiveTrackingOrder(order);
          }}
          initialTab={interactiveTab}
          lang={lang}
        />
      )}

      {/* VIEW 3: DEDICATED DIGITAL DOSSIER HUB (Requirement 8 & 9: BMC, 8 Questions, Frictions, Funnel, Evidence) */}
      {currentView === 'dossier' && (
        <DigitalDossierHub
          onBackToHome={() => {
            setCurrentView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          initialTab={dossierTab}
          lang={lang}
        />
      )}

      {/* Footer */}
      <Footer />

      <UserHealthCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        currentCode={patientCode}
        onSaveCode={handleSavePatientCode}
        existingCodes={existingCodes}
        orders={orders}
        onTrackOrder={(order) => {
          setActiveTrackingOrder(order);
          navigateToInteractive('tracking');
        }}
        lang={lang}
      />

      {/* MODAL 2: Financial Installment & Simulated Payment Gateway (Requirement 3) */}
      <InstallmentModal
        isOpen={isInstallmentModalOpen}
        onClose={() => setIsInstallmentModalOpen(false)}
        order={installmentModalOrder}
        onConfirmInstallment={handleConfirmInstallment}
      />

    </div>
  );
}
