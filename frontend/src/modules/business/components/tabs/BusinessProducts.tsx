import React from 'react';

export default function BusinessProducts({ activeTab, hasProducts, data }: any) {
  return (
    <>
    {/* Products (only shown in Overview if products exist, or if user is on Products tab) */}
            {((activeTab === 'Overview' && hasProducts) || activeTab === 'Products') && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Products</h2>
                {hasProducts ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.products.map((prod: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-slate-50">
                        <span className="font-medium text-slate-700">{prod.name}</span>
                        {prod.price > 0 && <span className="font-bold text-emerald-600">₹{prod.price}</span>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-slate-400">
                    <p className="text-sm font-medium">No products listed.</p>
                  </div>
                )}
              </div>
            )}
    </>
  );
}
