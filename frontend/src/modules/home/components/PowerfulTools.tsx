import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Award, Monitor, BarChart, TrendingUp, Headphones, ArrowRight } from 'lucide-react';

export default function PowerfulTools() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-14 mb-10 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12 overflow-hidden mx-2 sm:mx-4 lg:mx-0 bg-white border border-violet-100"
    >
      {/* LEFT — custom animated dashboard illustration */}
      <div className="flex-1 relative z-10 w-full max-w-[480px] mx-auto md:mx-0">
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} className="relative w-full">
          {/* Main card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-2 h-2 rounded-full bg-[#431B94]" />
                <span className="text-xs font-black text-slate-800">BizDial Dashboard</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"/>
                <div className="w-2.5 h-2.5 rounded-full bg-violet-400"/>
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400"/>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label:'Views', value:'84K', delta:'+32%', color:'text-[#431B94]', bg:'bg-violet-50' },
                { label:'Leads', value:'3.2K', delta:'+58%', color:'text-[#431B94]', bg:'bg-violet-50' },
                { label:'Calls', value:'1.8K', delta:'+24%', color:'text-[#431B94]', bg:'bg-violet-50' },
              ].map((s,i)=>(
                <motion.div key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2+i*0.1}} className={`${s.bg} rounded-2xl p-3 text-center`}>
                  <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
                  <p className="text-[9px] text-slate-500 font-semibold">{s.label}</p>
                  <p className="text-[9px] text-[#431B94] font-bold mt-0.5">{s.delta}</p>
                </motion.div>
              ))}
            </div>

            {/* Animated bar chart */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-500">Monthly Leads</span>
                <span className="text-[10px] font-black text-[#431B94]">2026</span>
              </div>
              <div className="relative flex items-end gap-1.5" style={{ height: 120 }}>
                {[0,40,80,120].map(y => (
                  <div key={y} className="absolute w-full border-t border-slate-100" style={{ bottom: y }} />
                ))}
                {[
                  { label:'J', px:42,  color:'from-violet-400 to-purple-500', shadow:'shadow-violet-300/50' },
                  { label:'F', px:62,  color:'from-violet-500 to-[#431B94]', shadow:'shadow-violet-300/50' },
                  { label:'M', px:50,  color:'from-purple-400 to-violet-500', shadow:'shadow-purple-300/50' },
                  { label:'A', px:82,  color:'from-violet-400 to-purple-500', shadow:'shadow-violet-300/50' },
                  { label:'M', px:66,  color:'from-violet-500 to-[#431B94]', shadow:'shadow-violet-300/50' },
                  { label:'J', px:94,  color:'from-purple-400 to-violet-500', shadow:'shadow-purple-300/50' },
                  { label:'J', px:75,  color:'from-violet-400 to-purple-500', shadow:'shadow-violet-300/50' },
                  { label:'A', px:106, color:'from-violet-500 to-[#431B94]', shadow:'shadow-violet-300/50' },
                  { label:'S', px:88,  color:'from-purple-400 to-violet-500', shadow:'shadow-purple-300/50' },
                  { label:'O', px:114, color:'from-violet-500 to-[#431B94]', shadow:'shadow-violet-400/50' },
                  { label:'N', px:96,  color:'from-violet-500 to-[#431B94]', shadow:'shadow-violet-400/50' },
                  { label:'D', px:120, color:'from-[#431B94] to-purple-700', shadow:'shadow-violet-500/60' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5 relative">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: bar.px }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 + i * 0.07, duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
                      className={`w-full bg-gradient-to-t ${bar.color} rounded-t-xl shadow-lg ${bar.shadow} self-end`}
                    />
                    <span className="text-[7px] text-slate-400 font-semibold absolute -bottom-4">{bar.label}</span>
                  </div>
                ))}
              </div>
              <div className="h-4" />
            </div>

            {/* Sparkline row */}
            <div className="flex items-center justify-between bg-violet-50/60 rounded-xl px-3 py-2 border border-violet-100">
              <div>
                <p className="text-[10px] font-black text-slate-800">Search Ranking</p>
                <p className="text-[9px] text-slate-500">You're in Top 3 this week</p>
              </div>
              <svg viewBox="0 0 80 30" className="w-20 h-8">
                <polyline points="0,25 15,18 30,22 45,10 60,14 80,4" fill="none" stroke="#431B94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <motion.circle animate={{ scale: [1, 2], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }} cx="80" cy="4" r="3" fill="#431B94" style={{transformOrigin:'80px 4px'}}/>
                <circle cx="80" cy="4" r="2" fill="#431B94"/>
              </svg>
              <span className="text-xs font-black text-violet-700">#2</span>
            </div>
          </div>

          {/* Floating badge — New Lead */}
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2">
            <div className="w-7 h-7 bg-violet-100 rounded-full flex items-center justify-center relative">
              <Phone size={12} className="text-[#431B94]"/>
              <motion.span animate={{ scale: [1, 2], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }} className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-violet-500 rounded-full"/>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-900">New Lead!</p>
              <p className="text-[9px] text-slate-400">Just now</p>
            </div>
          </motion.div>

          {/* Floating badge — SEO rank */}
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }} className="absolute -bottom-5 -left-5 bg-[#431B94] rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2">
            <Award size={14} className="text-white"/>
            <div>
              <p className="text-[10px] font-black text-white">Top Ranked</p>
              <p className="text-[9px] text-violet-100">SEO Optimised ✔</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* RIGHT — copy */}
      <div className="flex-[1.2] w-full relative z-10">
        <motion.div initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#431B94] text-white rounded-full text-xs font-bold mb-5 shadow-lg shadow-[#431B94]/25">
          <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-1.5 h-1.5 rounded-full bg-white"/>
          Powerful Tools
        </motion.div>
        <motion.h2 initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.15}} className="text-3xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">
          Powerful Growth Tools<br/>
          <span className="text-[#431B94]">for Your Business</span>
        </motion.h2>
        <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.2}} className="text-sm text-slate-600 mb-8 max-w-md leading-relaxed">
          Everything you need to grow your business, track leads, and reach the right audience — all in one place.
        </motion.p>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          {[
            { icon:<Monitor size={16}/>, title:'Dashboard', sub:'Profile & leads', bg:'bg-violet-50', color:'text-[#431B94]' },
            { icon:<BarChart size={16}/>, title:'Analytics', sub:'Customer insights', bg:'bg-violet-50', color:'text-[#431B94]' },
            { icon:<TrendingUp size={16}/>, title:'Marketing', sub:'Promote business', bg:'bg-violet-50', color:'text-[#431B94]' },
            { icon:<Headphones size={16}/>, title:'Support', sub:'24/7 Expert help', bg:'bg-violet-50', color:'text-[#431B94]' },
          ].map((f,i)=>(
            <motion.div key={i} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.25+i*0.08}} className="flex items-center gap-2.5 sm:gap-3 bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-violet-100 shadow-2xs hover:shadow-md transition-all">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${f.bg} ${f.color} rounded-xl flex items-center justify-center shrink-0`}>{f.icon}</div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{f.title}</h3>
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
    </motion.section>
  );
}
