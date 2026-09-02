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

export default function MetaTemplatesView() {
  const [businessTitle, setBusinessTitle] = useState('{BusinessName} - {Category} in {City} | Contact, Reviews & Address');
  const [searchTitle, setSearchTitle] = useState('Best {Subcategory} Specialists in {City} | Verified Listings - BizDial');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    // Fetch Business template
    authFetch('/api/admin/seo/templates/business')
      .then(res => res.json())
      .then(data => {
        if (data.title_template) setBusinessTitle(data.title_template);
      })
      .catch(console.error);

    // Fetch Category/City search template
    authFetch('/api/admin/seo/templates/category_city')
      .then(res => res.json())
      .then(data => {
        if (data.title_template) setSearchTitle(data.title_template);
      })
      .catch(console.error);
  }, []);

  const handleApply = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      await authFetch('/api/admin/seo/templates/business', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title_template: businessTitle, description_template: "Default desc" })
      });
      await authFetch('/api/admin/seo/templates/category_city', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title_template: searchTitle, description_template: "Default desc" })
      });
      setSaveStatus("Success! Meta templates updated.");
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
          saveStatus.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-[#431B94]'
        }`}>
          <div className="flex items-center gap-2">
            {saveStatus.includes('Error') ? <Activity size={18}/> : <CheckCircle2 size={18}/>}
            {saveStatus}
          </div>
        </div>
      )}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-900">Dynamic Variable Templates</h3>
            <p className="text-xs text-slate-500">Available variables: <code>{`{Category}`}</code>, <code>{`{Subcategory}`}</code>, <code>{`{City}`}</code>, <code>{`{BusinessName}`}</code>, <code>{`{Rating}`}</code></p>
          </div>
          <button 
            onClick={handleApply}
            disabled={isSaving}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              isSaving ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-blue-600 uppercase">Single Business Detail Page Template</div>
            <input 
              type="text" 
              value={businessTitle} 
              onChange={(e) => setBusinessTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-blue-600 uppercase">Subcategory Search Page Template</div>
            <input 
              type="text" 
              value={searchTitle} 
              onChange={(e) => setSearchTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
