export const defaultFormData = {
  fullName: '',
  email: '',
  phone: '',
  whatsapp: '',
  password: '',
  confirmPassword: '',
  referralCode: '',
  emailOtp: '',
  mobileOtp: '',
  isEmailVerified: false,
  isMobileVerified: false,
  otpMsg: '',

  businessName: '',
  displayName: '',
  businessType: '',
  category: '',
  subCategory: '',
  description: '',
  tags: '',
  foundedYear: '',
  employeeCount: '',
  businessSize: '',
  annualTurnover: '',
  isGstRegistered: false,
  hasPan: false,
  regNumber: '',
  licenseNumber: '',
  panNumber: '',
  gstNumber: '',

  country: '',
  state: '',
  district: '',
  city: '',
  area: '',
  locality: '',
  address: '',
  landmark: '',
  street: '',
  building: '',
  doorNumber: '',
  postalCode: '',
  latitude: '',
  longitude: '',
  serviceRadius: '',
  locationType: '',
  mapLink: '',

  primaryMobile: '',
  secondaryMobile: '',
  landline: '',
  contactWhatsapp: '',
  contactEmail: '',
  website: '',
  facebook: '',
  instagram: '',
  linkedin: '',
  twitter: '',
  youtube: '',
  telegram: '',

  mondayHours: '',
  tuesdayHours: '',
  wednesdayHours: '',
  thursdayHours: '',
  fridayHours: '',
  saturdayHours: '',
  sundayHours: '',
  is24x7: false,
  hasEmergency: false,
  requiresAppointment: false,

  servicesOffered: '',
  productsList: '',
  brandsHandled: '',
  priceRange: '',
  languagesSpoken: '',
  paymentMethods: [] as string[],
  hasHomeDelivery: false,
  hasPickup: false,
  hasOnlineConsultation: false,
  hasWarranty: false,

  logoFile: null as File | null,
  coverFile: null as File | null,
  galleryFiles: [] as File[],
  brochureFile: null as File | null,

  docReg: null as File | null,
  docPan: null as File | null,
  docGst: null as File | null,
  docFssai: null as File | null,
  docAadhaar: null as File | null,

  accountHolder: '',
  bankName: '',
  branchName: '',
  ifscCode: '',
  accountNumber: '',
  upiId: '',
  qrFile: null as File | null,

  featuresList: [] as string[],

  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  seoSlug: '',
  schemaType: '',
};

export const steps = [
  'Account & OTP', 'Business Info', 'Location', 'Contact Details', 
  'Working Hours', 'Services Offered', 'Media & Logos', 'Documents', 
  'SEO Setup', 'Review & Submit'
];

export const processInputField = (field: string, value: any) => {
  if (['logoFile', 'coverFile', 'docReg', 'docPan', 'docGst'].includes(field) && value instanceof File) {
    if (value.size > 1 * 1024 * 1024) {
      alert("The selected file is too large. Please upload a file smaller than 1MB to prevent server errors.");
      return null;
    }
  }
  
  let processedValue = value;
  
  if (['fullName', 'businessName', 'contactName', 'city', 'area'].includes(field)) {
    processedValue = typeof value === 'string' ? value.replace(/[^a-zA-Z\s]/g, '') : value;
  }
  
  if (['phone', 'whatsapp', 'contactPhone', 'contactWhatsapp'].includes(field)) {
    processedValue = typeof value === 'string' ? value.replace(/\D/g, '').slice(0, 10) : value;
  }

  if (field === 'landline') {
    processedValue = typeof value === 'string' ? value.replace(/\D/g, '').slice(0, 11) : value;
  }

  if (field === 'postalCode') {
    processedValue = typeof value === 'string' ? value.replace(/\D/g, '').slice(0, 6) : value;
  }

  if (field === 'panNumber') {
    processedValue = typeof value === 'string' ? value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 10) : value;
  }
  
  if (field === 'gstNumber') {
    processedValue = typeof value === 'string' ? value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 15) : value;
  }

  if (['mondayHours', 'sundayHours'].includes(field)) {
    processedValue = typeof value === 'string' ? value.replace(/[^a-zA-Z0-9\s:-]/g, '') : value;
  }

  return processedValue;
};
