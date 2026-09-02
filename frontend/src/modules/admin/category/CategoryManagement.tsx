"use client";
import React, { useState, useEffect } from 'react';
import { Layers, List, Tag, Plus, Edit2, Trash2, CheckCircle2, ChevronRight, X, Menu } from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';
import CategoryManagementModal from '../components/CategoryManagementModal';

interface BaseEntity {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  icon?: string;
  display_order?: number;
  [key: string]: any;
}

export default function CategoryManagement({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const [activeTab, setActiveTab] = useState<'main' | 'sub' | 'services'>('main');
  const [categories, setCategories] = useState<BaseEntity[]>([]);
  const [subcategories, setSubcategories] = useState<BaseEntity[]>([]);
  const [services, setServices] = useState<BaseEntity[]>([]);
  
  const [selectedMainCategory, setSelectedMainCategory] = useState<BaseEntity | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<BaseEntity | null>(null);
  
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'main' | 'sub' | 'service'>('main');
  const [editingItem, setEditingItem] = useState<BaseEntity | null>(null);
  const [formData, setFormData] = useState<any>({ name: '', slug: '', is_active: true, icon: '', display_order: 0 });

  useEffect(() => {
    if (activeTab === 'main') {
      fetchCategories();
    } else if (activeTab === 'sub') {
      fetchSubcategories(selectedMainCategory?.id);
    } else if (activeTab === 'services') {
      fetchServices(selectedSubcategory?.id);
    }
  }, [activeTab, selectedMainCategory, selectedSubcategory]);

  const fetchData = async (endpoint: string, setter: (data: any) => void, paramKey?: string, paramVal?: any) => {
    setLoading(true);
    try {
      let url = `/api/admin/${endpoint}/`;
      if (paramKey && paramVal) url += `?${paramKey}=${paramVal}`;
      const res = await authFetch(url);
      if (res.ok) setter(await res.json());
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const fetchCategories = () => fetchData('categories', setCategories);
  const fetchSubcategories = (categoryId?: number) => fetchData('subcategories', setSubcategories, categoryId ? 'category_id' : undefined, categoryId);
  const fetchServices = (subcategoryId?: number) => fetchData('services', setServices, subcategoryId ? 'subcategory_id' : undefined, subcategoryId);

  const handleOpenModal = (type: 'main' | 'sub' | 'service', item: BaseEntity | null = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      setFormData({ ...item });
    } else {
      setFormData({ name: '', slug: '', is_active: true, icon: '', display_order: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let url = '';
    if (modalType === 'main') url = '/api/admin/categories/';
    if (modalType === 'sub') url = '/api/admin/subcategories/';
    if (modalType === 'service') url = '/api/admin/services/';

    if (editingItem) url += `${editingItem.id}`;

    const payload = { ...formData };
    if (modalType === 'sub') payload.category_id = selectedMainCategory?.id;
    if (modalType === 'service') payload.subcategory_id = selectedSubcategory?.id;

    try {
      const res = await authFetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsModalOpen(false);
        if (modalType === 'main') fetchCategories();
        if (modalType === 'sub') fetchSubcategories(selectedMainCategory?.id);
        if (modalType === 'service') fetchServices(selectedSubcategory?.id);
      } else {
        const errData = await res.json();
        alert(errData.detail || 'Failed to save');
      }
    } catch (err) {
      console.error('Failed to save', err);
    }
  };

  const handleDelete = async (type: 'main' | 'sub' | 'service', id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    let url = '';
    if (type === 'main') url = `/api/admin/categories/${id}`;
    if (type === 'sub') url = `/api/admin/subcategories/${id}`;
    if (type === 'service') url = `/api/admin/services/${id}`;

    try {
      const res = await authFetch(url, { method: 'DELETE' });
      if (res.ok) {
        if (type === 'main') fetchCategories();
        if (type === 'sub') fetchSubcategories(selectedMainCategory?.id);
        if (type === 'service') fetchServices(selectedSubcategory?.id);
      }
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const navigateToSubcategories = (cat: BaseEntity) => {
    setSelectedMainCategory(cat);
    setActiveTab('sub');
  };

  const navigateToServices = (sub: BaseEntity) => {
    setSelectedSubcategory(sub);
    setActiveTab('services');
  };

  const renderTable = (data: BaseEntity[], type: 'main' | 'sub' | 'service') => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mt-4 transition-all">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h2 className="font-bold text-slate-700 capitalize">
          {type === 'main' ? 'Main Categories' : type === 'sub' ? 'Sub Categories' : 'Master Services'} ({data.length})
        </h2>
        <button 
          onClick={() => handleOpenModal(type)}
          className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center gap-1 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={(type === 'sub' && !selectedMainCategory) || (type === 'service' && !selectedSubcategory)}
        >
          <Plus size={16} /> Add New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center p-8">Loading...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={5} className="text-center p-8 text-slate-400">No items found.</td></tr>
            ) : (
              data.map(item => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4">#{item.id}</td>
                  <td className="p-4 font-semibold text-slate-800">{item.name}</td>
                  <td className="p-4 text-slate-500">{item.slug}</td>
                  <td className="p-4">
                    {item.is_active ? (
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 w-max">
                        <CheckCircle2 size={12} /> Active
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium w-max">Inactive</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {type === 'main' && (
                      <button onClick={() => navigateToSubcategories(item)} className="text-blue-600 text-xs font-medium bg-blue-50 px-2 py-1 rounded mr-2 hover:bg-blue-100 transition-colors">
                        View Subcategories
                      </button>
                    )}
                    {type === 'sub' && (
                      <button onClick={() => navigateToServices(item)} className="text-blue-600 text-xs font-medium bg-blue-50 px-2 py-1 rounded mr-2 hover:bg-blue-100 transition-colors">
                        View Services
                      </button>
                    )}
                    <button onClick={() => handleOpenModal(type, item)} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded mr-1 transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(type, item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-6 font-medium bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        {onOpenSidebar && (
          <button 
            onClick={onOpenSidebar}
            className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition shrink-0 mr-1"
            aria-label="Open Sidebar Menu"
          >
            <Menu size={18} />
          </button>
        )}
        <button onClick={() => { setActiveTab('main'); setSelectedMainCategory(null); setSelectedSubcategory(null); }} className={`hover:text-blue-600 flex items-center gap-1 ${!selectedMainCategory ? 'text-blue-600 font-bold' : ''}`}>
          <Layers size={16} /> All Categories
        </button>
        {selectedMainCategory && (
          <>
            <ChevronRight size={16} />
            <button onClick={() => { setActiveTab('sub'); setSelectedSubcategory(null); }} className={`hover:text-blue-600 ${!selectedSubcategory ? 'text-blue-600 font-bold' : ''}`}>
              {selectedMainCategory.name}
            </button>
          </>
        )}
        {selectedSubcategory && (
          <>
            <ChevronRight size={16} />
            <span className="text-blue-600 font-bold">{selectedSubcategory.name}</span>
          </>
        )}
      </div>

      <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
        <button onClick={() => setActiveTab('main')} className={`flex-1 py-2 px-4 rounded text-sm font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === 'main' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
          <Layers size={18} /> Main Categories
        </button>
        <button onClick={() => setActiveTab('sub')} className={`flex-1 py-2 px-4 rounded text-sm font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === 'sub' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
          <List size={18} /> Sub Categories
        </button>
        <button onClick={() => setActiveTab('services')} className={`flex-1 py-2 px-4 rounded text-sm font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === 'services' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
          <Tag size={18} /> Master Services
        </button>
      </div>

      {activeTab === 'main' && renderTable(categories, 'main')}
      
      {activeTab === 'sub' && (
        <>
          {!selectedMainCategory ? (
            <div className="mt-4 p-8 text-center border border-slate-200 rounded-lg bg-white text-slate-500 shadow-sm flex flex-col items-center justify-center h-48">
              <List size={48} className="text-slate-300 mb-4" />
              <p className="text-lg font-medium text-slate-600">No Main Category Selected</p>
              <p className="text-sm">Please select a Main Category from the "All Categories" tab to view its subcategories.</p>
              <button onClick={() => setActiveTab('main')} className="mt-4 text-blue-600 hover:underline text-sm font-medium">Go to Main Categories</button>
            </div>
          ) : (
            renderTable(subcategories, 'sub')
          )}
        </>
      )}

      {activeTab === 'services' && (
        <>
          {!selectedSubcategory ? (
            <div className="mt-4 p-8 text-center border border-slate-200 rounded-lg bg-white text-slate-500 shadow-sm flex flex-col items-center justify-center h-48">
              <Tag size={48} className="text-slate-300 mb-4" />
              <p className="text-lg font-medium text-slate-600">No Subcategory Selected</p>
              <p className="text-sm">Please select a Subcategory to view its associated services.</p>
            </div>
          ) : (
            renderTable(services, 'service')
          )}
        </>
      )}

      <CategoryManagementModal 
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalType={modalType}
        editingItem={editingItem}
        handleSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        selectedMainCategory={selectedMainCategory}
        selectedSubcategory={selectedSubcategory}
      />
    </div>
  );
}
