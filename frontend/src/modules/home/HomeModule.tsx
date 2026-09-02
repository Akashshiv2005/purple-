"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useHomeData } from '@/lib/hooks/useHomeData';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BrowseCategories from './components/BrowseCategories';
import FeaturedBusinesses from './components/FeaturedBusinesses';
import BusinessOwnerCTA from './components/BusinessOwnerCTA';
import HowBizDialWorks from './components/HowBizDialWorks';
import PowerfulTools from './components/PowerfulTools';
import TestimonialsSection from './components/TestimonialsSection';
import TrustedBrands from './components/TrustedBrands';
import Footer from './components/Footer';

const getCategoryTheme = (slug?: string) => {
  const themes: Record<string, { bg: string; iconBg: string; text: string }> = {
    restaurants: { bg: 'from-orange-50 to-white', iconBg: 'bg-orange-100', text: 'group-hover:text-orange-600' },
    health: { bg: 'from-green-50 to-white', iconBg: 'bg-green-100', text: 'group-hover:text-green-600' },
    beauty: { bg: 'from-pink-50 to-white', iconBg: 'bg-pink-100', text: 'group-hover:text-pink-600' },
    education: { bg: 'from-blue-50 to-white', iconBg: 'bg-blue-100', text: 'group-hover:text-blue-600' },
    travel: { bg: 'from-sky-50 to-white', iconBg: 'bg-sky-100', text: 'group-hover:text-sky-600' },
    real_estate: { bg: 'from-indigo-50 to-white', iconBg: 'bg-indigo-100', text: 'group-hover:text-indigo-600' },
    finance: { bg: 'from-violet-50 to-white', iconBg: 'bg-violet-100', text: 'group-hover:text-[#431B94]' },
    automotive: { bg: 'from-yellow-50 to-white', iconBg: 'bg-yellow-100', text: 'group-hover:text-yellow-600' },
  };
  return themes[slug ?? ''] ?? { bg: 'from-slate-50 to-white', iconBg: 'bg-slate-100', text: 'group-hover:text-blue-600' };
};

const Home = ({ initialData }: { initialData?: any }) => {
  const { data, loading, error } = useHomeData(initialData);
  const { scrollYProgress } = useScroll();
  const [userLocation, setUserLocation] = useState('Detecting...');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || 'Unknown Location';
            setUserLocation(city);
          } catch (e) {
            console.error("Error fetching city", e);
            setUserLocation('your area');
          }
        },
        (error) => {
          console.warn("Location permission denied or unavailable:", error.message);
          setUserLocation('your area');
        }
      );
    } else {
      setUserLocation('your area');
    }
  }, []);

  const categories = data?.categories ?? [];
  const featuredBusinesses = data?.featured_businesses ?? [];
  const testimonials = data?.testimonials ?? [];
  const apiBrands = data?.brands ?? [];
  
  const brandNames = ["Trichy Saratha's", "Pothys", "The Chennai Silks", "Saravana Stores", "RmKV Silks", "Nalli Silks", "Jayachandran Textiles", "Ramraj Cotton", "Naidu Hall", "Sundari Silks", "Kumaran Silks", "Sri Kumaran Silks", "Sri Ganapathy Silks", "SMR Silks", "Sreeleathers", "Seematti", "Kalyan Silks", "Aachi Apparel & Silks", "Thangamayil Textiles", "RMK Textiles", "Co-optex", "Nallappa Silks", "J V Textiles", "Malar Silks", "Prisma Legwear", "Sri Nachammai Cotton", "Rajapalayam Textile Showrooms", "Vinaayak Fabrics", "Colombo Stores", "KnK Fashions"];
  const defaultBrands = brandNames.map((name, i) => ({ id: i, name }));
  const brands = apiBrands.length > 0 ? apiBrands : defaultBrands;

  const staticCategories = [
    { name: 'Shopping', slug: 'shopping', icon: '🛍️' },
    { name: 'Restaurants & Food', slug: 'restaurants-food', icon: '🍔' },
    { name: 'Healthcare', slug: 'healthcare', icon: '🏥' },
    { name: 'Hotels & Travel', slug: 'hotels-travel', icon: '✈️' },
    { name: 'Beauty & Wellness', slug: 'beauty-wellness', icon: '💅' },
    { name: 'Home Services', slug: 'home-services', icon: '🛠️' },
    { name: 'Automotive', slug: 'automotive', icon: '🚗' },
    { name: 'Education', slug: 'education', icon: '🎓' },
    { name: 'Real Estate', slug: 'real-estate', icon: '🏢' },
    { name: 'Professional Services', slug: 'professional-services', icon: '💼' },
    { name: 'IT & Software', slug: 'it-software', icon: '💻' },
    { name: 'Electronics', slug: 'electronics', icon: '📱' },
    { name: 'Finance', slug: 'finance', icon: '💰' },
    { name: 'Legal Services', slug: 'legal-services', icon: '⚖️' },
    { name: 'Construction', slug: 'construction', icon: '🏗️' },
    { name: 'Industrial', slug: 'industrial', icon: '🏭' },
    { name: 'Fitness & Sports', slug: 'fitness-sports', icon: '🏋️' },
    { name: 'Event Planning', slug: 'event-planning', icon: '🎉' },
    { name: 'Pet Care', slug: 'pet-care', icon: '🐾' },
    { name: 'Advertising & Media', slug: 'advertising-media', icon: '📢' },
    { name: 'Transport & Logistics', slug: 'transport-logistics', icon: '🚚' },
    { name: 'Agriculture', slug: 'agriculture', icon: '🌾' },
    { name: 'Arts & Entertainment', slug: 'arts-entertainment', icon: '🎭' },
    { name: 'Public Services', slug: 'public-services', icon: '🏛️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8ebff] via-white to-[#fff0fa] font-sans text-slate-800 overflow-x-hidden">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#431B94] via-purple-500 to-violet-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <Header userLocation={userLocation} />
      
      <main>
        <HeroSection />

        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-6">
          <BrowseCategories categories={staticCategories} getCategoryTheme={getCategoryTheme} />
          
          <BusinessOwnerCTA />
          
          <FeaturedBusinesses userLocation={userLocation} featuredBusinesses={featuredBusinesses} />
          
          <HowBizDialWorks />
          
          <PowerfulTools />
          
          <TestimonialsSection testimonials={testimonials} />
          
          <TrustedBrands brands={brands} />
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default Home;
