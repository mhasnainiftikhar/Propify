import React, { useState, useEffect } from 'react';
import coverImage from '../assets/cover4.jpg'; 
import Cards from '../components/Cards';

const Home = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const words = ["Dream Home", "Ideal Home"];

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

  return (
    <>
      <div 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${coverImage})` }}
      >
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Animated Heading - Only last two words change */}
            <h3 className="font-heading text-4xl md:text-4xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">
              Find Your{" "}
              <span 
                className={`inline-block transition-opacity duration-500 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {words[currentWord]}
              </span>
            </h3>
            
            <p className="font-body text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12">
              Browse verified listings from trusted agents
            </p>
            
            <button className="bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded-lg font-medium text-lg md:text-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Explore Properties
            </button>
          </div>
        </div>
      </div>
      
      <Cards />
    </>
  );
}

export default Home;