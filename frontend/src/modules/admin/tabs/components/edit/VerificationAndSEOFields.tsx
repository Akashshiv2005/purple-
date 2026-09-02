import React from 'react';

export default function VerificationAndSEOFields({ editFormData, setEditFormData, editingRow }: any) {
  return (
    <div className="space-y-6">
      {/* Verification Gate */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h4 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-50 pb-4">
          Verification Gate
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Approval Status</label>
            <select
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 font-bold text-slate-800 bg-slate-50/50 outline-none focus:ring-4 focus:ring-emerald-500/15 shadow-inner transition-all hover:border-emerald-300"
              value={editFormData['Approval Status'] ?? editingRow?.['Approval Status'] ?? 'Pending'}
              onChange={e => setEditFormData((prev: any) => ({ ...prev, 'Approval Status': e.target.value }))}
            >
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">KYC Status</label>
            <select
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 font-bold text-slate-800 bg-slate-50/50 outline-none focus:ring-4 focus:ring-emerald-500/15 shadow-inner transition-all hover:border-emerald-300"
              value={editFormData['Status'] ?? editingRow?.['Status'] ?? 'Pending'}
              onChange={e => setEditFormData((prev: any) => ({ ...prev, Status: e.target.value }))}
            >
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* SEO Overrides */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-3xl border border-purple-100/50 shadow-sm relative overflow-hidden">
        <h4 className="text-lg font-black text-slate-800 mb-5 border-b border-purple-200/50 pb-4 relative z-10">
          SEO Overrides
        </h4>
        <div className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-bold text-purple-800 uppercase tracking-wider mb-1.5 ml-1">Custom Slug</label>
            <input 
              type="text" 
              placeholder="e.g. akash-textiles-trichy" 
              value={editFormData['Custom Slug'] ?? editingRow?.['Custom Slug'] ?? ''} 
              onChange={e => setEditFormData((prev: any) => ({ ...prev, 'Custom Slug': e.target.value }))} 
              className="w-full px-4 py-2.5 rounded-2xl border border-purple-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none text-sm font-semibold text-slate-800 bg-white shadow-inner transition-all" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-purple-800 uppercase tracking-wider mb-1.5 ml-1">Meta Title</label>
            <input 
              type="text" 
              placeholder={`Default: ${editingRow?.['Business Name']} in ${editingRow?.['City']}`} 
              value={editFormData['Meta Title'] ?? editingRow?.['Meta Title'] ?? ''} 
              onChange={e => setEditFormData((prev: any) => ({ ...prev, 'Meta Title': e.target.value }))} 
              className="w-full px-4 py-2.5 rounded-2xl border border-purple-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none text-sm font-semibold text-slate-800 bg-white shadow-inner transition-all" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-purple-800 uppercase tracking-wider mb-1.5 ml-1">Meta Description</label>
            <textarea 
              placeholder="Custom meta description..." 
              value={editFormData['Meta Description'] ?? editingRow?.['Meta Description'] ?? ''} 
              onChange={e => setEditFormData((prev: any) => ({ ...prev, 'Meta Description': e.target.value }))} 
              className="w-full px-4 py-2.5 rounded-2xl border border-purple-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none text-sm font-semibold text-slate-800 bg-white shadow-inner transition-all h-20 custom-scrollbar resize-none" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-purple-800 uppercase tracking-wider mb-1.5 ml-1">SEO Keywords</label>
            <input 
              type="text" 
              placeholder="e.g. textiles, clothing, trichy shopping" 
              value={editFormData['SEO Keywords'] ?? editingRow?.['SEO Keywords'] ?? ''} 
              onChange={e => setEditFormData((prev: any) => ({ ...prev, 'SEO Keywords': e.target.value }))} 
              className="w-full px-4 py-2.5 rounded-2xl border border-purple-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none text-sm font-semibold text-slate-800 bg-white shadow-inner transition-all" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
