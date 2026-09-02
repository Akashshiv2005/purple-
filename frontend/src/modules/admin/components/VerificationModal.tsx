import React from 'react';

export default function VerificationModal({ 
  isModalOpen, 
  setIsModalOpen, 
  selectedReg, 
  handleVerify 
}: any) {
  if (!isModalOpen || !selectedReg) return null;
  return (
    <>

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Verify Registration</h3>
            <div className="space-y-3 mb-6 text-sm">
              <p><span className="font-semibold text-slate-700">Business:</span> {selectedReg.business}</p>
              <p><span className="font-semibold text-slate-700">Owner:</span> {selectedReg.owner}</p>
              <p><span className="font-semibold text-slate-700">Category:</span> {selectedReg.category}</p>
              <p><span className="font-semibold text-slate-700">City:</span> {selectedReg.city}</p>
              <p><span className="font-semibold text-slate-700">Primary Contact:</span> {selectedReg.primary_contact || '-'}</p>
              <p><span className="font-semibold text-slate-700">Secondary Contact:</span> {selectedReg.secondary_contact || '-'}</p>
              <p><span className="font-semibold text-slate-700">Website / Notes:</span> {selectedReg.website || '-'}</p>
              <p><span className="font-semibold text-slate-700">Approval Status:</span> {selectedReg.approval_status || selectedReg.status}</p>
              <p><span className="font-semibold text-slate-700">Description:</span> {selectedReg.description || '-'}</p>
              <p>
                <span className="font-semibold text-slate-700">Document:</span>{' '}
                {selectedReg.document ? (
                  <a href={`${selectedReg.document}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    View Document
                  </a>
                ) : '-'}
              </p>
            </div>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors mr-auto">
                Cancel
              </button>
              <button 
                onClick={() => handleVerify(selectedReg.id, 'Suspended')}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors">
                Reject
              </button>
              <button 
                onClick={() => handleVerify(selectedReg.id, 'Verified')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Approve
              </button>
            </div>
          </div>
        </div>
      
    </>
  );
}
