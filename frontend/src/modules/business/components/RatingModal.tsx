import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';
import { API_BASE } from '@/shared/services/api';

export default function RatingModal({
  isRatingModalOpen,
  setIsRatingModalOpen,
  submissionSuccess,
  setSubmissionSuccess,
  business,
  selectedRating,
  setSelectedRating,
  reviewerName,
  setReviewerName,
  reviewComment,
  setReviewComment,
  slug
}: any) {
  return (
    <>
    {/* Rating Modal — outside the page card so backdrop-blur covers full screen */}
      {isRatingModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-[9999] p-4 backdrop-blur-[3px]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
            <div className="p-6">
              {submissionSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h3>
                  <p className="text-slate-500 mb-8">Your review has been submitted and is pending owner approval.</p>
                  <button 
                    onClick={() => {
                      setIsRatingModalOpen(false);
                      setSubmissionSuccess(false);
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Rate {business.business_name}</h3>
                  <p className="text-sm text-slate-500 mb-6">Your review will be visible once approved by the owner.</p>
                  
                  <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star 
                        key={i} 
                        size={40} 
                        fill={i <= selectedRating ? "#facc15" : "none"}
                        className={`${i <= selectedRating ? "text-yellow-400" : "text-slate-300"} cursor-pointer transition-all hover:scale-110`}
                        onClick={() => setSelectedRating(i)}
                      />
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
                        placeholder="Enter your name"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Review</label>
                      <textarea 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
                        placeholder="Tell us about your experience..."
                        rows={4}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button 
                      onClick={() => setIsRatingModalOpen(false)}
                      className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={async () => {
                        if (!reviewerName.trim() || !reviewComment.trim()) return;
                        try {
                          const res = await fetch(`${API_BASE}/business/${slug}/rate`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              customer_name: reviewerName,
                              rating: selectedRating,
                              comment: reviewComment
                            })
                          });
                          if (res.ok) {
                            setSubmissionSuccess(true);
                            setReviewComment('');
                            setReviewerName('');
                          } else {
                            alert("Failed to submit review. Please try again.");
                          }
                        } catch (err) {
                          console.error(err);
                          alert("An error occurred connecting to the server.");
                        }
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Submit Review
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
