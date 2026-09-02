import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, MapPin, Tag, FileCode2, Code, ShieldCheck, 
  RefreshCw, CheckCircle2, Sliders, Globe, Layers, ArrowRight,
  Plus, Edit3, Trash2, Search, Activity, BarChart3, FileText, Check, User, Rocket,
  Copy, RotateCcw, ExternalLink, Menu
} from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';
import { getBackendBaseUrl } from '@/shared/services/api';

export default function CitySEOView() {
  const [titleTemplate, setTitleTemplate] = useState('Best Businesses & Services in {City}, {State} | BizDial');
  const [canonicalPattern, setCanonicalPattern] = useState('/c/{category_slug}/{city_slug}');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    authFetch('/api/admin/seo/templates/city')
      .then(res => res.json())
      .then(data => {
        if (data.title_template) setTitleTemplate(data.title_template);
        if (data.heading_template) setCanonicalPattern(data.heading_template); // Reusing heading for canonical here
      })
      .catch(console.error);

    authFetch('/api/admin/seo/dashboard')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  const handleApply = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const res = await authFetch(`/api/admin/seo/templates/city`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title_template: titleTemplate,
          heading_template: canonicalPattern
        })
      });
      if (res.ok) setSaveStatus("Successfully saved City templates!");
      else setSaveStatus("Failed to save.");
    } catch (err) {
      console.error(err);
      setSaveStatus("Error saving.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 5000);
    }
  };

  return (
    <div className="space-y-6">
      {saveStatus && (
        <div className={`p-4 rounded-xl text-sm font-bold flex items-center justify-between ${
          saveStatus.includes('Error') || saveStatus.includes('Failed') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-[#431B94]'
        }`}>
          <div className="flex items-center gap-2">
            {saveStatus.includes('Error') || saveStatus.includes('Failed') ? <Activity size={18}/> : <CheckCircle2 size={18}/>}
            {saveStatus}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Target Cities</div>
          <div className="text-2xl font-black text-slate-900">{stats ? stats.districts_count : '...'} Cities</div>
          <div className="text-xs text-green-600 font-semibold mt-1">100% Auto-Indexed</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">City Landing Pages</div>
          <div className="text-2xl font-black text-slate-900">{stats ? (stats.categories_count * stats.districts_count) : '...'} Pages</div>
          <div className="text-xs text-blue-600 font-semibold mt-1">Dynamic URL pattern</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Target Areas</div>
          <div className="text-2xl font-black text-slate-900">{stats ? stats.areas_count : '...'} Areas</div>
          <div className="text-xs text-slate-500 mt-1">Local neighborhood SEO</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-900">City SEO Pattern Generator</h3>
          <button 
            onClick={handleApply}
            disabled={isSaving}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              isSaving ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:-translate-y-0.5'
            }`}
          >
            {isSaving ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><RefreshCw size={14} /></motion.div> : <Check size={14} />}
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">City Title Tag Template</label>
            <input 
              type="text" 
              value={titleTemplate}
              onChange={(e) => setTitleTemplate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">City Canonical Pattern</label>
            <input 
              type="text" 
              value={canonicalPattern}
              onChange={(e) => setCanonicalPattern(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
