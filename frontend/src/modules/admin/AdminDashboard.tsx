"use client";
import React, { Suspense, useState } from 'react';
import { authFetch } from '@/shared/services/authFetch';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from '@/modules/admin/AdminSidebar';
import SEODashboard from '@/modules/admin/seo/SEODashboard';
import SEOKeywords from '@/modules/admin/seo/SEOKeywords';
import SEOModuleContainer from '@/modules/admin/seo/SEOModuleContainer';
import VerificationPanel from '@/modules/admin/verification/VerificationPanel';
import CategoryManagement from '@/modules/admin/category/CategoryManagement';
import LocationManager from '@/modules/admin/LocationManager';
import SearchConfigManager from '@/modules/admin/SearchConfigManager';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Users, IndianRupee, PhoneCall, Star, Crown, 
  MoreVertical, CheckCircle2, AlertCircle, Clock, Check, Menu, X, Edit3, MapPin, UserSquare2, Target, ShieldCheck, Code
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

import AdminDashboardTab from '@/modules/admin/tabs/AdminDashboardTab';
import AdminDynamicDataTab from '@/modules/admin/tabs/AdminDynamicDataTab';
import AdminAnalyticsTab from '@/modules/admin/tabs/AdminAnalyticsTab';
import AdminSettingsTab from '@/modules/admin/tabs/AdminSettingsTab';
import AdminPlatformReviewsTab from '@/modules/admin/tabs/AdminPlatformReviewsTab';
import AdminNotificationsTab from '@/modules/admin/tabs/AdminNotificationsTab';

function DashboardContent({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const searchParams = useSearchParams();
  const tab = searchParams?.get('tab') || 'dashboard';

  if (tab === 'dashboard') {
    return <AdminDashboardTab onOpenSidebar={onOpenSidebar} />;
  }

  if (tab === 'verification-management') {
    return <VerificationPanel onOpenSidebar={onOpenSidebar} />;
  }

  if (tab === 'categories') {
    return <CategoryManagement onOpenSidebar={onOpenSidebar} />;
  }

  if (tab === 'locations') {
    return <LocationManager onOpenSidebar={onOpenSidebar} />;
  }

  if (tab === 'search-config') {
    return <SearchConfigManager onOpenSidebar={onOpenSidebar} />;
  }

  if (tab === 'seo-dashboard') {
    return <SEODashboard onOpenSidebar={onOpenSidebar} />;
  }

  if (tab === 'seo-keywords') {
    return <SEOKeywords onOpenSidebar={onOpenSidebar} />;
  }

  if (['city-seo', 'category-seo', 'business-seo', 'meta-templates', 'url-generator', 'schema-generator', 'robots', 'sitemap', 'canonical-urls', 'redirects', 'search-analytics'].includes(tab)) {
    return <SEOModuleContainer moduleName={tab} onOpenSidebar={onOpenSidebar} />;
  }

  if (tab === 'analytics') {
    return <AdminAnalyticsTab onOpenSidebar={onOpenSidebar} />;
  }

  if (tab === 'platform-reviews') {
    return <AdminPlatformReviewsTab onOpenSidebar={onOpenSidebar} />;
  }

  if (tab === 'settings') {
    return <AdminSettingsTab onOpenSidebar={onOpenSidebar} />;
  }

  if (tab === 'notifications') {
    return <AdminNotificationsTab onOpenSidebar={onOpenSidebar} />;
  }

  return <AdminDynamicDataTab tab={tab} onOpenSidebar={onOpenSidebar} />;
}

export default function SuperAdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <Suspense fallback={<div className="p-8 text-center text-slate-500 font-medium">Loading Dashboard...</div>}>
          <DashboardContent onOpenSidebar={() => setIsSidebarOpen(true)} />
        </Suspense>
      </main>
    </div>
  );
}
