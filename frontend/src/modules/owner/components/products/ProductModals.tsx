import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, Package, AlertTriangle, Trash2 } from 'lucide-react';

export default function ProductModals({ 
  editingService, 
  setEditingService, 
  editingProduct, 
  setEditingProduct, 
  itemToDelete, 
  setItemToDelete, 
  handleSaveService, 
  isSavingService, 
  handleSaveProduct, 
  isSavingProduct, 
  confirmDelete, 
  isDeleting 
}: any) {
  return (
<>
    <AnimatePresence>
        {editingService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isSavingService && setEditingService(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 z-10 border border-slate-100">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-slate-900">{editingService.isNew ? 'Add Service' : 'Edit Service'}</h3>
                    <p className="text-xs text-slate-500">Provide the title of your service</p>
                  </div>
                </div>
                <button 
                  onClick={() => !isSavingService && setEditingService(null)} 
                  disabled={isSavingService}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Service Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Standard Consultation / AC Repair" 
                    className="w-full px-4 py-3 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all rounded-xl text-sm font-medium text-slate-900" 
                    value={editingService.col1 || ''} 
                    onChange={e => setEditingService({...editingService, col1: e.target.value})}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSaveService();
                    }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                {!editingService.isNew ? (
                   <button 
                     type="button"
                     onClick={() => setItemToDelete({ type: 'service', item: editingService })} 
                     className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl font-bold transition-colors text-xs"
                   >
                     Delete
                   </button>
                ) : <div />}
                
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => setEditingService(null)} 
                    disabled={isSavingService}
                    className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors font-bold text-xs disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    onClick={handleSaveService} 
                    disabled={isSavingService || !editingService?.col1?.trim()} 
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-600/20 text-xs flex items-center gap-1.5"
                  >
                    {isSavingService ? 'Saving...' : (editingService.isNew ? 'Save Service' : 'Update Service')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit / Add Product Modal */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isSavingProduct && setEditingProduct(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 z-10 border border-slate-100">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Package size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-slate-900">{editingProduct.isNew ? 'Add Product' : 'Edit Product'}</h3>
                    <p className="text-xs text-slate-500">Provide the title of your product</p>
                  </div>
                </div>
                <button 
                  onClick={() => !isSavingProduct && setEditingProduct(null)} 
                  disabled={isSavingProduct}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Product Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Organic Shampoo / Safety Helmet" 
                    className="w-full px-4 py-3 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all rounded-xl text-sm font-medium text-slate-900" 
                    value={editingProduct.col1 || ''} 
                    onChange={e => setEditingProduct({...editingProduct, col1: e.target.value})}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSaveProduct();
                    }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                {!editingProduct.isNew ? (
                   <button 
                     type="button"
                     onClick={() => setItemToDelete({ type: 'product', item: editingProduct })} 
                     className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl font-bold transition-colors text-xs"
                   >
                     Delete
                   </button>
                ) : <div />}
                
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => setEditingProduct(null)} 
                    disabled={isSavingProduct}
                    className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors font-bold text-xs disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    onClick={handleSaveProduct} 
                    disabled={isSavingProduct || !editingProduct?.col1?.trim()} 
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-600/20 text-xs flex items-center gap-1.5"
                  >
                    {isSavingProduct ? 'Saving...' : (editingProduct.isNew ? 'Save Product' : 'Update Product')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => !isDeleting && setItemToDelete(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative bg-white rounded-3xl shadow-2xl p-6 max-w-[360px] w-full z-10 border border-slate-100 text-center mx-auto"
            >
              <div className="w-13 h-13 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3.5 border border-red-100">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Delete {itemToDelete.type === 'service' ? 'Service' : 'Product'}?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove <span className="font-bold text-slate-700">"{itemToDelete.item.col1 || itemToDelete.item.name}"</span>?
              </p>

              <div className="flex gap-2.5 pt-4 mt-2">
                <button 
                  type="button"
                  onClick={() => setItemToDelete(null)} 
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-xs disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold rounded-xl transition-all shadow-md shadow-red-600/25 text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
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
