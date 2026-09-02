import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Building2, MapPin, UserSquare2, PhoneCall, CheckCircle2, Target } from 'lucide-react';

export default function AdminBusinessManagementTab({
  rows, loading, error, selectedRows, toggleRow, handleBulkDelete, isDeletingBulk, setEditingRow, handleDelete
}: any) {
  return (
    <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-slate-900">Registered Businesses</h2>
            <div className="flex gap-2 items-center">
              {selectedRows.size > 0 && (
                <button 
                  onClick={handleBulkDelete}
                  disabled={isDeletingBulk}
                  className="px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold shadow hover:bg-red-700 transition"
                >
                  {isDeletingBulk ? 'Deleting...' : `Delete Selected (${selectedRows.size})`}
                </button>
              )}
              <input type="text" placeholder="Search businesses..." className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors w-64 shadow-sm" />
              <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors">Filter</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rows.map((row: any, index: any) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative border rounded-3xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all flex flex-col group ${selectedRows.has(row.id) ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20' : 'bg-white border-slate-100 hover:border-blue-300'}`}
              >
                <div className="absolute top-4 right-4 z-10">
                   <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity checked:opacity-100" checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} />
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-blue-100 flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 leading-tight">{row['Business Name']}</h3>
                      <p className="text-[13px] font-bold text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin size={12} /> {row['City']}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg ${
                    row['Category'] === 'Mobile Shop' ? 'bg-purple-100 text-purple-700' :
                    row['Category'] === 'Dentists' ? 'bg-emerald-100 text-emerald-700' :
                    row['Category'] === 'Finance' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {row['Category']}
                  </span>
                </div>
                
                <div className="flex gap-2 flex-wrap mb-5 mt-2">
                  <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-bold rounded-lg flex items-center gap-1">
                    <UserSquare2 size={12}/> {row['Owner']}
                  </span>
                  <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-bold rounded-lg flex items-center gap-1">
                    <PhoneCall size={12}/> {row['Business Phone']}
                  </span>
                  {row['Status'] === 'Verified' && (
                    <span className="px-2.5 py-1 bg-green-50 border border-green-200 text-green-700 text-[11px] font-bold rounded-lg flex items-center gap-1">
                      <CheckCircle2 size={12}/> Verified
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
                  <button 
                    onClick={() => setEditingRow(row)} 
                    className="flex-1 py-2 text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(row)}
                    className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-colors"
                  >
                    Delete
                  </button>
                  <Link 
                    href={`/super-admin?tab=business-seo&id=${row.id}&name=${encodeURIComponent(row['Business Name'])}&city=${encodeURIComponent(row['City'] || 'Unknown')}&category=${encodeURIComponent(row['Category'] || 'Unknown')}`}
                    className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    SEO <Target size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          {loading && (
            <div className="px-6 py-8 text-sm text-slate-500">Loading businesses...</div>
          )}
          {!loading && error && (
            <div className="px-6 py-8 text-sm text-red-500">{error}</div>
          )}
        </div>
  );
}
