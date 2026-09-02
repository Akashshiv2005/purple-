import React from 'react';
import { X, Edit2, Plus } from 'lucide-react';

export default function CategoryManagementModal({ 
  isModalOpen, 
  setIsModalOpen, 
  modalType, 
  editingItem, 
  handleSave, 
  formData, 
  setFormData, 
  selectedMainCategory, 
  selectedSubcategory 
}: any) {
  if (!isModalOpen) return null;
  return (
    <>
{/* Unified Modal */}
      
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">
                {editingItem ? 'Edit' : 'Create'} {modalType === 'main' ? 'Main Category' : modalType === 'sub' ? 'Subcategory' : 'Master Service'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-5">
              
              {modalType === 'sub' && selectedMainCategory && (
                 <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm border border-blue-100">
                   Creating under Main Category: <strong>{selectedMainCategory.name}</strong>
                 </div>
              )}
              
              {modalType === 'service' && selectedSubcategory && (
                 <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm border border-blue-100 mt-2 mb-4">
                   Creating under Subcategory: <strong>{selectedSubcategory.name}</strong>
                 </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input required type="text" placeholder="e.g. Restaurants" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Slug <span className="text-slate-400 font-normal">(Auto-generated if empty)</span></label>
                <input type="text" placeholder="e.g. restaurants" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 focus:ring-2 cursor-pointer transition-all" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">Active Status</span>
                    <span className="text-xs text-slate-500">Toggle whether this is visible on the site</span>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2">
                  {editingItem ? <Edit2 size={16} /> : <Plus size={16} />}
                  {editingItem ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      
    </>
  );
}
