const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const HERO_IMG = 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/bc2322690_generated_image.png';

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
      className="relative min-h-screen flex flex-col justify-end overflow-hidden grain-overlay"
    >
      {/* Background Image with parallax */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.35}px)` }}
      >
        <img
          src={HERO_IMG}
          alt="Shikan Pastries"
          className="w-full h-full object-cover object-center scale-110"
          style={{ filter: 'brightness(0.55) contrast(1.1) saturate(0.9)' }}
        />
      </div>

      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/60 via-transparent to-transparent" />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-champagne/30 transition-all duration-1000"
        style={{ transform: visible ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }}
      />

      {/* Vertical text - left side */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-champagne/30" />
        <p className="writing-vertical text-[9px] tracking-[0.3em] text-champagne/50 uppercase font-sans">
          Maai Mahiu · Nakuru
        </p>
        <div className="w-px h-16 bg-champagne/30" />
      </div>

      {/* Year - right side */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-champagne/30" />
        <p className="writing-vertical text-[9px] tracking-[0.3em] text-champagne/50 uppercase font-sans">
          Handcrafted Excellence
        </p>
        <div className="w-px h-16 bg-champagne/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24 pt-32 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-4 mb-8 transition-all duration-1000"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <div className="w-8 h-px bg-champagne/60" />
            <p className="text-[10px] tracking-[0.45em] text-champagne uppercase font-sans">
              Artisan Pastries — Maai Mahiu, Nakuru
            </p>
          </div>

          {/* Main headline */}
          <div className="overflow-hidden mb-4">
            <h1
              className="font-serif text-[clamp(3.5rem,9vw,8rem)] text-ivory leading-[0.92] transition-all duration-1000 delay-200"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(60px)',
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
              }}
            >
              Where Every
            </h1>
          </div>
          <div className="overflow-hidden mb-4">
            <h1
              className="font-serif text-[clamp(3.5rem,9vw,8rem)] text-champagne leading-[0.92] transition-all duration-1000 delay-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(60px)',
                letterSpacing: '-0.02em',
              }}
            >
              Bite Tells
            </h1>
          </div>
          <div className="overflow-hidden mb-12">
            <h1
              className="font-serif text-[clamp(3.5rem,9vw,8rem)] text-ivory leading-[0.92] transition-all duration-1000 delay-400"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(60px)',
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
              }}
            >
              a Story
            </h1>
          </div>

          {/* Subline + CTA */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8 transition-all duration-1000 delay-500"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}
          >
            <p className="text-sm text-ivory/50 font-sans font-light max-w-xs leading-relaxed">
              Artisan pastries crafted with devotion — for those who believe that beauty belongs in every moment.
            </p>
            <div className="flex items-center gap-4">
              <button
                className="btn-primary"
                onClick={() => document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Explore Collection</span>
              </button>
              <button
                className="btn-outline"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Order Now</span>
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