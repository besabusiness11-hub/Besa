import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export default function FormPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Load the Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Set page title
    document.title = 'Crea il tuo Sito Web (gratis!) - Besa';

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // Reset title
      document.title = 'Besa - Siti Web Professionali';
    };
  }, []);

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      {/* Close button to go back */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 right-4 z-50 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg transition-colors"
        aria-label="Chiudi"
      >
        <X className="w-6 h-6" />
      </button>

      <iframe
        data-tally-src="https://tally.so/r/n0NPNZ?transparentBackground=1&hideTitle=1&dynamicHeight=1"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Crea il tuo Sito Web (gratis!)"
        style={{ 
          border: 0,
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    </div>
  );
}