const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/shikan/Navbar';
import Footer from '../components/shikan/Footer';
import FloatingWhatsApp from '../components/shikan/FloatingWhatsApp';

const REAL_IMGS = {
  birthday1: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/1b504253d_shikan3.jpg',
  birthday2: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/2edb493f9_shikan2.jpg',
  birthday3: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/27c1429ab_shikan4.jpg',
  birthday4: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/7ed032e97_shikan1.jpg',
  wedding1: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/76558444d_shikan.jpg',
  wedding2: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/6d1b3c918_shikanevent.jpg',
  hero: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/87bdd2c04_shikan7.jpg',
};

const ITEMS = [
  { id: 1, name: 'Princess Themed Cake', category: 'Kids Birthday', description: 'Custom princess or character cakes with edible photo prints and fondant toppers.', price: 'From KES 3,500', img: REAL_IMGS.birthday3, tag: 'Popular' },
  { id: 2, name: 'Character Birthday Cake', category: 'Kids Birthday', description: 'Themed cakes for every beloved character — Spiderman, Sofia, Masha & Bear and more.', price: 'From KES 3,000', img: REAL_IMGS.birthday4, tag: 'Best Seller' },
  { id: 3, name: 'Celebration Cake', category: 'Birthday', description: 'Beautifully decorated layered cakes for all ages — customized with your message.', price: 'From KES 2,500', img: REAL_IMGS.birthday2, tag: null },
  { id: 4, name: 'Birthday Special', category: 'Birthday', description: 'Elegant single-tier cakes with custom piping and floral decorations.', price: 'From KES 2,000', img: REAL_IMGS.birthday1, tag: 'New' },
  { id: 5, name: 'Wedding Centrepiece', category: 'Wedding', description: 'Multi-tier wedding cakes crafted to be the highlight of your special day.', price: 'From KES 15,000', img: REAL_IMGS.wedding1, tag: 'Signature' },
  { id: 6, name: 'Wedding & Events', category: 'Wedding', description: 'Full event cake spreads — wedding cakes, dessert tables and display pieces.', price: 'Custom Quote', img: REAL_IMGS.wedding2, tag: 'Bespoke' },
];

const FILTERS = ['All', 'Birthday', 'Kids Birthday', 'Wedding'];

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function CakeCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      className="group bg-walnut overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s`,
      }}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {item.tag && (
          <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase font-sans bg-champagne text-espresso px-2 py-1">
            {item.tag}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
          <button
            className="btn-primary w-full text-center text-[9px]"
            style={{ padding: '0.65rem 1rem' }}
            onClick={() => window.location.href = '/order'}
          >
            <span>Order Now</span>
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[9px] tracking-[0.3em] text-champagne/60 uppercase font-sans mb-1">{item.category}</p>
        <h3 className="font-serif text-lg text-ivory leading-tight mb-1">{item.name}</h3>
        <p className="text-[11px] text-ivory/40 font-sans leading-relaxed line-clamp-2 mb-3">{item.description}</p>
        <p className="font-serif text-sm text-champagne">{item.price}</p>
      </div>
    </div>
  );
}

export default function Collection() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? ITEMS : ITEMS.filter(i => i.category === filter);

  return (
    <div className="min-h-screen bg-espresso">
      <Navbar />
      {/* Page Header */}
      <div className="pt-28 pb-12 px-5 md:px-12 max-w-7xl mx-auto">
        <p className="text-[10px] tracking-[0.45em] text-champagne uppercase font-sans mb-3">— Our Work</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] text-ivory leading-[0.95] mb-6">
          The <em className="text-champagne">Collection</em>
        </h1>
        <p className="text-sm text-ivory/40 font-sans max-w-md leading-relaxed">
          Every cake tells a story. Browse our creations — from elaborate wedding centrepieces to joyful kids' birthdays.
        </p>
      </div>

      {/* Filters — horizontally scrollable on mobile */}
      <div className="px-5 md:px-12 max-w-7xl mx-auto mb-10">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex-shrink-0 text-[10px] tracking-[0.18em] uppercase font-sans px-4 py-2.5 transition-all duration-300"
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

      {/* Grid */}
      <div className="px-5 md:px-12 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {filtered.map((item, i) => <CakeCard key={item.id} item={item} index={i} />)}
        </div>

        <div className="mt-16 border-t border-champagne/10 pt-12 text-center">
          <p className="font-serif text-2xl text-ivory italic mb-4">Don't see what you're looking for?</p>
          <p className="text-sm text-ivory/40 font-sans mb-8 max-w-sm mx-auto">We create fully custom cakes for any occasion. Tell us your vision.</p>
          <a href="/order" className="btn-primary inline-block"><span>Request Custom Cake</span></a>
        </div>
      </div>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}