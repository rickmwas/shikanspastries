const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useRef, useEffect } from 'react';

const ITEMS = [
  {
    id: 1,
    name: 'Velvet Noir Tart',
    category: 'Signature',
    description: 'Dark chocolate ganache on a feuilletée crust, finished with 24k gold leaf.',
    price: 'KES 850',
    img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/c40e729c3_generated_image.png',
    tag: 'Best Seller',
  },
  {
    id: 2,
    name: 'Caramel Mille-Feuille',
    category: 'Classic',
    description: 'Layers of flaky pastry with salted caramel cream and candied hazelnuts.',
    price: 'KES 720',
    img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/bc2322690_generated_image.png',
    tag: 'New',
  },
  {
    id: 3,
    name: 'Champagne Celebration',
    category: 'Celebration',
    description: 'Tiered vanilla sponge with champagne cream, adorned with floral sugar work.',
    price: 'From KES 8,500',
    img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/a24c2c6d1_generated_image.png',
    tag: 'Bespoke',
  },
  {
    id: 4,
    name: 'Artisan Collection',
    category: 'Signature',
    description: 'A curated selection of macarons, tarts and petit fours for the discerning palate.',
    price: 'From KES 2,400',
    img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/8a675abbf_generated_image.png',
    tag: 'Collection',
  },
];

const FILTERS = ['All', 'Signature', 'Classic', 'Celebration'];

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function PastryCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 0.8s ease ${index * 0.12}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
      }}
    >
      {/* Image Container with premium overlay */}
      <div className="relative overflow-hidden bg-walnut aspect-[3/4] mb-6">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1.0)' }}
        />

        {/* Multi-layer overlay for depth */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: hovered 
              ? 'linear-gradient(180deg, rgba(10,3,5,0.3) 0%, rgba(207,54,59,0.3) 50%, rgba(10,3,5,0.7) 100%)'
              : 'linear-gradient(180deg, rgba(10,3,5,0.2) 0%, rgba(10,3,5,0.5) 100%)',
          }}
        />

        {/* CTA Button */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            pointerEvents: hovered ? 'all' : 'none',
          }}
        >
          <button
            className="btn-primary text-[10px]"
            style={{ padding: '0.75rem 1.8rem' }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Order This</span>
          </button>
        </div>

        {/* Premium Tag */}
        {item.tag && (
          <div
            className="absolute top-4 left-4 z-10 transition-all duration-300"
            style={{
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <span 
              className="text-[8px] tracking-[0.3em] uppercase font-sans px-2.5 py-1.5 backdrop-blur-md"
              style={{
                background: 'rgba(245, 228, 208, 0.15)',
                color: 'hsl(355, 72%, 62%)',
                border: '1px solid hsla(355, 72%, 52%, 0.3)',
                display: 'inline-block',
              }}
            >
              {item.tag}
            </span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-[8px] tracking-[0.35em] text-champagne/50 uppercase font-sans mb-2">
              {item.category}
            </p>
            <h3 className="font-serif text-lg md:text-xl text-ivory leading-snug">
              {item.name}
            </h3>
          </div>
          <span className="font-serif text-sm text-champagne flex-shrink-0 whitespace-nowrap mt-1">
            {item.price}
          </span>
        </div>

        <p className="text-xs text-ivory/40 font-sans font-light leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Hover underline effect */}
        <div
          className="h-px bg-champagne/30 transition-all duration-500 origin-left"
          style={{ 
            transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          }}
        />
      </div>
    </div>
  );
}

export default function SignatureCollection() {
  const [filter, setFilter] = useState('All');
  const headRef = useRef(null);
  const headInView = useInView(headRef);

  const filtered = filter === 'All' ? ITEMS : ITEMS.filter(i => i.category === filter);

  return (
    <section id="collection" className="py-40 md:py-56 bg-espresso grain-overlay relative overflow-hidden">
      {/* Subtle accent glow */}
      <div 
        className="absolute top-1/3 right-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 100% 50%, hsla(355, 72%, 52%, 0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header with improved hierarchy */}
        <div ref={headRef} className="mb-24 md:mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 mb-12">
            <div>
              <p
                className="text-[9px] tracking-[0.45em] text-champagne/60 uppercase font-sans mb-6 transition-all duration-700"
                style={{ opacity: headInView ? 1 : 0, transform: headInView ? 'translateY(0)' : 'translateY(-10px)' }}
              >
                — The Collection
              </p>
              <h2
                className="font-serif text-[clamp(2.8rem,6.5vw,5.5rem)] text-ivory leading-[0.92] transition-all duration-900 delay-100"
                style={{
                  opacity: headInView ? 1 : 0,
                  transform: headInView ? 'translateY(0)' : 'translateY(40px)',
                  letterSpacing: '-0.02em',
                }}
              >
                Signature
                <br />
                <em className="text-champagne font-serif font-400">Creations</em>
              </h2>
            </div>

            {/* Premium Filter Buttons */}
            <div
              className="transition-all duration-900 delay-200"
              style={{ opacity: headInView ? 1 : 0, transform: headInView ? 'translateY(0)' : 'translateY(20px)' }}
            >
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                {FILTERS.map((f, idx) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="text-[9px] tracking-[0.25em] uppercase font-sans px-4 md:px-5 py-2.5 md:py-3 transition-all duration-400 relative overflow-hidden"
                    style={{
                      color: filter === f ? 'hsl(30, 40%, 96%)' : 'hsl(355, 72%, 52%)',
                      background: filter === f ? 'hsl(355, 72%, 52%)' : 'transparent',
                      border: `1px solid ${filter === f ? 'hsl(355, 72%, 52%)' : 'hsla(355, 72%, 52%, 0.3)'}`,
                      transform: filter === f ? 'scale(1)' : 'scale(1)',
                    }}
                    onMouseEnter={(e) => {
                      if (filter !== f) {
                        e.currentTarget.style.borderColor = 'hsl(355, 72%, 52%)';
                        e.currentTarget.style.color = 'hsl(355, 72%, 62%)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (filter !== f) {
                        e.currentTarget.style.borderColor = 'hsla(355, 72%, 52%, 0.3)';
                        e.currentTarget.style.color = 'hsl(355, 72%, 52%)';
                      }
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Elegant divider line */}
          <div
            className="h-px bg-champagne/20 transition-all duration-1000 delay-400"
            style={{ width: headInView ? '100%' : '0%' }}
          />
        </div>

        {/* Grid with improved spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-20">
          {filtered.map((item, i) => (
            <PastryCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA with refined styling */}
        <div className="pt-16 md:pt-24 border-t" style={{ borderColor: 'hsla(355, 72%, 52%, 0.15)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 justify-between">
            <div>
              <p className="text-[9px] tracking-[0.3em] text-champagne/50 uppercase font-sans mb-2">Special Orders</p>
              <p className="text-sm text-ivory/60 font-sans font-light max-w-xs">
                Don't see what you're looking for? We craft custom creations for your unique celebration.
              </p>
            </div>
            <button
              className="btn-primary text-[10px] flex-shrink-0"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Enquire for Custom Orders</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}