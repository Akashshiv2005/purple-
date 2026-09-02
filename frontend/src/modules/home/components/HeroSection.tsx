"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  CheckCircle2, 
  Star, 
  Scale, 
  Heart, 
  UtensilsCrossed, 
  Dumbbell, 
  Hospital, 
  ShoppingBag, 
  Scissors, 
  Search, 
  Users, 
  TrendingUp, 
  Building2, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import SearchBar from '@/modules/search/SearchBar';
import AnimatedCounter from './AnimatedCounter';

export default function HeroSection() {
  return (
    <div className="relative bg-transparent overflow-hidden pt-6 pb-12 lg:pt-8 lg:pb-16 border-b border-purple-100/50">
      {/* Bright ambient blobs optimized for performance (removed animate-pulse and mix-blend to prevent scroll jank) */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full filter blur-[100px] opacity-60 pointer-events-none transform-gpu" />
      <div className="absolute top-12 -left-24 w-[500px] h-[500px] bg-fuchsia-200/30 rounded-full filter blur-[100px] opacity-60 pointer-events-none transform-gpu" />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-20">
        
        {/* Main Hero Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 mb-10">
          
          {/* Left Column: Headlines & Badges */}
          <div className="flex-1 w-full text-center lg:text-left">
            
            {/* Top Tag Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-5"
            >
              <div className="w-5 h-5 rounded-full bg-[#431B94] flex items-center justify-center text-white shrink-0">
                <CheckCircle2 size={13} strokeWidth={3} />
              </div>
              <span className="text-xs font-bold text-slate-800 tracking-tight">
                India's Trusted Business Discovery Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }} 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black tracking-tighter text-slate-900 mb-4 leading-[1.08]"
            >
              Discover More.<br />
              Choose{" "}
              <span className="relative inline-block text-[#431B94] drop-shadow-[0_0_15px_rgba(67,27,148,0.4)]">
                {"Better.".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ opacity: 0, y: 15, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.08,
                      type: "spring",
                      stiffness: 140
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }} 
              className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 font-medium"
            >
              Everything you need, all in one place with <span className="text-[#431B94] font-extrabold">BizDial.</span>
            </motion.p>

            {/* 4 Feature Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-4"
            >
              {[
                { icon: CheckCircle2, label: "Verified Businesses" },
                { icon: Star, label: "Real Reviews" },
                { icon: Scale, label: "Easy to Compare" },
                { icon: Heart, label: "Trusted by Millions" },
              ].map((badge, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/65 text-xs font-bold text-slate-800 shadow-2xs hover:bg-white/60 hover:shadow-xs transition-all duration-300"
                >
                  <div className="w-5 h-5 rounded-full bg-[#431B94] text-white flex items-center justify-center shrink-0">
                    <badge.icon size={12} strokeWidth={2.8} />
                  </div>
                  <span>{badge.label}</span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right Column: Hero Visual Graphic Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-[55%] shrink-0 relative flex items-center justify-center lg:justify-end mt-4 lg:mt-0"
          >
            <div className="relative w-full max-w-[850px] scale-105 lg:scale-[1.15] lg:translate-x-12 lg:-translate-y-4 origin-right transform-gpu">
              {/* Subtle left-edge fade only (no center or bottom fading) */}
              <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#f8ecff] to-transparent pointer-events-none z-10" />

              <Image 
                src="/hero-section-purple.jpg" 
                alt="BizDial Business Discovery & Category Orbit" 
                className="w-full h-auto object-contain select-none mix-blend-multiply"
                width={1000}
                height={700}
                priority
                unoptimized
              />
            </div>
          </motion.div>

        </div>

        {/* Search Bar Component */}
        <div className="mb-4 relative z-30 max-w-5xl mx-auto">
          <SearchBar />
        </div>

        {/* Popular Searches */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 text-xs mb-10"
        >
          <span className="font-bold text-slate-800 mr-1">Popular Searches:</span>
          {[
            'Restaurants', 'Hospitals', 'Mobile Shops', 'Gyms', 'Beauty Salons', 'Electricians', 'More ∨'
          ].map((tag) => (
            <a 
              key={tag}
              href={`/search?q=${encodeURIComponent(tag.replace(' ∨', ''))}`}
              className="px-4 py-1.5 bg-white rounded-full font-semibold text-slate-700 hover:text-[#431B94] border border-slate-200/90 transition-all shadow-2xs"
            >
              {tag}
            </a>
          ))}
        </motion.div>

        {/* Stats Strip Component (4 Stat Columns) */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: {
              opacity: 1, y: 0,
              transition: { duration: 0.6, delay: 0.4, staggerChildren: 0.1 }
            }
          }}
          className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-5 sm:p-7 mb-8 shadow-2xs"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#431B94]/15">
            
            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-4 pt-3 sm:pt-0 sm:pl-4 first:pl-0 first:pt-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-2xs text-[#431B94] flex items-center justify-center shrink-0">
                <Building2 size={24} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none mb-1">
                  <AnimatedCounter from={0} to={15} suffix="+ Lakh" />
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-700">Businesses Listed</p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-4 pt-3 sm:pt-0 sm:pl-4 first:pl-0 first:pt-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-2xs text-[#431B94] flex items-center justify-center shrink-0">
                <Star size={24} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none mb-1">
                  <AnimatedCounter from={0} to={10} suffix="+ Lakh" />
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-700">Happy Reviews</p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-4 pt-3 sm:pt-0 sm:pl-4 first:pl-0 first:pt-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-2xs text-[#431B94] flex items-center justify-center shrink-0">
                <Users size={24} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none mb-1">
                  <AnimatedCounter from={0} to={30} suffix="+ Lakh" />
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-700">Users Trust Us</p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-4 pt-3 sm:pt-0 sm:pl-4 first:pl-0 first:pt-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-2xs text-[#431B94] flex items-center justify-center shrink-0">
                <ShieldCheck size={24} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none mb-1">
                  <AnimatedCounter from={0} to={500} suffix="+" />
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-700">Cities Covered</p>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* 4 Feature Step Cards (Bottom Cards in image) */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.6, delay: 0.5, staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {[
            {
              title: "Search",
              subtitle: "Find the best businesses that you need",
              icon: Search,
              link: "/search"
            },
            {
              title: "Compare",
              subtitle: "Compare ratings, reviews and services",
              icon: Users,
              link: "/search"
            },
            {
              title: "Connect",
              subtitle: "Connect directly and get the best",
              icon: ShieldCheck,
              link: "/search"
            },
            {
              title: "Grow",
              subtitle: "Grow your business with BizDial",
              icon: TrendingUp,
              link: "/register"
            }
          ].map((card, idx) => (
            <motion.a 
              key={idx}
              variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              href={card.link}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-md hover:border-[#431B94]/40 group flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#EAF6ED] text-[#431B94] flex items-center justify-center shrink-0 group-hover:bg-[#431B94] group-hover:text-white transition-colors duration-300">
                  <card.icon size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-900 text-base leading-tight">{card.title}</h2>
                  <p className="text-xs text-slate-500 font-medium leading-snug mt-0.5">{card.subtitle}</p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#EAF6ED] text-[#431B94] flex items-center justify-center shrink-0 group-hover:bg-[#431B94] group-hover:text-white transition-all duration-300">
                <ArrowRight size={16} strokeWidth={2.5} />
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
