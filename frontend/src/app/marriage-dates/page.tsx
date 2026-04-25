"use client";

import { useState } from 'react';

export default function MarriageDatesPage() {
  const [formData, setFormData] = useState({
    year: 2026,
    month: 5,
    city: '',
    lat: 13.0827,
    lon: 80.2707,
    weekend_only: false
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/marriage-dates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching marriage dates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcfb] py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Marriage Muhurtham Finder</h2>
        <p className="text-center text-slate-600 mb-12">Find the most auspicious dates for your wedding in 2026.</p>
        
        <div className="grid md:grid-cols-1 gap-12 items-start">
          <div className="card-premium">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Preferred Month (2026)</label>
                  <select 
                    value={formData.month}
                    onChange={(e) => setFormData({...formData, month: parseInt(e.target.value)})}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-amber-100 focus:border-amber-500 transition-all outline-none bg-white"
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i+1} value={i+1}>
                        {new Date(2026, i).toLocaleString('default', { month: 'long' })}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">City</label>
                  <input 
                    type="text" 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-amber-100 focus:border-amber-500 transition-all outline-none"
                    placeholder="e.g. Chennai"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="weekend_only"
                  checked={formData.weekend_only}
                  onChange={(e) => setFormData({...formData, weekend_only: e.target.checked})}
                  className="w-6 h-6 text-amber-600 rounded-lg border-slate-200 focus:ring-amber-500 transition-all cursor-pointer"
                />
                <label htmlFor="weekend_only" className="text-slate-700 font-semibold cursor-pointer select-none">
                  Only show weekends (Saturday & Sunday)
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-secondary py-5 text-xl disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? 'Searching Auspicious Dates...' : 'Find Best Dates'}
                {!loading && <span>📅</span>}
              </button>
            </form>
          </div>

          {result && result.dates && (
            <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex justify-between items-center px-4">
                <h3 className="text-3xl font-bold text-slate-900">Recommended Dates</h3>
                <span className="text-slate-400 font-medium">{result.dates.length} dates found</span>
              </div>
              
              <div className="grid gap-6">
                {result.dates.map((date: any, index: number) => (
                  <div key={index} className="card-premium border-l-8 border-amber-400 py-8 hover:translate-x-2 transition-transform">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                      <div className="flex items-center gap-8">
                        <div className="bg-amber-100 text-amber-700 w-20 h-20 rounded-3xl flex flex-col items-center justify-center font-bold shadow-sm">
                          <span className="text-xs uppercase tracking-widest mb-1">{date.day.slice(0,3)}</span>
                          <span className="text-3xl">{date.date.split('-')[2]}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-2xl font-bold text-slate-900">{date.star}</h4>
                            <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-md font-bold uppercase tracking-tighter">Nakshatra</span>
                          </div>
                          <p className="text-slate-500 font-medium">{new Date(date.date).toLocaleDateString('default', { month: 'long', year: 'numeric', day: 'numeric' })}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 w-full md:w-auto">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Auspicious Timings</span>
                        <div className="flex flex-wrap gap-3">
                          {date.auspicious_slots.map((slot: any, i: number) => (
                            <span key={i} className="px-5 py-3 bg-green-50 text-green-700 rounded-2xl text-base font-bold border border-green-100 flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              {slot.start} - {slot.end}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-slate-50 flex flex-wrap gap-8">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full" />
                        <span className="text-sm font-bold text-slate-400">Rahu Kalam:</span>
                        <span className="text-sm font-bold text-slate-600">{date.avoid.rahu}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full" />
                        <span className="text-sm font-bold text-slate-400">Yamagandam:</span>
                        <span className="text-sm font-bold text-slate-600">{date.avoid.yamagandam}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-amber-900 mb-2">Want a detailed 12-month report?</h4>
                  <p className="text-amber-700">Get a comprehensive PDF with all auspicious dates for the entire year.</p>
                </div>
                <button className="btn-secondary whitespace-nowrap shadow-amber-200 shadow-xl">
                  Get Full Report for ₹199
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
