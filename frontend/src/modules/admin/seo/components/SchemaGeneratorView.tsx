import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, MapPin, Tag, FileCode2, Code, ShieldCheck, 
  RefreshCw, CheckCircle2, Sliders, Globe, Layers, ArrowRight,
  Plus, Edit3, Trash2, Search, Activity, BarChart3, FileText, Check, User, Rocket,
  Copy, RotateCcw, ExternalLink, Menu
} from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';
import { getBackendBaseUrl } from '@/shared/services/api';

export default function SchemaGeneratorView() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="font-bold text-slate-900">JSON-LD Structured Data Schema Config</h3>
      <div className="p-4 bg-slate-900 text-green-400 font-mono text-xs rounded-xl overflow-x-auto">
        <pre>{`{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{BusinessName}",
  "image": "{LogoUrl}",
  "telephone": "{Phone}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{Address}",
    "addressLocality": "{City}",
    "addressCountry": "IN"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{AverageRating}",
    "reviewCount": "{TotalReviews}"
  }
}`}</pre>
      </div>
    </div>
  );
}
