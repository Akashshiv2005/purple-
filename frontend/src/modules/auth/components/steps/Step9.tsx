import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, CheckCircle2, AlertCircle, Phone, Mail, Lock, 
  MapPin, Clock, Award, Upload, Camera, Trash2, Eye, EyeOff, Globe, DollarSign, Image, ChevronDown, ChevronRight, ChevronLeft, Check
} from 'lucide-react';

export default function Step9(props: any) {
  const { formData, handleInputChange, toggleArrayItem, sendOtp, verifyOtp, categories, subCategories, isCatOpen, setIsCatOpen, isSubCatOpen, setIsSubCatOpen } = props;
  return (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-black text-slate-900">Step 9: Search Engine Optimization (SEO)</h2>
                  <p className="text-xs text-slate-500 mt-1">Custom meta tags for ranking in Google and BizDial search.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Custom SEO Title</label>
                  <input type="text" value={formData.seoTitle} onChange={(e) => handleInputChange('seoTitle', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="Best Dentist in Trichy | Kings Dental Academy" />
                </div>
              </div>
  );
}
