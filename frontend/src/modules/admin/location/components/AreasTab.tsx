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

export default function AreasTab({ onToast }: { onToast: (msg: string) => void }) {
  const [areas, setAreas] = useState<Area[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Area | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', city_id: '' });

  const load = useCallback(async () => {
    setLoading(true);
    const [ar, cr] = await Promise.all([
      authFetch(`${BASE}/api/admin/locations/areas`),
      authFetch(`${BASE}/api/admin/locations/cities`),
    ]);
    if (ar.ok) setAreas(await ar.json());
    if (cr.ok) setCities(await cr.json());
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const filtered = areas.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${BASE}/api/admin/locations/areas/${editing.id}` : `${BASE}/api/admin/locations/areas`;
    const r = await authFetch(url, {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, city_id: Number(form.city_id) })
    });
    if (r.ok) { onToast(editing ? 'Area updated!' : 'Area added!'); setModal(null); load(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search areas..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400" />
        </div>
        <button onClick={() => { setEditing(null); setForm({ name: '', slug: '', city_id: '' }); setModal('add'); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700">
          <Plus size={16} /> Add Area
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Area</th>
              <th className="text-left px-5 py-3">Slug</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={4} className="text-center py-8 text-slate-400">Loading...</td></tr>
            ) : filtered.slice(0, 50).map(a => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 font-medium text-slate-900">{a.name}</td>
                <td className="px-5 py-3 text-slate-500 font-mono text-xs">{a.slug}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${a.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {a.is_active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <button onClick={() => { setEditing(a); setForm({ name: a.name, slug: a.slug, city_id: String(a.city_id) }); setModal('edit'); }}
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-colors"><Edit3 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 50 && <p className="text-center text-xs text-slate-400 py-3">Showing first 50 of {filtered.length} areas</p>}
      </div>

      <AnimatePresence>
        {modal && (
          <Modal title={editing ? 'Edit Area' : 'Add Area'} onClose={() => setModal(null)}>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Area Name</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Parent City</label>
                <select required value={form.city_id} onChange={e => setForm(f => ({ ...f, city_id: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400">
                  <option value="">Select City</option>
                  {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
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
