import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Tag, MapPin, CheckCircle, Edit3, Trash2 } from 'lucide-react';
import { Keyword } from '../types';

interface KeywordTableProps {
  keywords: Keyword[];
  loading: boolean;
  handleEditClick: (kw: Keyword) => void;
  onDeleteClick: (kw: Keyword) => void;
}

export default function KeywordTable({ keywords, loading, handleEditClick, onDeleteClick }: KeywordTableProps) {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <BarChart size={20} className="text-indigo-600" /> Keywords for this Business
        </h3>
        <span className="px-3 py-1 bg-slate-100 text-slate-600 font-bold text-xs rounded-full">
          {keywords.length} Tracked
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase font-extrabold border-b border-slate-100">
            <tr>
              <th className="py-5 px-6">Target Keyword</th>
              <th className="py-5 px-6">Category / City</th>
              <th className="py-5 px-6">Priority</th>
              <th className="py-5 px-6">Status</th>
              <th className="py-5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={5} className="py-12 text-center text-slate-400">Loading keywords...</td></tr>
            ) : keywords.length === 0 ? (
              <tr><td colSpan={5} className="py-12 text-center text-slate-400">No keywords yet for this business. Add one above.</td></tr>
            ) : (
              <AnimatePresence>
                {keywords.map(kw => (
                  <motion.tr
                    key={kw.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="py-4 px-6 font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                      {kw.keyword}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-md flex items-center gap-1">
                          <Tag size={10} /> {kw.category || 'General'}
                        </span>
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-md flex items-center gap-1">
                          <MapPin size={10} /> {kw.city || 'Unknown'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-black rounded-full ${
                        kw.priority === 'High' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                        kw.priority === 'Medium' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                        'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>
                        {kw.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#431B94] bg-emerald-50/50 px-3 py-1.5 rounded-lg w-fit border border-emerald-100">
                        <CheckCircle size={14} /> {kw.status}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEditClick(kw)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit keyword">
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => onDeleteClick(kw)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete keyword">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
