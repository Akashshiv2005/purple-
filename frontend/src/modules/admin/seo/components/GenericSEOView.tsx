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

export default function GenericSEOView({ moduleName }: { moduleName: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="font-bold text-slate-900 capitalize">{moduleName.replace('-', ' ')} Settings</h3>
      <p className="text-xs text-slate-500">Automated SEO pattern rule for {moduleName}.</p>
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Rule Expression</label>
        <input 
          type="text" 
          defaultValue={`auto_pattern_{${moduleName}}`}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
        />
      </div>
    </div>
  );
}
