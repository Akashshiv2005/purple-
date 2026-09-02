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

export default function RedirectsView() {
  const [redirects, setRedirects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ────────────────────────────────────────────────────────────────────────
  const [isAdding, setIsAdding] = useState(false);
  const [sourcePath, setSourcePath] = useState('');
  const [targetPath, setTargetPath] = useState('');
  const [redirectType, setRedirectType] = useState(301);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchRedirects = () => {
    setIsLoading(true);
    authFetch('/api/admin/seo/redirects')
      .then(res => res.json())
      .then(data => {
        setRedirects(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRedirects();
  }, []);

  const handleSaveRedirect = async () => {
    if (!sourcePath.startsWith('/') || !targetPath.startsWith('/')) {
      setErrorMsg("Both Source Path and Target Path must start with a slash '/' (e.g. /old-path)");
      return;
    }
    setErrorMsg('');
    try {
      const res = await authFetch('/api/admin/seo/redirects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_path: sourcePath.trim(),
          target_path: targetPath.trim(),
          redirect_type: redirectType
        })
      });
      if (res.ok) {
        setSourcePath('');
        setTargetPath('');
        setRedirectType(301);
        setIsAdding(false);
        fetchRedirects();
      } else {
        const errData = await res.json().catch(() => ({}));
        setErrorMsg(errData.detail || "Failed to create redirect. It may already exist.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error trying to save redirect.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this redirect?")) return;
    try {
      const res = await authFetch(`/api/admin/seo/redirects/${id}`, { method: 'DELETE' });
      if (res.ok) fetchRedirects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900">301 / 302 Active Redirect Rules</h3>
          <p className="text-xs text-slate-500">Configure page forwarding to preserve SEO link equity.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
        >
          <Plus size={14} /> Add Rule
        </button>
      </div>

      {isAdding && (
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Create New Redirect Rule</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Source Path (e.g. /old-path)</label>
              <input 
                type="text" 
                placeholder="/old-mobile-shop"
                value={sourcePath} 
                onChange={(e) => setSourcePath(e.target.value)} 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Target Path (e.g. /new-path)</label>
              <input 
                type="text" 
                placeholder="/mobile-shops/trichy"
                value={targetPath} 
                onChange={(e) => setTargetPath(e.target.value)} 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Redirect Code</label>
              <select 
                value={redirectType} 
                onChange={(e) => setRedirectType(Number(e.target.value))} 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value={301}>301 Permanent Redirect</option>
                <option value={302}>302 Temporary Redirect</option>
              </select>
            </div>
          </div>
          {errorMsg && <p className="text-xs text-red-600 font-bold">{errorMsg}</p>}
          <div className="flex gap-2">
            <button 
              onClick={handleSaveRedirect} 
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition"
            >
              Save Rule
            </button>
            <button 
              onClick={() => { setIsAdding(false); setErrorMsg(''); }} 
              className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-500 uppercase">
              <th className="p-3">Source URL</th>
              <th className="p-3">Target URL</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr><td colSpan={5} className="p-4 text-center text-slate-500">Loading redirects...</td></tr>
            ) : redirects.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-center text-slate-500">No redirects configured yet.</td></tr>
            ) : (
              redirects.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-mono">{r.source_path}</td>
                  <td className="p-3 font-mono text-blue-600">{r.target_path}</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">{r.redirect_type}</span></td>
                  <td className="p-3 text-green-600 font-bold">{r.is_active ? 'Active' : 'Inactive'}</td>
                  <td className="p-3 text-right flex justify-end gap-3 items-center">
                    <a 
                      href={`${getBackendBaseUrl()}${r.source_path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-bold transition flex items-center gap-1"
                    >
                      <Rocket size={10} /> Test Redirect
                    </a>
                    <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:text-red-700 transition">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
