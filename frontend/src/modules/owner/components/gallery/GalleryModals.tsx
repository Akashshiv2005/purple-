import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, ImageIcon, Trash2 } from 'lucide-react';

export default function GalleryModals({
  isAdding,
  setIsAdding,
  isEditing,
  setIsEditing,
  imageUrl,
  setImageUrl,
  title,
  setTitle,
  handleAddSubmit,
  isSubmitting,
  itemToDelete,
  setItemToDelete,
  confirmDelete,
  isDeleting
}: any) {
  return (
    <>
      {/* 1. Upload / Edit Image Modal (Scrollable & Viewport-Safe) */}
      <AnimatePresence>
        {(isAdding || isEditing) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => { setIsAdding(false); setIsEditing(null); }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden z-10 border border-slate-100 my-auto"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <UploadCloud size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{isEditing ? 'Edit Photo' : 'Upload New Photo'}</h3>
                    <p className="text-xs text-slate-500">JPG, PNG or WEBP up to 5MB</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setIsAdding(false); setIsEditing(null); }} 
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 overscroll-contain">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Select Image File</label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-4 transition-colors bg-slate-50/50 hover:bg-blue-50/20 text-center">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onload = (event) => {
                            const img = new Image();
                            img.src = event.target?.result as string;
                            img.onload = () => {
                              const canvas = document.createElement('canvas');
                              const MAX_WIDTH = 1200;
                              const MAX_HEIGHT = 1200;
                              let width = img.width;
                              let height = img.height;

                              if (width > height) {
                                if (width > MAX_WIDTH) {
                                  height *= MAX_WIDTH / width;
                                  width = MAX_WIDTH;
                                }
                              } else {
                                if (height > MAX_HEIGHT) {
                                  width *= MAX_HEIGHT / height;
                                  height = MAX_HEIGHT;
                                }
                              }

                              canvas.width = width;
                              canvas.height = height;
                              const ctx = canvas.getContext('2d');
                              ctx?.drawImage(img, 0, 0, width, height);

                              const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                              setImageUrl(compressedDataUrl);
                            };
                          };
                        }
                      }} 
                    />
                    <div className="flex flex-col items-center justify-center py-2 pointer-events-none">
                      <ImageIcon className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs font-bold text-blue-600 hover:underline">Click to browse file</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">or drag & drop here</span>
                    </div>
                  </div>

                  {imageUrl && (
                    <div className="mt-3 relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900/5 p-1">
                      <img 
                        src={imageUrl} 
                        alt="preview" 
                        className="max-h-52 w-full object-contain rounded-xl mx-auto" 
                      />
                      <button
                        type="button"
                        onClick={() => setImageUrl('')}
                        className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-1.5 shadow-md hover:bg-red-700 transition-colors"
                        title="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Photo Title (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Reception Area / Store Front / Product Shelf" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm text-slate-800 placeholder:text-slate-400 bg-white" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                  />
                </div>
              </div>

              {/* Modal Footer (Sticky Bottom) */}
              <div className="p-4 sm:p-6 pt-3 border-t border-slate-100 bg-slate-50/80 backdrop-blur-sm flex gap-3 sticky bottom-0 z-10 shrink-0">
                <button 
                  onClick={() => { setIsAdding(false); setIsEditing(null); }} 
                  className="flex-1 px-4 py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-all text-sm border border-slate-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddSubmit} 
                  disabled={!imageUrl || isSubmitting} 
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-600/20 text-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Saving...' : (isEditing ? 'Update Photo' : 'Save & Publish')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* 2. Custom Delete Confirmation Modal (Replaces window.confirm) */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setItemToDelete(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative bg-white rounded-3xl shadow-2xl p-6 max-w-[360px] w-full z-10 border border-slate-100 text-center mx-auto"
            >
              <div className="w-13 h-13 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3.5 border border-red-100 shadow-xs">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900">Delete Photo?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure? This image will be permanently removed from your gallery.
              </p>
              
              {/* Photo Preview Pill */}
              <div className="my-4 bg-slate-50 border border-slate-200/70 rounded-2xl p-2.5 flex items-center gap-3 text-left">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 border border-slate-200/80 shrink-0 flex items-center justify-center">
                  {(itemToDelete.col4 || itemToDelete.image_url) ? (
                    <img 
                      src={itemToDelete.col4 || itemToDelete.image_url} 
                      alt="thumbnail" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <ImageIcon size={20} className="text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {itemToDelete.col1 || itemToDelete.title || 'Gallery Photo'}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                    {itemToDelete.col3 || itemToDelete.category || 'General Gallery'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5 pt-1">
                <button 
                  onClick={() => setItemToDelete(null)} 
                  className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold rounded-xl transition-all text-xs"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold rounded-xl transition-all shadow-md shadow-red-600/25 text-xs flex items-center justify-center gap-1.5"
                >
                  <Trash2 size={13} />
                  {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
