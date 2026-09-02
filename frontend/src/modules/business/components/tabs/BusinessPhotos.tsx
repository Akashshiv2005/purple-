import React from 'react';

export default function BusinessPhotos({ activeTab, gallery }: any) {
  return (
    <>
    {/* Photos Section */}
            {(activeTab === 'Overview' || activeTab === 'Photos') && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Photos</h2>
                {gallery && gallery.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gallery.slice(0, activeTab === 'Photos' ? 20 : 4).map((img: any, idx: number) => (
                      <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                        <img src={img.image_url} alt={img.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-slate-400">
                    <p className="text-sm font-medium">No photos available yet.</p>
                  </div>
                )}
              </div>
            )}
    </>
  );
}
