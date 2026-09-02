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

const DEFAULT_ROBOTS_TXT = `User-agent: *
Allow: /
Allow: /search
Allow: /business/*
Disallow: /admin
Disallow: /super-admin
Disallow: /dashboard
Disallow: /api/
Sitemap: ${typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || '')}/sitemap.xml`;
export default function RobotsView() {
  const [robotsText, setRobotsText] = useState(DEFAULT_ROBOTS_TXT);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const reloadRobots = () => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || '');
    authFetch('/api/admin/seo/robots')
      .then(async res => {
        if (!res.ok) throw new Error('Failed to fetch robots config');
        return res.json();
      })
      .then(data => {
        if (data && data.disallow_paths && data.disallow_paths.length > 0) {
          const disallowLines = data.disallow_paths
            .map((p: string) => `Disallow: ${p.startsWith('/') ? p : '/' + p}`)
            .join('\n');
          setRobotsText(`User-agent: *\nAllow: /\nAllow: /search\nAllow: /business/*\n${disallowLines}\n\nSitemap: ${siteUrl}/sitemap.xml`);
        } else {
          setRobotsText(DEFAULT_ROBOTS_TXT);
        }
      })
      .catch(() => {
        setRobotsText(DEFAULT_ROBOTS_TXT);
      });
  };

  useEffect(() => {
    reloadRobots();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(robotsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setRobotsText(DEFAULT_ROBOTS_TXT);
    setSaveStatus("Reset to recommended default directives.");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleApply = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const lines = robotsText.split('\n');
      const disallow_paths = lines
        .filter(l => l.toLowerCase().startsWith('disallow:'))
        .map(l => l.split(':')[1].trim())
        .filter(p => p.length > 0);

      const res = await authFetch(`/api/admin/seo/robots`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disallow_paths })
      });
      if (res.ok) setSaveStatus("Success! Robots.txt rules updated.");
      else setSaveStatus("Failed to save.");
    } catch (err) {
      console.error(err);
      setSaveStatus("Error saving.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 5000);
    }
  };

  return (
    <div className="space-y-6">
      {saveStatus && (
        <div className={`p-4 rounded-xl text-sm font-bold flex items-center justify-between shadow-sm ${
          saveStatus.includes('Error') || saveStatus.includes('Failed') ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        }`}>
          <div className="flex items-center gap-2">
            {saveStatus.includes('Error') || saveStatus.includes('Failed') ? <Activity size={18}/> : <CheckCircle2 size={18}/>}
            {saveStatus}
          </div>
        </div>
      )}

      {/* Code Editor Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Editor Top Bar */}
        <div className="bg-slate-900 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <div className="h-4 w-px bg-slate-700 mx-1"></div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
              <FileText size={14} className="text-blue-400" />
              <span>robots.txt</span>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-[10px]">LIVE DIRECTIVES</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition flex items-center gap-1.5 border border-slate-700"
              title="Copy to Clipboard"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition flex items-center gap-1.5 border border-slate-700"
              title="Reset to recommended default directives"
            >
              <RotateCcw size={13} />
              Reset Defaults
            </button>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-bold rounded-lg transition flex items-center gap-1.5 border border-blue-500/30"
              title="Open public robots.txt in new tab"
            >
              <ExternalLink size={13} />
              View Live
            </a>
          </div>
        </div>

        {/* Textarea Code Body */}
        <div className="relative bg-slate-950 p-4 sm:p-6">
          <textarea 
            rows={12}
            value={robotsText}
            onChange={(e) => setRobotsText(e.target.value)}
            placeholder="User-agent: *&#10;Allow: /&#10;Disallow: /admin&#10;Disallow: /api/&#10;&#10;Sitemap: https://yourdomain.com/sitemap.xml"
            className="w-full bg-transparent text-emerald-400 font-mono text-sm leading-relaxed outline-none focus:ring-0 resize-y placeholder-slate-600 custom-scrollbar selection:bg-blue-600 selection:text-white"
            spellCheck={false}
          />
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 font-medium">
            Lines starting with <code className="px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded font-mono text-[11px] font-bold">Disallow:</code> are extracted and enforced in the database.
          </p>
          <button 
            onClick={handleApply}
            disabled={isSaving}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow ${
              isSaving ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
            }`}
          >
            {isSaving ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><RefreshCw size={14} /></motion.div> : <Check size={14} />}
            {isSaving ? 'Saving Directives...' : 'Save Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
}
