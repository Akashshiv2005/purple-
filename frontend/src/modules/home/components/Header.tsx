import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown, Menu, X, User as UserIcon, Building } from 'lucide-react';

interface HeaderProps {
  userLocation: string;
}

export default function Header({ userLocation }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/50 shadow-xs py-3.5 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between">
        
        <div className="flex items-center gap-6">
          <Link href="/" className="text-3xl font-black tracking-tight shrink-0 flex items-center group">
            <span className="text-slate-900 font-extrabold tracking-tight">Biz</span>
            <span className="text-[#431B94] font-black tracking-tight flex items-center">
              Dial<motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="inline-block w-2.5 h-2.5 bg-[#431B94] rounded-full ml-0.5"></motion.span>
            </span>
          </Link>
          <div className="hidden md:flex items-center bg-[#F5F3FF] border border-[#E9E3FF] rounded-full px-4 py-2 cursor-pointer hover:bg-[#EDE9FE] transition-colors shadow-2xs">
            <MapPin size={16} className="text-[#431B94] mr-2 shrink-0" />
            <span className="text-sm font-bold text-slate-800 mr-1 capitalize">{userLocation || 'Your Area'}</span>
            <ChevronDown size={14} className="text-slate-600" />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {[
            { name: 'Categories', id: 'categories' },
            { name: 'How it Works', id: 'how-it-works' },
            { name: 'For Business', id: 'for-business' },
          ].map((item) => (
            <button 
              key={item.name}
              onClick={() => {
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-bold text-slate-800 hover:text-[#431B94] cursor-pointer transition-colors bg-transparent border-none p-0"
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3.5 ml-6">
          <Link href="/login" className="flex items-center gap-2 text-[#431B94] font-bold border border-[#431B94]/70 px-5 py-2 rounded-full hover:bg-violet-50 transition-colors shadow-2xs text-sm">
            <UserIcon size={17} strokeWidth={2.2} /> Login
          </Link>
          <Link href="/register" className="flex items-center gap-2 bg-[#431B94] hover:bg-[#2D0F66] text-white font-bold px-5 py-2.5 rounded-full transition-all shadow-md shadow-[#431B94]/25 text-sm">
            <Building size={17} /> List Your Business
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          aria-label="Toggle mobile menu"
          className="lg:hidden p-2 text-slate-700 hover:text-[#431B94] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 p-4 absolute top-full left-0 right-0 shadow-xl flex flex-col gap-4 z-50">
          <div className="flex items-center bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 mb-2">
            <MapPin size={18} className="text-[#431B94] mr-2" />
            <span className="text-sm font-bold text-slate-800 mr-1 flex-1">{userLocation}</span>
            <ChevronDown size={16} className="text-slate-600" />
          </div>
          <nav className="flex flex-col gap-2">
            {[
              { name: 'Categories', id: 'categories' },
              { name: 'How it Works', id: 'how-it-works' },
              { name: 'For Business', id: 'for-business' },
            ].map((item) => (
              <button 
                key={item.name}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-left py-3 px-4 rounded-xl text-sm font-bold text-slate-700 hover:bg-violet-50 hover:text-[#431B94] transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100">
            <Link 
              href="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-violet-700 font-bold border border-[#431B94]/80 px-6 py-3 rounded-xl hover:bg-violet-50 transition-colors"
            >
              <UserIcon size={18} strokeWidth={2.2} /> Login
            </Link>
            <Link 
              href="/register" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#431B94] hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-[#431B94]/20"
            >
              List Your Business
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
