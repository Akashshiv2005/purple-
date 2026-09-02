import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Plus } from 'lucide-react';
import { BusinessOption } from '../types';

interface KeywordFormProps {
  selectedBusiness: BusinessOption;
  onAutoGenerate: () => void;
  isGenerating: boolean;
  newKeyword: string;
  setNewKeyword: (k: string) => void;
  newPriority: string;
  setNewPriority: (p: string) => void;
  handleAddKeyword: (e: React.FormEvent) => void;
  isAdding: boolean;
  editingId: number | null;
}

export default function KeywordForm({
  selectedBusiness,
  onAutoGenerate,
  isGenerating,
  newKeyword,
  setNewKeyword,
  newPriority,
  setNewPriority,
  handleAddKeyword,
  isAdding,
  editingId
}: KeywordFormProps) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <TrendingUp size={16} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">2. Target a Keyword for {selectedBusiness.business_name}</h3>
        </div>

        <button
          type="button"
          onClick={onAutoGenerate}
          disabled={isGenerating}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs rounded-xl shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 shrink-0 cursor-pointer"
        >
          {isGenerating ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
          ) : (
            <Sparkles size={15} />
          )}
          {isGenerating ? 'Generating Keywords...' : '✨ Auto-Generate 10+ Keywords'}
        </button>
      </div>

      <form onSubmit={handleAddKeyword} className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
            <TrendingUp size={18} />
          </div>
          <input
            type="text"
            placeholder="e.g., Best dentist near Thillai Nagar"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 placeholder:font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            required
          />
        </div>

        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          className="w-full lg:w-44 px-4 py-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <button
          type="submit"
          disabled={isAdding}
          className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30 shrink-0 flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {isAdding ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> : <Plus size={18} />}
          {isAdding ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Keyword' : 'Add Keyword')}
        </button>
      </form>
    </div>
  );
}
