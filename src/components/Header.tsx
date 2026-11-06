import React, { useState } from 'react';
import { 
  Home, 
  Layers, 
  FileText, 
  Sun, 
  Moon, 
  Globe, 
  Search, 
  Send,
  Menu, 
  X,
  KeyRound,
  CheckCircle2,
  Building2,
  Activity
} from 'lucide-react';
import { TAFT_PHARMACIES } from '../data/taftData';

interface HeaderProps {
  currentView: 'landing' | 'interactive' | 'dossier';
  onNavigate: (view: 'landing' | 'interactive' | 'dossier') => void;
  onStartQuickPrescription: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  lang: 'fa' | 'en';
  onToggleLang: () => void;
  patientCode: string;
  onOpenCodeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onStartQuickPrescription,
  isDarkMode,
  onToggleDarkMode,
  lang,
  onToggleLang,
  patientCode,
  onOpenCodeModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter pharmacies based on search
  const filteredPharmacies = TAFT_PHARMACIES.filter(p => 
    p.name.includes(searchQuery) || p.address.includes(searchQuery) || p.pharmacist.includes(searchQuery)
  );

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 bg-[#FCF9F5]/95 dark:bg-[#1a050f]/95 border-[#e0b1cb]/30 dark:border-[#590d22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* RIGHT SIDE: EXACT BRAND LOGO & TITLE FROM USER SCREENSHOT 3 */}
            <button 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-3 group text-right focus:outline-none"
            >
              {/* Gradient Logo Icon with Mortar & Pestle */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#9d0208] via-[#d00000] to-[#f72585] text-white flex items-center justify-center shadow-lg shadow-[#f72585]/30 group-hover:scale-105 transition-transform duration-300">
                <i className="fa-solid fa-mortar-pestle text-xl"></i>
              </div>
              
              {/* Exact Typography */}
              <div className="text-right">
                <h1 className="text-lg sm:text-xl font-black text-[#2b091f] dark:text-[#f7eef7] tracking-tight flex items-center gap-1.5">
                  <span>{lang === 'fa' ? 'نسخه‌یار | نسخه آنلاین' : 'NoskheYar | Online Rx'}</span>
                </h1>
                <span className="block text-xs font-bold text-[#f72585] tracking-tight">
                  {lang === 'fa' ? 'سامانه تخصصی سلامت الکترونیک تفت' : 'Taft Specialized E-Health System'}
                </span>
              </div>
            </button>

            {/* CENTER: 2-3 PRIMARY NAV ITEMS (Simplified, clean) */}
            <nav className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => onNavigate('landing')}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  currentView === 'landing'
                    ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white shadow-md'
                    : 'text-[#2b091f] dark:text-[#f7eef7] hover:bg-[#f7eef7] dark:hover:bg-[#38040e]/50'
                }`}
              >
                <Home size={15} />
                <span>{lang === 'fa' ? 'صفحه اصلی' : 'Home'}</span>
              </button>

              <button
                onClick={() => onNavigate('interactive')}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  currentView === 'interactive'
                    ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white shadow-md'
                    : 'text-[#2b091f] dark:text-[#f7eef7] hover:bg-[#f7eef7] dark:hover:bg-[#38040e]/50'
                }`}
              >
                <Layers size={15} />
                <span>{lang === 'fa' ? 'دمو تعاملی عملیاتی' : 'Interactive Demo'}</span>
              </button>

              <button
                onClick={() => onNavigate('dossier')}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  currentView === 'dossier'
                    ? 'bg-gradient-to-r from-[#590d22] to-[#7209b7] text-white shadow-md'
                    : 'text-[#2b091f] dark:text-[#f7eef7] hover:bg-[#f7eef7] dark:hover:bg-[#38040e]/50'
                }`}
              >
                <FileText size={15} />
                <span>{lang === 'fa' ? 'پرونده دیجیتال تفت' : 'Digital Dossier'}</span>
              </button>
            </nav>

            {/* LEFT SIDE: EXACT CONTROLS FROM USER SCREENSHOT 1 (________-________2a8035cd.png) */}
            {/* LEFT CONTROLS GROUP: Matches user screenshot "کلید ثبت نسخه در سمت چپ.png" */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* 1. PILL: EN with Pink Globe icon (Switch language) */}
              <button
                onClick={onToggleLang}
                title={lang === 'fa' ? 'تغییر زبان به انگلیسی' : 'Switch to Persian'}
                className="py-2 px-3 sm:px-3.5 rounded-full bg-white dark:bg-[#2b091f] border border-[#e0b1cb] dark:border-[#590d22] text-[#2b091f] dark:text-white font-black text-xs hover:border-[#f72585] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Globe size={15} className="text-[#f72585]" />
                <span className="font-mono text-xs font-bold">{lang === 'fa' ? 'EN' : 'FA'}</span>
              </button>

              {/* 2. BUTTON: Moon icon with purple border (Toggle dark/light mode) */}
              <button
                onClick={onToggleDarkMode}
                title={isDarkMode ? 'تغییر به حالت روشن' : 'تغییر به حالت تیره'}
                className="w-10 h-10 rounded-2xl bg-white dark:bg-[#2b091f] border border-[#7209b7]/50 dark:border-[#7209b7] text-[#7209b7] dark:text-[#f72585] hover:bg-[#f7eef7] dark:hover:bg-[#38040e] transition-all flex items-center justify-center shadow-2xs cursor-pointer"
              >
                {isDarkMode ? <Sun size={17} className="text-[#f72585]" /> : <Moon size={17} className="text-[#7209b7]" />}
              </button>

              {/* 3. BUTTON: Search icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                title="جستجوی داروخانه و خدمات تفت"
                className="w-10 h-10 rounded-2xl bg-white dark:bg-[#2b091f] border border-[#dfc2d7] dark:border-[#590d22] text-stone-600 dark:text-stone-300 hover:text-[#f72585] hover:border-[#f72585] transition-all flex items-center justify-center shadow-2xs cursor-pointer"
              >
                <Search size={17} />
              </button>

              {/* 4. Patient Numeric Health Code Pill (Matches "کلمه کد بیاد سمت راست.png": کد: #984210 🔑) */}
              <button
                onClick={onOpenCodeModal}
                title={lang === 'fa' ? 'مشاهده پرونده و نسخه‌های بیمار' : 'View Patient Prescriptions & Code'}
                className="flex items-center gap-2 bg-[#fdf0f7] dark:bg-[#38040e] border border-[#fcd0df] dark:border-[#7209b7] px-4 py-2 rounded-full transition-all shadow-xs hover:border-[#f72585] cursor-pointer"
              >
                <span className="text-[11px] font-bold text-[#6e5564] dark:text-[#e0b1cb]">
                  {lang === 'fa' ? 'کد:' : 'Code:'}
                </span>
                <span className="text-xs sm:text-sm font-black font-mono text-[#590d22] dark:text-[#f72585]">
                  #{patientCode}
                </span>
                <KeyRound size={15} className="text-[#7209b7] dark:text-[#f72585]" />
              </button>

              {/* 5. BUTTON: ثبت سریع نسخه (Far left button matching "کلید ثبت نسخه در سمت چپ.png") */}
              <button
                onClick={onStartQuickPrescription}
                className="py-2.5 px-4 sm:px-5 rounded-full bg-gradient-to-r from-[#590d22] via-[#7209b7] to-[#f72585] hover:opacity-95 text-white font-black text-xs sm:text-sm shadow-md shadow-[#7209b7]/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{lang === 'fa' ? 'ثبت سریع نسخه' : 'Quick Rx'}</span>
                <Send size={15} className="rotate-45" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-2xl bg-white dark:bg-[#2b091f] border border-[#ecd3e5] dark:border-[#590d22] text-[#590d22] dark:text-white"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#1a050f] border-b border-[#ecd3e5] dark:border-[#590d22] px-6 py-4 space-y-2 animate-fade-in text-right">
            <button
              onClick={() => { onNavigate('landing'); setMobileMenuOpen(false); }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between ${
                currentView === 'landing' ? 'bg-[#f7eef7] dark:bg-[#38040e] text-[#f72585]' : 'text-[#2b091f] dark:text-white'
              }`}
            >
              <span>{lang === 'fa' ? 'صفحه اصلی' : 'Home'}</span>
              <Home size={16} />
            </button>
            <button
              onClick={() => { onNavigate('interactive'); setMobileMenuOpen(false); }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between ${
                currentView === 'interactive' ? 'bg-[#f7eef7] dark:bg-[#38040e] text-[#f72585]' : 'text-[#2b091f] dark:text-white'
              }`}
            >
              <span>{lang === 'fa' ? 'دمو تعاملی عملیاتی (پایش، نسخه، صف، پنل)' : 'Interactive Demo'}</span>
              <Layers size={16} />
            </button>
            <button
              onClick={() => { onNavigate('dossier'); setMobileMenuOpen(false); }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between ${
                currentView === 'dossier' ? 'bg-[#f7eef7] dark:bg-[#38040e] text-[#f72585]' : 'text-[#2b091f] dark:text-white'
              }`}
            >
              <span>{lang === 'fa' ? 'پرونده دیجیتال و مستندات تفت' : 'Digital Dossier'}</span>
              <FileText size={16} />
            </button>
            <button
              onClick={() => { onOpenCodeModal(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between text-[#7209b7] dark:text-[#f72585] bg-[#fdf0f7] dark:bg-[#38040e]"
            >
              <span>{lang === 'fa' ? `کد سلامت شما: #${patientCode}` : `Health Code: #${patientCode}`}</span>
              <KeyRound size={16} />
            </button>
          </div>
        )}
      </header>

      {/* QUICK SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-right">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1f0714] rounded-3xl p-6 shadow-2xl border-2 border-[#ecd3e5] dark:border-[#590d22]">
            <div className="flex items-center justify-between pb-4 border-b border-[#f3e5f0] dark:border-[#590d22]">
              <div className="flex items-center gap-2">
                <Search size={18} className="text-[#f72585]" />
                <h3 className="text-base font-black text-[#38040e] dark:text-white">جستجوی سریع داروخانه‌ها و خدمات تفت</h3>
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="نام داروخانه، آدرس خیابان ساحلی یا پزشک..."
                className="w-full py-3 px-4 rounded-2xl border-2 border-[#dfc2d7] dark:border-[#590d22] bg-[#fcf9f5] dark:bg-[#2b091f] text-[#2b091f] dark:text-white text-xs font-bold focus:border-[#7209b7] focus:outline-none"
              />
            </div>

            <div className="mt-4 space-y-2.5 max-h-64 overflow-y-auto">
              {filteredPharmacies.map((pharmacy) => (
                <div
                  key={pharmacy.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    onNavigate('interactive');
                  }}
                  className="p-3 rounded-2xl border border-[#ecd3e5] dark:border-[#590d22] hover:bg-[#faf4f8] dark:hover:bg-[#38040e]/60 cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-xs font-black text-[#590d22] dark:text-[#f72585]">{pharmacy.name}</h5>
                    <p className="text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">{pharmacy.address}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                    {pharmacy.hours}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#f3e5f0] dark:border-[#590d22] flex items-center justify-between text-[11px] text-[#6e5564] dark:text-[#d8b4cc]">
              <span>کلیدواژه‌های پرجستجو:</span>
              <div className="flex gap-2">
                <button onClick={() => setSearchQuery('بیوکی')} className="text-[#f72585] font-bold hover:underline">بیوکی</button>
                <button onClick={() => setSearchQuery('محمودی')} className="text-[#f72585] font-bold hover:underline">محمودی</button>
                <button onClick={() => setSearchQuery('ساحلی')} className="text-[#f72585] font-bold hover:underline">خیابان ساحلی</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
