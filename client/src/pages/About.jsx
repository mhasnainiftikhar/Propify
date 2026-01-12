import React from "react";
import {
  Target,
  Eye,
  Users,
  Award,
  CheckCircle2,
  Building2,
  Heart,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="min-h-screen bg-[#f8faff] pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Redefining the Future of <br />
            <span className="text-blue-400">Real Estate</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            At Propify, we believe finding a home should be an inspiring journey, not a stressful process. We combine cutting-edge technology with human expertise to create a seamless experience for every dreamer.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-center">
            <div className="bg-white/10 backdrop-blur px-8 py-4 rounded-2xl border border-white/10">
              <p className="text-3xl font-black text-white">10k+</p>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Properties Sold</p>
            </div>
            <div className="bg-white/10 backdrop-blur px-8 py-4 rounded-2xl border border-white/10">
              <p className="text-3xl font-black text-white">$2B+</p>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Transaction Value</p>
            </div>
            <div className="bg-white/10 backdrop-blur px-8 py-4 rounded-2xl border border-white/10">
              <p className="text-3xl font-black text-white">25+</p>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Global Cities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-black text-sm uppercase tracking-[0.2em] mb-4 block">Our Story</span>
            <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
              From a Vision to the <br />
              Leading Tech Real Estate Platform.
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Founded in 2020, Propify started with a simple observation: the real estate market was fragmented, outdated, and often confusing for the average person. We saw an opportunity to bring transparency, speed, and elegance to the industry.
              </p>
              <p>
                Over the past few years, we've evolved from a small team of innovators to a global platform that empowers thousands of sellers and helps millions of families find their perfect sanctuaries.
              </p>
            </div>
            <div className="mt-10 flex gap-4">
              <CheckCircle2 className="text-blue-600 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-gray-900">Premium Curation</h4>
                <p className="text-gray-500">Every listing on Propify is verified for quality and transparency.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop"
                alt="Modern Office"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-blue-600 p-8 rounded-[2rem] shadow-xl text-white hidden md:block">
              <Award size={40} className="mb-4" />
              <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Award Winning</p>
              <p className="text-2xl font-black">Best PropTech 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To simplify the complex world of real estate by providing an intuitive, transparent, and technology-driven platform that puts control back into the hands of buyers and sellers.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the world's most trusted real estate ecosystem, where every transaction is seamless, every agent is empowered, and every home search is an extraordinary experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-indigo-600 font-black text-sm uppercase tracking-[0.2em] mb-4 block">Our Values</span>
        <h2 className="text-4xl font-black text-gray-900 mb-16">What Drive Us Forward</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-gray-50 rounded-full mb-6 text-blue-600">
              <Users size={40} />
            </div>
            <h4 className="text-xl font-bold mb-2">Customer First</h4>
            <p className="text-gray-500 italic">"We exist to serve the dreams of our clients."</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-gray-50 rounded-full mb-6 text-indigo-600">
              <Heart size={40} />
            </div>
            <h4 className="text-xl font-bold mb-2">Absolute Integrity</h4>
            <p className="text-gray-500 italic">"Honesty is our only policy."</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-gray-50 rounded-full mb-6 text-blue-500">
              <Building2 size={40} />
            </div>
            <h4 className="text-xl font-bold mb-2">Innovation Daily</h4>
            <p className="text-gray-500 italic">"Challenging the status quo since day one."</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-8">Ready to find your next chapter?</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/search"
              className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              Browse Listings
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/sign-up"
              className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all"
            >
              Join as a Seller
            </Link>
          </div>
        </div>
        {/* Decoration */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400 opacity-20 rounded-full filter blur-3xl"></div>
      </section>
    </main>
  );
};

export default About;
