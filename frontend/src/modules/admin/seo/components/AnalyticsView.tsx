import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Building2, MapPin, Tag, FileCode2, Code, ShieldCheck, 
  RefreshCw, CheckCircle2, Sliders, Globe, Layers, ArrowRight,
  Plus, Edit3, Trash2, Search, Activity, BarChart3, FileText, Check, User, Rocket,
  Copy, RotateCcw, ExternalLink, Menu
} from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';
import { getBackendBaseUrl } from '@/shared/services/api';

export default function AnalyticsView() {
  const [stats, setStats] = useState<any>({
    impressions: 0,
    clicks: 0,
    ctr: 0,
    avg_position: 0,
    keyword_count: 0,
    indexed_pages: 0,
    top_keywords: [],
    trend_data: [],
    city_breakdown: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch('/api/admin/seo/analytics')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching analytics:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 font-semibold flex items-center justify-center gap-3">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><RefreshCw className="text-blue-600" size={20} /></motion.div>
        Loading dynamic SEO analytics...
      </div>
    );
  }

  const maxImp = Math.max(...(stats.trend_data || []).map((d: any) => d.impressions), 100);

  return (
    <div className="space-y-6">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Organic Impressions</div>
          <div className="text-3xl font-black text-slate-900">{stats.impressions?.toLocaleString()}</div>
          <div className="text-xs text-[#431B94] font-bold mt-2 flex items-center gap-1">
            <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-2 h-2 rounded-full bg-emerald-500" /> Real-time Live
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Organic Clicks</div>
          <div className="text-3xl font-black text-blue-600">{stats.clicks?.toLocaleString()}</div>
          <div className="text-xs text-slate-600 font-bold mt-2">
            Average CTR: <span className="text-blue-600">{stats.ctr}%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Avg Google Position</div>
          <div className="text-3xl font-black text-amber-500">{stats.avg_position}</div>
          <div className="text-xs text-slate-500 font-medium mt-2">Top 5 average rank</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tracked Keywords</div>
          <div className="text-3xl font-black text-indigo-600">{stats.keyword_count || 0}</div>
          <div className="text-xs text-indigo-500 font-medium mt-2">{stats.indexed_pages?.toLocaleString()} Indexed URLs</div>
        </div>
      </div>

      {/* 7-Day Search Traffic Trend & City Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900 text-base">7-Day Search Impressions & Clicks</h3>
              <p className="text-xs text-slate-500 mt-0.5">Daily search engine discovery performance</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
              Last 7 Days
            </span>
          </div>

          <div className="h-48 flex items-end gap-3 pt-6 border-b border-slate-100 pb-4">
            {(stats.trend_data || []).map((day: any, i: number) => {
              const heightPercent = Math.max(15, Math.round((day.impressions / maxImp) * 100));
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.clicks} clk
                  </div>
                  <div className="w-full bg-slate-100 rounded-t-lg h-36 flex items-end justify-center overflow-hidden p-1">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-md transition-all duration-500 group-hover:from-blue-700 group-hover:to-indigo-600"
                      style={{ height: `${heightPercent}%` }}
                      title={`${day.name}: ${day.impressions} Impressions, ${day.clicks} Clicks`}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-600">{day.name}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-600" /> Impressions
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-300" /> Clicks
            </div>
          </div>
        </div>

        {/* City Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">City Traffic Share</h3>
            <p className="text-xs text-slate-500 mb-6">Organic search geographic spread</p>
            <div className="space-y-4">
              {(stats.city_breakdown || []).slice(0, 5).map((c: any, idx: number) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800 flex items-center gap-1.5">
                      <MapPin size={12} className="text-blue-600" /> {c.city}
                    </span>
                    <span className="text-slate-500">{c.traffic_share}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${c.traffic_share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 text-center font-medium">
            Computed from active registered locations
          </div>
        </div>
      </div>

      {/* Top Ranked Keywords Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Top Performing Organic Keywords</h3>
            <p className="text-xs text-slate-500 mt-0.5">High search volume keywords currently tracked in database</p>
          </div>
          <Link 
            href="/super-admin?tab=seo-keywords"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Manage All Keywords <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-extrabold border-b border-slate-100">
              <tr>
                <th className="py-4 px-6">Keyword</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Monthly Volume</th>
                <th className="py-4 px-6">Priority</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(!stats.top_keywords || stats.top_keywords.length === 0) ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 text-sm">
                    No keywords tracked yet. Go to Global Keywords to generate.
                  </td>
                </tr>
              ) : (
                stats.top_keywords.map((kw: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {kw.keyword}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin size={12} className="text-slate-400" /> {kw.city}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-800">
                      {kw.volume?.toLocaleString() || '1,200'} / mo
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-extrabold rounded-full ${
                        kw.priority === 'High' ? 'bg-rose-100 text-rose-700' :
                        kw.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {kw.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#431B94] bg-emerald-50 px-2.5 py-1 rounded-md">
                        <Check size={12} /> {kw.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
