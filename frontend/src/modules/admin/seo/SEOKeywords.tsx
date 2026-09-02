"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Sparkles, Menu, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';

import { Keyword, BusinessOption } from './types';
import BusinessSelector from './components/BusinessSelector';
import KeywordForm from './components/KeywordForm';
import KeywordTable from './components/KeywordTable';
import DeleteConfirmModal from './components/DeleteConfirmModal';

export default function SEOKeywords({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessOption | null>(null);

  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Custom UI State for Modals and Toasts
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; keyword: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchKeywords = useCallback((businessId: number) => {
    setLoading(true);
    authFetch(`/api/admin/seo/keywords?business_id=${businessId}`)
      .then(res => res.json())
      .then(data => {
        setKeywords(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedBusiness) fetchKeywords(selectedBusiness.id);
  }, [selectedBusiness, fetchKeywords]);

  const handleSelectBusiness = (b: BusinessOption) => {
    setSelectedBusiness(b);
    setEditingId(null);
    setNewKeyword('');
  };

  const confirmDeleteKeyword = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await authFetch(`/api/admin/seo/keywords/${deleteTarget.id}`, { method: 'DELETE' });
      if (!res.ok) {
        showToast('Failed to delete keyword', 'error');
        return;
      }
      showToast(`Deleted keyword "${deleteTarget.keyword}"`, 'success');
      setDeleteTarget(null);
      if (selectedBusiness) fetchKeywords(selectedBusiness.id);
    } catch (err) {
      console.error(err);
      showToast('Error deleting keyword', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (kw: Keyword) => {
    setEditingId(kw.id);
    setNewKeyword(kw.keyword);
    setNewPriority(kw.priority || 'Medium');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAutoGenerate = async () => {
    if (!selectedBusiness) return;
    setIsGenerating(true);
    try {
      const res = await authFetch(`/api/admin/seo/keywords/auto-generate/${selectedBusiness.id}`, {
        method: 'POST'
      });
      const data = await res.json();
      if (res.ok) {
        fetchKeywords(selectedBusiness.id);
        showToast(data.message || `Generated ${data.generated_count || 10}+ keywords!`, 'success');
      } else {
        showToast(data.detail || 'Failed to auto-generate keywords', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error auto-generating keywords', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword || !selectedBusiness) return;
    setIsAdding(true);

    const url = editingId ? `/api/admin/seo/keywords/${editingId}` : '/api/admin/seo/keywords';
    const method = editingId ? 'PUT' : 'POST';

    authFetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        business_id: selectedBusiness.id,
        keyword: newKeyword,
        priority: newPriority,
      }),
    })
      .then(res => res.json())
      .then(() => {
        const addedName = newKeyword;
        setNewKeyword('');
        setNewPriority('Medium');
        setIsAdding(false);
        setEditingId(null);
        fetchKeywords(selectedBusiness.id);
        showToast(editingId ? `Updated keyword "${addedName}"` : `Added keyword "${addedName}"`, 'success');
      })
      .catch(() => {
        setIsAdding(false);
        showToast('Failed to save keyword', 'error');
      });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 p-8 rounded-[2rem] shadow-2xl border border-white/10"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <TrendingUp size={120} className="text-white" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles size={14} className="text-blue-300" /> Enterprise SEO
            </div>
            {onOpenSidebar && (
              <button
                onClick={onOpenSidebar}
                className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/20 backdrop-blur-md"
                aria-label="Open Sidebar Menu"
              >
                <Menu size={18} />
              </button>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">Business Keywords Manager</h1>
          <p className="text-blue-200/80 max-w-xl text-xs md:text-base font-medium">
            Pick a business, then target it with keywords that map directly to its real category and city — no unlinked global entries.
          </p>
        </div>
      </motion.div>

      <BusinessSelector
        selectedBusiness={selectedBusiness}
        onSelectBusiness={handleSelectBusiness}
        onClearBusiness={() => { setSelectedBusiness(null); setKeywords([]); }}
      />

      <AnimatePresence>
        {selectedBusiness && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-8 overflow-hidden"
          >
            <KeywordForm
              selectedBusiness={selectedBusiness}
              onAutoGenerate={handleAutoGenerate}
              isGenerating={isGenerating}
              newKeyword={newKeyword}
              setNewKeyword={setNewKeyword}
              newPriority={newPriority}
              setNewPriority={setNewPriority}
              handleAddKeyword={handleAddKeyword}
              isAdding={isAdding}
              editingId={editingId}
            />

            <KeywordTable
              keywords={keywords}
              loading={loading}
              handleEditClick={handleEditClick}
              onDeleteClick={(kw) => setDeleteTarget({ id: kw.id, keyword: kw.keyword })}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <DeleteConfirmModal
        deleteTarget={deleteTarget}
        setDeleteTarget={setDeleteTarget}
        confirmDeleteKeyword={confirmDeleteKeyword}
        isDeleting={isDeleting}
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-slate-900/95 text-white border-slate-700 shadow-slate-900/40'
                : 'bg-rose-900/95 text-white border-rose-700 shadow-rose-900/40'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle size={18} className="text-emerald-400" />
            ) : (
              <AlertTriangle size={18} className="text-rose-400" />
            )}
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-slate-400 hover:text-white p-1"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
