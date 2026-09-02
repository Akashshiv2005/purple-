import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building, Plus, TrendingUp, Award, Phone } from 'lucide-react';

export default function HowBizDialWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    // Timings in ms corresponding to the 7s (7000ms) SVG dot path traversal
    const timings = [700, 2100, 3500, 4900, 6300];
    const timeouts: NodeJS.Timeout[] = [];

    const runSequence = () => {
      setActiveStep(null);
      timings.forEach((time, index) => {
        const t = setTimeout(() => {
          setActiveStep(index);
        }, time);
        timeouts.push(t);
      });
    };

    runSequence();
    const interval = setInterval(runSequence, 7000);

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <motion.section id="how-it-works" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5 }} className="mb-10 px-4 py-16 bg-white backdrop-blur-md rounded-[3rem] border border-white/40 mx-4 lg:mx-0 overflow-hidden relative shadow-2xs">
      <div className="absolute top-10 left-10 w-32 h-32 opacity-40" style={{backgroundImage: "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iI2QxZDVkYiIvPjwvc3ZnPg==\")"}}></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 opacity-40" style={{backgroundImage: "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iI2QxZDVkYiIvPjwvc3ZnPg==\")"}}></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3"></div>
      <div className="text-center mb-16 relative z-10">
        <p className="text-[#431B94] text-[11px] font-black tracking-[0.2em] mb-4 flex items-center justify-center gap-3 uppercase">
          <span className="w-6 h-[2px] bg-[#431B94]"></span> SIMPLE. FAST. EFFECTIVE <span className="w-6 h-[2px] bg-[#431B94]"></span>
        </p>
        <h2 className="text-4xl md:text-[44px] font-black text-slate-900 mb-4 tracking-tight">How <span className="text-[#431B94]">BizDial</span> Works</h2>
        <p className="text-[15px] font-medium text-slate-500 max-w-lg mx-auto">Find, connect, and grow with businesses in just a few simple steps.</p>
        <div className="w-24 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-transparent mx-auto mt-6 rounded-full flex justify-end items-center pr-0.5">
          <div className="w-1.5 h-1.5 bg-[#431B94] rounded-full"></div>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto relative mt-12 mb-10">
        <div className="relative w-full h-[400px] hidden md:block">
          <svg className="absolute top-0 left-0 w-full h-[150px]" viewBox="0 0 1000 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="20%" stopColor="#431B94" />
                <stop offset="50%" stopColor="#431B94" />
                <stop offset="80%" stopColor="#431B94" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <motion.path 
              id="curvePath" 
              d="M 0 100 Q 50 50 100 50 C 170 50 230 90 300 90 C 370 90 430 40 500 40 C 570 40 630 80 700 80 C 770 80 830 50 900 50 Q 950 50 1000 100" 
              fill="none" 
              stroke="url(#lineGrad)" 
              strokeWidth="2.5" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <circle r="6" fill="#ffffff" filter="url(#glow)">
              <animateMotion dur="7s" repeatCount="indefinite"><mpath href="#curvePath" /></animateMotion>
            </circle>
          </svg>
          {[
            { id: '01', title: 'Select Category', desc: 'Choose the most relevant category to list your business and reach active customers.', icon: <Building size={28} className="text-white" />, hex: '#431B94', yOffset: 50 },
            { id: '02', title: 'List Business', desc: 'Create your business profile, upload details, images, and services instantly.', icon: <Plus size={28} className="text-white" />, hex: '#431B94', yOffset: 90 },
            { id: '03', title: 'SEO Engine', desc: 'BizDial automatically generates custom SEO tags, titles, and descriptions.', icon: <TrendingUp size={28} className="text-white" />, hex: '#431B94', yOffset: 40 },
            { id: '04', title: 'Rank Top', desc: 'Our ranking engine places your listing at the top of local search results.', icon: <Award size={28} className="text-white" />, hex: '#431B94', yOffset: 80 },
            { id: '05', title: 'Get Leads', desc: 'Receive direct calls, messages, and quality leads from active local buyers.', icon: <Phone size={28} className="text-white" />, hex: '#431B94', yOffset: 50 },
          ].map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: 0.2 + i * 0.15, duration: 0.35, type: "spring", stiffness: 300, damping: 25 }} className="absolute top-0 w-1/5 h-full flex flex-col items-center" style={{ left: `${i * 20}%` }}>
              <motion.div 
                animate={activeStep === i ? { scale: 1.6, boxShadow: `0 0 12px ${step.hex}` } : { scale: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                className="absolute w-3.5 h-3.5 rounded-full z-20 border-[2.5px] border-white transition-all duration-300" 
                style={{ top: `${step.yOffset - 7}px`, backgroundColor: step.hex }}
              />
              <div className="absolute z-30" style={{ top: `${step.yOffset + 5}px` }}>
                <motion.div 
                  whileHover={{ rotate: 12, scale: 1.15 }}
                  animate={activeStep === i ? { scale: 1.12, rotate: 5 } : { scale: 1, rotate: 0 }}
                  className="w-[84px] h-[84px] rounded-full bg-white flex items-center justify-center p-2 shadow-xl cursor-pointer" 
                  style={{ boxShadow: `0 15px 35px -10px ${step.hex}60` }}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center bg-[#431B94]">{step.icon}</div>
                </motion.div>
              </div>
              <motion.div 
                animate={activeStep === i ? { 
                  y: -15, 
                  scale: 1.04, 
                  boxShadow: `0 25px 50px -12px ${step.hex}45`,
                  borderColor: `${step.hex}aa` 
                } : { 
                  y: 0, 
                  scale: 1,
                  boxShadow: "0 15px 40px -15px rgba(0,0,0,0.05)",
                  borderColor: "rgba(255,255,255,0.4)"
                }}
                whileHover={{ y: -18, scale: 1.05, boxShadow: `0 25px 50px -12px ${step.hex}60` }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                className="absolute w-[85%] p-5 pt-16 pb-7 flex flex-col items-center text-center z-20 backdrop-blur-2xl bg-white/70 border shadow-2xs rounded-3xl" 
                style={{ top: `${step.yOffset + 55}px`, borderBottom: `6px solid ${step.hex}` }}
              >
                <span className="font-extrabold text-[15px] mb-1" style={{ color: step.hex }}>{step.id}</span>
                <h3 className="font-black text-lg text-slate-900 mb-2.5 tracking-tight">{step.title}</h3>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed px-1">{step.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col gap-12 md:hidden w-full relative pt-10">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-400 via-purple-400 to-[#431B94] rounded-full z-0 opacity-20"></div>
          {[
            { id: '01', title: 'Select Category', desc: 'Choose the most relevant category to list your business and reach active customers.', icon: <Building size={28} className="text-white" />, hex: '#431B94' },
            { id: '02', title: 'List Business', desc: 'Create your business profile, upload details, images, and services instantly.', icon: <Plus size={28} className="text-white" />, hex: '#431B94' },
            { id: '03', title: 'SEO Engine', desc: 'BizDial automatically generates custom SEO tags, titles, and descriptions.', icon: <TrendingUp size={28} className="text-white" />, hex: '#431B94' },
            { id: '04', title: 'Rank Top', desc: 'Our ranking engine places your listing at the top of local search results.', icon: <Award size={28} className="text-white" />, hex: '#431B94' },
            { id: '05', title: 'Get Leads', desc: 'Receive direct calls, messages, and quality leads from active local buyers.', icon: <Phone size={28} className="text-white" />, hex: '#431B94' },
          ].map((step, i) => (
            <div key={i} className="relative z-10 w-[90%] mx-auto p-6 pt-14 flex flex-col items-center text-center backdrop-blur-2xl bg-white/70 border border-white/40 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05),0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-3xl" style={{ borderBottom: `6px solid ${step.hex}` }}>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-[6px] shadow-xl" style={{ boxShadow: `0 10px 25px -5px ${step.hex}50` }}>
                  <div className="w-full h-full rounded-full flex items-center justify-center bg-[#431B94]">{step.icon}</div>
                </div>
              </div>
              <span className="font-extrabold text-[15px] mb-1" style={{ color: step.hex }}>{step.id}</span>
              <h3 className="font-black text-xl text-slate-900 mb-2">{step.title}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
