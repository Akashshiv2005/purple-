import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Navigation, Phone, MapPin } from 'lucide-react';
import { getMediaUrl } from '@/shared/services/api';

export default function BusinessCard({ biz, index }: any) {
  return (
    <motion.div 
                      
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 relative overflow-hidden group"
                    >
                      {/* Verified Highlight */}
                      {biz.is_verified && <div className="absolute top-0 left-0 w-1 sm:w-1.5 h-full bg-green-500"></div>}
                      
                      {/* Logo / Thumbnail Image */}
                      <div className="w-full sm:w-40 h-44 sm:h-auto rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50 flex items-center justify-center relative">
                        {biz.logo_url ? (
                          <img src={getMediaUrl(biz.logo_url)} alt={biz.business_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <span className="text-slate-300 font-black text-3xl">{biz.business_name.charAt(0)}</span>
                        )}
                        
                        {biz.distance !== null && biz.distance !== undefined && (
                          <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg py-1 px-2 text-center shadow-xs border border-slate-100">
                            <span className="text-[11px] font-black text-blue-700">{biz.distance} km</span> <span className="text-[9px] font-semibold text-slate-500">away</span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col min-w-0">
                        <div className="flex items-start justify-between mb-1.5 gap-2">
                          <div className="min-w-0 flex-1">
                            <Link href={`/business/${biz.slug || biz.id}`} className="text-base sm:text-lg font-bold text-slate-900 flex flex-wrap items-center gap-1.5 group-hover:text-blue-600 transition-colors leading-tight mb-1">
                              <span className="truncate">{biz.business_name}</span>
                              {biz.is_verified && <CheckCircle size={15} className="text-green-500 fill-green-50 shrink-0" />}
                            </Link>
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold text-[11px]">{biz.category}</span>
                              <span className="text-slate-500 flex items-center gap-1 font-medium text-[11px] truncate">
                                <MapPin size={11} className="text-slate-400 shrink-0" /> {biz.address || biz.area || biz.city}
                              </span>
                            </div>
                          </div>
                          
                          {/* Rating Badge */}
                          <div className="flex flex-col items-end shrink-0">
                            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded-md font-bold text-xs shadow-xs">
                              {biz.average_rating} <Star size={10} className="fill-current" />
                            </div>
                            <span className="text-[9px] text-slate-500 mt-0.5 font-semibold">({biz.total_reviews})</span>
                          </div>
                        </div>

                        {biz.description && (
                          <p className="text-slate-600 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                            {biz.description}
                          </p>
                        )}

                        <div className="mt-auto pt-3 flex flex-wrap items-center gap-2">
                          {biz.phone ? (
                            <a href={`tel:${biz.phone}`} className="flex-1 min-w-[100px] bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs">
                              <Phone size={13} /> Call Now
                            </a>
                          ) : (
                            <button disabled className="flex-1 min-w-[100px] bg-slate-100 text-slate-400 px-3 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed">
                              <Phone size={13} /> No Number
                            </button>
                          )}
                          {(biz.google_map_url || (biz.latitude && biz.longitude)) && (
                            <a 
                              href={biz.google_map_url || `https://www.google.com/maps/search/?api=1&query=${biz.latitude},${biz.longitude}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 min-w-[100px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <Navigation size={13} className="text-blue-500" /> Directions
                            </a>
                          )}
                          <Link href={`/business/${biz.slug || biz.id}`} className="flex-1 min-w-[100px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors">
                            Details
                          </Link>
                        </div>
                      </div>
                    </motion.div>
  );
}
