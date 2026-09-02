import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function BusinessInfoFields({ editFormData, setEditFormData, editingRow, categories, subCategories, openDropdown, setOpenDropdown }: any) {
  return (
    <div className="space-y-6">
      {/* Business & Legal Details */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h4 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-50 pb-4">
          Business & Legal Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { key: 'Business Name', label: 'Business Registered Name' },
            { key: 'Display Name', label: 'Display Name (Brand Name)' },
            { key: 'Category', label: 'Primary Category', type: 'select', options: categories.map((c: any) => c.name) },
            { key: 'Sub Category', label: 'Sub Category', type: 'select', options: subCategories.map((c: any) => c.name) },
            { key: 'PAN Number', label: 'PAN Card Number' },
            { key: 'GSTIN Number', label: 'GSTIN Number (Optional)' },
          ].map((field: any) => (
            <div key={field.key}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">{field.label}</label>
              {field.type === 'select' ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === field.key ? null : field.key)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-blue-200 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 outline-none text-sm text-slate-800 font-semibold bg-blue-50/30 text-left flex items-center justify-between shadow-inner transition-all hover:bg-white"
                  >
                    <span className="truncate">{editFormData[field.key] ?? editingRow?.[field.key] ?? `Select ${field.label}`}</span>
                    <ChevronDown size={16} className="text-slate-400 shrink-0 ml-2" />
                  </button>
                  {openDropdown === field.key && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                      <div className="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl py-1 custom-scrollbar">
                        {field.options.map((opt: string) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setEditFormData((prev: any) => {
                                const next = { ...prev, [field.key]: opt };
                                if (field.key === 'Category') next['Sub Category'] = '';
                                return next;
                              });
                              setOpenDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
                          >
                            {opt}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setEditFormData((prev: any) => ({ ...prev, [field.key]: '-' }));
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-400 hover:bg-slate-50 font-medium transition-colors border-t border-slate-100"
                        >
                          - None -
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 outline-none text-sm text-slate-800 font-semibold bg-slate-50/50 focus:bg-white transition-all shadow-inner"
                  value={editFormData[field.key] ?? editingRow?.[field.key] ?? ''}
                  onChange={e => setEditFormData((prev: any) => ({ ...prev, [field.key]: e.target.value }))}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-5">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Business Description</label>
          <textarea
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 outline-none text-sm text-slate-800 font-semibold bg-slate-50/50 focus:bg-white transition-all h-24 custom-scrollbar shadow-inner resize-none"
            value={editFormData['Description'] ?? editingRow?.['Description'] ?? ''}
            onChange={e => setEditFormData((prev: any) => ({ ...prev, Description: e.target.value }))}
          />
        </div>
      </div>

      {/* Location Details */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h4 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-50 pb-4">
          Location & Geolocation
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: 'City', label: 'City' },
            { key: 'Area', label: 'Area / Locality' },
            { key: 'Pincode', label: 'Postal / Zip Code' },
            { key: 'Service Radius', label: 'Service Radius (km)' },
            { key: 'Location Type', label: 'Location Type', type: 'select', options: ['Store / Retail / Shop', 'Office', 'Home Service', 'Online Only', 'Training Center'] },
            { key: 'Map URL', label: 'Google Maps Link' },
          ].map((field: any) => (
            <div key={field.key}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">{field.label}</label>
              {field.type === 'select' ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === field.key ? null : field.key)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-500/15 focus:border-red-500 outline-none text-sm text-slate-800 font-semibold bg-slate-50/50 text-left flex items-center justify-between shadow-inner transition-all hover:bg-white"
                  >
                    <span className="truncate">{editFormData[field.key] ?? editingRow?.[field.key] ?? `Select ${field.label}`}</span>
                    <ChevronDown size={16} className="text-slate-400 shrink-0 ml-2" />
                  </button>
                  {openDropdown === field.key && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                      <div className="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl py-1 custom-scrollbar">
                        {field.options.map((opt: string) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setEditFormData((prev: any) => ({ ...prev, [field.key]: opt }));
                              setOpenDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 font-medium transition-colors"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-500/15 focus:border-red-500 outline-none text-sm text-slate-800 font-semibold bg-slate-50/50 focus:bg-white transition-all shadow-inner"
                  value={editFormData[field.key] ?? editingRow?.[field.key] ?? ''}
                  onChange={e => setEditFormData((prev: any) => ({ ...prev, [field.key]: e.target.value }))}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-5">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Street Address</label>
          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-500/15 focus:border-red-500 outline-none text-sm text-slate-800 font-semibold bg-slate-50/50 focus:bg-white transition-all shadow-inner"
            value={editFormData['Address'] ?? editingRow?.['Address'] ?? ''}
            onChange={e => setEditFormData((prev: any) => ({ ...prev, Address: e.target.value }))}
          />
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h4 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-50 pb-4">
          Contact Details & Social
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { key: 'WhatsApp', label: 'WhatsApp Line' },
            { key: 'Website', label: 'Official Website' },
            { key: 'Facebook URL', label: 'Facebook Profile' },
            { key: 'Instagram URL', label: 'Instagram Handle' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-green-500/15 focus:border-green-500 outline-none text-sm text-slate-800 font-semibold bg-slate-50/50 focus:bg-white transition-all shadow-inner"
                value={editFormData[key] ?? editingRow?.[key] ?? ''}
                onChange={e => setEditFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Owner Details */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h4 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-50 pb-4">
          Owner Details
        </h4>
        <div className="grid grid-cols-2 gap-5">
          {[
            { key: 'Owner', label: 'Owner Name' },
            { key: 'Owner Email', label: 'Owner Email' },
            { key: 'Owner Phone', label: 'Owner Phone' },
            { key: 'Owner Role', label: 'Owner Role' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-pink-500/15 focus:border-pink-500 outline-none text-sm text-slate-800 font-semibold bg-slate-50/50 focus:bg-white transition-all shadow-inner"
                value={editFormData[key] ?? editingRow?.[key] ?? ''}
                onChange={e => setEditFormData((prev: any) => ({ ...prev, [key]: e.target.value }))}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
