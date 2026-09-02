import React from 'react';
import { motion } from 'framer-motion';

export default function AdminCategoriesTab({ rows, title, loading, error, setEditingRow, showToast }: any) {
  return (
    <div className="space-y-6">
          <div className="bg-gradient-to-r from-sky-50 via-white to-cyan-50 border border-sky-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-600 mb-3">Category Library</p>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">Browse and manage every public category</h2>
                <p className="text-sm text-slate-500 mt-2 max-w-2xl">
                  This view keeps the category list clean and focused. Only the category name and publish status are shown here.
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full lg:w-72 border border-sky-100 bg-white rounded-2xl px-4 py-3 text-sm outline-none focus:border-sky-400 transition-colors shadow-sm"
                />
                <button className="px-5 py-3 bg-white border border-sky-100 text-slate-700 rounded-2xl text-sm font-bold hover:bg-sky-50 shadow-sm transition-colors">
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {rows.map((row: any, index: any) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="bg-white border border-slate-200 rounded-[1.75rem] p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-50 text-sky-700 flex items-center justify-center text-2xl shadow-inner shrink-0">
                      {String(row['Category Name'] || '?').charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-black text-slate-900 truncate">{row['Category Name']}</h3>
                      <p className="text-xs font-medium text-slate-500 mt-1">Public listing category</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 text-[11px] font-black tracking-wide uppercase rounded-full shrink-0 ${
                    row.Status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {row.Status}
                  </span>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-xs text-slate-400 font-semibold">Ready for homepage and admin use</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingRow(row)}
                      className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-xs font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => showToast('Item deleted successfully!')}
                      className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors text-xs font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {loading && (
            <div className="px-2 py-8 text-sm text-slate-500">Loading {title.toLowerCase()}...</div>
          )}
          {!loading && error && (
            <div className="px-2 py-8 text-sm text-red-500">{error}</div>
          )}
          {!loading && !error && rows.length === 0 && (
            <div className="px-2 py-8 text-sm text-slate-500">No data available yet for {title.toLowerCase()}.</div>
          )}
        </div>
  );
}
