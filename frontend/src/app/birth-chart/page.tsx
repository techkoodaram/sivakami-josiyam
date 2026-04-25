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
                <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900">{formData.name}'s Jathagam</h3>
                    <p className="text-slate-500">{formData.dob} at {formData.tob}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-4 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-bold border border-purple-100">
                      ஜாதகம் (Horoscope)
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-8 rounded-3xl text-center text-white shadow-xl shadow-purple-100">
                    <span className="block text-purple-100 text-xs font-bold uppercase tracking-[0.2em] mb-2">ராசி (Rasi)</span>
                    <span className="text-3xl font-extrabold">{result.moon_sign_tamil}</span>
                    <span className="block text-sm opacity-80 mt-1">{result.moon_sign}</span>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 rounded-3xl text-center text-white shadow-xl shadow-amber-100">
                    <span className="block text-amber-100 text-xs font-bold uppercase tracking-[0.2em] mb-2">நட்சத்திரம் (Star)</span>
                    <span className="text-3xl font-extrabold">{result.star_tamil}</span>
                    <span className="block text-sm opacity-80 mt-1">{result.star}</span>
                  </div>
                  <div className="bg-gradient-to-br from-slate-700 to-slate-900 p-8 rounded-3xl text-center text-white shadow-xl shadow-slate-200">
                    <span className="block text-slate-300 text-xs font-bold uppercase tracking-[0.2em] mb-2">லக்னம் (Lagna)</span>
                    <span className="text-3xl font-extrabold">{result.lagna_tamil}</span>
                    <span className="block text-sm opacity-80 mt-1">{result.lagna}</span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                  {/* Rasi Chart - South Indian Style */}
                  <div className="flex-1 w-full max-w-md mx-auto">
                    <div className="grid grid-cols-4 aspect-square border-2 border-slate-900 bg-white">
                      {[
                        [11, 0, 1, 2],
                        [10, null, null, 3],
                        [9, null, null, 4],
                        [8, 7, 6, 5]
                      ].flat().map((signIdx, i) => {
                        if (signIdx === null) {
                          if (i === 5) return <div key={i} className="col-span-2 row-span-2 bg-slate-50 flex items-center justify-center border-l border-t border-slate-900"><div className="text-center"><div className="text-2xl font-bold text-slate-300">ராசி</div><div className="text-xs text-slate-300 uppercase tracking-widest">Rasi Chart</div></div></div>;
                          return null;
                        }
                        
                        const planetsInSign = Object.entries(result.planets)
                          .filter(([_, p]: any) => p.rasi_id === signIdx)
                          .map(([name]) => name);

                        const isLagna = result.planets.Lagna.rasi_id === signIdx;

                        return (
                          <div key={i} className="border border-slate-900 p-2 flex flex-col items-center justify-center min-h-[80px] relative">
                            <span className="absolute top-1 left-1 text-[10px] text-slate-400 font-bold">{signIdx}</span>
                            <div className="flex flex-wrap justify-center gap-1">
                              {planetsInSign.map(p => (
                                <span key={p} className={`px-1 rounded text-[10px] font-bold ${p === 'Lagna' ? 'bg-slate-900 text-white' : 'bg-purple-100 text-purple-700'}`}>
                                  {p === 'Lagna' ? 'L' : p.substring(0, 2)}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary Details */}
                  <div className="flex-1 w-full">
                    <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm">✓</span>
                      Key Planetary Positions
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(result.planets)
                        .filter(([name]) => name !== 'Lagna')
                        .map(([name, data]: any) => (
                          <div key={name} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-purple-100">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-400 text-xs">
                                {name.substring(0, 2)}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">{name}</div>
                                <div className="text-xs text-slate-500">{data.rasi_tamil} • {data.nakshatra_tamil}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-purple-700">{data.pada} Pada</div>
                              <div className="text-xs text-slate-400">{data.longitude.toFixed(2)}°</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col md:flex-row gap-4">
                  <button className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download Full Report
                  </button>
                  <button className="flex-1 bg-green-500 text-white py-5 rounded-2xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-100">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.653a11.883 11.883 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                    WhatsApp Report
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
