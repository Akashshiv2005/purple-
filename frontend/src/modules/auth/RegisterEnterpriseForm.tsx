"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, ShieldCheck, CheckCircle2, AlertCircle, Phone, Mail, Lock, 
  MapPin, Clock, Award, Upload, Camera, Trash2, Eye, EyeOff, Globe, DollarSign, Image, ChevronDown, ChevronRight, ChevronLeft, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE } from '@/shared/services/api';
import { defaultFormData, steps, processInputField } from './utils/registerUtils';
import RegisterHeader from './components/RegisterHeader';
import ProgressTracker from './components/ProgressTracker';
import SuccessModal from './components/SuccessModal';
import OnboardingSteps from './components/OnboardingSteps';

export default function EnterpriseRegister() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = typeof window !== 'undefined' ? localStorage.getItem('enterpriseRegisterStep') : null;
    return savedStep ? parseInt(savedStep, 10) : 1;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isSubCatOpen, setIsSubCatOpen] = useState(false);

  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const [subCategories, setSubCategories] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/admin/categories/`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const [formData, setFormData] = useState(() => {
    const savedData = typeof window !== 'undefined' ? localStorage.getItem('enterpriseRegisterDraft') : null;
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        return {
          ...defaultFormData,
          ...parsed,
          logoFile: null,
          coverFile: null,
          galleryFiles: [],
          brochureFile: null,
          docReg: null,
          docPan: null,
          docGst: null,
          docFssai: null,
          docAadhaar: null,
          qrFile: null,
        };
      } catch (e) {
        console.error("Failed to parse saved draft", e);
      }
    }
    return defaultFormData;
  });

  useEffect(() => {
    const dataToSave = { ...formData };
    delete (dataToSave as any).logoFile;
    delete (dataToSave as any).coverFile;
    delete (dataToSave as any).galleryFiles;
    delete (dataToSave as any).brochureFile;
    delete (dataToSave as any).docReg;
    delete (dataToSave as any).docPan;
    delete (dataToSave as any).docGst;
    delete (dataToSave as any).docFssai;
    delete (dataToSave as any).docAadhaar;
    delete (dataToSave as any).qrFile;
    localStorage.setItem('enterpriseRegisterDraft', JSON.stringify(dataToSave));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('enterpriseRegisterStep', currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
    const selectedCat = categories.find(c => c.name === formData.category);
    if (selectedCat) {
      fetch(`${API_BASE}/admin/subcategories/?category_id=${selectedCat.id}`)
        .then(res => res.json())
        .then(data => setSubCategories(Array.isArray(data) ? data : []))
        .catch(err => console.error("Error fetching subcategories:", err));
    } else {
      setSubCategories([]);
    }
  }, [categories, formData.category]); // Re-fetch if category changes

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></motion.div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: any) => {
    const processedValue = processInputField(field, value);
    if (processedValue === null && value instanceof File) return; // File upload error caught in processInputField
    setFormData((prev: any) => ({ ...prev, [field]: processedValue }));
  };

  const toggleArrayItem = (field: 'paymentMethods' | 'featuresList', item: string) => {
    setFormData((prev: any) => {
      const arr = prev[field] as string[];
      const updated = arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];
      return { ...prev, [field]: updated };
    });
  };

  const sendOtp = async (destination: string, type: 'email' | 'mobile') => {
    try {
      await fetch(`${API_BASE}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ destination, type })
      });
      setFormData((prev: any) => ({ ...prev, otpMsg: `Demo OTP for ${type} (${destination}) is 123456` }));
    } catch (e) {
      console.error(e);
    }
  };

  const verifyOtp = (type: 'email' | 'mobile') => {
    const code = type === 'email' ? formData.emailOtp : formData.mobileOtp;
    if (code === '123456' || code === '999999') {
      setFormData((prev: any) => ({
        ...prev,
        isEmailVerified: type === 'email' ? true : prev.isEmailVerified,
        isMobileVerified: type === 'mobile' ? true : prev.isMobileVerified,
        otpMsg: `${type.toUpperCase()} Verified Successfully!`
      }));
    } else {
      alert('Invalid OTP code. Please enter 123456 for testing.');
    }
  };

  const handleNext = () => {
    if (currentStep < 10) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('full_name', formData.fullName || 'Business Owner');
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('password', formData.password);
      data.append('business_name', formData.businessName);
      data.append('display_name', formData.displayName || '');
      data.append('business_type', formData.businessType || '');
      data.append('category', formData.category || '');
      data.append('sub_category', formData.subCategory || '');
      data.append('description', formData.description || '');
      data.append('city', formData.city || '');
      data.append('area', formData.area || '');
      data.append('pincode', formData.postalCode || '');
      data.append('address', formData.address || `${formData.doorNumber}, ${formData.street}, ${formData.area}`);
      data.append('service_radius', formData.serviceRadius || '10');
      data.append('location_type', formData.locationType || 'Store');
      data.append('map_url', formData.mapLink || '');
      data.append('whatsapp', formData.contactWhatsapp || '');
      data.append('website', formData.website || '');
      data.append('facebook', formData.facebook || '');
      data.append('instagram', formData.instagram || '');
      data.append('twitter', formData.twitter || '');
      data.append('linkedin', formData.linkedin || '');
      data.append('pan_number', formData.panNumber || '');
      data.append('gst_number', formData.gstNumber || '');
      data.append('working_days', formData.mondayHours || '');
      data.append('sunday_hours', formData.sundayHours || '');
      data.append('services_offered', formData.servicesOffered || '');
      data.append('seo_slug', formData.seoSlug || '');
      data.append('seo_title', formData.seoTitle || '');
      data.append('seo_description', formData.seoDescription || '');
      data.append('seo_keywords', formData.seoKeywords || '');

      if (formData.docReg) data.append('business_reg_doc', formData.docReg);
      if (formData.docPan) data.append('pan_doc', formData.docPan);
      if (formData.docGst) data.append('gstin_doc', formData.docGst);
      if (formData.logoFile) data.append('logo_file', formData.logoFile);
      if (formData.coverFile) data.append('cover_file', formData.coverFile);

      const res = await fetch(`${API_BASE}/auth/register-enterprise`, {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (!res.ok) {
        let errMsg = 'Registration failed';
        if (result.detail) {
          if (Array.isArray(result.detail)) {
            errMsg = result.detail.map((d: any) => `${d.loc ? d.loc[d.loc.length - 1] + ': ' : ''}${d.msg}`).join(', ');
          } else {
            errMsg = typeof result.detail === 'string' ? result.detail : JSON.stringify(result.detail);
          }
        }
        throw new Error(errMsg);
      }

      localStorage.removeItem('enterpriseRegisterDraft');
      localStorage.removeItem('enterpriseRegisterStep');
      setShowSuccessModal(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const stepProps = {
    formData,
    handleInputChange,
    toggleArrayItem,
    sendOtp,
    verifyOtp,
    categories,
    subCategories,
    isCatOpen,
    setIsCatOpen,
    isSubCatOpen,
    setIsSubCatOpen,
    handlePrev,
    loading
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RegisterHeader currentStep={currentStep} steps={steps} />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <ProgressTracker steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />

        {/* Card Body */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-bold rounded-xl flex items-center gap-2 mb-6 p-4">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form autoComplete="off" onSubmit={currentStep === 10 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            <OnboardingSteps currentStep={currentStep} props={stepProps} />
          </form>
        </div>
      </div>

      <SuccessModal showSuccessModal={showSuccessModal} />
    </div>
  );
}
