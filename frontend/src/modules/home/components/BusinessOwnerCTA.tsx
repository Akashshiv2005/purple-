import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, BarChart, Star, ArrowRight, Users, CheckCircle } from 'lucide-react';

export default function BusinessOwnerCTA() {
  return (
    <motion.section
      id="for-business"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl sm:rounded-[3rem] p-5 sm:p-8 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12 mb-10 overflow-hidden mx-2 sm:mx-4 lg:mx-0 bg-white border border-violet-100"
    >
      {/* LEFT — copy */}
      <div className="flex-1 w-full relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.05, duration: 0.3 }} className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#431B94] text-white rounded-full text-xs font-bold mb-3 sm:mb-5 shadow-md shadow-[#431B94]/20">
          <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-1.5 h-1.5 rounded-full bg-white" />
          For Business Owners
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08, duration: 0.3 }} className="text-2xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-4 leading-tight text-slate-900">
          Grow Your Business<br />
          <span className="text-[#431B94]">with BizDial</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.3 }} className="text-slate-600 mb-4 sm:mb-8 max-w-md text-xs sm:text-base font-medium leading-relaxed">
          List your business, get discovered by local buyers, and rank at the top — powered by our AI SEO engine.
        </motion.p>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          {[
            { icon: <MapPin size={16}/>, label: 'High Visibility', sub: 'Rank higher in search', color: 'text-[#431B94]', bg: 'bg-violet-50' },
            { icon: <TrendingUp size={16}/>, label: 'Quality Leads', sub: 'Real buyers, real calls', color: 'text-[#431B94]', bg: 'bg-violet-50' },
            { icon: <BarChart size={16}/>, label: 'Business Analytics', sub: 'Track views & leads', color: 'text-[#431B94]', bg: 'bg-violet-50' },
            { icon: <Star size={16}/>, label: 'Trusted Platform', sub: 'Verified by 10M+ users', color: 'text-[#431B94]', bg: 'bg-violet-50' },
          ].map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 15 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }} 
              className="flex items-center gap-2.5 sm:gap-3.5 bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-violet-100 shadow-2xs hover:shadow-md transition-all"
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${f.bg} ${f.color} rounded-xl flex items-center justify-center shrink-0`}>
                {f.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm truncate">{f.label}</h3>
                <p className="text-[10px] sm:text-xs text-slate-500 truncate">{f.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Link
          href="/register"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#431B94] hover:bg-violet-700 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-xl shadow-[#431B94]/25 transition-all active:scale-95"
        >
          List Your Business Now <ArrowRight size={18}/>
        </Link>
      </div>

      {/* RIGHT — animated bar chart */}
      <div className="flex-1 relative z-10 hidden md:flex justify-center items-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-full max-w-[420px]"
        >
          {/* Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white p-6">
            {/* Card header */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"/>
                <div className="w-3 h-3 rounded-full bg-yellow-400"/>
                <div className="w-3 h-3 rounded-full bg-green-400"/>
              </div>
              <span className="text-[11px] font-bold text-slate-400 tracking-wide">Monthly Leads Overview</span>
            </div>

            {/* Growth badge */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl font-black text-slate-900">+245%</span>
              <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp size={10}/> Growth this year
              </span>
            </div>

            {/* Bar chart */}
            {(() => {
              const bars = [
                { label: 'Jan', px: 56,  color: 'from-blue-400 to-blue-500',     shadow: 'shadow-blue-300/40'   },
                { label: 'Mar', px: 84,  color: 'from-violet-400 to-violet-500', shadow: 'shadow-violet-300/40' },
                { label: 'Jun', px: 70,  color: 'from-orange-400 to-orange-500', shadow: 'shadow-orange-300/40' },
                { label: 'Sep', px: 112, color: 'from-pink-400 to-pink-500',     shadow: 'shadow-pink-300/40'   },
                { label: 'Dec', px: 140, color: 'from-blue-500 to-indigo-600',   shadow: 'shadow-blue-400/50'   },
              ];
              return (
                <div className="relative flex items-end gap-3 mb-2" style={{ height: 150 }}>
                  {/* Grid lines */}
                  {[0, 50, 100, 150].map(y => (
                    <div key={y} className="absolute w-full border-t border-slate-100/80" style={{ bottom: y }} />
                  ))}
                  {bars.map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 relative">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: bar.px }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        className={`w-full bg-gradient-to-t ${bar.color} rounded-xl shadow-lg ${bar.shadow} relative`}
                      >
                        {i === 4 && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.7 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.2 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-lg whitespace-nowrap"
                          >
                            Best 🚀
                          </motion.span>
                        )}
                      </motion.div>
                      <span className="text-[10px] font-bold text-slate-400 absolute -bottom-5">{bar.label}</span>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Metric row */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { label: 'Total Views', value: '84K', color: 'text-blue-600' },
                { label: 'Leads', value: '3.2K', color: 'text-violet-600' },
                { label: 'Calls', value: '1.8K', color: 'text-orange-500' },
              ].map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.9 + i * 0.1 }} className="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
                  <p className={`font-black text-base ${m.color}`}>{m.value}</p>
                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Floating badge — Users Online */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1 }}
            className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2"
          >
            <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
              <Users size={13} className="text-green-600"/>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-900">2,400+</p>
              <p className="text-[9px] text-slate-400">Users online now</p>
            </div>
          </motion.div>

          {/* Floating badge — Verified */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-4 -right-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2"
          >
            <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle size={13} className="text-blue-600"/>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-900">Verified Listing</p>
              <p className="text-[9px] text-slate-400">SEO optimised ✔</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
