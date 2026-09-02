import React from 'react';
import { Briefcase, Edit, Trash2, Plus } from 'lucide-react';

export default function ServicesSection({ services, setEditingService, setItemToDelete }: any) {
  return (
    <>
    {/* SERVICES SECTION */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Store Services</h2>
            <p className="text-sm text-slate-500 mt-1">Manage the services you offer.</p>
          </div>
          <button 
            onClick={() => setEditingService({ isNew: true, col1: '' })} 
            className="shrink-0 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Service
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service: any) => (
            <div key={service.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex items-center justify-between group relative">
              <div className="flex items-center gap-4 w-full pr-20">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                  <Briefcase size={22} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 truncate text-sm sm:text-base">{service.col1}</h3>
                  <span className="text-[11px] text-slate-400 font-medium">Active Service</span>
                </div>
              </div>
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                 <button 
                    onClick={() => setEditingService(service)}
                    className="p-2 text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-xl transition-colors text-xs font-bold flex items-center gap-1 border border-slate-200/60"
                    title="Edit Service"
                 >
                    <Edit size={14} />
                 </button>
                 <button 
                    onClick={() => setItemToDelete({ type: 'service', item: service })}
                    className="p-2 text-slate-500 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-xl transition-colors text-xs font-bold flex items-center gap-1 border border-slate-200/60"
                    title="Delete Service"
                 >
                    <Trash2 size={14} />
                 </button>
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200 p-6 text-center">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-3">
                 <Briefcase size={26} />
               </div>
               <h4 className="text-base font-bold text-slate-900">No services added yet</h4>
               <p className="text-xs text-slate-500 mt-1 max-w-xs">Add your offerings to help customers find what you do.</p>
               <button 
                 onClick={() => setEditingService({ isNew: true, col1: '' })} 
                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
               >
                 + Add First Service
               </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
