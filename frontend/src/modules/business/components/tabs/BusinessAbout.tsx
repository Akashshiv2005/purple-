import React from 'react';

export default function BusinessAbout({ activeTab, business }: any) {
  return (
    <>
    {/* Overview / About */}
            {activeTab === 'Overview' && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">About Us</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {business.description || business.short_description || "No description provided."}
                </p>
              </div>
            )}
    </>
  );
}
