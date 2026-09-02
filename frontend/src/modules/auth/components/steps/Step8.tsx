import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, CheckCircle2, AlertCircle, Phone, Mail, Lock, 
  MapPin, Clock, Award, Upload, Camera, Trash2, Eye, EyeOff, Globe, DollarSign, Image, ChevronDown, ChevronRight, ChevronLeft, Check
} from 'lucide-react';

export default function Step8(props: any) {
  const { formData, handleInputChange, toggleArrayItem, sendOtp, verifyOtp, categories, subCategories, isCatOpen, setIsCatOpen, isSubCatOpen, setIsSubCatOpen } = props;
  return (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-black text-slate-900">Step 8: Official Verification Documents</h2>
                  <p className="text-xs text-slate-500 mt-1">Upload official business registration certificates to qualify for Verified Badges.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 border border-dashed border-slate-300 rounded-2xl text-center space-y-2">
                    <Upload className="mx-auto text-blue-600" size={28} />
                    <p className="text-sm font-bold text-slate-800">Registration Certificate / License (Mandatory)</p>
                    <input type="file" required={!formData.docReg} onChange={(e) => handleInputChange('docReg', e.target.files?.[0] || null)} className="text-xs text-slate-500 mx-auto" />
                    {formData.docReg && <p className="text-xs text-green-600 font-extrabold mt-1">✓ Selected: {formData.docReg.name}</p>}
                  </div>

                  <div className="p-4 border border-dashed border-slate-300 rounded-2xl text-center space-y-2">
                    <Upload className="mx-auto text-orange-500" size={28} />
                    <p className="text-sm font-bold text-slate-800">PAN Card (Mandatory)</p>
                    <input type="file" required={!formData.docPan} onChange={(e) => handleInputChange('docPan', e.target.files?.[0] || null)} className="text-xs text-slate-500 mx-auto" />
                    {formData.docPan && <p className="text-xs text-green-600 font-extrabold mt-1">✓ Selected: {formData.docPan.name}</p>}
                  </div>

                  <div className="p-4 border border-dashed border-slate-300 rounded-2xl text-center space-y-2">
                    <Upload className="mx-auto text-green-600" size={28} />
                    <p className="text-sm font-bold text-slate-800">GST Certificate (Mandatory)</p>
                    <input type="file" required={!formData.docGst} onChange={(e) => handleInputChange('docGst', e.target.files?.[0] || null)} className="text-xs text-slate-500 mx-auto" />
                    {formData.docGst && <p className="text-xs text-green-600 font-extrabold mt-1">✓ Selected: {formData.docGst.name}</p>}
                  </div>
                </div>
              </div>
  );
}
