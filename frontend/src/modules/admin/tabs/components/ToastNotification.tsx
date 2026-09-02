import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ToastNotification({ toastMessage }: any) {
  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-6 left-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-medium border border-slate-700"
        >
          {toastMessage.toLowerCase().includes('error') || toastMessage.toLowerCase().includes('fail') ? (
            <AlertCircle size={20} className="text-red-400" />
          ) : (
            <CheckCircle2 size={20} className="text-green-400" />
          )}
          {toastMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
