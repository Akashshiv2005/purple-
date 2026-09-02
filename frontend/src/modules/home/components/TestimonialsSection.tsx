import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Quote, Star, Check } from 'lucide-react';

interface Testimonial {
  id?: number | string;
  name?: string;
  text?: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: '-50px' }} 
      transition={{ duration: 0.6 }} 
      className="mb-14 px-4 xl:px-0 relative"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-200/20 blur-[120px] pointer-events-none -z-10" />

      <div className="text-center mb-12 relative z-10">
        <span className="inline-flex items-center gap-1.5 bg-violet-50 border border-violet-100 text-violet-700 px-3.5 py-1 rounded-full text-xs font-bold mb-4 tracking-wide uppercase shadow-2xs">
          <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}><MessageSquare size={12} className="text-[#431B94]" /></motion.div>
          Platform Reviews
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
          What Our <span className="text-[#431B94]">Users Say</span>
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">Real stories and testimonials from verified platform users and business owners across India</p>
      </div>

      <div className="relative z-10">
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.id ?? i} 
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.97 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              className="bg-white/40 backdrop-blur-md border border-white/60 hover:border-indigo-200/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(31,38,135,0.04)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.12)] transition-all duration-300 relative group overflow-hidden flex flex-col transform hover:-translate-y-1.5"
            >
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-600/5 rounded-full mix-blend-multiply group-hover:scale-150 transition-transform duration-700"></div>
              <Quote className="absolute top-4 right-6 text-indigo-500/5 w-16 h-16 pointer-events-none group-hover:text-indigo-500/10 transition-colors shrink-0" />
              
              <div className="flex-1">
                {/* Rating badge */}
                <div className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2.5 py-0.5 rounded-full text-[10px] font-black mb-4 border border-amber-500/10 shadow-sm">
                  <Star size={10} className="fill-current text-amber-500" />
                  <span>{t.rating?.toFixed(1) || '5.0'} / 5.0 Rating</span>
                </div>
                
                <p className="text-slate-700 text-[13.5px] font-semibold leading-relaxed mb-6 italic relative z-10">
                  "{t.text}"
                </p>
              </div>
              
              <div className="flex items-center justify-between border-t border-slate-200/40 pt-5 mt-auto relative z-10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {/* Initials-based avatar with premium gradient */}
                    <div className="w-11 h-11 rounded-full bg-[#431B94] flex items-center justify-center text-white text-sm font-black shadow-inner border border-white/50">
                      {(t.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-violet-700 rounded-full flex items-center justify-center border border-white text-white shadow-sm">
                      <Check size={8} strokeWidth={3} />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{t.name}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
