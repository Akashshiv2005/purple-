import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight, Monitor, Activity, MapPin, Phone, ChevronDown } from 'lucide-react';
import { getMediaUrl } from '@/shared/services/api';

interface Business {
  id?: number | string;
  slug?: string;
  business_name: string;
  category?: string;
  average_rating?: number;
  total_reviews?: number;
  address?: string | null;
  city?: string | null;
  phone?: string | null;
  logo_url?: string | null;
}

interface FeaturedBusinessesProps {
  userLocation: string;
  featuredBusinesses: Business[];
}

export default function FeaturedBusinesses({ userLocation, featuredBusinesses }: FeaturedBusinessesProps) {
  const [showAllFeatured, setShowAllFeatured] = useState(false);
  
  return (
    <motion.section id="services" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5 }} className="mb-10 relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-100 rounded-full filter blur-2xl opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full filter blur-2xl opacity-20 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 gap-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#8b5cf6] text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold shadow-md shadow-violet-500/30 mb-3">
            <Star size={13} className="fill-white" /> TOP PICKS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[42px] font-black text-slate-900 mb-1 tracking-tight">
            Featured Businesses <span className="text-[#431B94]">in {userLocation}</span>
          </h2>
        </div>
        <button onClick={() => setShowAllFeatured(true)} className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-xs shrink-0 text-xs sm:text-sm w-fit">
          View All Businesses <ArrowRight size={15} />
        </button>
      </div>
      
      <div className="relative z-10">
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-5"
        >
          {(showAllFeatured ? featuredBusinesses : featuredBusinesses.slice(0, 5)).map((bus, i) => {
            const themes = [
              { cardBg: 'bg-gradient-to-b from-[#e6f4ea] from-[40%] to-white to-[80%]', badge: 'bg-[#431B94]', text: 'text-[#431B94]', btnSolid: 'bg-[#431B94] hover:bg-violet-700 text-white', Icon: Monitor },
              { cardBg: 'bg-gradient-to-b from-[#ccfbf1] from-[40%] to-white to-[80%]', badge: 'bg-purple-600', text: 'text-purple-600', btnSolid: 'bg-purple-600 hover:bg-purple-700 text-white', Icon: Activity },
              { cardBg: 'bg-gradient-to-b from-[#e6f4ea] from-[40%] to-white to-[80%]', badge: 'bg-[#431B94]', text: 'text-[#431B94]', btnSolid: 'bg-[#431B94] hover:bg-violet-700 text-white', Icon: Star }
            ];
            const theme = themes[i % themes.length];
            const initials = bus.business_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
            
            return (
              <motion.div 
                key={bus.id ?? i} 
                variants={{
                  hidden: { opacity: 0, y: 35, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
                }}
                className={`relative rounded-2xl sm:rounded-[2rem] border border-white shadow-lg shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden ${theme.cardBg} gpu-smooth smooth-card`}
              >
                <div className="h-28 sm:h-36 md:h-[170px] w-full relative" style={{ clipPath: 'ellipse(130% 100% at 50% 0%)' }}>
                  <Image src={getMediaUrl(bus.logo_url) || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop'} alt={bus.business_name} className="w-full h-full object-cover" width={400} height={300} />
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                  <div className={`absolute top-2.5 sm:top-4 left-2.5 sm:left-4 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[8px] sm:text-[9px] font-black tracking-widest text-white flex items-center gap-1 shadow-sm ${theme.badge}`}>
                    <Star size={9} className="fill-white" /> FEATURED
                  </div>
                  <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 w-6 h-6 sm:w-7 sm:h-7 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm">
                    <theme.Icon size={12} className={theme.text} />
                  </div>
                </div>
                <div className="relative z-10 flex justify-center -mt-6 sm:-mt-8 mb-2 sm:mb-3">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-sm border-2 sm:border-[4px] border-white">
                    {bus.logo_url && !bus.logo_url.includes('unsplash') ? (
                      <Image src={getMediaUrl(bus.logo_url)} className="w-full h-full rounded-full object-cover" alt="logo" width={100} height={100} />
                    ) : (
                      <span className={`text-sm sm:text-lg font-black ${theme.text}`}>{initials}</span>
                    )}
                  </div>
                </div>
                <div className="px-2.5 sm:px-4 pb-3.5 sm:pb-5 text-center">
                  <h3 className="font-extrabold text-xs sm:text-[15px] text-slate-900 mb-0.5 truncate">{bus.business_name}</h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mb-1.5 sm:mb-3 truncate">{bus.category}</p>
                  <div className="flex items-center justify-center gap-1 mb-2 sm:mb-3">
                    <span className={`font-bold text-xs sm:text-[13px] flex items-center gap-0.5 ${theme.text}`}>
                      {bus.average_rating} <Star size={11} className="fill-current"/>
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">({bus.total_reviews})</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 mb-3 sm:mb-5">
                    <p className="text-[10px] sm:text-[11px] text-slate-600 flex items-center gap-1 truncate w-full justify-center">
                      <MapPin size={11} className="text-slate-400 shrink-0"/> <span className="truncate">{bus.address || bus.city || 'Location'}</span>
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> <span className="text-green-600 font-bold">Open</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {bus.phone ? (
                      <a href={`tel:${bus.phone}`} className={`flex-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-[11px] flex items-center justify-center gap-1 transition-colors shadow-xs ${theme.btnSolid}`}>
                        <Phone size={12} className="shrink-0"/> Call
                      </a>
                    ) : (
                      <button disabled className={`flex-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-[11px] flex items-center justify-center gap-1 bg-slate-100 text-slate-400 cursor-not-allowed`}>
                        <Phone size={12} className="shrink-0"/> N/A
                      </button>
                    )}
                    <Link href={`/business/${bus.slug || bus.id}`} className={`flex-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-[11px] bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-center truncate ${theme.text}`}>
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        {featuredBusinesses.length > 5 && (
          <div className="mt-10 flex justify-center">
            <button 
              onClick={() => setShowAllFeatured(!showAllFeatured)}
              className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              {showAllFeatured ? (
                <>Show Less <ChevronDown className="rotate-180 transition-transform" size={16} /></>
              ) : (
                <>View All Businesses <ArrowRight size={16} /></>
              )}
              {!showAllFeatured && (
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {featuredBusinesses.length - 5} more
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
