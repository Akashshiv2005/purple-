"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchBusinesses, getMediaUrl } from '@/shared/services/api';
import { Star, CheckCircle, Navigation, Phone, Filter, Map, LayoutList, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchBar from '@/modules/search/SearchBar';
import MapView from '@/modules/search/MapView';
import { useLocationContext } from '@/shared/context/LocationContext';
import BusinessCard from './components/BusinessCard';

export default function SearchResults({ initialData = [], initialSearchParams = {} }: { initialData?: any[], initialSearchParams?: any }) {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') ?? initialSearchParams?.q ?? '';
  const cityParam = searchParams?.get('city') ?? initialSearchParams?.city ?? '';
  
  const { location } = useLocationContext();
  const [results, setResults] = useState<any[]>(initialData);
  const [loading, setLoading] = useState(initialData.length === 0);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // ────────────────────────────────────────────────────────────────────────
  const [maxDistance, setMaxDistance] = useState<number>(50); // Default up to 50km
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const isFirstRender = React.useRef(true);

  useEffect(() => {
  // ────────────────────────────────────────────────────────────────────────
    if (location.loading) return;

    if (isFirstRender.current && initialData.length > 0) {
      isFirstRender.current = false;
      return;
    }

    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    
  // ────────────────────────────────────────────────────────────────────────
    if (location.lat && location.lng && (!cityParam || location.city === cityParam || location.isCustom)) {
      params.append('lat', location.lat.toString());
      params.append('lng', location.lng.toString());
      params.append('radius', maxDistance.toString());
    } else if (cityParam) {
      params.append('city', cityParam);
    } else if (location.city) {
      params.append('city', location.city);
    }

  // ────────────────────────────────────────────────────────────────────────
    const loadResults = async () => {
      try {
        const queryParams: any = {};
        if (query) queryParams.q = query;
        if (location.lat && location.lng && (!cityParam || location.city === cityParam || location.isCustom)) {
          queryParams.lat = location.lat;
          queryParams.lng = location.lng;
          queryParams.radius = maxDistance;
          if (cityParam || location.city) {
             queryParams.city = cityParam || location.city;
          }
        } else if (cityParam) {
          queryParams.city = cityParam;
        } else if (location.city) {
          queryParams.city = location.city;
        }

        const data = await searchBusinesses(queryParams);
        
        let filtered = Array.isArray(data) ? data : [];
        if (verifiedOnly) {
          filtered = filtered.filter((b: any) => b.is_verified);
        }
        setResults(filtered);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadResults();
  }, [query, cityParam, location.lat, location.lng, location.loading, maxDistance, verifiedOnly]);

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col">
      {/* Header / Search Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-xs py-2.5 sm:py-3.5">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-2.5 sm:gap-6">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" className="text-2xl font-black tracking-tight shrink-0 flex items-center">
              <span className="text-slate-900 font-extrabold">Biz</span><span className="text-[#431B94] font-black">Dial</span>
            </Link>
            <div className="md:hidden flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${viewMode === 'list' ? 'bg-white text-[#431B94] shadow-xs' : 'text-slate-500'}`}
              >
                <LayoutList size={13} /> List
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${viewMode === 'map' ? 'bg-white text-[#431B94] shadow-xs' : 'text-slate-500'}`}
              >
                <Map size={13} /> Map
              </button>
            </div>
          </div>
          <div className="flex-1 w-full">
            <SearchBar />
          </div>
          <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${viewMode === 'list' ? 'bg-white text-[#431B94] shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <LayoutList size={15} /> List
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${viewMode === 'map' ? 'bg-white text-[#431B94] shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <Map size={15} /> Map
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col xl:flex-row gap-4 sm:gap-8 h-full">
        
        {/* Filters Sidebar (Desktop) */}
        <div className="hidden xl:block w-64 shrink-0 space-y-6 h-[calc(100vh-140px)] sticky top-[100px] overflow-y-auto custom-scrollbar">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">
              <Filter size={17} /> Smart Filters
            </div>
            
            <div className="space-y-5">
              {/* Distance Slider */}
              {location.lat && location.lng && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-xs text-slate-800">Distance</h4>
                    <span className="text-xs font-bold text-blue-600">{maxDistance} km</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={maxDistance} 
                    onChange={(e) => setMaxDistance(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
                    <span>1 km</span>
                    <span>50 km</span>
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-semibold text-xs mb-2.5 text-slate-800">Verified & Premium</h4>
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={verifiedOnly} 
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500" 
                  />
                  Show Verified Only
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-semibold text-xs mb-2 text-slate-800">Sort Priority</h4>
                <div className="text-[11px] text-slate-500 bg-blue-50/60 p-2.5 rounded-xl border border-blue-100/80 leading-relaxed">
                  Results ranked by <strong>Distance</strong>, <strong>Relevance</strong>, and <strong>Ratings</strong>.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results & Map Container */}
        <div className="flex-1 w-full flex flex-col">
          
          {/* Mobile Filter Strip */}
          <div className="xl:hidden flex items-center gap-2.5 mb-3 w-full overflow-x-auto no-scrollbar pb-1">
            {location.lat && location.lng && (
              <div className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 shrink-0 shadow-xs">
                <Navigation size={12} className="text-blue-500 shrink-0" />
                <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Radius: {maxDistance}km</span>
                <input 
                  type="range" min="1" max="50" value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-16 accent-blue-600 cursor-pointer"
                />
              </div>
            )}
            <label className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 shrink-0 shadow-xs cursor-pointer">
              <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="rounded accent-blue-600" />
              <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Verified Only</span>
            </label>
          </div>

          <div className={`flex gap-6 ${viewMode === 'map' ? 'flex-col lg:flex-row-reverse' : 'flex-col'}`}>
            
            {/* Map View */}
            {viewMode === 'map' && (
              <div className="lg:w-1/2 xl:w-7/12 h-[50vh] lg:h-[calc(100vh-140px)] sticky top-[100px] rounded-2xl overflow-hidden shrink-0 shadow-sm border border-slate-200">
                 {loading ? (
                   <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-full h-full bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400">Loading Map...</motion.div>
                 ) : (
                   <MapView businesses={results} />
                 )}
              </div>
            )}

            {/* Results Feed */}
            <div className={`${viewMode === 'map' ? 'lg:w-1/2 xl:w-5/12 h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar pr-2' : 'w-full'}`}>
              <div className="mb-4 sm:mb-5">
                <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  {loading ? "Detecting location & searching..." : `Top places near you for "${query || cityParam || 'everything'}"`}
                </h1>
                {!loading && (
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-medium">
                    Found <strong className="text-slate-700 font-bold">{results.length}</strong> results 
                    {location.city && <span> in <strong className="text-slate-700 font-bold">{location.city}</strong></span>}
                  </p>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center py-16">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="rounded-full h-10 w-10 border-b-2 border-blue-600"></motion.div>
                </div>
              ) : results.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-xs">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                    <Search size={28} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">No results found nearby</h3>
                  <p className="text-slate-500 text-xs sm:text-sm mb-5">We expanded the search radius but couldn't find matching businesses.</p>
                  <button onClick={() => setMaxDistance(50)} className="bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-blue-700 transition-colors">
                    Search Wider Area
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5 sm:space-y-4 pb-12">
                  {results.map((biz, index) => (
                    <BusinessCard key={biz.id} biz={biz} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
