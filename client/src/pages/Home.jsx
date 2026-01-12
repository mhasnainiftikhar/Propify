import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building2, MousePointer2, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import coverImage from '../assets/cover4.jpg';
import Cards from '../components/Cards';
import StatSection from '../components/StatSection';
import ProcessSection from '../components/ProcessSection';

const Home = () => {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const words = ["Dream Home", "Ideal Space", "Perfect Life", "Future Oasis"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <main className="bg-[#f8faff]">
      {/* Premium Hero Section */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center overflow-hidden pt-10"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.35)), url(${coverImage})`,
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-5 bg-gradient-to-t from-[#f8faff] to-transparent"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12">


          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 tracking-tight">
            Find Your <br />
            <span className={`inline-block text-white/90 transition-all duration-700 transform ${isVisible ? 'opacity-100 -translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              {words[currentWord]}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 font-medium mb-12 max-w-xl mx-auto leading-relaxed">
            Exclusive listings from verified professionals in a secure, curated environment.
          </p>

          {/* Minimal Search Bar */}
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl p-1.5 rounded-2xl border border-white/20 animate-slide-up shadow-2xl">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-1">
              <div className="flex-1 w-full flex items-center gap-3 px-6 py-4">
                <Search className="text-white/60" size={20} />
                <input
                  type="text"
                  placeholder="Where would you like to live?"
                  className="w-full bg-transparent focus:outline-none text-white font-bold text-lg placeholder:text-white/40"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-white text-gray-900 px-8 py-4 rounded-xl font-black text-base hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                Search
              </button>
            </form>
          </div>

          {/* Subtle Trust Indicators */}
          <div className="mt-12 flex justify-center gap-6 opacity-40 text-white text-[10px] font-black uppercase tracking-[0.2em]">
            <span>• Verified Houses</span>
            <span>• Managed Professionals</span>
            <span>• High Security</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Content Overflow */}
      <div className="relative z-20">
        <StatSection />
        <Cards />


        <ProcessSection />

        {/* Refined Newsletter */}
        <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-gray-100">
          <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Insights for the Discerning Buyer</h3>
          <p className="text-gray-500 mb-10 font-medium text-sm">Join our curated list for weekly property market intelligence.</p>
          <div className="max-w-md mx-auto flex gap-3 p-1 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-5 focus:outline-none text-sm font-medium"
            />
            <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-all">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
