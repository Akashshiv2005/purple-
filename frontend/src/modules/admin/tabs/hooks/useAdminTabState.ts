import { useState, useEffect } from 'react';
import { authFetch } from '@/shared/services/authFetch';
import { API_BASE } from '@/shared/services/config';
import { mapPayload, groupLocations } from '../utils/adminTabUtils';

export function useAdminTabState(tab: string) {
  const [editingRow, setEditingRow] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Record<string, any>>({});
  const [deletingRow, setDeletingRow] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [isDeletingBulk, setIsDeletingBulk] = useState(false);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);

  const [selectedBusiness, setSelectedBusiness] = useState<{ id: number; name: string } | null>(null);
  const [businessReviews, setBusinessReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const [subCategories, setSubCategories] = useState<{id: number, name: string}[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleFileUpload = async (file: File, key: string) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      setToastMessage('Uploading...');
      const res = await authFetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        setEditFormData((prev: any) => ({ ...prev, [key]: data.url }));
        setToastMessage('Upload successful!');
      } else {
        setToastMessage('Upload failed');
      }
    } catch (e) {
      console.error(e);
      setToastMessage('Upload failed');
    }
  };

  useEffect(() => {
    fetch(`${API_BASE}/admin/categories/`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    const selectedCatName = editFormData['Category'] ?? editingRow?.['Category'];
    if (selectedCatName && categories.length > 0) {
      const selectedCat = categories.find(c => c.name === selectedCatName);
      if (selectedCat) {
        fetch(`${API_BASE}/admin/subcategories/?category_id=${selectedCat.id}`)
          .then(res => res.json())
          .then(data => setSubCategories(data))
          .catch(err => console.error("Error fetching subcategories:", err));
      }
    } else {
      setSubCategories([]);
    }
  }, [categories, editFormData['Category'], editingRow?.['Category']]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openEdit = (row: any) => {
    setEditingRow(row);
    setEditFormData({ ...row });
    setIsAdding(false);
  };

  const openAdd = () => {
    setEditingRow({});
    setEditFormData({});
    setIsAdding(true);
  };

  const handleSave = async () => {
    try {
      const apiResource = tab === 'business-management' || tab === 'business-directory' ? 'business' : tab;
      const endpoint = isAdding
        ? `/api/admin/${apiResource}`
        : `/api/admin/${apiResource}/${editingRow.id}`;
      const method = isAdding ? 'POST' : 'PUT';
      
      let payload = { ...editFormData };
      if (apiResource === 'business') {
        payload = mapPayload(editFormData);
      }

      const res = await authFetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showToast(isAdding ? 'Item added successfully!' : 'Changes saved successfully!');
        setEditingRow(null);
        const refreshed = await authFetch(`/api/admin/${tab}`);
        if (refreshed.ok) {
          const data = await refreshed.json();
          setRows(Array.isArray(data) ? data : []);
        }
      } else {
        const err = await res.json();
        showToast(`Error: ${err.detail || 'Save failed'}`);
      }
    } catch (e) {
      showToast('Network error. Please try again.');
    }
  };

  const handleDelete = (row: any) => {
    setDeletingRow(row);
  };

  const confirmDelete = async () => {
    if (!deletingRow) return;
    try {
      const apiResource = tab === 'business-management' || tab === 'business-approvals' || tab === 'business-directory' ? 'business' : tab;
      const res = await authFetch(`/api/admin/${apiResource}/${deletingRow.id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Item deleted successfully!');
        setRows(prev => prev.filter(r => r.id !== deletingRow.id));
      } else {
        showToast('Delete failed. Please try again.');
      }
    } catch (e) {
      showToast('Network error. Could not delete item.');
    } finally {
      setDeletingRow(null);
    }
  };

  const handleBulkDelete = () => {
    if (selectedRows.size === 0) return;
    setShowBulkDeleteConfirm(true);
  };

  const executeBulkDelete = async () => {
    setIsDeletingBulk(true);
    try {
      const ids = Array.from(selectedRows);
      const apiResource = tab === 'business-management' || tab === 'business-approvals' || tab === 'business-directory' ? 'business' : tab;
      
      const promises = ids.map(id => authFetch(`/api/admin/${apiResource}/${id}`, { method: 'DELETE' }));
      const responses = await Promise.all(promises);
      
      const successCount = responses.filter(r => r.ok).length;
      if (successCount === 0) {
        showToast('Error: Failed to delete items.');
        return;
      }
      
      showToast(`Successfully deleted ${successCount} items!`);
      const refreshed = await authFetch(`/api/admin/${tab === 'locations' ? 'business-management' : tab}`);
      if (refreshed.ok) {
        const data = await refreshed.json();
        setRows(Array.isArray(data) ? data : []);
      }
      setSelectedRows(new Set());
    } catch (e) {
      showToast('Error during bulk deletion.');
    } finally {
      setIsDeletingBulk(false);
      setShowBulkDeleteConfirm(false);
    }
  };

  const toggleRow = (id: number) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedRows(newSet);
  };

  const toggleAll = () => {
    if (selectedRows.size === rows.length && rows.length > 0) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(rows.map(r => r.id)));
    }
  };

  const loadBusinessReviews = async (business: { id: number; name: string }) => {
    setSelectedBusiness(business);
    setLoadingReviews(true);
    try {
      const res = await authFetch(`/api/admin/reviews/business/${business.id}`);
      if (res.ok) {
        const data = await res.json();
        setBusinessReviews(Array.isArray(data) ? data : []);
      }
    } catch {
      setBusinessReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm('Delete this review? This cannot be undone.')) return;
    try {
      const res = await authFetch(`/api/admin/reviews/${reviewId}`, { method: 'DELETE' });
      if (res.ok) {
        setBusinessReviews(prev => prev.filter(r => r.id !== reviewId));
        showToast('Review deleted successfully!');
        if (selectedBusiness) {
          setRows(prev => prev.map(r => r.id === selectedBusiness.id ? { ...r, review_count: r.review_count - 1 } : r));
        }
      }
    } catch {
      showToast('Failed to delete review.');
    }
  };

  useEffect(() => {
    setSelectedBusiness(null);
    setBusinessReviews([]);
  }, [tab]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const endpoint = tab === 'reviews' ? 'reviews-by-business' : (tab === 'locations' || tab === 'business-directory' || tab === 'business-approvals') ? 'business-management' : tab;

    authFetch(`/api/admin/${endpoint}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load ${tab}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          const normalizedRows = Array.isArray(data) ? data : [];
          if (tab === 'locations') {
            setRows(groupLocations(normalizedRows));
            return;
          }
          setRows(normalizedRows);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setRows([]);
          setError(err instanceof Error ? err.message : 'Failed to load data');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tab]);

  return {
    editingRow, setEditingRow,
    isAdding, setIsAdding,
    rows, setRows,
    loading, setLoading,
    error, setError,
    toastMessage, setToastMessage,
    editFormData, setEditFormData,
    deletingRow, setDeletingRow,
    selectedRows, setSelectedRows,
    isDeletingBulk, setIsDeletingBulk,
    showBulkDeleteConfirm, setShowBulkDeleteConfirm,
    selectedBusiness, setSelectedBusiness,
    businessReviews, setBusinessReviews,
    loadingReviews, setLoadingReviews,
    categories, setCategories,
    subCategories, setSubCategories,
    openDropdown, setOpenDropdown,
    handleFileUpload, showToast, openEdit, openAdd, handleSave, handleDelete, confirmDelete, handleBulkDelete, executeBulkDelete, toggleRow, toggleAll, loadBusinessReviews, handleDeleteReview
  };
}
