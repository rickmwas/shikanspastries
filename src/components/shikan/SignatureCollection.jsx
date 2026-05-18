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
      className="relative group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 0.8s ease ${index * 0.12}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-walnut aspect-[3/4]">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1.0)' }}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-espresso/70 flex items-center justify-center transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <button
            className="btn-primary text-[10px]"
            style={{ padding: '0.7rem 1.8rem' }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Order This</span>
          </button>
        </div>

        {/* Tag */}
        {item.tag && (
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[9px] tracking-[0.25em] uppercase font-sans text-espresso bg-champagne px-2 py-1">
              {item.tag}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-5 pb-2">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-[9px] tracking-[0.3em] text-champagne/60 uppercase font-sans mb-1">{item.category}</p>
            <h3 className="font-serif text-xl text-ivory leading-tight">{item.name}</h3>
          </div>
          <span className="font-serif text-sm text-champagne mt-1 whitespace-nowrap ml-4">{item.price}</span>
        </div>
        <p className="text-xs text-ivory/40 font-sans font-light leading-relaxed line-clamp-2">{item.description}</p>
      </div>

      {/* Hover underline */}
      <div
        className="h-px bg-champagne/40 transition-all duration-500"
        style={{ width: hovered ? '100%' : '0%' }}
      />
    </div>
  );
}

export default function SignatureCollection() {
  const [filter, setFilter] = useState('All');
  const headRef = useRef(null);
  const headInView = useInView(headRef);

  const filtered = filter === 'All' ? ITEMS : ITEMS.filter(i => i.category === filter);

  return (
    <section id="collection" className="py-32 md:py-40 bg-espresso grain-overlay">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headRef} className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p
                className="text-[10px] tracking-[0.45em] text-champagne uppercase font-sans mb-5 transition-all duration-700"
                style={{ opacity: headInView ? 1 : 0, transform: headInView ? 'translateY(0)' : 'translateY(20px)' }}
              >
                — The Collection
              </p>
              <h2
                className="font-serif text-[clamp(2.8rem,6vw,5.5rem)] text-ivory leading-[0.95] transition-all duration-700 delay-100"
                style={{ opacity: headInView ? 1 : 0, transform: headInView ? 'translateY(0)' : 'translateY(30px)' }}
              >
                Signature
                <br />
                <em className="text-champagne">Creations</em>
              </h2>
            </div>

            {/* Filters */}
            <div
              className="flex items-center gap-1 transition-all duration-700 delay-200"
              style={{ opacity: headInView ? 1 : 0 }}
            >
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="text-[10px] tracking-[0.2em] uppercase font-sans px-4 py-2 transition-all duration-300"
                  style={{
                    color: filter === f ? 'hsl(30, 40%, 96%)' : 'rgba(220,80,90,0.5)',
                    background: filter === f ? 'hsl(355, 72%, 52%)' : 'transparent',
                    border: `1px solid ${filter === f ? 'hsl(355, 72%, 52%)' : 'rgba(220,80,90,0.25)'}`,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Decorative line */}
          <div
            className="mt-10 h-px bg-champagne/20 transition-all duration-1000 delay-300"
            style={{ width: headInView ? '100%' : '0%' }}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {filtered.map((item, i) => (
            <PastryCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <button
            className="btn-outline"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Enquire for Custom Orders</span>
          </button>
        </div>
      </div>
    </section>
  );
}