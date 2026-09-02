import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, CheckCircle2, AlertCircle, Phone, Mail, Lock, 
  MapPin, Clock, Award, Upload, Camera, Trash2, Eye, EyeOff, Globe, DollarSign, Image, ChevronDown, ChevronRight, ChevronLeft, Check
} from 'lucide-react';

export default function Step6(props: any) {
  const { formData, handleInputChange, toggleArrayItem, sendOtp, verifyOtp, categories, subCategories, isCatOpen, setIsCatOpen, isSubCatOpen, setIsSubCatOpen } = props;
  return (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-black text-slate-900">Step 6: Offered Services & Products</h2>
                  <p className="text-xs text-slate-500 mt-1">Detail main services, products, pricing tiers, and delivery options.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Services Offered (Comma Separated)</label>
                  <textarea rows={2} required value={formData.servicesOffered} onChange={(e) => handleInputChange('servicesOffered', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" />
                </div>


              </div>
  );
}
