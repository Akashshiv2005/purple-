import React from 'react';
import { Package, Edit, Trash2, Plus } from 'lucide-react';

export default function ProductsSection({ products, setEditingProduct, setItemToDelete }: any) {
  return (
    <>
    {/* PRODUCTS SECTION */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 pt-8 border-t border-slate-200/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Products</h2>
            <p className="text-sm text-slate-500 mt-1">Manage your physical products.</p>
          </div>
          <button 
            onClick={() => setEditingProduct({ isNew: true, col1: '' })} 
            className="shrink-0 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all relative group flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <Package size={24} />
                  </div>
                  <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setEditingProduct(product)} 
                      className="p-2 text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-xl transition-colors border border-slate-200/60"
                      title="Edit Product"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => setItemToDelete({ type: 'product', item: product })} 
                      className="p-2 text-slate-500 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-xl transition-colors border border-slate-200/60"
                      title="Delete Product"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1 truncate">{product.col1}</h3>
                <span className="text-xs text-slate-400 font-medium">Physical Item</span>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200 p-6 text-center">
               <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-3">
                 <Package size={26} />
               </div>
               <h4 className="text-base font-bold text-slate-900">No products added yet</h4>
               <p className="text-xs text-slate-500 mt-1 max-w-xs">Showcase physical inventory or packages you sell.</p>
               <button 
                 onClick={() => setEditingProduct({ isNew: true, col1: '' })} 
                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
               >
                 + Add First Product
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit / Add Service Modal */}
    </>
  );
}
