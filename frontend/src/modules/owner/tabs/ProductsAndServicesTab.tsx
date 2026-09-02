"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Package, Briefcase, X, Edit, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';
import ServicesSection from '../components/products/ServicesSection';
import ProductsSection from '../components/products/ProductsSection';
import ProductModals from '../components/products/ProductModals';

export default function ProductsAndServicesTab({ businessId, profile }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingService, setEditingService] = useState<any>(null);
  const [itemToDelete, setItemToDelete] = useState<{ type: 'service' | 'product'; item: any } | null>(null);
  const [isSavingService, setIsSavingService] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    // Fetch Products
    authFetch(`/api/owner/${businessId}/products`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setProducts(data.map((item: any) => ({ ...item, col1: item.name })));
      })
      .catch(console.error);

    // Fetch Services
    authFetch(`/api/owner/${businessId}/services`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setServices(data.map((item: any) => ({ ...item, col1: item.name })));
      })
      .catch(console.error);
  }, [businessId, refreshCount]);

  const refreshData = () => setRefreshCount(prev => prev + 1);

  const handleSaveService = async () => {
    if (isSavingService) return;
    const name = editingService?.col1?.trim();
    if (!name) {
      alert('Service name is required');
      return;
    }

    try {
      setIsSavingService(true);
      const payload = {
        custom_name: name,
        master_service_id: editingService.master_service_id || null,
        price: 0,
        description: null
      };
      const url = editingService.isNew ? `/api/owner/${businessId}/services` : `/api/owner/${businessId}/services/${editingService.id}`;
      const method = editingService.isNew ? 'POST' : 'PUT';

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setEditingService(null);
        refreshData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingService(false);
    }
  };

  const handleSaveProduct = async () => {
    if (isSavingProduct) return;
    const name = editingProduct?.col1?.trim();
    if (!name) {
      alert('Product name is required');
      return;
    }

    try {
      setIsSavingProduct(true);
      const payload = {
        name,
        category: "General"
      };
      const url = editingProduct.isNew ? `/api/owner/${businessId}/products` : `/api/owner/${businessId}/products/${editingProduct.id}`;
      const method = editingProduct.isNew ? 'POST' : 'PUT';

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setEditingProduct(null);
        refreshData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingProduct(false);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete || isDeleting) return;
    try {
      setIsDeleting(true);
      const { type, item } = itemToDelete;
      const endpoint = type === 'service' ? `/api/owner/${businessId}/services/${item.id}` : `/api/owner/${businessId}/products/${item.id}`;
      const res = await authFetch(endpoint, { method: 'DELETE' });
      if (res.ok) {
        setItemToDelete(null);
        if (editingService?.id === item.id) setEditingService(null);
        if (editingProduct?.id === item.id) setEditingProduct(null);
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
      className="p-4 sm:p-8 space-y-12"
    >
      <ServicesSection 
        services={services} 
        setEditingService={setEditingService} 
        setItemToDelete={setItemToDelete} 
      />

      <ProductsSection 
        products={products} 
        setEditingProduct={setEditingProduct} 
        setItemToDelete={setItemToDelete} 
      />
      <ProductModals 
        editingService={editingService}
        setEditingService={setEditingService}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        itemToDelete={itemToDelete}
        setItemToDelete={setItemToDelete}
        handleSaveService={handleSaveService}
        isSavingService={isSavingService}
        handleSaveProduct={handleSaveProduct}
        isSavingProduct={isSavingProduct}
        confirmDelete={confirmDelete}
        isDeleting={isDeleting}
      />
    </motion.div>
  );
}
