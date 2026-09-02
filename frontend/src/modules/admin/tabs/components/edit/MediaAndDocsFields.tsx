import React from 'react';
import { ExternalLink } from 'lucide-react';
import { getMediaUrl } from '@/shared/services/api';

export default function MediaAndDocsFields({ editFormData, setEditFormData, editingRow, handleFileUpload }: any) {
  return (
    <div className="space-y-6">
      {/* Working Hours */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h4 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-50 pb-4">
          Working Hours
        </h4>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Working Days (Mon - Sat Hours)</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-orange-500/15 focus:border-orange-500 outline-none text-sm text-slate-800 font-semibold bg-slate-50/50 focus:bg-white transition-all shadow-inner"
              value={editFormData['Working Days'] ?? editingRow?.['Working Days'] ?? ''}
              onChange={e => setEditFormData((prev: any) => ({ ...prev, 'Working Days': e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Sunday Hours</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-orange-500/15 focus:border-orange-500 outline-none text-sm text-slate-800 font-semibold bg-slate-50/50 focus:bg-white transition-all shadow-inner"
              value={editFormData['Sunday Hours'] ?? editingRow?.['Sunday Hours'] ?? ''}
              onChange={e => setEditFormData((prev: any) => ({ ...prev, 'Sunday Hours': e.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* Services Offered */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h4 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-50 pb-4">
          Offered Services
        </h4>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Services Offered (Comma Separated)</label>
          <textarea
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500 outline-none text-sm text-slate-800 font-semibold bg-slate-50/50 focus:bg-white transition-all h-24 custom-scrollbar shadow-inner resize-none"
            value={editFormData['Services Offered'] ?? editingRow?.['Services Offered'] ?? ''}
            onChange={e => setEditFormData((prev: any) => ({ ...prev, 'Services Offered': e.target.value }))}
          />
        </div>
      </div>

      {/* Media & Logos */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h4 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-50 pb-4">
          Media & Logos
        </h4>
        <div className="grid grid-cols-1 gap-5">
          {[
            { key: 'Logo URL', label: 'Business Logo URL' },
            { key: 'Cover Banner URL', label: 'Cover Banner URL' },
          ].map(({ key, label }) => {
            const val = editFormData[key] ?? editingRow?.[key] ?? '';
            return (
              <div key={key}>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-pink-500/15 focus:border-pink-500 outline-none text-sm text-slate-800 font-semibold bg-slate-50/50 focus:bg-white transition-all shadow-inner"
                    value={val}
                    onChange={e => setEditFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
                  />
                  <label className="flex items-center justify-center px-4 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-2xl transition-colors border border-pink-200 shadow-sm shrink-0 cursor-pointer">
                    <span className="text-xs font-bold mr-1">Upload</span>
                    <input type="file" className="hidden" onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload(e.target.files[0], key);
                    }} />
                  </label>
                  <a href={val ? getMediaUrl(val) : '#'} target={val ? "_blank" : undefined} rel="noreferrer" className={`flex items-center justify-center px-4 rounded-2xl transition-colors border shadow-sm shrink-0 ${val ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200' : 'bg-slate-50 text-slate-400 border-slate-100 pointer-events-none'}`}>
                    <ExternalLink size={18} className={val ? "text-pink-600" : "text-slate-400"} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Docs */}
      <div className="bg-emerald-50/30 p-6 rounded-3xl border border-emerald-100 shadow-sm">
        <h4 className="text-lg font-black text-slate-800 mb-6 border-b border-emerald-100 pb-4">
          Verification Documents
        </h4>
        <div className="grid grid-cols-1 gap-5">
          {[
            { key: 'Registration Certificate URL', label: 'Registration Certificate URL' },
            { key: 'GST Certificate URL', label: 'GST Certificate URL' },
            { key: 'PAN Card URL', label: 'PAN Card URL' },
          ].map(({ key, label }) => {
            const val = editFormData[key] ?? editingRow?.[key] ?? '';
            return (
              <div key={key}>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 w-full px-4 py-2.5 rounded-2xl border border-emerald-200 focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 outline-none text-sm text-slate-800 font-semibold bg-white transition-all shadow-inner"
                    value={val}
                    onChange={e => setEditFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
                  />
                  <label className="flex items-center justify-center px-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-2xl transition-colors border border-emerald-200 shadow-sm shrink-0 cursor-pointer">
                    <span className="text-xs font-bold mr-1">Upload</span>
                    <input type="file" className="hidden" onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload(e.target.files[0], key);
                    }} />
                  </label>
                  {val && (
                    <a href={getMediaUrl(val)} target="_blank" rel="noreferrer" className="flex items-center justify-center px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-colors border border-slate-200 shadow-sm shrink-0">
                      <ExternalLink size={18} className="text-[#431B94]" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
