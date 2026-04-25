import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdfcfb] to-[#fff7ed]">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-purple-100 rounded-full opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-100 rounded-full opacity-20" />
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <div className="mb-6 inline-block px-4 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100">
            ✨ Trusted by 10,000+ Families
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-8 tracking-tight">
            Sivakami <span className="text-purple-700">Josiyam</span>
          </h1>
          <p className="text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Authentic Tamil Astrology for the modern age. Precision-calculated Birth Charts and Auspicious Marriage Muhurthams at your fingertips.
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <Link href="/birth-chart" className="btn-primary text-lg flex items-center gap-3 group px-8">
              <span>Birth Chart Generator</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/marriage-dates" className="btn-secondary text-lg flex items-center gap-3 group px-8">
              <span>Marriage Date Finder</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
          
          <div className="mt-16 flex justify-center gap-8 text-slate-400 font-medium uppercase tracking-widest text-xs">
            <span>Accurate</span>
            <span>•</span>
            <span>Auspicious</span>
            <span>•</span>
            <span>Authentic</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="card-premium group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">🗺️</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Tamil Jathagam</h3>
              <p className="text-slate-600 leading-relaxed">
                Comprehensive Rasi and Navamsa charts with detailed planetary positions and Nakshatra details.
              </p>
            </div>
            <div className="card-premium group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">📅</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Muhurtham Finder</h3>
              <p className="text-slate-600 leading-relaxed">
                Find the best dates for marriage while automatically avoiding Rahu Kalam, Yamagandam, and Gulikai.
              </p>
            </div>
            <div className="card-premium group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">📄</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">PDF Reports</h3>
              <p className="text-slate-600 leading-relaxed">
                Download beautifully designed astrology reports to share with your family or wedding planners.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
