import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Plus, Edit3, Trash2, Download, RefreshCw, Search,
  ChevronRight, Check, X, Globe, Building2, LayoutGrid, Map, Menu
} from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';

// Re-declare interfaces used in these components (or import from a types file if it existed)
interface District { id: number; name: string; slug: string; is_active: boolean; state_name: string; }
interface City { id: number; name: string; slug: string; district_id: number; type: string; is_active: boolean; }
interface Area { id: number; name: string; slug: string; city_id: number; is_active: boolean; }
interface Stats { countries: number; states: number; districts: number; cities: number; areas: number; localities: number; seo_pages: number; slugs: number; }

// Dummy Modal for the extracted components
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"><X size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}


const BASE = '';

export default function CitiesTab({ onToast }: { onToast: (msg: string) => void }) {
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<City | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', district_id: '', type: 'Major City' });

  const load = useCallback(async () => {
    setLoading(true);
    const [cr, dr] = await Promise.all([
      authFetch(`${BASE}/api/admin/locations/cities`),
      authFetch(`${BASE}/api/admin/locations/districts`)
    ]);
    if (cr.ok) setCities(await cr.json());
    if (dr.ok) setDistricts(await dr.json());
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const filtered = cities.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${BASE}/api/admin/locations/cities/${editing.id}` : `${BASE}/api/admin/locations/cities`;
    const r = await authFetch(url, {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, district_id: Number(form.district_id) })
    });
    if (r.ok) { onToast(editing ? 'City updated!' : 'City added!'); setModal(null); load(); }
  };

  const handleExport = () => { window.open(`${BASE}/api/admin/locations/export/cities`, '_blank'); };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search cities..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400" />
        </div>
        <button onClick={() => { setEditing(null); setForm({ name: '', slug: '', district_id: '', type: 'Major City' }); setModal('add'); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700">
          <Plus size={16} /> Add City
        </button>
        <button onClick={handleExport}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">City</th>
              <th className="text-left px-5 py-3">Type</th>
              <th className="text-left px-5 py-3">Slug</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8 text-slate-400">Loading...</td></tr>
            ) : filtered.slice(0, 50).map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 font-medium text-slate-900">{c.name}</td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{c.type}</span>
                </td>
                <td className="px-5 py-3 text-slate-500 font-mono text-xs">{c.slug}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${c.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {c.is_active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <button onClick={() => { setEditing(c); setForm({ name: c.name, slug: c.slug, district_id: String(c.district_id), type: c.type }); setModal('edit'); }}
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-colors"><Edit3 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 50 && <p className="text-center text-xs text-slate-400 py-3">Showing first 50 of {filtered.length} cities</p>}
      </div>

      <AnimatePresence>
        {modal && (
          <Modal title={editing ? 'Edit City' : 'Add City'} onClose={() => setModal(null)}>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">City Name</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">District</label>
                <select required value={form.district_id} onChange={e => setForm(f => ({ ...f, district_id: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400">
                  <option value="">Select District</option>
                  {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400">
                  {['Major City', 'Municipality', 'Town Panchayat', 'Popular Area', 'Locality', 'Neighbourhood'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50">Cancel</button>
                <button type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700">Save</button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
