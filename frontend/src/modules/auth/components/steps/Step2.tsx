import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, CheckCircle2, AlertCircle, Phone, Mail, Lock, 
  MapPin, Clock, Award, Upload, Camera, Trash2, Eye, EyeOff, Globe, DollarSign, Image, ChevronDown, ChevronRight, ChevronLeft, Check
} from 'lucide-react';

export default function Step2(props: any) {
  const { formData, handleInputChange, setFormData, toggleArrayItem, sendOtp, verifyOtp, categories, subCategories, isCatOpen, setIsCatOpen, isSubCatOpen, setIsSubCatOpen } = props;
  return (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-black text-slate-900">Step 2: Business & Legal Details</h2>
                  <p className="text-xs text-slate-500 mt-1">Specify legal entity structure, tax numbers, category, and scale.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Business Registered Name *</label>
                    <input type="text" required value={formData.businessName} onChange={(e) => handleInputChange('businessName', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="Kings Dental Academy Pvt Ltd" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Display Name (Brand Name)</label>
                    <input type="text" value={formData.displayName} onChange={(e) => handleInputChange('displayName', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="Kings Dental Clinic" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Primary Category *</label>
                    <div 
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white flex justify-between items-center cursor-pointer"
                      onClick={() => { setIsCatOpen(!isCatOpen); setIsSubCatOpen(false); }}
                    >
                      <span className={formData.category ? 'text-slate-900' : 'text-slate-500'}>
                        {formData.category || 'Select a Category'}
                      </span>
                      <ChevronDown size={16} className={`text-slate-500 transition-transform ${isCatOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {isCatOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {categories.map((cat: any) => (
                          <div 
                            key={cat.id} 
                            className="px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                            onClick={() => {
                              setFormData((prev: any) => ({ ...prev, category: cat.name, subCategory: '' }));
                              setIsCatOpen(false);
                            }}
                          >
                            {cat.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sub Category</label>
                    <div 
                      className={`w-full px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white flex justify-between items-center ${formData.category ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
                      onClick={() => { if (formData.category) { setIsSubCatOpen(!isSubCatOpen); setIsCatOpen(false); } }}
                    >
                      <span className={formData.subCategory ? 'text-slate-900' : 'text-slate-500'}>
                        {formData.subCategory || 'Select a Sub Category'}
                      </span>
                      <ChevronDown size={16} className={`text-slate-500 transition-transform ${isSubCatOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {isSubCatOpen && formData.category && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {subCategories.map((sub: any) => (
                          <div 
                            key={sub.id} 
                            className="px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                            onClick={() => {
                              handleInputChange('subCategory', sub.name);
                              setIsSubCatOpen(false);
                            }}
                          >
                            {sub.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">PAN Card Number</label>
                    <input type="text" value={formData.panNumber} onChange={(e) => handleInputChange('panNumber', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="ABCDE1234F" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">GSTIN Number (Optional)</label>
                    <input type="text" value={formData.gstNumber} onChange={(e) => handleInputChange('gstNumber', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="33ABCDE1234F1Z5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Business Description</label>
                  <textarea rows={3} value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="Describe your services, specialties, experience, and customer value..." />
                </div>
              </div>
  );
}
