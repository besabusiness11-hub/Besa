import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const WebsiteShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const websites = [
    {
      id: 1,
      title: "Restaurant",
      description: "Showcase your menu, ambiance, and culinary excellence with a modern website that drives reservations and hungry customers.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop",
      color: "from-orange-500 to-red-600",
      url: "#restaurant"
    },
    {
      id: 2,
      title: "Dental Clinic",
      description: "Build trust with potential patients through a professional website highlighting your services, expertise, and patient care.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&h=800&fit=crop",
      color: "from-blue-500 to-cyan-600",
      url: "#dental"
    },
    {
      id: 3,
      title: "Fitness Center",
      description: "Inspire fitness journeys with an energetic website featuring classes, trainers, and membership options that convert visitors.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop",
      color: "from-green-500 to-emerald-600",
      url: "#fitness"
    },
    {
      id: 4,
      title: "Law Firm",

description: "Establish credibility and attract clients with a sophisticated website that communicates your legal expertise and results.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=800&fit=crop",
      color: "from-slate-700 to-gray-900",
      url: "#law"
    },
    {
      id: 5,
      title: "Coffee Shop",
      description: "Create a cozy digital experience that reflects your cafe's atmosphere and draws coffee lovers through your doors.",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=800&fit=crop",
      color: "from-amber-600 to-yellow-700",
      url: "#coffee"
    },
    {
      id: 6,
      title: "Real Estate",
      description: "Display properties beautifully with an elegant website that helps buyers and sellers connect with the perfect home.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
      color: "from-indigo-500 to-purple-600",
      url: "#realestate"
    }
  ];

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex gap-8 overflow-x-auto py-12 px-8">
      {websites.map((site, index) => (
        <div
          key={site.id}
          className="flex-shrink-0 w-96 relative"
          style={{
            zIndex: hoveredIndex === index ? 50 : 1
          }}
        >
          {/* Outer Rounded Rectangle Container */}
          <div className="relative bg-slate-800 rounded-3xl p-5 shadow-2xl cursor-pointer" onClick={() => handleClick(site.url)}>

            {/* Screen Preview Section */}
            <div 
              className="relative mb-5"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Inner Card Frame for Screen */}
              <div className="relative bg-slate-700 rounded-2xl p-3 shadow-lg">
                {/* Website Preview Container */}
                <div className="relative overflow-visible rounded-xl" style={{ paddingTop: '66.67%' }}>
                  <div 
                    className="absolute inset-0 bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-500 ease-out"
                    style={{
                      transform: hoveredIndex === index 
                        ? 'scale(1.5)' 
                        : 'scale(1)',
                      transformOrigin: 'center center',
                      zIndex: hoveredIndex === index ? 100 : 1,
                      boxShadow: hoveredIndex === index 
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
                        : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {/* Mock Website Content */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${site.color} opacity-10`}></div>

                    {/* Hero Section */}
                    <div className="relative h-2/5 overflow-hidden">
                      <img 
                        src={site.image} 
                        alt={site.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${site.color} flex-shrink-0`}></div>
                        <div className="flex-1">
                          <div className="h-3.5 bg-slate-300 rounded-full w-3/4 mb-2"></div>
                          <div className="h-2.5 bg-slate-200 rounded-full w-1/2"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-200 rounded-full w-full"></div>
                        <div className="h-2 bg-slate-200 rounded-full w-11/12"></div>
                        <div className="h-2 bg-slate-200 rounded-full w-4/5"></div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <div className={`h-9 w-24 rounded-lg bg-gradient-to-r ${site.color}`}></div>
                        <div className="h-9 w-24 rounded-lg bg-slate-200"></div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div 
                      className={`absolute inset-0 bg-black flex items-center justify-center transition-all duration-300 rounded-xl ${
                        hoveredIndex === index ? 'bg-opacity-30 opacity-100' : 'bg-opacity-0 opacity-0'
                      }`}
                    >
                      <div className="text-center text-white transform transition-all duration-300"
                        style={{
                          transform: hoveredIndex === index ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(10px)',
                          opacity: hoveredIndex === index ? 1 : 0
                        }}
                      >
                        <ExternalLink className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm font-semibold">View Full Website</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Title Section */}
            <h3 className="text-2xl font-bold text-white mb-2">
              {site.title}
            </h3>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {site.description}
            </p>

            {/* Discover Button */}
            <button 
              className={`px-4 py-2 rounded-lg bg-gradient-to-r ${site.color} text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105`}
            >
              Discover
            </button>

            {/* Glow Effect */}
            <div 
              className={`absolute -inset-4 bg-gradient-to-r ${site.color} rounded-3xl blur-2xl transition-opacity duration-500 -z-10 ${
                hoveredIndex === index ? 'opacity-30' : 'opacity-0'
              }`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebsiteShowcase;
