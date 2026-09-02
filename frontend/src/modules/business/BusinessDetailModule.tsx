"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Star, CheckCircle, Phone, MessageCircle, Share2, Bookmark, Clock, Check, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '@/components/common/SEOHead';
import MainHeader from '@/components/navigation/MainHeader';
import { API_BASE, getMediaUrl } from '@/shared/services/api';
import { getBusinessStatus, formatTimeDisplay, formatWorkingDays } from './utils/businessUtils';
import RatingModal from './components/RatingModal';
import EnquiryModal from './components/EnquiryModal';
import RightSidebar from './components/RightSidebar';
import BusinessPhotos from './components/tabs/BusinessPhotos';
import BusinessAbout from './components/tabs/BusinessAbout';
import BusinessProducts from './components/tabs/BusinessProducts';
import BusinessServices from './components/tabs/BusinessServices';
import BusinessReviews from './components/tabs/BusinessReviews';
import BusinessHeader from './components/BusinessHeader';
import BusinessSchema from './components/BusinessSchema';

export default function BusinessDetail({ initialData, initialSlug }: { initialData?: any, initialSlug?: string }) {
  const params = useParams(); 
  const slug = params ? (params.slug as string) : initialSlug || '';
  const [data, setData] = useState<any>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: '', phone: '', service: '' });
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bookmarked = localStorage.getItem(`bookmark_${slug}`) === 'true';
      setIsBookmarked(bookmarked);
    }
  }, [slug]);

  const handleBookmarkToggle = () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    localStorage.setItem(`bookmark_${slug}`, String(nextState));
    showToast(nextState ? "Saved to bookmarks!" : "Removed from bookmarks!", "success");
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!", "success");
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone || !enquiryForm.service) return;
    setEnquiryLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/business/${data.business.id}/enquire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: enquiryForm.name,
          customer_phone: enquiryForm.phone,
          service_interest: enquiryForm.service
        })
      });
      if (response.ok) {
        setEnquirySuccess(true);
        setTimeout(() => {
          setShowEnquiryModal(false);
          setEnquirySuccess(false);
          setEnquiryForm({ name: '', phone: '', service: '' });
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to submit enquiry", err);
    }
    setEnquiryLoading(false);
  };

  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current && initialData) {
      isFirstRender.current = false;
      return;
    }
    setLoading(true);
    fetch(`${API_BASE}/business/${slug}`)
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug, initialData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data || !data.business) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-xl text-slate-500 font-semibold">Business not found</div>
      </div>
    );
  }

  const { business, gallery, services, reviews } = data;

  // Resolve effective opening, closing, and working days safely
  let effectiveOpen = business.opening_time;
  let effectiveClose = business.closing_time;
  let effectiveDays = business.working_days;

  if ((!effectiveOpen || !effectiveClose) && effectiveDays && effectiveDays.includes('-') && (effectiveDays.toLowerCase().includes('am') || effectiveDays.toLowerCase().includes('pm'))) {
    const parts = effectiveDays.split('-');
    effectiveOpen = parts[0]?.trim();
    effectiveClose = parts[1]?.trim();
    effectiveDays = 'Mon - Sat';
  }

  const status = getBusinessStatus(effectiveOpen, effectiveClose);

  const hasProducts = Boolean(data.products && data.products.length > 0);
  const hasServices = Boolean(services && services.length > 0);
  const hasPhotos = Boolean(gallery && gallery.length > 0);

  const tabs = ['Overview'];
  if (hasProducts) tabs.push('Products');
  if (hasServices) tabs.push('Services');
  if (hasPhotos) tabs.push('Photos');
  tabs.push('Reviews');

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16 relative">
      <SEOHead 
        title={business.seo_title || `${business.business_name} - Best ${business.category || 'Service'} in ${business.city} | BizDial`} 
        description={business.seo_description || business.description || `Looking for ${business.category} in ${business.city}? Visit ${business.business_name} at ${business.address}. Read reviews and get contact details.`} 
      />
      <BusinessSchema business={business} slug={slug} />

      <MainHeader />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-2 text-[11px] text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 font-medium">Home</Link>
          <span>&gt;</span>
          <Link href={`/search?city=${business.city}`} className="hover:text-blue-600 font-medium">{business.city}</Link>
          <span>&gt;</span>
          <Link href={`/search?q=${encodeURIComponent(business.category || '')}&city=${encodeURIComponent(business.city || '')}`} className="hover:text-blue-600 font-medium">
            {business.category} in {business.city}
          </Link>
          <span>&gt;</span>
          <span className="text-slate-800 font-bold">{business.business_name}</span>
        </div>
      </div>

      {/* Cover Image Banner */}
      <div className="h-44 md:h-60 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Abstract pattern grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/25 rounded-full blur-[120px] pointer-events-none" />
        
        {business.cover_image_url && (
          <img src={getMediaUrl(business.cover_image_url)} alt="Cover Image" className="w-full h-full object-cover" />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 -mt-10 sm:-mt-16 md:-mt-24 relative z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/50 p-4 sm:p-6 md:p-8">
          <BusinessHeader 
            business={business}
            status={status}
            isBookmarked={isBookmarked}
            handleBookmarkToggle={handleBookmarkToggle}
            handleShare={handleShare}
            setShowEnquiryModal={setShowEnquiryModal}
            setSelectedRating={setSelectedRating}
            setIsRatingModalOpen={setIsRatingModalOpen}
          />
          </div>

          {/* Tabs */}
          <div className="mt-8 border-b border-slate-100 flex overflow-x-auto no-scrollbar gap-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2.5 px-5 text-sm font-extrabold whitespace-nowrap rounded-t-xl transition-all duration-300 border-b-2 -mb-[1px] ${
                  activeTab === tab 
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            <BusinessPhotos activeTab={activeTab} gallery={gallery} />

            <BusinessAbout activeTab={activeTab} business={business} />
            
            <BusinessProducts activeTab={activeTab} hasProducts={hasProducts} data={data} />
            
            <BusinessServices activeTab={activeTab} hasServices={hasServices} services={services} />

            <BusinessReviews 
              activeTab={activeTab} 
              reviews={reviews} 
              setSelectedRating={setSelectedRating} 
              setIsRatingModalOpen={setIsRatingModalOpen} 
            />
          </div>

          <RightSidebar 
            business={business}
            status={status}
            effectiveOpen={effectiveOpen}
            effectiveClose={effectiveClose}
            effectiveDays={effectiveDays}
          />
        </div>

      <RatingModal 
        isRatingModalOpen={isRatingModalOpen}
        setIsRatingModalOpen={setIsRatingModalOpen}
        submissionSuccess={submissionSuccess}
        setSubmissionSuccess={setSubmissionSuccess}
        business={business}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        reviewerName={reviewerName}
        setReviewerName={setReviewerName}
        reviewComment={reviewComment}
        setReviewComment={setReviewComment}
        slug={slug}
      />

      <EnquiryModal 
        showEnquiryModal={showEnquiryModal}
        setShowEnquiryModal={setShowEnquiryModal}
        business={business}
        enquirySuccess={enquirySuccess}
        enquiryForm={enquiryForm}
        setEnquiryForm={setEnquiryForm}
        handleEnquirySubmit={handleEnquirySubmit}
        enquiryLoading={enquiryLoading}
      />

      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-slate-800"
          >
            <CheckCircle size={14} className={toast.type === 'success' ? 'text-emerald-400' : 'text-blue-450'} />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
