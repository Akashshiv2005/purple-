import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  deleteTarget: { id: number; keyword: string } | null;
  setDeleteTarget: (target: { id: number; keyword: string } | null) => void;
  confirmDeleteKeyword: () => void;
  isDeleting: boolean;
}

export default function DeleteConfirmModal({ deleteTarget, setDeleteTarget, confirmDeleteKeyword, isDeleting }: DeleteConfirmModalProps) {
  return (
    <AnimatePresence>
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteTarget(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative z-10 border border-slate-100"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 mx-auto sm:mx-0">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900 text-center sm:text-left">Delete Target Keyword?</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed text-center sm:text-left">
              Are you sure you want to remove <span className="font-bold text-slate-900">&ldquo;{deleteTarget.keyword}&rdquo;</span> from this business&apos;s active SEO tracking?
            </p>
            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteKeyword}
                disabled={isDeleting}
                className="flex-1 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
              >
                {isDeleting ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> : <Trash2 size={16} />}
                {isDeleting ? 'Deleting...' : 'Delete Keyword'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
