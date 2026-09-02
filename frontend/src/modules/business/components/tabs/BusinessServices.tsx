import React from 'react';

export default function BusinessServices({ activeTab, hasServices, services }: any) {
  return (
    <>
    {/* Services (only shown in Overview if services exist, or if user is on Services tab) */}
            {((activeTab === 'Overview' && hasServices) || activeTab === 'Services') && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Services</h2>
                {hasServices ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map((svc: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-slate-50">
                        <span className="font-medium text-slate-700">{svc.name}</span>
                        {svc.base_price > 0 && <span className="font-bold text-blue-600">₹{svc.base_price}</span>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-slate-400">
                    <p className="text-sm font-medium">No services listed.</p>
                  </div>
                )}
              </div>
            )}
    </>
  );
}
