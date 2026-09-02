import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, Tag, MapPin, X } from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';
import { BusinessOption } from '../types';

interface BusinessSelectorProps {
  selectedBusiness: BusinessOption | null;
  onSelectBusiness: (b: BusinessOption) => void;
  onClearBusiness: () => void;
}

export default function BusinessSelector({ selectedBusiness, onSelectBusiness, onClearBusiness }: BusinessSelectorProps) {
  const [businessQuery, setBusinessQuery] = useState('');
  const [businessResults, setBusinessResults] = useState<BusinessOption[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(true);
    const handle = setTimeout(() => {
      authFetch(`/api/admin/seo/keywords/businesses?q=${encodeURIComponent(businessQuery)}`)
        .then(res => res.json())
        .then(data => {
          setBusinessResults(Array.isArray(data) ? data : []);
          setSearching(false);
        })
        .catch(() => setSearching(false));
    }, 300);
    return () => clearTimeout(handle);
  }, [businessQuery]);

  const handleSelect = (b: BusinessOption) => {
    onSelectBusiness(b);
    setPickerOpen(false);
    setBusinessQuery('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <Building2 size={16} />
        </div>
        <h3 className="text-lg font-bold text-slate-900">1. Select a Business</h3>
      </div>

      {selectedBusiness ? (
        <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3">
          <div>
            <div className="font-black text-slate-900">{selectedBusiness.business_name}</div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1"><Tag size={11} /> {selectedBusiness.category || 'General'}</span>
              <span className="flex items-center gap-1"><MapPin size={11} /> {selectedBusiness.city || 'Unknown'}</span>
            </div>
          </div>
          <button
            onClick={onClearBusiness}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Change business"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search a business by name..."
            value={businessQuery}
            onChange={(e) => { setBusinessQuery(e.target.value); setPickerOpen(true); }}
            onFocus={() => setPickerOpen(true)}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 placeholder:font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <AnimatePresence>
            {pickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute z-20 mt-2 w-full bg-white rounded-xl border border-slate-200 shadow-2xl max-h-72 overflow-y-auto"
              >
                {searching ? (
                  <div className="p-4 text-center text-sm text-slate-400">Searching...</div>
                ) : businessResults.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-400">No businesses found.</div>
                ) : (
                  businessResults.map(b => (
                    <button
                      key={b.id}
                      onClick={() => handleSelect(b)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center justify-between border-b border-slate-50 last:border-0"
                    >
                      <div>
                        <div className="font-bold text-sm text-slate-900">{b.business_name}</div>
                        <div className="text-xs text-slate-500">{b.category || 'General'} &middot; {b.city || 'Unknown'}</div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{b.keyword_count} kw</span>
                    </button>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
