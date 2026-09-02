import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, CheckCircle2, AlertCircle, Phone, Mail, Lock, 
  MapPin, Clock, Award, Upload, Camera, Trash2, Eye, EyeOff, Globe, DollarSign, Image, ChevronDown, ChevronRight, ChevronLeft, Check
} from 'lucide-react';

export default function Step3(props: any) {
  const { formData, handleInputChange, toggleArrayItem, sendOtp, verifyOtp, categories, subCategories, isCatOpen, setIsCatOpen, isSubCatOpen, setIsSubCatOpen } = props;
  return (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-xl font-black text-slate-900">Step 3: Location & Geolocation Coordinates</h2>
                  <p className="text-xs text-slate-500 mt-1">Set physical address, landmark, store type, and service delivery radius.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                    <input type="text" required value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="Trichy" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Area / Locality *</label>
                    <input type="text" required value={formData.area} onChange={(e) => handleInputChange('area', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="Thillai Nagar" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Postal / Zip Code</label>
                    <input type="text" value={formData.postalCode} onChange={(e) => handleInputChange('postalCode', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="620018" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Door Number / Building / Street Address *</label>
                  <textarea rows={2} required value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="No. 45, 10th Cross Street, Thillai Nagar, Trichy" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Service Radius (km)</label>
                    <input type="number" value={formData.serviceRadius} onChange={(e) => handleInputChange('serviceRadius', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="15" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Location Type</label>
                    <select value={formData.locationType} onChange={(e) => handleInputChange('locationType', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none">
                      <option value="">Select Location Type</option>
                      <option>Store / Retail / Shop</option>
                      <option>Office</option>
                      <option>Home Service</option>
                      <option>Online Only</option>
                      <option>Training Center</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps Link</label>
                    <input type="url" value={formData.mapLink} onChange={(e) => handleInputChange('mapLink', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none" placeholder="https://maps.app.goo.gl/..." />
                  </div>
                </div>
              </div>
  );
}
