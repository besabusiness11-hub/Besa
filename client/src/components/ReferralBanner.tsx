import { useState } from "react";
import { X } from "lucide-react";

export default function ReferralBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-accent text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm sm:text-base font-medium">
              🎁 Condividi Besa con un altro business e guadagnate il{" "}
              <span className="font-bold">20% di sconto</span> per i prossimi{" "}
              <span className="font-bold">6 mesi</span> entrambi
            </p>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Chiudi banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}