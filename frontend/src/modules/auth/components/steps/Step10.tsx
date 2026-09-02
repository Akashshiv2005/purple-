import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, CheckCircle2, AlertCircle, Phone, Mail, Lock, 
  MapPin, Clock, Award, Upload, Camera, Trash2, Eye, EyeOff, Globe, DollarSign, Image, ChevronDown, ChevronRight, ChevronLeft, Check
} from 'lucide-react';

export default function Step10(props: any) {
  const { formData, handleInputChange, toggleArrayItem, sendOtp, verifyOtp, categories, subCategories, isCatOpen, setIsCatOpen, isSubCatOpen, setIsSubCatOpen, currentStep, handlePrev, loading } = props;
  const Sparkles = Award;
  return (
    <>
              <div className="space-y-6">
                <div className="text-center border-b border-slate-100 pb-4">
                  <Sparkles className="mx-auto text-blue-600 mb-2" size={40} />
                  <h2 className="text-2xl font-black text-slate-900">Review & Submit Profile</h2>
                  <p className="text-xs text-slate-500 mt-1">Review your business information before submitting for Verification.</p>
                </div>

                {/* Account Info */}
                <div>
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Account Information</h3>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <p><span className="font-bold text-slate-600">Full Name:</span> {formData.fullName || <span className="text-red-400 italic">Not filled</span>}</p>
                      <p><span className="font-bold text-slate-600">Email:</span> {formData.email || <span className="text-red-400 italic">Not filled</span>}</p>
                      <p><span className="font-bold text-slate-600">Mobile:</span> {formData.phone || <span className="text-red-400 italic">Not filled</span>}</p>
                    </div>
                  </div>
                </div>

                {/* Business Info */}
                <div>
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Business Information</h3>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <p><span className="font-bold text-slate-600">Business Name:</span> {formData.businessName || <span className="text-red-400 italic">Not filled</span>}</p>
                      <p><span className="font-bold text-slate-600">Category:</span> {formData.category || <span className="text-red-400 italic">Not filled</span>}</p>
                      <p><span className="font-bold text-slate-600">Sub Category:</span> {formData.subCategory || 'N/A'}</p>
                      <p><span className="font-bold text-slate-600">Display Name:</span> {formData.displayName || 'N/A'}</p>
                      <p><span className="font-bold text-slate-600">PAN:</span> {formData.panNumber || 'N/A'}</p>
                      <p><span className="font-bold text-slate-600">GST:</span> {formData.gstNumber || 'N/A'}</p>
                    </div>
                    {formData.description && <p><span className="font-bold text-slate-600">Description:</span> {formData.description}</p>}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Location</h3>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2 text-slate-900">
                      <p><span className="font-bold text-slate-600">City:</span> {formData.city || <span className="text-red-400 italic">Not filled</span>}</p>
                      <p><span className="font-bold text-slate-600">Area:</span> {formData.area || 'N/A'}</p>
                      <p><span className="font-bold text-slate-600">State:</span> {formData.state || 'N/A'}</p>
                      <p><span className="font-bold text-slate-600">Postal Code:</span> {formData.postalCode || 'N/A'}</p>
                    </div>
                    {formData.address && <p><span className="font-bold text-slate-600">Address:</span> {formData.address}</p>}
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Contact & Social</h3>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <p><span className="font-bold text-slate-600">Primary Mobile:</span> {formData.primaryMobile || formData.phone || 'N/A'}</p>
                      <p><span className="font-bold text-slate-600">Contact Email:</span> {formData.contactEmail || formData.email || 'N/A'}</p>
                      <p><span className="font-bold text-slate-600">Website:</span> {formData.website || 'N/A'}</p>
                      <p><span className="font-bold text-slate-600">WhatsApp:</span> {formData.contactWhatsapp || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Services */}
                {formData.servicesOffered && (
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Services</h3>
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-sm">
                      <p>{formData.servicesOffered}</p>
                    </div>
                  </div>
                )}
                {/* Working Hours & More */}
                <div>
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Additional Info</h3>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <p><span className="font-bold text-slate-600">Location Type:</span> {formData.locationType || 'N/A'}</p>
                      <p><span className="font-bold text-slate-600">Mon-Sat Hours:</span> {formData.mondayHours || 'N/A'}</p>
                      <p><span className="font-bold text-slate-600">Sunday Hours:</span> {formData.sundayHours || 'N/A'}</p>
                      <p><span className="font-bold text-slate-600">24x7:</span> {formData.is24x7 ? 'Yes' : 'No'}</p>
                      <p><span className="font-bold text-slate-600">Doc Reg:</span> {formData.docReg ? 'Uploaded' : <span className="text-red-400 italic">Missing</span>}</p>
                      <p><span className="font-bold text-slate-600">Doc GST:</span> {formData.docGst ? 'Uploaded' : <span className="text-red-400 italic">Missing</span>}</p>
                    </div>
                  </div>
                </div>
              </div>
            {/* Bottom Navigation Buttons */}
            <div className="mt-8 flex justify-between gap-4 pt-6 border-t border-slate-100">
              {currentStep > 1 && (
                <button type="button" onClick={handlePrev} className="px-6 py-3 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-1">
                  <ChevronLeft size={16} /> Back
                </button>
              )}
              {currentStep < 10 ? (
                <button type="submit" className="ml-auto px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1">
                  Next Step <ChevronRight size={16} />
                </button>
              ) : (
                <button type="submit" disabled={loading} className="ml-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-extrabold rounded-xl transition-colors shadow-lg shadow-green-600/30">
                  {loading ? 'Submitting...' : 'Submit Enterprise Profile'}
                </button>
              )}
            </div>
    </>
  );
}
