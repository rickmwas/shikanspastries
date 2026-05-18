import React, { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + Math.random() * 12 + 3, 100);
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPct(Math.floor(progress)), 30);
    return () => clearTimeout(t);
  }, [progress]);

  return (
    <div className="fixed inset-0 z-[9999] bg-espresso flex flex-col items-center justify-center grain-overlay overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 45%, hsla(355,72%,52%,0.07) 0%, transparent 70%)' }}
      />

      {/* Decorative rotating rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[520px] h-[520px] rounded-full animate-rotate-slow"
          style={{ border: '1px solid hsla(355,72%,52%,0.06)' }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[380px] h-[380px] rounded-full"
          style={{ border: '1px solid hsla(355,72%,52%,0.04)', animation: 'rotate-slow 14s linear infinite reverse' }}
        />
      </div>

      {/* Diamond accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="absolute"
          style={{
            width: '5px', height: '5px',
            background: 'hsl(355,72%,52%)',
            transform: 'rotate(45deg) translate(-120px, -120px)',
            opacity: 0.6,
          }}
        />
        <div
          className="absolute"
          style={{
            width: '3px', height: '3px',
            background: 'hsl(355,72%,52%)',
            transform: 'rotate(45deg) translate(110px, 130px)',
            opacity: 0.4,
          }}
        />
      </div>

      {/* Content */}
      <div className="text-center relative z-10">
        <div className="mb-6 overflow-hidden">
          <p
            className="text-[10px] tracking-[0.6em] text-champagne uppercase font-sans animate-fade-up"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            Nairobi, Kenya
          </p>
        </div>

        <div className="mb-3 overflow-hidden">
          <h1
            className="font-serif text-8xl md:text-[7.5rem] text-ivory animate-fade-up"
            style={{
              animationDelay: '0.3s', opacity: 0, fontStyle: 'italic',
              textShadow: '0 4px 40px hsla(355,72%,52%,0.2)',
            }}
          >
            Shikan
          </h1>
        </div>

        <div className="mb-14 overflow-hidden">
          <p
            className="text-[10px] tracking-[0.7em] text-champagne/60 uppercase font-sans animate-fade-up"
            style={{ animationDelay: '0.5s', opacity: 0 }}
          >
            Pastries
          </p>
        </div>

        {/* Progress track */}
        <div className="relative w-80 mx-auto">
          <div className="w-full h-px bg-white/8 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-champagne transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
            {/* Shimmer on progress bar */}
            <div
              className="absolute top-0 h-full w-16 shimmer"
              style={{ left: `calc(${Math.min(progress, 100)}% - 4rem)` }}
            />
          </div>

          {/* Percentage */}
          <div className="flex justify-between items-center mt-3">
            <span className="text-[8px] tracking-[0.3em] text-ivory/15 font-sans uppercase">Loading</span>
            <span
              className="font-serif text-sm text-champagne/50 italic"
              style={{ fontVariantNumeric: 'tabular-nums', minWidth: '2.5rem', textAlign: 'right' }}
            >
              {pct}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom tag */}
      <div
        className="absolute bottom-10 left-0 right-0 text-center animate-fade-in"
        style={{ animationDelay: '0.8s', opacity: 0 }}
      >
        <p className="text-[8px] tracking-[0.4em] text-ivory/10 uppercase font-sans">
          Artisan Pastries · Est. 2018
        </p>
      </div>
    </div>
  );
}
