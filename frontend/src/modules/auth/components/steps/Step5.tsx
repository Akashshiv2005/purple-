import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, CheckCircle2, AlertCircle, Phone, Mail, Lock, 
  MapPin, Clock, Award, Upload, Camera, Trash2, Eye, EyeOff, Globe, DollarSign, Image, ChevronDown, ChevronRight, ChevronLeft, Check
} from 'lucide-react';

export default function Step5(props: any) {
  const { formData, handleInputChange, toggleArrayItem, sendOtp, verifyOtp, categories, subCategories, isCatOpen, setIsCatOpen, isSubCatOpen, setIsSubCatOpen } = props;
  return (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-black text-slate-900">Step 5: Business Working Hours</h2>
                  <p className="text-xs text-slate-500 mt-1">Configure operating hours, 24x7 availability, and appointment requirements.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Monday - Saturday Hours</label>
                    <input 
                      type="text" 
                      required
                      value={formData.mondayHours} 
                      onChange={(e) => handleInputChange('mondayHours', e.target.value)} 
                      pattern="^((1[0-2]|0?[1-9]):[0-5][0-9]\s?(am|pm|AM|PM)\s?-\s?(1[0-2]|0?[1-9]):[0-5][0-9]\s?(am|pm|AM|PM)|Closed|24 Hours)$"
                      title="Format must be '9:00 am - 10:00 pm' or 'Closed'"
                      placeholder="e.g. 9:00 am - 10:00 pm"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sunday Hours</label>
                    <input 
                      type="text" 
                      required
                      value={formData.sundayHours} 
                      onChange={(e) => handleInputChange('sundayHours', e.target.value)} 
                      pattern="^((1[0-2]|0?[1-9]):[0-5][0-9]\s?(am|pm|AM|PM)\s?-\s?(1[0-2]|0?[1-9]):[0-5][0-9]\s?(am|pm|AM|PM)|Closed|24 Hours)$"
                      title="Format must be '9:00 am - 10:00 pm' or 'Closed'"
                      placeholder="e.g. Closed"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" 
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={formData.is24x7} onChange={(e) => handleInputChange('is24x7', e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                    Open 24 Hours (24x7)
                  </label>
                </div>
              </div>
  );
}
