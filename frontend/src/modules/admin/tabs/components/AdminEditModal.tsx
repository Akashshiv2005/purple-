import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, X, CheckCircle2 } from 'lucide-react';
import BusinessInfoFields from './edit/BusinessInfoFields';
import MediaAndDocsFields from './edit/MediaAndDocsFields';
import VerificationAndSEOFields from './edit/VerificationAndSEOFields';

export default function AdminEditModal({
  editingRow,
  setEditingRow,
  tab,
  isAdding,
  editFormData,
  setEditFormData,
  handleSave,
  categories,
  subCategories,
  handleFileUpload,
  openDropdown,
  setOpenDropdown,
  columns
}: any) {
  return (
    <>
      {/* Edit Modal */}
      <AnimatePresence>
        {editingRow && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setEditingRow(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className={`relative bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-indigo-900/20 w-full ${tab === 'business-management' ? 'max-w-6xl' : 'max-w-lg'} flex flex-col max-h-[85vh] border border-white`}
            >
              {/* Header */}
              <div className="shrink-0 relative overflow-hidden px-8 py-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-t-[2.5rem]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/40 shadow-sm">
                      <Edit3 size={24} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-2xl text-white tracking-tight flex items-center gap-3">
                        Edit Business Profile
                        <span className="px-2 py-0.5 rounded-md bg-white/20 text-white text-[10px] uppercase font-bold tracking-widest border border-white/30 backdrop-blur-md shadow-sm">ID: {editingRow.id}</span>
                      </h3>
                      <p className="text-blue-100 text-xs mt-0.5 font-medium opacity-90">Modify business details, verify status, and manage SEO</p>
                    </div>
                  </div>
                  <button onClick={() => setEditingRow(null)} className="text-blue-100 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-xl transition-colors backdrop-blur-md self-start border border-white/10 hover:border-white/30 shadow-sm">
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* Form Body - Scrollable */}
              <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-slate-50/50 rounded-b-[2.5rem] relative z-20">
                {tab === 'business-approvals' ? (
                  <div className="max-w-xl mx-auto w-full">
                    <VerificationAndSEOFields 
                      editFormData={editFormData}
                      setEditFormData={setEditFormData}
                      editingRow={editingRow}
                    />
                  </div>
                ) : tab === 'business-management' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Business & Owner Details */}
                    <div className="lg:col-span-7">
                      <BusinessInfoFields 
                        editFormData={editFormData}
                        setEditFormData={setEditFormData}
                        editingRow={editingRow}
                        categories={categories}
                        subCategories={subCategories}
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                      />
                    </div>

                    {/* Right Column: Working Hours, Media, Docs, SEO */}
                    <div className="lg:col-span-5 space-y-6">
                      <MediaAndDocsFields 
                        editFormData={editFormData}
                        setEditFormData={setEditFormData}
                        editingRow={editingRow}
                        handleFileUpload={handleFileUpload}
                      />
                      <VerificationAndSEOFields 
                        editFormData={editFormData}
                        setEditFormData={setEditFormData}
                        editingRow={editingRow}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {columns.filter((k: any) => k !== 'id' && k !== 'owner_id' && k !== 'Actions').map((col: any) => {
                      const val = editingRow[col];
                      const isObject = typeof val === 'object' && val !== null;
                      return (
                        <div key={col} className="group">
                          <label className="block text-sm font-bold text-slate-700 mb-2">{col}</label>
                          <div className="relative">
                            <input
                              type="text"
                              disabled={isObject}
                              className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 outline-none text-sm text-slate-900 font-semibold bg-slate-50 focus:bg-white transition-all disabled:opacity-60"
                              value={isObject ? 'Document attached' : (editFormData[col] ?? val ?? '')}
                              onChange={e => !isObject && setEditFormData((prev: any) => ({ ...prev, [col]: e.target.value }))}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-slate-100 flex gap-4 justify-end bg-slate-50/80">
                <button onClick={() => setEditingRow(null)} className="px-6 py-3.5 font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all shadow-sm flex items-center gap-2">
                  Cancel
                </button>
                <button 
                  onClick={handleSave} 
                  className="px-6 py-3.5 font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 group"
                >
                  {isAdding ? 'Add Item' : 'Save Changes'}
                  <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
