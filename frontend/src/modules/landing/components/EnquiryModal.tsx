import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function EnquiryModal({ 
  showEnquiryModal, 
  setShowEnquiryModal, 
  selectedBusinessForEnquiry, 
  setSelectedBusinessForEnquiry, 
  handleEnquirySubmit, 
  enquirySuccess, 
  enquiryForm, 
  setEnquiryForm, 
  enquiryLoading 
}: any) {
  const handleNameChange = (e: any) => {
    const val = e.target.value.replace(new RegExp('[^a-zA-Z\\s]', 'g'), '');
    setEnquiryForm({...enquiryForm, name: val});
  };
  const handlePhoneChange = (e: any) => {
    const val = e.target.value.replace(new RegExp('\\D', 'g'), '').slice(0, 10);
    setEnquiryForm({...enquiryForm, phone: val});
  };

  if (!showEnquiryModal || !selectedBusinessForEnquiry) return null;
  return (
    <>
{/* Enquiry Modal */}
      
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative">
            <button 
              onClick={() => {
                setShowEnquiryModal(false);
                setSelectedBusinessForEnquiry(null);
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">Send an Enquiry</h2>
              <p className="text-sm text-slate-500 mt-1">Submit your details and {selectedBusinessForEnquiry.business_name} will get back to you.</p>
            </div>
            
            <form onSubmit={handleEnquirySubmit} className="p-6">
              {enquirySuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Enquiry Sent!</h3>
                  <p className="text-slate-500">The business owner has received your request.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Your Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      value={enquiryForm.name}
                      onChange={handleNameChange}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Info (Phone) <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 9876543210"
                      value={enquiryForm.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Interest <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="What are you looking for?"
                      value={enquiryForm.service}
                      onChange={e => setEnquiryForm({...enquiryForm, service: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={enquiryLoading}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold mt-2 hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {enquiryLoading ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      
    </>
  );
}
