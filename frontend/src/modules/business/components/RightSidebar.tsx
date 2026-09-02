import React from 'react';
import { Phone, Clock, Calendar, MapPin } from 'lucide-react';
import { formatTimeDisplay, formatWorkingDays } from '../utils/businessUtils';

export default function RightSidebar({ business, status, effectiveOpen, effectiveClose, effectiveDays }: any) {
  return (
    <>
    {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Contact</h2>
              <div className="flex items-start gap-3">
                <Phone className="text-blue-600 mt-1" size={20} />
                <div>
                  <a href={`tel:${business.phone}`} className="text-blue-600 font-medium text-lg hover:underline block">
                    {business.phone}
                  </a>
                  {business.whatsapp && (
                    <a href={`https://wa.me/${business.whatsapp}`} className="text-green-600 font-medium hover:underline block mt-1">
                      WhatsApp: {business.whatsapp}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Clock size={16} className="text-blue-500" /> Business Hours
              </h2>
              <div className="space-y-3">
                <div className={`flex items-center justify-between p-3 rounded-xl ${status.isOpen ? 'bg-green-50 border border-green-200' : 'bg-rose-50 border border-rose-200'}`}>
                  <span className={`text-sm font-extrabold ${status.isOpen ? 'text-green-700' : 'text-rose-700'}`}>
                    {status.isOpen ? '🟢 Open Now' : '🔴 Closed'}
                  </span>
                  <span className={`text-xs font-bold ${status.isOpen ? 'text-green-600' : 'text-rose-600'}`}>
                    {status.isOpen 
                      ? (effectiveClose ? `Until ${formatTimeDisplay(effectiveClose)}` : 'Open Today')
                      : (effectiveOpen ? `Opens ${formatTimeDisplay(effectiveOpen)}` : 'Closed Today')}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5"><Clock size={12} /> Opening Time</span>
                  <span className="text-sm font-bold text-slate-800">{formatTimeDisplay(effectiveOpen)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5"><Clock size={12} /> Closing Time</span>
                  <span className="text-sm font-bold text-slate-800">{formatTimeDisplay(effectiveClose)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5"><Calendar size={12} /> Open Days</span>
                  <span className="text-sm font-bold text-slate-800">{formatWorkingDays(effectiveDays)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Address</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {business.address}
                <br />
                {business.area}, {business.city} - {business.pincode}
              </p>
              <div className="w-full h-48 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center text-slate-400 relative border border-slate-200">
                {business.latitude && business.longitude ? (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    src={`https://maps.google.com/maps?q=${business.latitude},${business.longitude}&hl=en&z=14&output=embed`}
                  ></iframe>
                ) : business.google_map_url ? (
                  <div className="flex flex-col items-center justify-center p-4 text-center w-full h-full bg-slate-50">
                    <MapPin size={32} className="text-blue-500 mb-2" />
                    <p className="font-semibold text-slate-700 mb-3 text-sm">Location Map Available</p>
                    <a href={business.google_map_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition shadow-sm">View on Google Maps</a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <MapPin size={24} className="mb-2 opacity-50" />
                    <span className="text-sm">Map Not Provided</span>
                  </div>
                )}
              </div>
            </div>
          </div>
    </>
  );
}
