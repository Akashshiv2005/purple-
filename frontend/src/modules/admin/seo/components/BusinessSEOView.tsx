import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Building2, MapPin, Tag, FileCode2, Code, ShieldCheck, 
  RefreshCw, CheckCircle2, Sliders, Globe, Layers, ArrowRight,
  Plus, Edit3, Trash2, Search, Activity, BarChart3, FileText, Check, User, Rocket,
  Copy, RotateCcw, ExternalLink, Menu
} from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';
import { getBackendBaseUrl } from '@/shared/services/api';

export default function BusinessSEOView() {
  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [realBusinesses, setRealBusinesses] = useState<any[]>([]);

  const [seoTitle, setSeoTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleSelectBusiness = (b: any) => {
    const mappedMatch = {
      id: b.id,
      name: b['Business Name'] || b.name, // handle both backend row format and dynamic param format
      city: b['City'] || b.city || 'Unknown',
      category: b['Category'] || b.category || 'General',
      owner: b['Owner'] || ''
    };
    setSelectedBusiness(mappedMatch);
    setSearch(mappedMatch.name);
    setSlug(mappedMatch.name.toLowerCase().replace(/ /g, '-'));
    setShowDropdown(false);
    setSearchResults([]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    if (val.length > 1) {
      const matches = realBusinesses.filter(b => 
        (b['Business Name'] && String(b['Business Name']).toLowerCase().includes(val.toLowerCase())) ||
        (b['Owner'] && String(b['Owner']).toLowerCase().includes(val.toLowerCase())) ||
        (b['Business Phone'] && String(b['Business Phone']).includes(val))
      );
      setSearchResults(matches);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
  // ────────────────────────────────────────────────────────────────────────
    authFetch('/api/admin/business-management')
      .then(res => res.json())
      .then(data => {
         if (Array.isArray(data)) {
           setRealBusinesses(data);
         }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nameParam = params.get('name');
    const searchParam = params.get('search');
    
    if (nameParam) {
      setSearch(nameParam);
      const idParam = params.get('id');
      const cityParam = params.get('city');
      const catParam = params.get('category');
      
      const dynamicMatch = {
        id: idParam ? parseInt(idParam, 10) : 999,
        name: nameParam,
        city: cityParam || 'Unknown',
        category: catParam || 'Business'
      };
      handleSelectBusiness(dynamicMatch);
    } else if (searchParam) {
      setSearch(searchParam);
    }
  }, [location.search]);

  const handleApply = async () => {
    if (!selectedBusiness) return;
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const res = await authFetch(`/api/admin/business/${selectedBusiness.id}/seo`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seo_title: seoTitle || null,
          seo_description: seoDesc || null,
          slug: slug || null
        })
      });
      if (res.ok) {
        setSaveStatus("Success! Database updated and search engines pinged.");
      } else {
        setSaveStatus("Failed to apply SEO metadata.");
      }
    } catch (err) {
      console.error(err);
      setSaveStatus("An error occurred while saving.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 5000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-extrabold text-slate-900 text-lg mb-2 flex items-center gap-2">
          <Search size={20} className="text-blue-600"/> Find Business to Optimize
        </h3>
        <p className="text-slate-500 text-sm mb-6">
          Search for an individual business owner to override their automated SEO rules and set custom tags.
        </p>
        
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by Business Name, Owner, Phone..." 
            value={search}
            onChange={handleSearch}
            onFocus={() => { if(search.length > 1 && searchResults.length > 0) setShowDropdown(true) }}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-inner"
          />
          
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto z-50">
              {searchResults.map(b => (
                <div 
                  key={b.id} 
                  onClick={() => handleSelectBusiness(b)}
                  className="p-4 hover:bg-blue-50 cursor-pointer border-b border-slate-100 last:border-0 transition-colors"
                >
                  <div className="font-bold text-slate-900">{b['Business Name']}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1"><User size={12}/> {b['Owner']}</span>
                    <span className="flex items-center gap-1"><MapPin size={12}/> {b['City']}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showDropdown && searchResults.length === 0 && search.length > 1 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl p-4 text-center text-slate-500 z-50 text-sm">
              No businesses found matching "{search}"
            </div>
          )}
        </div>
      </div>

      {selectedBusiness && (
        <div className="bg-white p-6 rounded-2xl border border-purple-200 shadow-xl shadow-purple-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 bg-purple-50 rounded-bl-[100px] -mr-4 -mt-4 z-0">
             <Building2 size={80} className="text-purple-100 opacity-50" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center font-bold text-xl">
                {selectedBusiness.name[0]}
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">{selectedBusiness.name}</h2>
                <div className="flex gap-2 text-sm text-slate-500 mt-1 font-medium">
                  {selectedBusiness.owner && <span className="flex items-center gap-1 text-blue-600"><User size={14} /> {selectedBusiness.owner}</span>}
                  {selectedBusiness.owner && <span>•</span>}
                  <span className="flex items-center gap-1"><MapPin size={14} /> {selectedBusiness.city}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Tag size={14} /> {selectedBusiness.category}</span>
                </div>
              </div>
            </div>

            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Code size={20} className="text-purple-600"/> Custom Metadata Override
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Custom SEO Title</label>
                  <p className="text-[10px] text-slate-400 mb-2">Overrides: "{selectedBusiness.name} - Best {selectedBusiness.category} in {selectedBusiness.city}"</p>
                  <input 
                    type="text" 
                    placeholder="e.g. #1 Mobile Shop in Trichy | Best Prices" 
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-mono focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Custom URL Slug</label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-sm text-slate-500 font-mono">bizdial.com/business/</span>
                    <input 
                      type="text" 
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-r-xl font-mono text-sm focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Custom Meta Description</label>
                  <textarea 
                    rows={5}
                    placeholder="Write a highly targeted description to boost click-through rates on Google search results." 
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl font-mono text-sm focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all resize-none custom-scrollbar"
                  />
                </div>
                <div className="flex flex-col items-end gap-2">
                   <button 
                     onClick={handleApply}
                     disabled={isSaving}
                     className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-purple-600/30 disabled:opacity-50 flex items-center gap-2"
                   >
                     {isSaving ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><RefreshCw size={16} /></motion.div> : <Rocket size={16} />}
                     {isSaving ? 'Applying...' : 'Force Apply & Re-Index'}
                   </button>
                   {saveStatus && (
                     <span className={`text-sm font-bold ${saveStatus.includes('Success') ? 'text-green-600' : 'text-red-500'}`}>
                       {saveStatus}
                     </span>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
