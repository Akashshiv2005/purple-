import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, CheckCircle2, AlertCircle, Phone, Mail, Lock, 
  MapPin, Clock, Award, Upload, Camera, Trash2, Eye, EyeOff, Globe, DollarSign, Image, ChevronDown, ChevronRight, ChevronLeft, Check
} from 'lucide-react';

export default function Step4(props: any) {
  const { formData, handleInputChange, toggleArrayItem, sendOtp, verifyOtp, categories, subCategories, isCatOpen, setIsCatOpen, isSubCatOpen, setIsSubCatOpen } = props;
  return (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-black text-slate-900">Step 4: Contact Details & Social Handles</h2>
                  <p className="text-xs text-slate-500 mt-1">Provide secondary contact lines, website, and social profile links.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Line</label>
                    <input type="tel" value={formData.contactWhatsapp} onChange={(e) => handleInputChange('contactWhatsapp', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Landline Number</label>
                    <input type="text" value={formData.landline} onChange={(e) => handleInputChange('landline', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="0431 274000" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Official Website</label>
                    <input type="url" value={formData.website} onChange={(e) => handleInputChange('website', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="https://www.business.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Facebook Profile</label>
                    <input type="url" value={formData.facebook} onChange={(e) => handleInputChange('facebook', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="https://facebook.com/mybusiness" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Instagram Handle</label>
                    <input type="url" value={formData.instagram} onChange={(e) => handleInputChange('instagram', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="https://instagram.com/mybusiness" />
                  </div>
                </div>
              </div>
  );
}
