import React from 'react';
import { motion } from 'framer-motion';

interface Brand {
  name: string;
}

interface TrustedBrandsProps {
  brands: Brand[];
}

export default function TrustedBrands({ brands }: TrustedBrandsProps) {
  if (!brands || brands.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="mb-10 overflow-hidden relative rounded-3xl sm:rounded-[2.5rem] mx-2 sm:mx-4 lg:mx-0 border border-violet-100 bg-white"
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-violet-200/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-200/30 blur-[100px] pointer-events-none" />

      <div className="relative z-10 pt-8 sm:pt-12 pb-4 px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-violet-100 text-slate-700 px-3.5 py-1 rounded-full text-xs font-bold mb-3 sm:mb-5 tracking-wide shadow-2xs">
          <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-1.5 h-1.5 rounded-full bg-violet-500" />
          VERIFIED BUSINESSES ON BIZDIAL
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">
          Trusted by <span className="text-[#431B94]">10,000+</span> Businesses
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm font-medium mb-6 sm:mb-8">From local shops to national chains — all growing with BizDial</p>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:flex lg:flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-10 max-w-md lg:max-w-none mx-auto">
          {[
            { value: '10K+', label: 'Businesses Listed', color: 'text-[#431B94]' },
            { value: '2.4M', label: 'Monthly Searches',  color: 'text-[#431B94]' },
            { value: '98%',  label: 'Satisfaction Rate', color: 'text-[#431B94]' },
            { value: '50+',  label: 'Cities Covered',    color: 'text-[#431B94]'},
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex flex-col items-center bg-white/80 backdrop-blur-md border border-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-2xs"
            >
              <span className={`font-black text-xl sm:text-2xl ${s.color}`}>{s.value}</span>
              <span className="text-slate-500 text-[10px] sm:text-[11px] font-semibold mt-0.5">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee rows */}
      <div className="relative w-full flex flex-col gap-4 overflow-x-hidden pb-12">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-violet-50/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-violet-50/80 to-transparent z-10 pointer-events-none" />

        {/* Row 1 —  forward */}
        <motion.div animate={{ x: [0, "-50%"] }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }} className="whitespace-nowrap flex items-center gap-5 px-4" style={{ width: "max-content" }}>
          {[...brands, ...brands].map((brand, i) => {
            const initials = brand.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('');
            return (
              <div
                key={`r1-${i}`}
                className={`inline-flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-sm border border-violet-100 rounded-2xl hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group min-w-max`}
              >
                <div className="w-9 h-9 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-xs font-black text-[#431B94]">{initials}</span>
                </div>
                <span className="font-extrabold text-sm text-slate-700 group-hover:text-slate-900 transition-colors">{brand.name}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Row 2 —  reverse */}
        <motion.div animate={{ x: ["-50%", 0] }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }} className="whitespace-nowrap flex items-center gap-5 px-4" style={{ width: "max-content" }}>
          {[...brands].reverse().concat([...brands].reverse()).map((brand, i) => {
            const initials = brand.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('');
            return (
              <div
                key={`r2-${i}`}
                className={`inline-flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-sm border border-violet-100 rounded-2xl hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group min-w-max`}
              >
                <div className="w-9 h-9 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-xs font-black text-[#431B94]">{initials}</span>
                </div>
                <span className="font-extrabold text-sm text-slate-700 group-hover:text-slate-900 transition-colors">{brand.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
