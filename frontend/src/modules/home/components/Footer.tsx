import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, Headphones, TrendingUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50/70 pt-10 sm:pt-20 pb-8 mt-12 relative overflow-hidden border-t border-slate-200/80 rounded-t-3xl sm:rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 xl:px-12 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-10 sm:mb-14">
          
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="text-3xl font-black tracking-tight flex items-center gap-1 group">
              <span className="text-slate-900 font-extrabold tracking-tight">Biz</span>
              <span className="text-[#431B94] font-black tracking-tight flex items-center">
                Dial<motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="inline-block w-2.5 h-2.5 bg-[#431B94] rounded-full ml-0.5"></motion.span>
              </span>
            </Link>
            <div className="w-10 h-1 bg-[#431B94] rounded-full"></div>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium max-w-md">
              India's most trusted local search platform to discover, connect &amp; grow with verified businesses near you.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-white border border-slate-200/80 shadow-xs rounded-xl flex items-center justify-center text-[#1877F2] hover:bg-blue-50 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 bg-white border border-slate-200/80 shadow-xs rounded-xl flex items-center justify-center text-[#1DA1F2] hover:bg-sky-50 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 bg-white border border-slate-200/80 shadow-xs rounded-xl flex items-center justify-center text-[#0A66C2] hover:bg-indigo-50 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 bg-white border border-slate-200/80 shadow-xs rounded-xl flex items-center justify-center text-[#FF0000] hover:bg-red-50 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 columns) */}
          <div className="md:col-span-6 grid grid-cols-2 gap-6 sm:gap-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-violet-50 text-[#431B94] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">Quick Links</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
                {[
                  { name: 'Top Categories', href: '#categories' },
                  { name: 'Featured Places', href: '#services' },
                  { name: 'How It Works', href: '#how-it-works' },
                  { name: 'Browse Locations', href: '#locations' }
                ].map((item, idx) => (
                  <li key={idx}>
                    <button onClick={() => {
                      const el = document.getElementById(item.href.substring(1));
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }} className="hover:text-[#431B94] transition-colors text-left py-0.5 block">
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-violet-50 text-[#431B94] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">Grow With Us</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
                {[
                  { name: 'List Business', href: '/register', isRoute: true },
                  { name: 'Business Login', href: '/login', isRoute: true }
                ].map((item, idx) => (
                  <li key={idx}>
                    {item.isRoute ? (
                      <Link href={item.href} className="hover:text-[#431B94] transition-colors text-left py-0.5 block">
                        {item.name}
                      </Link>
                    ) : (
                      <button onClick={() => {
                        const el = document.getElementById(item.href.substring(1));
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }} className="hover:text-[#431B94] transition-colors text-left py-0.5 block">
                        {item.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Trust Strip (2x2 on mobile, 4 columns on desktop) */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 mb-8 shadow-xs border border-slate-200/80 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-[#431B94] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">Verified Listings</h3>
              <p className="text-[10px] text-slate-500 hidden sm:block">100% Genuine businesses</p>
            </div>
          </div>
          <div className="flex items-center gap-3 lg:border-l border-slate-100 lg:pl-4">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-[#431B94] flex items-center justify-center shrink-0">
              <Search size={20} strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">Smart Search</h3>
              <p className="text-[10px] text-slate-500 hidden sm:block">Instant hyper-local results</p>
            </div>
          </div>
          <div className="flex items-center gap-3 lg:border-l border-slate-100 lg:pl-4">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-[#431B94] flex items-center justify-center shrink-0">
              <Headphones size={20} strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">24/7 Support</h3>
              <p className="text-[10px] text-slate-500 hidden sm:block">Dedicated business care</p>
            </div>
          </div>
          <div className="flex items-center gap-3 lg:border-l border-slate-100 lg:pl-4">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-[#431B94] flex items-center justify-center shrink-0">
              <TrendingUp size={20} strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">Grow Fast</h3>
              <p className="text-[10px] text-slate-500 hidden sm:block">AI-powered rank engine</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="border-t border-slate-200/70 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} BizDial. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
            <a href="#" className="hover:text-[#431B94] transition-colors">Privacy Policy</a>
            <span className="text-slate-300">&bull;</span>
            <a href="#" className="hover:text-[#431B94] transition-colors">Terms of Use</a>
            <span className="text-slate-300">&bull;</span>
            <a href="#" className="hover:text-[#431B94] transition-colors">Sitemap</a>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
            <Image src="https://flagcdn.com/24x18/in.png" alt="India Flag" className="rounded-xs" width={24} height={18} />
            <span className="text-slate-700 text-xs font-bold">India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
