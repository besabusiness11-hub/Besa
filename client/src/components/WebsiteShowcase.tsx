import React, { useState, useRef } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const WebsiteShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const handleClick = (url: string) => {
    window.open(url, '_blank');
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full py-12 overflow-hidden" style={{ backgroundColor: '#F4F5F6', isolation: 'isolate' }}>
      {/* Scroll Arrows - Spostati più vicini al bordo */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Scroll left"
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Scroll right"
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>

      {/* Showcase Row - SOLUZIONE DEFINITIVA */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide w-full
                   snap-x snap-mandatory
                   pl-[calc(50vw-160px)] /* Centra la prima card su mobile */
                   md:pl-4 /* Padding normale su tablet */
                   lg:pl-1" /* Padding minimo su desktop */
        style={{ 
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          backgroundColor: '#F4F5F6',
        }}
      >
        {websites.map((site, index) => (
          <div
            key={site.id}
            className="flex-shrink-0 w-80 relative snap-center" // snap-center per centrare durante lo scroll
            style={{
              zIndex: hoveredIndex === index ? 40 : 1
            }}
          >
            {/* Outer Rounded Rectangle Container */}
            <div 
              className="relative rounded-3xl p-4 shadow-2xl cursor-pointer"
              style={{ backgroundColor: '#0F1729' }}
              onClick={() => handleClick(site.url)}
            >
              {/* Screen Preview Section */}
              <div 
                className="relative mb-4"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Inner Card Frame for Screen */}
                <div className="relative bg-slate-700 rounded-2xl p-2 shadow-lg">
                  {/* Website Preview Container - Fixed Height, No Scroll */}
                  <div className="relative overflow-hidden rounded-xl" style={{ height: '220px' }}>
                    <div 
                      className="absolute inset-0 bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300"
                      style={{
                        boxShadow: hoveredIndex === index 
                          ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)' 
                          : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {/* Mock Website Content */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${site.color} opacity-10`}></div>

                      {/* Hero Section - 16:9 aspect ratio */}
                      <div className="relative overflow-hidden" style={{ height: '120px' }}>
                        <img 
                          src={site.image} 
                          alt={site.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      </div>

                      {/* Content Section - Adjusted Height */}
                      <div className="p-4" style={{ height: '100px', overflow: 'hidden' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${site.color} flex-shrink-0`}></div>
                          <div className="flex-1">
                            <div className="h-3 bg-slate-300 rounded-full w-3/4 mb-1"></div>
                            <div className="h-2 bg-slate-200 rounded-full w-1/2"></div>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-1.5 bg-slate-200 rounded-full w-full"></div>
                          <div className="h-1.5 bg-slate-200 rounded-full w-11/12"></div>
                          <div className="h-1.5 bg-slate-200 rounded-full w-4/5"></div>
                        </div>
                        <div className="mt-3 flex gap-1.5">
                          <div className={`h-8 w-20 rounded-lg bg-gradient-to-r ${site.color}`}></div>
                          <div className="h-8 w-20 rounded-lg bg-slate-200"></div>
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
                          <ExternalLink className="w-10 h-10 mx-auto mb-1" />
                          <p className="text-xs font-semibold">View Full Website</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title Section */}
              <h3 className="text-xl font-bold text-white mb-2">
                {site.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-xs leading-relaxed mb-3">
                {site.description}
              </p>

              {/* Discover Button */}
              <button 
                className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${site.color} text-white text-xs font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105`}
              >
                Discover
              </button>

              {/* Subtle Glow Effect */}
              <div 
                className={`absolute -inset-1 bg-gradient-to-r ${site.color} rounded-3xl blur-xl transition-opacity duration-500 -z-10 ${
                  hoveredIndex === index ? 'opacity-15' : 'opacity-0'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Hide scrollbar CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
    </div>
  );
};

export default WebsiteShowcase;