import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, CheckCircle2, AlertCircle, Phone, Mail, Lock, 
  MapPin, Clock, Award, Upload, Camera, Trash2, Eye, EyeOff, Globe, DollarSign, Image, ChevronDown, ChevronRight, ChevronLeft, Check
} from 'lucide-react';

export default function Step7(props: any) {
  const { formData, handleInputChange, toggleArrayItem, sendOtp, verifyOtp, categories, subCategories, isCatOpen, setIsCatOpen, isSubCatOpen, setIsSubCatOpen } = props;
  return (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-black text-slate-900">Step 7: Media, Logos & Gallery</h2>
                  <p className="text-xs text-slate-500 mt-1">Upload brand logo, cover banner, and storefront images.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-5 border border-dashed border-slate-300 rounded-2xl text-center space-y-2">
                    <Image className="mx-auto text-blue-600" size={32} />
                    <p className="text-sm font-bold text-slate-800">Business Logo</p>
                    <input type="file" required={!formData.logoFile} onChange={(e) => handleInputChange('logoFile', e.target.files?.[0] || null)} className="text-xs text-slate-500 mx-auto" />
                    {formData.logoFile && <p className="text-xs text-green-600 font-extrabold mt-1">✓ Selected: {formData.logoFile.name}</p>}
                  </div>
                  <div className="p-5 border border-dashed border-slate-300 rounded-2xl text-center space-y-2">
                    <Image className="mx-auto text-purple-600" size={32} />
                    <p className="text-sm font-bold text-slate-800">Cover Banner</p>
                    <input type="file" onChange={(e) => handleInputChange('coverFile', e.target.files?.[0] || null)} className="text-xs text-slate-500 mx-auto" />
                    {formData.coverFile && <p className="text-xs text-green-600 font-extrabold mt-1">✓ Selected: {formData.coverFile.name}</p>}
                  </div>
                </div>
              </div>
  );
}
