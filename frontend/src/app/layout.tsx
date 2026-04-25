import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sivakami Josiyam - Tamil Birth Chart & Marriage Muhurtham",
  description: "Authentic Tamil Astrology for the modern age. Generate Birth Charts and find Auspicious Marriage Dates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-purple-700 text-3xl">✨</span>
              <span className="tracking-tight">Sivakami <span className="text-purple-700 font-extrabold">Josiyam</span></span>
            </Link>
            
            <div className="hidden md:flex items-center gap-10">
              <Link href="/birth-chart" className="text-sm font-bold text-slate-600 hover:text-purple-700 transition-colors uppercase tracking-widest">Birth Chart</Link>
              <Link href="/marriage-dates" className="text-sm font-bold text-slate-600 hover:text-purple-700 transition-colors uppercase tracking-widest">Marriage Dates</Link>
              <Link href="#" className="text-sm font-bold text-slate-600 hover:text-purple-700 transition-colors uppercase tracking-widest">Pricing</Link>
              <button className="bg-slate-900 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-200 transition-all">
                Login
              </button>
            </div>

            {/* Mobile Menu Icon */}
            <button className="md:hidden p-2 text-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>
        
        <div className="pt-20 min-h-screen">
          {children}
        </div>

        <footer className="bg-slate-900 text-white py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-16">
              <div className="col-span-2">
                <Link href="/" className="text-4xl font-bold mb-8 block">
                  Sivakami <span className="text-purple-400">Josiyam</span>
                </Link>
                <p className="text-slate-400 max-w-sm leading-relaxed text-lg">
                  Empowering families with authentic Vedic wisdom and high-precision astronomical data. Your journey to perfect timing starts here.
                </p>
                <div className="flex gap-6 mt-8">
                  {/* Social Icons Placeholder */}
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-500 transition-colors cursor-pointer">𝕏</div>
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-500 transition-colors cursor-pointer">f</div>
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-500 transition-colors cursor-pointer">in</div>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-8 text-xl text-purple-200">Services</h4>
                <ul className="space-y-5 text-slate-400 text-lg">
                  <li><Link href="/birth-chart" className="hover:text-white transition-colors">Birth Chart Generator</Link></li>
                  <li><Link href="/marriage-dates" className="hover:text-white transition-colors">Marriage Muhurtham</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Compatibility Matching</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Tamil Panchangam</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-8 text-xl text-purple-200">Company</h4>
                <ul className="space-y-5 text-slate-400 text-lg">
                  <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Pricing Plans</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Contact Support</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Legal & Privacy</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-24 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 font-medium">
              <div>&copy; {new Date().getFullYear()} Sivakami Josiyam. All rights reserved.</div>
              <div className="flex gap-8">
                <Link href="#" className="hover:text-slate-300">Privacy Policy</Link>
                <Link href="#" className="hover:text-slate-300">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
