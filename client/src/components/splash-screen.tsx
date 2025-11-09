import { useEffect, useState, useRef } from "react";
import logoPath from "@assets/besa-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const timeoutIds = useRef<NodeJS.Timeout[]>([]);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    const fadeInTimeout = setTimeout(() => {
      if (isMounted.current) {
        setIsVisible(true);
      }
    }, 100);
    timeoutIds.current.push(fadeInTimeout);

    const fadeOutTimeout = setTimeout(() => {
      if (isMounted.current) {
        setIsVisible(false);
        setIsHidden(true);
      }
      
      const completeTimeout = setTimeout(() => {
        if (isMounted.current) {
          onComplete();
        }
      }, 800);
      timeoutIds.current.push(completeTimeout);
    }, 2100);
    timeoutIds.current.push(fadeOutTimeout);

    return () => {
      isMounted.current = false;
      timeoutIds.current.forEach(clearTimeout);
      timeoutIds.current = [];
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[1000] bg-white ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${isHidden ? "-translate-y-20 pointer-events-none" : ""}`}
      style={{
        transition: "opacity 1.2s ease-in-out, transform 0.8s ease-in-out",
      }}
      data-testid="splash-screen"
    >
      <img 
        src={logoPath} 
        alt="BeSa Logo" 
        className="w-80 h-auto"
        data-testid="splash-logo"
      />
    </div>
  );
}
