import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Target } from 'lucide-react';

export default function AdminGenericTableTab({
  tab, title, rows, columns, loading, error, selectedRows, toggleRow, toggleAll, 
  handleBulkDelete, isDeletingBulk, setEditingRow, handleDelete, showToast, authFetch
}: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-base font-bold text-slate-900">Recent {title}</h2>
            <div className="flex gap-2 items-center">
              {selectedRows.size > 0 && (
                <button 
                  onClick={handleBulkDelete}
                  disabled={isDeletingBulk}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold shadow hover:bg-red-700 transition"
                >
                  {isDeletingBulk ? 'Deleting...' : `Delete Selected (${selectedRows.size})`}
                </button>
              )}
              <input type="text" placeholder="Search..." className="border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500 transition-colors w-64" />
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors">Filter</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 bg-slate-50/50">
                  <th className="py-4 pl-6 w-12">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" onChange={toggleAll} checked={selectedRows.size === rows.length && rows.length > 0} />
                  </th>
                  {columns.map((col: any, idx: any) => (
                    <th key={col} className={`py-4 font-bold ${idx === 0 ? '' : ''}`}>{col}</th>
                  ))}
                  <th className="py-4 font-bold text-right pr-6">Actions</th>
                </tr>
              </thead>
              <motion.tbody 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                }}
                className="divide-y divide-slate-100"
              >
                {rows.map((row: any) => (
                  <motion.tr 
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    key={row.id} 
                    className={`transition-colors group ${selectedRows.has(row.id) ? 'bg-blue-50/60' : 'hover:bg-slate-50/80'}`}
                  >
                    <td className="py-4 pl-6 w-12">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} />
                    </td>
                    {columns.map((col: any, idx: any) => (
                      <td key={col} className={`py-4 ${idx === 0 ? 'font-bold text-slate-900' : 'text-slate-600 font-medium'}`}>
                        {col === 'Status' ? (
                          <span className={`px-3 py-1.5 text-[11px] font-black tracking-wide uppercase rounded-lg ${
                            ['Active', 'Verified', 'Completed', 'Approved'].includes(row[col]) ? 'bg-green-100 text-green-700' :
                            row[col] === 'Pending' ? 'bg-orange-100 text-orange-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {row[col]}
                          </span>
                        ) : col === 'Documents' ? (
                          typeof row[col] === 'object' && row[col] !== null ? (
                            <div className="flex flex-col gap-1">
                              {Object.entries(row[col] as Record<string, string>).map(([docName, docUrl]) => (
                                docUrl ? (
                                  <a key={docName} href={`${docUrl}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-bold text-xs">
                                    {docName}
                                  </a>
                                ) : (
                                  <span key={docName} className="text-slate-400 text-xs">{docName}: Not provided</span>
                                )
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs">Not provided</span>
                          )
                        ) : (
                          row[col]
                        )}
                      </td>
                    ))}
                    <td className="py-4 text-right pr-6">
                      <div className="flex justify-end items-center gap-2 transition-opacity">
                        {tab === 'reports' && (
                          <button 
                            onClick={() => showToast(`Downloading ${row['Report Name'] || 'Report'} as PDF...`)}
                            className="px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-xs font-bold flex items-center gap-1">
                            PDF
                          </button>
                        )}
                        {tab === 'business-approvals' && row['Status'] === 'Pending' && (
                          <button 
                            onClick={async () => {
                              try {
                                await authFetch(`/api/admin/business/${row.id}/approve`, { method: 'POST' });
                                showToast(`${row['Business Name']} has been Approved!`);
  // ────────────────────────────────────────────────────────────────────────
                                setTimeout(() => window.location.reload(), 1000);
                              } catch (e) {
                                showToast('Error approving business');
                              }
                            }}
                            className="px-3 py-1.5 text-[#431B94] bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors text-xs font-bold"
                          >
                            Approve
                          </button>
                        )}
                        {tab === 'business-management' && (
                          <Link 
                            href={`/super-admin?tab=business-seo&id=${row.id}&name=${encodeURIComponent(row['Business Name'])}&city=${encodeURIComponent(row['City'] || 'Unknown')}&category=${encodeURIComponent(row['Category'] || 'Unknown')}`}
                            onClick={() => showToast(`Opening SEO Manager for ${row['Business Name']}`)}
                            className="px-3 py-1.5 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-xs font-bold"
                          >
                            SEO Setup
                          </Link>
                        )}
                        <button onClick={() => setEditingRow(row)} className="px-3 py-1.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-xs font-bold">Edit</button>
                        {tab !== 'business-owners' && tab !== 'business-approvals' && (
                          <button onClick={() => handleDelete(row)} className="px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-xs font-bold">Delete</button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
          {loading && (
            <div className="px-6 py-8 text-sm text-slate-500">Loading {title.toLowerCase()}...</div>
          )}
          {!loading && error && (
            <div className="px-6 py-8 text-sm text-red-500">{error}</div>
          )}
          {!loading && !error && rows.length === 0 && (
            <div className="px-6 py-8 text-sm text-slate-500">No data available yet for {title.toLowerCase()}.</div>
          )}
        </div>
  );
}
