import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Building2, MapPin, MessageSquare } from 'lucide-react';

export default function AdminReviewsTab({ 
  rows, loading, selectedBusiness, setSelectedBusiness, businessReviews, 
  loadingReviews, loadBusinessReviews, handleDeleteReview
}: any) {
  return (
    <div className="space-y-6">
          {/* If a business is selected, show its reviews */}
          {selectedBusiness ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedBusiness(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-colors"
                >
                  <ChevronLeft size={16} /> Back to Businesses
                </button>
                <h2 className="text-xl font-black text-slate-800">
                  Reviews &mdash; <span className="text-blue-600">{selectedBusiness.name}</span>
                </h2>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 bg-slate-50/50">
                        <th className="py-4 pl-6 font-bold">Reviewer</th>
                        <th className="py-4 font-bold">Rating</th>
                        <th className="py-4 font-bold">Review</th>
                        <th className="py-4 font-bold">Date</th>
                        <th className="py-4 font-bold">Status</th>
                        <th className="py-4 font-bold text-right pr-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {loadingReviews ? (
                        <tr><td colSpan={6} className="py-8 text-center text-slate-500">Loading reviews...</td></tr>
                      ) : businessReviews.length === 0 ? (
                        <tr><td colSpan={6} className="py-8 text-center text-slate-400">No reviews found for this business.</td></tr>
                      ) : businessReviews.map((review: any) => (
                        <motion.tr
                          key={review.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="py-4 pl-6 font-bold text-slate-900">{review['Reviewer']}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-1">
                              {[1,2,3,4,5].map(s => (
                                <Star key={s} size={14} className={s <= review['Rating'] ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
                              ))}
                              <span className="ml-1 text-xs font-bold text-slate-600">{review['Rating']}</span>
                            </div>
                          </td>
                          <td className="py-4 text-slate-600 max-w-xs">
                            <p className="truncate">{review['Review'] || <span className="italic text-slate-400">No comment</span>}</p>
                          </td>
                          <td className="py-4 font-medium text-slate-500">{review['Date']}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 text-[11px] font-black uppercase rounded-lg ${
                              review['Status'] === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>{review['Status']}</span>
                          </td>
                          <td className="py-4 text-right pr-6">
                            <button
                              onClick={() => handleDeleteReview(review.id)}
                              className="px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors"
                            >Delete</button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* Business list view */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {loading ? (
                  <div className="col-span-3 py-8 text-slate-500 text-sm">Loading businesses...</div>
                ) : rows.length === 0 ? (
                  <div className="col-span-3 py-8 text-slate-400 text-sm">No businesses with reviews found.</div>
                ) : rows.map((biz: any, index: any) => (
                  <motion.div
                    key={biz.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-blue-500" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-black text-slate-900 text-base leading-tight truncate">{biz.business_name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <MapPin size={11} /> {biz.city} &middot; {biz.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <MessageSquare size={14} className="text-slate-400" />
                          <span className="text-sm font-black text-slate-700">{biz.review_count}</span>
                          <span className="text-xs text-slate-400">reviews</span>
                        </div>
                        {biz.avg_rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star size={13} className="text-amber-400 fill-amber-400" />
                            <span className="text-sm font-bold text-slate-600">{biz.avg_rating}</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => loadBusinessReviews({ id: biz.id, name: biz.business_name })}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm shadow-blue-600/30"
                      >
                        View Reviews
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
  );
}
