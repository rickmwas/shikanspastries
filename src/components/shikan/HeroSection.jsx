const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const HERO_IMG = 'https://res.cloudinary.com/dcr7hgmym/image/upload/v1779194020/ChatGPT_Image_May_19_2026_03_32_57_PM_ni2ony.png';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollDown = () => {
    const el = document.querySelector('#collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* ─── BACKGROUND LAYER ─── */}
      {/* Cinematic parallax with selective blur */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div
          aria-hidden="true"
          className="w-full h-full bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url('${HERO_IMG}')`,
            /* Cinematic color grading */
            filter: 'brightness(0.45) contrast(1.15) saturate(0.95) hue-rotate(-2deg)',
          }}
        />
        {/* Selective blur mask behind text area */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 60% at 50% 100%, transparent 0%, rgba(0,0,0,0.3) 100%)',
          }}
        />
      </div>

      {/* ─── GRADIENT OVERLAYS (Layered for depth) ─── */}
      {/* Deep directional gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 120% 100% at 50% 100%, transparent 20%, rgba(10,3,5,0.5) 100%)',
      }} />
      
      {/* Left-side directional overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/50 via-transparent to-transparent" />

      {/* ─── SUBTLE GRAIN TEXTURE ─── */}
      <div className="grain-overlay absolute inset-0 z-5" />

      {/* ─── ACCENT LINES ─── */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-1000"
        style={{ 
          background: 'linear-gradient(90deg, transparent 0%, hsl(355, 72%, 52%) 50%, transparent 100%)',
          opacity: visible ? 0.3 : 0,
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />

      {/* Vertical text - left side (desktop only) */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6">
        <div className="w-px h-16 bg-champagne/25" />
        <p className="writing-vertical text-[8px] tracking-[0.35em] text-champagne/40 uppercase font-sans font-light">
          Maai Mahiu · Nakuru
        </p>
        <div className="w-px h-16 bg-champagne/25" />
      </div>

      {/* Right side accent - Year (desktop only) */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6">
        <div className="w-px h-16 bg-champagne/25" />
        <p className="writing-vertical text-[8px] tracking-[0.35em] text-champagne/40 uppercase font-sans font-light">
          Est. 2018
        </p>
        <div className="w-px h-16 bg-champagne/25" />
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-32 md:pb-40 pt-32 md:pt-40 w-full">
        <div className="max-w-3xl">
          
          {/* Eyebrow + Location */}
          <div
            className="flex items-center gap-4 mb-12 md:mb-16 transition-all duration-1000"
            style={{ 
              opacity: visible ? 1 : 0, 
              transform: visible ? 'translateY(0)' : 'translateY(-20px)' 
            }}
          >
            <div className="w-8 h-px bg-champagne/50" style={{ animation: visible ? 'draw-line 0.8s ease 0.4s forwards' : 'none', width: visible ? '32px' : '0' }} />
            <p className="text-[9px] tracking-[0.45em] text-champagne/70 uppercase font-sans font-light">
              Artisan Pastries · Nakuru
            </p>
          </div>

          {/* Main Headline — Cinematic reveal */}
          <div className="overflow-hidden mb-2 md:mb-3">
            <h1
              className="font-serif text-[clamp(2.8rem,8vw,7.5rem)] text-ivory leading-[0.88] md:leading-[0.92]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(80px)',
                transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s',
                fontStyle: 'italic',
                letterSpacing: '-0.025em',
                textShadow: '0 8px 50px rgba(0,0,0,0.5)',
              }}
            >
              Where Every
            </h1>
          </div>

          <div className="overflow-hidden mb-2 md:mb-3">
            <h1
              className="font-serif text-[clamp(2.8rem,8vw,7.5rem)] text-champagne leading-[0.88] md:leading-[0.92]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(80px)',
                transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.35s',
                letterSpacing: '-0.025em',
                textShadow: '0 8px 50px rgba(0,0,0,0.5)',
              }}
            >
              Bite
            </h1>
          </div>

          <div className="overflow-hidden mb-8 md:mb-12">
            <h1
              className="font-serif text-[clamp(2.8rem,8vw,7.5rem)] text-ivory leading-[0.88] md:leading-[0.92]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(80px)',
                transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.55s',
                fontStyle: 'italic',
                letterSpacing: '-0.025em',
                textShadow: '0 8px 50px rgba(0,0,0,0.5)',
              }}
            >
              Tells a Story
            </h1>
          </div>

          {/* Emotional Subline */}
          <div
            className="mb-12 md:mb-16 max-w-md transition-all duration-1000"
            style={{ 
              opacity: visible ? 1 : 0, 
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.7s',
            }}
          >
            <p className="text-sm md:text-base text-ivory/60 font-sans font-light leading-relaxed">
              Luxury cakes handcrafted with devotion for weddings, birthdays, and unforgettable moments. Where artistry meets celebration.
            </p>
          </div>

          {/* ─── CTA SECTION: Dominant primary + subtle secondary ─── */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 transition-all duration-1000"
            style={{ 
              opacity: visible ? 1 : 0, 
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '0.9s',
            }}
          >
            {/* Dominant Primary CTA */}
            <button
              className="btn-primary btn-magnetic"
              onClick={() => document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'hsl(355, 72%, 52%)',
                boxShadow: visible ? '0 16px 40px -8px rgba(207, 54, 59, 0.35)' : 'none',
              }}
            >
              <span>Order Your Cake</span>
            </button>

            {/* Subtle Secondary CTA — Text only */}
            <button
              className="btn-text-minimal group"
              onClick={scrollDown}
              style={{
                color: 'hsl(30, 40%, 92%)',
              }}
            >
              <span>Explore Gallery</span>
              <svg 
                className="w-3 h-3 transition-transform duration-400 group-hover:translate-x-1"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* ─── DIVIDER ─── */}
          <div
            className="mt-16 md:mt-20 mb-8 md:mb-10"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 1.5s ease',
              transitionDelay: '1.1s',
            }}
          >
            <div className="divider-elegant" />
          </div>

          {/* ─── EMOTIONAL STATS ─── */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 1s ease',
              transitionDelay: '1.2s',
            }}
          >
            {[
              { num: '500+', label: 'Celebrations Crafted' },
              { num: '6', label: 'Years of Artistry' },
              { num: '100%', label: 'Handmade Daily' },
              { num: '★', label: 'Loved by Families' },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${1.3 + idx * 0.1}s`,
                }}
              >
                <p className="font-serif text-2xl md:text-3xl text-champagne mb-2" style={{ letterSpacing: '-0.02em' }}>
                  {stat.num}
                </p>
                <p className="text-[10px] md:text-xs tracking-[0.25em] text-ivory/35 uppercase font-sans font-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── SCROLL CUE (Mobile) ─── */}
      <button
        onClick={scrollDown}
        className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 touch-target text-ivory/40 hover:text-champagne transition-colors duration-400 hidden sm:flex flex-col items-center gap-2"
        aria-label="Scroll down"
        style={{
          animation: visible ? 'float 3s ease-in-out 2s infinite' : 'none',
        }}
      >
        <span className="text-[9px] tracking-[0.25em] uppercase font-sans font-light">Scroll</span>
        <ArrowDown size={16} strokeWidth={1} />
      </button>
    </section>
  );
}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollDown}
          className="absolute right-12 bottom-8 flex flex-col items-center gap-2 text-champagne/40 hover:text-champagne transition-colors duration-300 group"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase font-sans writing-vertical">Scroll</span>
          <ArrowDown size={12} className="group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Bottom stats bar */}
      <div
        className="absolute bottom-0 left-0 right-0 border-t border-champagne/10 transition-all duration-1000 delay-700"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center gap-8 md:gap-16 overflow-x-auto">
          {[
            { value: '500+', label: 'Creations Monthly' },
            { value: '6', label: 'Years of Craft' },
            { value: '100%', label: 'Handcrafted' },
            { value: '★ 5.0', label: 'Client Rating' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-3 whitespace-nowrap">
              <span className="font-serif text-xl text-champagne">{stat.value}</span>
              <span className="text-[10px] tracking-[0.15em] text-ivory/30 uppercase font-sans">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}