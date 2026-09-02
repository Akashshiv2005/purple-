import React from 'react';
import { authFetch } from '@/shared/services/authFetch';

export default function HelpModal({ 
  showHelpModal, 
  setShowHelpModal, 
  profile, 
  helpSubject, 
  setHelpSubject, 
  helpMessage, 
  setHelpMessage, 
  businessId 
}: any) {
  if (!showHelpModal) return null;
  return (
    <>
{/* Help Modal */}
      
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowHelpModal(false)} />
          <div className="relative bg-white rounded-[1.5rem] shadow-2xl w-full max-w-md p-6">
            <h3 className="font-bold text-xl text-slate-900 mb-2">Help Center</h3>
            <p className="text-sm text-slate-500 mb-4">How can we help you today? Describe your issue and we will send a notification to the Super Admin.</p>
            <div className="flex gap-3 mb-3">
              <input 
                type="text"
                value={profile?.owner_name || 'Unknown User'}
                readOnly
                className="w-1/2 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none text-sm"
              />
              <input 
                type="text"
                value={new Date().toISOString().split('T')[0]}
                readOnly
                className="w-1/2 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none text-sm"
              />
            </div>
            <input 
              type="text"
              value={helpSubject}
              onChange={e => setHelpSubject(e.target.value)}
              placeholder="Subject..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm mb-3"
            />
            <textarea 
              rows={4}
              value={helpMessage}
              onChange={e => setHelpMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm resize-none mb-4"
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200"
              >
                Cancel
              </button>
              <button 
                onClick={async () => {
                  if (helpSubject.trim() && helpMessage.trim()) {
                    try {
                      const res = await authFetch(`/api/owner/${businessId}/support-ticket`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ subject: helpSubject, message: helpMessage })
                      });
                      const data = await res.json();
                      alert(`Message successfully sent to Super Admin! Ticket ID: SUP-100${data.id}`);
                      setHelpSubject('');
                      setHelpMessage('');
                      setShowHelpModal(false);
                    } catch(err) {
                      console.error("Failed to send ticket", err);
                      alert("Failed to send message. Please try again.");
                    }
                  } else {
                    alert("Please enter both a subject and a message.");
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      
    </>
  );
}
