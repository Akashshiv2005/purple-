import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, CheckCircle2, AlertCircle, Phone, Mail, Lock, 
  MapPin, Clock, Award, Upload, Camera, Trash2, Eye, EyeOff, Globe, DollarSign, Image, ChevronDown, ChevronRight, ChevronLeft, Check
} from 'lucide-react';

export default function Step1(props: any) {
  const { formData, handleInputChange, toggleArrayItem, sendOtp, verifyOtp, categories, subCategories, isCatOpen, setIsCatOpen, isSubCatOpen, setIsSubCatOpen } = props;
  return (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-black text-slate-900">Step 1: Account Information & Verification</h2>
                  <p className="text-xs text-slate-500 mt-1">Create your master business owner credentials and verify email & mobile numbers.</p>
                </div>

                {formData.otpMsg && (
                  <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold rounded-xl">
                    {formData.otpMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Owner Full Name *</label>
                  <input autoComplete="off" type="text" required value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Dr. Kiruthiga Manohar" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700">Business Email Address *</label>
                    </div>
                    <div className="flex gap-2">
                      <input autoComplete="off" type="email" required value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="owner@business.com" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700">Mobile Number *</label>
                      {formData.isMobileVerified ? (
                        <span className="text-[11px] font-bold text-green-600 flex items-center gap-1"><CheckCircle2 size={12} /> Verified</span>
                      ) : (
                        <button type="button" onClick={() => sendOtp(formData.phone || '9876543210', 'mobile')} className="text-[11px] font-bold text-blue-600 hover:underline">Send OTP</button>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input autoComplete="off" type="tel" required value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91 98765 43210" />
                    </div>
                    {!formData.isMobileVerified && (
                      <div className="flex gap-2 mt-2">
                        <input autoComplete="off" type="text" placeholder="Enter OTP" value={formData.mobileOtp} onChange={(e) => handleInputChange('mobileOtp', e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                        <button type="button" onClick={() => verifyOtp('mobile')} className="px-5 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100">Verify</button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
                    <input autoComplete="new-password" type="password" required value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
                    <input autoComplete="new-password" type="password" required value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
                  </div>
                </div>
              </div>
  );
}
