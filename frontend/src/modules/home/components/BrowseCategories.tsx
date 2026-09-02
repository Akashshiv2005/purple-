import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Category {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

interface BrowseCategoriesProps {
  categories: Category[];
  getCategoryTheme: (slug: string) => { bg: string; iconBg: string; text: string };
}

export default function BrowseCategories({ categories, getCategoryTheme }: BrowseCategoriesProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 8);

  return (
    <motion.section id="categories" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5 }} className="mb-10 mt-16 sm:mt-20 md:mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-4">
        <div>
          <p className="text-[#431B94] text-[10px] font-black tracking-[0.2em] mb-2 uppercase">EXPLORE LOCAL SERVICES</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">
            Browse by <span className="text-[#431B94]">Top Categories</span>
          </h2>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {visibleCategories.map((cat, i) => {
          const theme = getCategoryTheme(cat.slug);
          return (
            <div 
              key={i} 
              className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 bg-white border border-slate-100/80 rounded-[1.25rem] shadow-sm hover:shadow-[0_10px_30px_rgba(0,135,68,0.12)] hover:-translate-y-1.5 hover:scale-[1.02] hover:border-[#431B94]/30 transform transition-all duration-300 ease-out group select-none cursor-pointer relative overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>
              
              <div className={`w-11 h-11 sm:w-12 sm:h-12 ${theme.iconBg} bg-opacity-80 rounded-[1rem] flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm group-hover:shadow-md shrink-0 relative z-10`}>
              <motion.div whileHover={{ opacity: [1, 0.5, 1], transition: { repeat: Infinity, duration: 1.5 } }}>
                {cat.icon}
              </motion.div>
              </div>
              
              <span className={`text-xs sm:text-sm md:text-[15px] font-extrabold text-slate-800 transition-colors duration-200 relative z-10 ${theme.text}`}>
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 flex justify-center">
        <button 
          onClick={() => setShowAllCategories(!showAllCategories)}
          className="px-6 py-2.5 bg-violet-50 text-violet-700 font-bold rounded-xl hover:bg-violet-100 transition-colors flex items-center gap-2"
        >
          {showAllCategories ? (
            <>Show Less <ChevronDown className="rotate-180 transition-transform" size={16} /></>
          ) : (
            <>Show All Categories <ChevronDown className="transition-transform" size={16} /></>
          )}
        </button>
      </div>
    </motion.section>
  );
}
