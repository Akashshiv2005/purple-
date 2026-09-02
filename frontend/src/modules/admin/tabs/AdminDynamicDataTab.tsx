"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { authFetch } from '@/shared/services/authFetch';
import { API_BASE } from '@/shared/services/config';
import { Menu } from 'lucide-react';
import AdminEditModal from './components/AdminEditModal';
import AdminCategoriesTab from './components/AdminCategoriesTab';
import AdminReviewsTab from './components/AdminReviewsTab';
import AdminBusinessManagementTab from './components/AdminBusinessManagementTab';
import AdminGenericTableTab from './components/AdminGenericTableTab';

import DeleteConfirmModal from '../components/DeleteConfirmModal';
import BulkDeleteConfirmModal from './components/BulkDeleteConfirmModal';
import ToastNotification from './components/ToastNotification';

import { formatTabName, getTableSchema } from './utils/adminTabUtils';

import { useAdminTabState } from './hooks/useAdminTabState';

export default function AdminDynamicDataTab({ tab, onOpenSidebar }: { tab: string, onOpenSidebar: () => void }) {
  const {
    editingRow, setEditingRow,
    isAdding,
    rows,
    loading,
    error,
    toastMessage,
    editFormData, setEditFormData,
    deletingRow, setDeletingRow,
    selectedRows,
    isDeletingBulk,
    showBulkDeleteConfirm, setShowBulkDeleteConfirm,
    selectedBusiness, setSelectedBusiness,
    businessReviews,
    loadingReviews,
    categories,
    subCategories,
    openDropdown, setOpenDropdown,
    handleFileUpload, showToast, openAdd, handleSave, handleDelete, confirmDelete, handleBulkDelete, executeBulkDelete, toggleRow, toggleAll, loadBusinessReviews, handleDeleteReview
  } = useAdminTabState(tab);

  const title = formatTabName(tab);
  const columns = getTableSchema(tab);
  const isCategoriesTab = tab === 'categories';
  const isReviewsTab = tab === 'reviews';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
            <button className="md:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg mr-2" onClick={onOpenSidebar}>
              <Menu size={24} />
            </button>
            {title}
          </h1>
          <p className="text-sm text-slate-500 mt-1">Manage all {title.toLowerCase()} settings and data here.</p>
        </div>
        {tab !== 'business-owners' && tab !== 'business-approvals' && (
          <button onClick={openAdd} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5">
            + Add New
          </button>
        )}
      </div>

      {isCategoriesTab ? (
        <AdminCategoriesTab 
          rows={rows} 
          title={title} 
          loading={loading} 
          error={error} 
          setEditingRow={setEditingRow} 
          showToast={showToast} 
        />
      ) : isReviewsTab ? (
        <AdminReviewsTab 
          rows={rows} 
          loading={loading} 
          selectedBusiness={selectedBusiness} 
          setSelectedBusiness={setSelectedBusiness} 
          businessReviews={businessReviews} 
          loadingReviews={loadingReviews} 
          loadBusinessReviews={loadBusinessReviews} 
          handleDeleteReview={handleDeleteReview} 
        />
      ) : tab === 'business-management' ? (
        <AdminBusinessManagementTab 
          rows={rows} 
          loading={loading} 
          error={error} 
          selectedRows={selectedRows} 
          toggleRow={toggleRow} 
          handleBulkDelete={handleBulkDelete} 
          isDeletingBulk={isDeletingBulk} 
          setEditingRow={setEditingRow} 
          handleDelete={handleDelete} 
        />
      ) : (
        <AdminGenericTableTab 
          tab={tab} 
          title={title} 
          rows={rows} 
          columns={columns} 
          loading={loading} 
          error={error} 
          selectedRows={selectedRows} 
          toggleRow={toggleRow} 
          toggleAll={toggleAll} 
          handleBulkDelete={handleBulkDelete} 
          isDeletingBulk={isDeletingBulk} 
          setEditingRow={setEditingRow} 
          handleDelete={handleDelete} 
          showToast={showToast} 
          authFetch={authFetch} 
        />
      )}

      <AdminEditModal
        editingRow={editingRow}
        setEditingRow={setEditingRow}
        tab={tab}
        isAdding={isAdding}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        handleSave={handleSave}
        categories={categories}
        subCategories={subCategories}
        handleFileUpload={handleFileUpload}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        columns={columns}
      />

      <DeleteConfirmModal 
        deletingRow={deletingRow} 
        setDeletingRow={setDeletingRow} 
        confirmDelete={confirmDelete} 
      />

      <BulkDeleteConfirmModal 
        showBulkDeleteConfirm={showBulkDeleteConfirm} 
        setShowBulkDeleteConfirm={setShowBulkDeleteConfirm} 
        selectedCount={selectedRows.size} 
        isDeletingBulk={isDeletingBulk} 
        executeBulkDelete={executeBulkDelete} 
      />

      <ToastNotification toastMessage={toastMessage} />
    </motion.div>
  );
}
