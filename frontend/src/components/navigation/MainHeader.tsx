"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, ChevronDown, User as UserIcon, Menu, X, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-3xl font-black tracking-tight shrink-0 flex items-center gap-1 group">
            <span className="text-slate-900 font-extrabold tracking-tight">Biz</span>
            <span className="text-[#431B94] font-black tracking-tight flex items-center">
              Dial<motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="inline-block w-2.5 h-2.5 bg-[#431B94] rounded-full ml-0.5"></motion.span>
            </span>
          </Link>
          <div className="hidden md:flex items-center bg-emerald-50/90 border border-emerald-100 rounded-full px-4 py-2 cursor-pointer hover:bg-emerald-100/80 transition-colors shadow-xs">
            <MapPin size={16} className="text-[#431B94] mr-2 shrink-0" />
            <span className="text-sm font-bold text-slate-800 mr-1">Your Area</span>
            <ChevronDown size={14} className="text-slate-600" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {[
            { name: 'Categories', id: 'categories' },
            { name: 'How it Works', id: 'how-it-works' },
            { name: 'Pricing', id: 'pricing' },
            { name: 'For Business', id: 'for-business' },
          ].map((item) => (
            <Link 
              href={`/#${item.id}`}
              key={item.name}
              className="text-sm font-bold text-slate-700 hover:text-[#431B94] cursor-pointer transition-colors bg-transparent border-none p-0"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3.5 ml-6">
          <Link href="/login" className="flex items-center gap-2 text-[#431B94] font-bold border border-[#431B94]/80 px-5 py-2 rounded-full hover:bg-violet-50 transition-colors shadow-xs">
            <UserIcon size={18} strokeWidth={2.2} /> Login
          </Link>
          <Link href="/register" className="flex items-center gap-2 bg-[#431B94] hover:bg-[#2D0F66] text-white font-bold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-[#431B94]/25">
            <Store size={18} strokeWidth={2.2} /> List Your Business
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-slate-700 hover:text-[#431B94] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-slate-100 p-4 absolute top-full left-0 right-0 shadow-xl flex flex-col gap-4 z-50"
          >
            <div className="flex items-center bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
              <MapPin size={18} className="text-[#431B94] mr-2 shrink-0" />
              <span className="text-sm font-bold text-slate-800 mr-1 flex-1">Your Area</span>
              <ChevronDown size={16} className="text-slate-600" />
            </div>
            <nav className="flex flex-col gap-1">
              {[
                { name: 'Categories', id: 'categories' },
                { name: 'How it Works', id: 'how-it-works' },
                { name: 'Pricing', id: 'pricing' },
                { name: 'For Business', id: 'for-business' },
              ].map((item) => (
                <Link 
                  href={`/#${item.id}`}
                  key={item.name}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left py-2.5 px-4 rounded-xl text-sm font-bold text-slate-700 hover:bg-emerald-50 hover:text-[#431B94] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-slate-100">
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-[#431B94] font-bold border border-[#431B94]/80 px-6 py-3 rounded-xl hover:bg-violet-50 transition-colors"
              >
                <UserIcon size={18} strokeWidth={2.2} /> Login
              </Link>
              <Link 
                href="/register" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#431B94] hover:bg-[#2D0F66] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-[#431B94]/20"
              >
                <Store size={18} strokeWidth={2.2} /> List Your Business
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
