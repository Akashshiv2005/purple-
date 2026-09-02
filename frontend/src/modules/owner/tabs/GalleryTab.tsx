"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image as ImageIcon, Search, X, Edit, Trash2, AlertTriangle, UploadCloud, CheckCircle2 } from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';
import GalleryModals from '../components/gallery/GalleryModals';

export default function GalleryTab({ data, editingRow, setEditingRow, businessId, refreshData }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState<any>(null);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setImageUrl(isEditing.col4 || isEditing.image_url || '');
      setTitle(isEditing.col1 || isEditing.title || '');
    } else {
      setImageUrl('');
      setTitle('');
    }
  }, [isEditing]);

  const handleAddSubmit = async () => {
    if (!imageUrl) return;
    try {
      setIsSubmitting(true);
      const payload = { image_url: imageUrl, title, category: 'General' };
      const url = isEditing ? `/api/owner/${businessId}/gallery/${isEditing.id}` : `/api/owner/${businessId}/gallery`;
      const method = isEditing ? 'PUT' : 'POST';
      
      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsAdding(false);
        setIsEditing(null);
        setImageUrl('');
        setTitle('');
        refreshData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      setIsDeleting(true);
      const res = await authFetch(`/api/owner/${businessId}/gallery/${itemToDelete.id}`, { method: 'DELETE' });
      if (res.ok) {
        setItemToDelete(null);
        refreshData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Gallery</h2>
          <p className="text-sm text-slate-500 mt-1">Manage and view your business photos here.</p>
        </div>
        <button 
          onClick={() => { setIsAdding(true); setIsEditing(null); }}
          className="shrink-0 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
        >
          <Plus size={18} /> Upload Media
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data && data.length > 0 ? data.map((item: any, i: number) => (
          <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="h-48 overflow-hidden relative bg-slate-100">
              <span className={`absolute top-3 left-3 z-10 text-[10px] font-extrabold px-2.5 py-1 rounded-full text-white shadow-md backdrop-blur-md ${i % 2 === 0 ? 'bg-blue-600/90' : 'bg-orange-500/90'}`}>
                {item.col2 || item.category || 'General'}
              </span>
              <img 
                src={item.col4 || item.image_url || 'https://via.placeholder.com/500'} 
                alt={item.col1 || item.title || `Photo ${i + 1}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="p-4 border-t border-slate-100 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm truncate">{item.col1 || item.title || `Photo ${i + 1}`}</h4>
                <div className="flex justify-between items-center mt-2 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1.5"><Search size={12} className="text-slate-400"/> {item.col3 || item.category || 'General'}</span>
                  <span className={`inline-flex items-center gap-1 font-bold ${item.status === 'Verified' ? 'text-[#431B94]' : 'text-slate-500'}`}>
                    {item.status === 'Verified' && <CheckCircle2 size={12} />}
                    {item.status || 'Active'}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                <button 
                  onClick={() => setIsEditing(item)} 
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-xl text-xs font-bold transition-all border border-slate-200/60"
                >
                  <Edit size={13} /> Edit
                </button>
                <button 
                  onClick={() => setItemToDelete(item)} 
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all border border-red-100"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        )) : (
           <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200 border-dashed p-6">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <ImageIcon size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-900">No gallery images found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Upload your first photo to showcase your store, products, or services to customers.</p>
              <button 
                onClick={() => { setIsAdding(true); setIsEditing(null); }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-600/20"
              >
                <Plus size={14} /> Upload First Image
              </button>
           </div>
        )}
      </div>

      <GalleryModals 
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        title={title}
        setTitle={setTitle}
        handleAddSubmit={handleAddSubmit}
        isSubmitting={isSubmitting}
        itemToDelete={itemToDelete}
        setItemToDelete={setItemToDelete}
        confirmDelete={confirmDelete}
        isDeleting={isDeleting}
      />

      
    </motion.div>
  );
}
