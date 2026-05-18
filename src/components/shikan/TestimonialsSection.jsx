const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "The wedding cake was so extraordinary that our guests were photographing it before they even photographed us. Shikan understood our vision completely.",
    name: "Amara & David N.",
    event: "Wedding — Karen, Nairobi",
    initial: "A",
    img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/76558444d_shikan.jpg',
    stars: 5,
  },
  {
    quote: "I ordered a custom birthday cake and it was genuinely the most beautiful thing I have ever tasted. The packaging alone made me emotional.",
    name: "Zawadi M.",
    event: "Birthday Celebration",
    initial: "Z",
    img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/27c1429ab_shikan4.jpg',
    stars: 5,
  },
  {
    quote: "For our product launch dessert table, Shikan created an installation that stopped every single guest in their tracks. Pure artistry.",
    name: "Makena Ochieng",
    event: "Corporate Launch Event",
    initial: "M",
    img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/6d1b3c918_shikanevent.jpg',
    stars: 5,
  },
  {
    quote: "There are very few things in Kenya that feel truly world-class. Shikan Pastries is one of them. Incomparable quality.",
    name: "James K.",
    event: "Luxury Gift Order",
    initial: "J",
    img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/2edb493f9_shikan2.jpg',
    stars: 5,
  },
];

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState(1); // 1=forward, -1=back
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  // Touch swipe
  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? go(1) : go(-1);
    touchStartX.current = null;
  };

  const go = (dir) => {
    if (animating) return;
    setAnimDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setActive(p => (p + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
      setAnimating(false);
    }, 300);
  };

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [animating]);

  const current = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 overflow-hidden grain-overlay"
      style={{ background: 'hsl(350, 42%, 8%)' }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12">

        {/* Header */}
        <div
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease' }}
        >
          <div>
            <p className="text-[10px] tracking-[0.45em] text-champagne uppercase font-sans mb-3">— What They Say</p>
            <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] text-ivory leading-[0.95]">
              Loved by <em className="text-champagne">Real Clients</em>
            </h2>
          </div>
          {/* Nav arrows — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 border border-champagne/20 flex items-center justify-center text-champagne/50 hover:text-champagne hover:border-champagne/60 transition-all duration-300"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => go(1)}
              className="w-11 h-11 border border-champagne/20 flex items-center justify-center text-champagne/50 hover:text-champagne hover:border-champagne/60 transition-all duration-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Main carousel card */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="grid md:grid-cols-[1fr_1fr] gap-0 overflow-hidden"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.7s ease 0.15s',
          }}
        >
          {/* Cake photo */}
          <div
            className="relative overflow-hidden"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? `translateX(${animDir * -30}px)` : 'translateX(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              aspectRatio: '4/3',
            }}
          >
            <img
              src={current.img}
              alt={current.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
            {/* Badge */}
            <div
              className="absolute bottom-5 left-5 px-3 py-1.5 text-[9px] tracking-[0.25em] uppercase font-sans"
              style={{ background: 'hsl(355, 72%, 52%)', color: 'hsl(30, 40%, 96%)' }}
            >
              {current.event}
            </div>
          </div>

          {/* Review content */}
          <div
            className="flex flex-col justify-between p-7 md:p-10"
            style={{
              background: 'hsl(350, 38%, 11%)',
              opacity: animating ? 0 : 1,
              transform: animating ? `translateX(${animDir * 30}px)` : 'translateX(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array(current.stars).fill(0).map((_, i) => (
                <Star key={i} size={12} fill="hsl(355, 72%, 52%)" className="text-champagne" />
              ))}
            </div>

            {/* Quote mark */}
            <div className="font-serif text-[6rem] leading-none text-champagne/10 -mb-8 -ml-2 select-none">"</div>

            <blockquote className="font-serif text-[clamp(1.1rem,2.5vw,1.7rem)] text-ivory/90 leading-[1.4] mb-8 flex-1">
              {current.quote}
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4 mt-auto">
              <div
                className="w-10 h-10 flex items-center justify-center font-serif text-lg italic flex-shrink-0"
                style={{ background: 'hsl(355, 72%, 52%)', color: 'hsl(30, 40%, 96%)' }}
              >
                {current.initial}
              </div>
              <div>
                <p className="font-sans text-sm text-ivory font-medium">{current.name}</p>
                <p className="font-sans text-[9px] text-champagne/50 tracking-[0.2em] uppercase mt-0.5">{current.event}</p>
              </div>
            </div>

            {/* Progress dots + mobile arrows */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-champagne/10">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setAnimDir(i > active ? 1 : -1); setActive(i); }}
                    className="transition-all duration-400"
                    style={{
                      width: active === i ? '2rem' : '0.35rem',
                      height: '2px',
                      background: active === i ? 'hsl(355, 72%, 52%)' : 'rgba(220,80,90,0.25)',
                    }}
                  />
                ))}
              </div>
              {/* Mobile arrows */}
              <div className="flex md:hidden items-center gap-2">
                <button
                  onClick={() => go(-1)}
                  className="w-9 h-9 border border-champagne/20 flex items-center justify-center text-champagne/50 hover:text-champagne transition-all duration-300"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => go(1)}
                  className="w-9 h-9 border border-champagne/20 flex items-center justify-center text-champagne/50 hover:text-champagne transition-all duration-300"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: mini thumbnail strip */}
        <div
          className="mt-4 grid grid-cols-4 gap-2"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease 0.3s' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              onClick={() => { setAnimDir(i > active ? 1 : -1); setActive(i); }}
              className="relative overflow-hidden transition-all duration-300"
              style={{ opacity: active === i ? 1 : 0.35, aspectRatio: '16/9' }}
            >
              <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
              {active === i && (
                <div className="absolute inset-0 border-2 border-champagne" />
              )}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}