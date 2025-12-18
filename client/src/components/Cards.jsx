import React from 'react';

const Cards = () => {
  const cards = [
    {
      id: 1,
      title: "Verified Listings",
      description: "Every property is thoroughly verified by our expert team.",
      color: "bg-blue-50 border-blue-100",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      title: "Best Prices",
      description: "Get the best value with our price match guarantee.",
      color: "bg-green-50 border-green-100",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      title: "Secure Process",
      description: "Safe and secure transactions with legal protection.",
      color: "bg-purple-50 border-purple-100",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      title: "Personalized Service",
      description: "Dedicated agents to help you find your perfect home.",
      color: "bg-orange-50 border-orange-100",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Propify?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make finding your dream home simple, safe, and stress-free
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className={`${card.color} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
            >
              {/* Image */}
              <div className="w-full h-48 mb-6 rounded-lg overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;