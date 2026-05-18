import React, { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-espresso flex flex-col items-center justify-center grain-overlay">
      <div className="text-center">
        <div className="mb-8 overflow-hidden">
          <p
            className="text-xs tracking-[0.5em] text-champagne uppercase font-sans animate-fade-up"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            Nairobi, Kenya
          </p>
        </div>

        <div className="mb-2 overflow-hidden">
          <h1
            className="font-serif text-7xl md:text-9xl text-ivory animate-fade-up"
            style={{ animationDelay: '0.3s', opacity: 0, fontStyle: 'italic' }}
          >
            Shikan
          </h1>
        </div>

        <div className="mb-12 overflow-hidden">
          <p
            className="text-xs tracking-[0.6em] text-champagne uppercase font-sans animate-fade-up"
            style={{ animationDelay: '0.5s', opacity: 0 }}
          >
            Pastries
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 h-px bg-white/10 mx-auto relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-champagne transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute bottom-12 left-12 w-32 h-32 border border-champagne/10 rounded-full animate-rotate-slow" />
      <div className="absolute top-16 right-16 w-16 h-16 border border-champagne/5 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
    </div>
  );
}