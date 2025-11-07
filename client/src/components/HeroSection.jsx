import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "siti web personalizzati";

  useEffect(() => {
    // Typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Blink cursor after typing completes
        setInterval(() => {
          setCursorVisible(prev => !prev);
        }, 500);
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  const handleButtonHover = (e) => {
    const button = e.currentTarget;
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.3)';

    // Create sparkle effect
    const sparkle = document.createElement('div');
    sparkle.className = 'tech-sparkle';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    button.appendChild(sparkle);

    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 2000);
  };

  const handleButtonLeave = (e) => {
    const button = e.currentTarget;
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-100 overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0">
        <div className="hero-particle" style={{ top: '20%', left: '10%', width: '200px', height: '200px', animationDelay: '0s' }}></div>
        <div className="hero-particle" style={{ top: '60%', left: '80%', width: '150px', height: '150px', animationDelay: '2s' }}></div>
        <div className="hero-particle" style={{ top: '30%', left: '70%', width: '100px', height: '100px', animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Main Title with Gradient Animation */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up">
          Il Tuo Sito Web Professionale,
          <br />
          <span className="tech-gradient-text">Fatto su Misura per Te</span>
        </h1>

        {/* Subtitle with Typing Effect */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto fade-in-up" style={{ animationDelay: '0.3s' }}>
          Besa crea <span className="font-semibold text-gray-800 relative">
            {typedText}
            {cursorVisible && <span className="typing-cursor">|</span>}
          </span> per attività locali. 
          Dalla progettazione alla pubblicazione online, ci occupiamo di tutto per rendere 
          la tua presenza digitale <strong className="text-gray-900">professionale ed efficace</strong>.
        </p>

        {/* CTA Buttons with Hover Effects */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up" style={{ animationDelay: '0.6s' }}>
          <button
            className="btn-primary px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 relative overflow-hidden"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            Vedi Esempi
          </button>
          <button
            className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-primary hover:text-white relative overflow-hidden"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            Scopri i Prezzi
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 fade-in-up" style={{ animationDelay: '0.9s' }}>
          <div className="stat-card bg-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-primary mb-2">100+</div>
            <div className="text-gray-600">Siti Web Creati</div>
          </div>
          <div className="stat-card bg-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-600">Assistenza Tecnica</div>
          </div>
          <div className="stat-card bg-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-primary mb-2">30gg</div>
            <div className="text-gray-600">Garanzia Soddisfatto</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;