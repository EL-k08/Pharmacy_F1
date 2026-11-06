import React from 'react';
import { 
  FileText, 
  Send, 
  Calculator, 
  HeartHandshake, 
  Accessibility, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  ChevronLeft
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#38040e] to-[#220108] text-[#f7eef7] pt-16 pb-8 border-t-2 border-[#590d22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#590d22]/50 text-right">
          
          {/* Column 1: Brand & Overview (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#f72585] to-[#7209b7] text-white flex items-center justify-center shadow-md">
                <i className="fa-solid fa-mortar-pestle text-lg"></i>
              </div>
              <div>
                <h3 className="text-lg font-black text-white">سامانه نسخه‌یار تفت</h3>
                <span className="text-xs text-[#e0b1cb] font-bold block">
                  پروژه تخصصی سلامت الکترونیک شهرستان تفت
                </span>
              </div>
            </div>

            <p className="text-xs text-[#d8b4cc] leading-relaxed font-medium">
              سامانه هوشمند آماده‌سازی نسخه و خدمات سلامت، طراحی شده جهت رفع محرومیت خدمات آنلاین دارویی در شهرستان تفت و اتصال یکپارچه شهروندان به داروخانه‌های فعال استان یزد بدون ایستادن در صف‌های عمومی.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>پوشش فعال در سراسر شهرستان تفت و حومه</span>
            </div>
          </div>

          {/* Column 2: Quick Links (2.5 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-[#e0b1cb] pb-2 border-b border-[#590d22] inline-block">
              دسترسی سریع
            </h4>
            <ul className="space-y-2 text-xs text-[#ebd3e5]">
              <li>
                <a href="#core-rx" className="hover:text-[#f72585] flex items-center gap-1.5 transition-colors">
                  <ChevronLeft size={13} className="text-[#f72585]" />
                  ثبت نسخه با کد رهگیری
                </a>
              </li>
              <li>
                <a href="#live-tracking" className="hover:text-[#f72585] flex items-center gap-1.5 transition-colors">
                  <ChevronLeft size={13} className="text-[#f72585]" />
                  داشبورد زنده پایش بدون صف
                </a>
              </li>
              <li>
                <a href="#order-queue" className="hover:text-[#f72585] flex items-center gap-1.5 transition-colors">
                  <ChevronLeft size={13} className="text-[#f72585]" />
                  صف مانیتورینگ سفارش‌ها (محرمانه)
                </a>
              </li>
              <li>
                <a href="#installments" className="hover:text-[#f72585] flex items-center gap-1.5 transition-colors">
                  <ChevronLeft size={13} className="text-[#f72585]" />
                  ماشین‌حساب اقساط درمان
                </a>
              </li>
              <li>
                <a href="#charity" className="hover:text-[#f72585] flex items-center gap-1.5 transition-colors">
                  <ChevronLeft size={13} className="text-[#f72585]" />
                  صندوق خیریه دارویی تفت
                </a>
              </li>
              <li>
                <a href="#equipment" className="hover:text-[#f72585] flex items-center gap-1.5 transition-colors">
                  <ChevronLeft size={13} className="text-[#f72585]" />
                  اجاره دستگاه اکسیژن و تخت
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic & Research Documentation (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-[#e0b1cb] pb-2 border-b border-[#590d22] inline-block">
              مستندات درس
            </h4>
            <ul className="space-y-2 text-xs text-[#ebd3e5]">
              <li>
                <a href="#dossier" className="hover:text-[#f72585] flex items-center gap-1.5 transition-colors">
                  <ChevronLeft size={13} className="text-[#f72585]" />
                  ۸ سؤال ایده بالغ
                </a>
              </li>
              <li>
                <a href="#dossier" className="hover:text-[#f72585] flex items-center gap-1.5 transition-colors">
                  <ChevronLeft size={13} className="text-[#f72585]" />
                  بوم مدل کسب‌وکار (BMC)
                </a>
              </li>
              <li>
                <a href="#dossier" className="hover:text-[#f72585] flex items-center gap-1.5 transition-colors">
                  <ChevronLeft size={13} className="text-[#f72585]" />
                  قیف فروش و تبدیل کاربر
                </a>
              </li>
              <li>
                <a 
                  href="https://yazd-ec-project.vercel.app/#sec-overview" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#f72585] flex items-center gap-1.5 transition-colors text-amber-300"
                >
                  <ExternalLink size={12} />
                  پورتال پروژه دانشگاه یزد
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Taft Local Office (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-[#e0b1cb] pb-2 border-b border-[#590d22] inline-block">
              اطلاعات پشتیبانی تفت
            </h4>
            <ul className="space-y-2.5 text-xs text-[#ebd3e5]">
              <li className="flex items-start gap-2 leading-relaxed">
                <MapPin size={15} className="text-[#f72585] shrink-0 mt-0.5" />
                <span>یزد، شهرستان تفت، بلوار شهدای پرواز، دفتر پایش نسخه‌یار</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-[#f72585] shrink-0" />
                <span dir="ltr" className="font-mono">۰۳۵-۳۲۶۲۰۰۰۰</span>
                <span className="text-[10px] text-stone-400">(پاسخگویی سریع)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-[#f72585] shrink-0" />
                <span className="font-mono">info@taft-pharma.ir</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-xs text-[#a47696] font-medium">
          تمامی حقوق این پروژه متعلق به «سامانه خدمات داروخانه‌ای و آماده‌سازی نسخه تفت و یزد» است. توسعه یافته برای تسهیل خدمت‌رسانی به مردم شریف تفت.
        </div>

      </div>
    </footer>
  );
};
