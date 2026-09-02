import React from 'react';
import { MapPin, Star, CheckCircle, Phone, MessageCircle, Share2, Bookmark, Clock, Calendar } from 'lucide-react';
import { getMediaUrl } from '@/shared/services/api';
import { formatWorkingDays } from '../utils/businessUtils';

export default function BusinessHeader({ 
  business, 
  status, 
  isBookmarked, 
  handleBookmarkToggle, 
  handleShare, 
  setShowEnquiryModal, 
  setSelectedRating, 
  setIsRatingModalOpen 
}: any) {
  return (
    <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            {/* Logo */}
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 border-4 border-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md flex items-center justify-center bg-white p-1.5 sm:p-2 -mt-10 sm:-mt-14 md:-mt-20 z-20">
              <img src={getMediaUrl(business.logo_url) || '/default-logo.png'} alt={business.business_name} className="max-w-full max-h-full object-contain" />
            </div>

            {/* Main Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-blue-100">
                      {business.category}
                    </span>
                    {business.is_verified && (
                      <span className="flex items-center text-[10px] font-extrabold text-slate-700 bg-slate-150 px-2 py-0.5 rounded-full uppercase tracking-wider border border-slate-200">
                        <CheckCircle size={10} className="mr-1 text-slate-700" /> Verified
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mt-2 flex flex-wrap items-center gap-2">
                    {business.business_name}
                  </h1>
                  
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-black px-2.5 py-1 rounded-lg flex items-center shadow-sm">
                      {business.average_rating || 4.5} <Star size={10} className="ml-1 fill-white text-white" />
                    </span>
                    <span className="text-xs text-slate-500 font-bold">
                      {business.total_reviews || 0} Reviews
                    </span>
                    <span className="text-slate-300">•</span>
                    {/* Status pill + inline hours */}
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${status.colorClass}`}>
                      <Clock size={12} />
                      {status.isOpen ? 'Open' : 'Closed'}
                    </span>
                    {(business.opening_time || business.closing_time) && (
                      <span className="text-xs text-slate-500 font-semibold">
                        {business.opening_time || '—'} – {business.closing_time || '—'}
                      </span>
                    )}
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-bold text-slate-600">
                      <Calendar size={12} className="text-slate-400" />
                      {formatWorkingDays(business.working_days)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-3 text-xs text-slate-500 font-semibold flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-slate-400 shrink-0" />
                      {[business.address, business.area, business.city, business.pincode].filter(Boolean).join(', ')}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-blue-100">
                      {business.category}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-6 flex-wrap">
                    {business.phone && (
                      <a href={`tel:${business.phone}`} className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-extrabold rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 hover:from-emerald-700 hover:to-green-700 shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/25 hover:scale-[1.02] transition-all duration-300 text-sm">
                        <Phone size={16} fill="currentColor" /> {business.phone}
                      </a>
                    )}
                    <button 
                      onClick={() => setShowEnquiryModal(true)}
                      className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/10 hover:shadow-blue-600/25 hover:scale-[1.02] transition-all duration-300 text-sm"
                    >
                      <MessageCircle size={16} /> <span className="hidden xs:inline">Enquire Now</span><span className="xs:hidden">Enquire</span>
                    </button>
                    {business.whatsapp && (
                      <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 bg-white text-green-600 border-2 border-green-500/30 font-extrabold rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 hover:bg-green-50 hover:border-green-500/50 hover:scale-[1.02] transition-all duration-300 text-sm">
                        <MessageCircle size={16} /> WhatsApp
                      </a>
                    )}
                    
                    <button 
                      onClick={handleShare}
                      className="p-2.5 sm:p-3 bg-white text-slate-600 border border-slate-200 rounded-xl sm:rounded-2xl hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all duration-200 relative group"
                      title="Share Profile"
                    >
                      <Share2 size={16} />
                    </button>
                    
                    <button 
                      onClick={handleBookmarkToggle}
                      className={`p-2.5 sm:p-3 border rounded-xl sm:rounded-2xl active:scale-95 transition-all duration-200 ${
                        isBookmarked 
                          ? 'bg-yellow-50 border-yellow-200 text-yellow-600 shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                      title={isBookmarked ? "Remove Bookmark" : "Save to Bookmarks"}
                    >
                      <Bookmark size={16} className={isBookmarked ? "fill-current" : ""} />
                    </button>
                    

                  </div>
                </div>

                {/* Right side interactions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end w-full lg:w-auto border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0 justify-between lg:justify-start">
                  <div className="lg:mt-6 text-left lg:text-right">
                    <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Click to Rate</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star 
                          key={i} 
                          size={24} 
                          className="text-slate-300 hover:text-yellow-400 cursor-pointer transition-colors" 
                          onClick={() => {
                            setSelectedRating(i);
                            setIsRatingModalOpen(true);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
  );
}
