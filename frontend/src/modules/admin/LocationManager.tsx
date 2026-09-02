"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Plus, Edit3, Trash2, Download, RefreshCw, Search,
  ChevronRight, Check, X, Globe, Building2, LayoutGrid, Map, Menu
} from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';
import OverviewTab from './location/components/OverviewTab';
import DistrictsTab from './location/components/DistrictsTab';
import CitiesTab from './location/components/CitiesTab';
import AreasTab from './location/components/AreasTab';

const BASE = '';

type Tab = 'overview' | 'districts' | 'cities' | 'areas';

interface District { id: number; name: string; slug: string; is_active: boolean; state_name: string; }
interface City { id: number; name: string; slug: string; district_id: number; type: string; is_active: boolean; }
interface Area { id: number; name: string; slug: string; city_id: number; is_active: boolean; }
interface Stats { countries: number; states: number; districts: number; cities: number; areas: number; localities: number; seo_pages: number; slugs: number; }

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 20, x: '-50%' }}
      className="fixed bottom-6 left-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-medium border border-slate-700"
    >
      <Check size={18} className="text-green-400" />
      {message}
    </motion.div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"><X size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}

  // ────────────────────────────────────────────────────────────────────────
export default function LocationManager({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const [tab, setTab] = useState<Tab>('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    authFetch(`${BASE}/api/admin/locations/stats`)
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setStats(d));
  }, []);

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'districts', label: 'Districts', icon: LayoutGrid },
    { id: 'cities', label: 'Cities', icon: Building2 },
    { id: 'areas', label: 'Areas', icon: MapPin },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            {onOpenSidebar && (
              <button className="md:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg mr-2" onClick={onOpenSidebar}>
                <Menu size={24} />
              </button>
            )}
            <MapPin className="text-blue-600" size={24} />
            Location Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">Manage India ? Tamil Nadu ? Districts ? Cities ? Areas hierarchy</p>
        </div>
        <button onClick={() => authFetch(`${BASE}/api/admin/locations/stats`).then(r => r.json()).then(setStats)}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50">
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.id ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
            <t.icon size={15} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
          {tab === 'overview' && <OverviewTab stats={stats} />}
          {tab === 'districts' && <DistrictsTab onToast={setToast} />}
          {tab === 'cities' && <CitiesTab onToast={setToast} />}
          {tab === 'areas' && <AreasTab onToast={setToast} />}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
