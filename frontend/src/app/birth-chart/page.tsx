"use client";

import { useState } from 'react';

export default function BirthChartPage() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    tob: '',
    place: '',
    lat: 13.0827,
    lon: 80.2707
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/birth-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching birth chart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcfb] py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Birth Chart Generator</h2>
        <p className="text-center text-slate-600 mb-12">Enter your birth details to generate your detailed horoscope.</p>
        
        <div className="grid md:grid-cols-1 gap-12 items-start">
          <div className="card-premium">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all outline-none"
                    placeholder="e.g. Sivakami"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Birth Place</label>
                  <input 
                    type="text" 
                    value={formData.place}
                    onChange={(e) => setFormData({...formData, place: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all outline-none"
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Date of Birth</label>
                  <input 
                    type="date" 
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Time of Birth</label>
                  <input 
                    type="time" 
                    value={formData.tob}
                    onChange={(e) => setFormData({...formData, tob: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary py-5 text-xl disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? 'Calculating...' : 'Generate Jathagam'}
                {!loading && <span>✨</span>}
              </button>
            </form>
          </div>

          {result && (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="card-premium border-2 border-purple-100">
                <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900">{formData.name}'s Jathagam</h3>
                    <p className="text-slate-500">{formData.dob} at {formData.tob}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-4 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-bold border border-amber-100">
                      MVP Report
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-purple-50 p-6 rounded-2xl text-center">
                    <span className="block text-purple-600 text-sm font-bold uppercase tracking-wider mb-2">Moon Sign</span>
                    <span className="text-2xl font-bold text-slate-900">{result.moon_sign}</span>
                  </div>
                  <div className="bg-amber-50 p-6 rounded-2xl text-center">
                    <span className="block text-amber-600 text-sm font-bold uppercase tracking-wider mb-2">Nakshatra</span>
                    <span className="text-2xl font-bold text-slate-900">{result.star}</span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl text-center">
                    <span className="block text-slate-600 text-sm font-bold uppercase tracking-wider mb-2">Lagna</span>
                    <span className="text-2xl font-bold text-slate-900">{result.lagna}</span>
                  </div>
                </div>

                <div className="mt-12 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="py-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Planet</th>
                        <th className="py-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Rasi</th>
                        <th className="py-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Star</th>
                        <th className="py-4 text-sm font-bold text-slate-400 uppercase tracking-wider text-right">Degree</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {Object.entries(result.planets).map(([name, data]: [string, any]) => (
                        <tr key={name} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 font-bold text-slate-900">{name}</td>
                          <td className="py-4 text-slate-600">{data.rasi}</td>
                          <td className="py-4 text-slate-600">{data.nakshatra}</td>
                          <td className="py-4 text-slate-600 text-right font-mono">{data.longitude.toFixed(2)}°</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-12 flex flex-col md:flex-row gap-4">
                  <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download PDF Report
                  </button>
                  <button className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.653a11.883 11.883 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                    Share via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
