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

export default function CategorySEOView() {
  const [titlePattern, setTitlePattern] = useState('Top Rated {Category} Services | Verified Provider Listings - BizDial');
  const [descPattern, setDescPattern] = useState('Browse verified {Category} service providers near you. Get contact numbers, ratings, customer reviews, and address details on BizDial.');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    authFetch('/api/admin/seo/templates/category')
      .then(res => res.json())
      .then(data => {
        if (data.title_template) setTitlePattern(data.title_template);
        if (data.description_template) setDescPattern(data.description_template);
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
      const res = await authFetch(`/api/admin/seo/templates/category`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title_template: titlePattern,
          description_template: descPattern
        })
      });
      if (res.ok) setSaveStatus("Successfully saved Category templates!");
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
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Category SEO Meta Rules</h3>
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
        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Default Category Title Pattern</label>
            <input 
              type="text" 
              value={titlePattern}
              onChange={(e) => setTitlePattern(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Default Category Meta Description</label>
            <textarea 
              rows={3} 
              value={descPattern}
              onChange={(e) => setDescPattern(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
