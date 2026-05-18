import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/shikan/Navbar';
import Footer from '../components/shikan/Footer';
import FloatingWhatsApp from '../components/shikan/FloatingWhatsApp';

const IMGS = {
  birthday1: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
  birthday2: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
  birthday3: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800&q=80',
  birthday4: 'https://images.unsplash.com/photo-1558636508-e0a3e2f9b4f6?w=800&q=80',
  wedding1:  'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=80',
  wedding2:  'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80',
};

const ITEMS = [
  { id: 1, name: 'Princess Themed Cake',   category: 'Kids Birthday', description: 'Custom princess or character cakes with edible photo prints and fondant toppers.', price: 'From KES 3,500', img: IMGS.birthday3, tag: 'Popular' },
  { id: 2, name: 'Character Birthday Cake', category: 'Kids Birthday', description: 'Themed cakes for every beloved character — Spiderman, Sofia, Masha & Bear and more.', price: 'From KES 3,000', img: IMGS.birthday4, tag: 'Best Seller' },
  { id: 3, name: 'Celebration Cake',        category: 'Birthday',     description: 'Beautifully decorated layered cakes for all ages — customized with your message.', price: 'From KES 2,500', img: IMGS.birthday2, tag: null },
  { id: 4, name: 'Birthday Special',        category: 'Birthday',     description: 'Elegant single-tier cakes with custom piping and floral decorations.', price: 'From KES 2,000', img: IMGS.birthday1, tag: 'New' },
  { id: 5, name: 'Wedding Centrepiece',     category: 'Wedding',      description: 'Multi-tier wedding cakes crafted to be the highlight of your special day.', price: 'From KES 15,000', img: IMGS.wedding1, tag: 'Signature' },
  { id: 6, name: 'Wedding & Events',        category: 'Wedding',      description: 'Full event cake spreads — wedding cakes, dessert tables and display pieces.', price: 'Custom Quote', img: IMGS.wedding2, tag: 'Bespoke' },
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
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="group bg-walnut overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 0.8s ease ${index * 0.08}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s`,
      }}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.07)' : 'scale(1)', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
        />
        {/* Tag */}
        {item.tag && (
          <span className="absolute top-3 left-3 text-[8px] tracking-[0.22em] uppercase font-sans bg-champagne text-ivory px-2.5 py-1 z-10">
            {item.tag}
          </span>
        )}
        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/40 to-transparent flex items-end p-5 transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <Link to="/order" className="btn-primary w-full text-center text-[8px]" style={{ padding: '0.7rem 1rem' }}>
            <span>Order Now</span>
          </Link>
        </div>
        {/* Default dark bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-walnut/80 to-transparent" />
      </div>

      <div className="p-5">
        <p className="text-[8px] tracking-[0.35em] text-champagne/50 uppercase font-sans mb-1.5">{item.category}</p>
        <h3 className="font-serif text-[1.2rem] text-ivory italic leading-tight mb-2">{item.name}</h3>
        <p className="text-[11px] text-ivory/35 font-sans leading-relaxed line-clamp-2 mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <p className="font-serif text-base text-champagne">{item.price}</p>
          <span className="text-[8px] tracking-[0.2em] text-ivory/20 uppercase font-sans group-hover:text-champagne/50 transition-colors">Order →</span>
        </div>
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

      {/* Hero header */}
      <div
        className="pt-32 pb-16 px-5 md:px-12 max-w-7xl mx-auto relative"
        style={{ borderBottom: '1px solid hsla(355,72%,52%,0.1)' }}
      >
        <div className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 80% at 80% 50%, hsla(355,72%,52%,0.04) 0%, transparent 70%)' }} />
        <p className="text-[9px] tracking-[0.5em] text-champagne/70 uppercase font-sans mb-4">— Our Work</p>
        <h1 className="font-serif text-[clamp(2.8rem,8vw,6rem)] text-ivory leading-[0.9] mb-6">
          The <em className="text-champagne">Collection</em>
        </h1>
        <p className="text-sm text-ivory/35 font-sans max-w-md leading-relaxed">
          Every cake tells a story. Browse our creations — from elaborate wedding centrepieces to joyful kids' birthdays.
        </p>
      </div>

      {/* Filters */}
      <div className="px-5 md:px-12 max-w-7xl mx-auto mt-10 mb-10">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex-shrink-0 text-[9px] tracking-[0.2em] uppercase font-sans px-5 py-2.5 transition-all duration-300"
              style={{
                color: filter === f ? 'hsl(30, 40%, 96%)' : 'hsla(355,72%,52%,0.45)',
                background: filter === f ? 'hsl(355, 72%, 52%)' : 'transparent',
                border: `1px solid ${filter === f ? 'hsl(355, 72%, 52%)' : 'hsla(355,72%,52%,0.2)'}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 md:px-12 max-w-7xl mx-auto pb-28">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {filtered.map((item, i) => <CakeCard key={item.id} item={item} index={i} />)}
        </div>

        <div className="mt-20 border-t border-champagne/10 pt-14 text-center">
          <p className="font-serif text-2xl md:text-3xl text-ivory italic mb-4">Don't see what you're looking for?</p>
          <p className="text-sm text-ivory/35 font-sans mb-8 max-w-sm mx-auto leading-relaxed">We create fully custom cakes for any occasion. Tell us your vision and we'll bring it to life.</p>
          <Link to="/order" className="btn-primary inline-block"><span>Request Custom Cake</span></Link>
        </div>
      </div>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
