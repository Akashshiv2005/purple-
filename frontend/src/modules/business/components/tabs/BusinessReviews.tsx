import React from 'react';
import { Star } from 'lucide-react';

export default function BusinessReviews({ activeTab, reviews, setSelectedRating, setIsRatingModalOpen }: any) {
  return (
    <>
    {/* Reviews */}
            {(activeTab === 'Overview' || activeTab === 'Reviews') && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-800">Reviews</h2>
                  <button 
                    onClick={() => {
                      setSelectedRating(5);
                      setIsRatingModalOpen(true);
                    }}
                    className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-3 py-1.5 rounded-lg shadow-sm hover:shadow transition"
                  >
                    Write a Review
                  </button>
                </div>

                {reviews && reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.slice(0, activeTab === 'Reviews' ? 20 : 3).map((r: any, idx: number) => (
                      <div key={idx} className="border-b border-slate-105 pb-4 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-blue-105 text-blue-700 flex items-center justify-center font-bold text-sm">
                            {r.user?.name ? r.user.name[0].toUpperCase() : 'A'}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-800">{r.user?.name || "Anonymous"}</p>
                            <div className="flex items-center gap-1">
                              <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center font-bold">
                                {r.rating} <Star size={8} className="ml-0.5 fill-white text-white" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star size={32} className="text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 font-medium">No reviews yet for this business.</p>
                    {activeTab === 'Reviews' && (
                      <p className="text-xs text-slate-400 mt-1">Be the first to share your experience!</p>
                    )}
                  </div>
                )}
              </div>
            )}
    </>
  );
}
