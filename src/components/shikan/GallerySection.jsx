const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef, useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';

const GALLERY = [
  { img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/c40e729c3_generated_image.png', span: 'col-span-1 row-span-2', label: 'Velvet Noir' },
  { img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/bc2322690_generated_image.png', span: 'col-span-1 row-span-1', label: 'Morning Ritual' },
  { img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/a24c2c6d1_generated_image.png', span: 'col-span-2 row-span-1', label: 'Celebration' },
  { img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/8a675abbf_generated_image.png', span: 'col-span-1 row-span-1', label: 'The Collection' },
  { img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/cbfbd68b0_generated_image.png', span: 'col-span-1 row-span-1', label: 'Wedding Tier' },
  { img: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/9f40173e8_generated_image.png', span: 'col-span-2 row-span-1', label: 'The Craft' },
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

function GalleryItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`${item.span} relative overflow-hidden cursor-pointer min-h-[200px]`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1)' : 'scale(0.96)',
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
      }}
    >
      <img
        src={item.img}
        alt={item.label}
        className="w-full h-full object-cover transition-transform duration-700"
        style={{
          transform: hovered ? 'scale(1.08)' : 'scale(1.0)',
          filter: 'brightness(0.75) contrast(1.1) saturate(0.9)',
        }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 bg-espresso/50 flex items-end p-5 transition-opacity duration-400"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div className="flex items-center justify-between w-full">
          <p className="font-serif text-lg text-ivory italic">{item.label}</p>
          <Instagram size={14} className="text-champagne" />
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef);

  return (
    <section id="gallery" className="py-32 md:py-40 grain-overlay" style={{ background: 'hsl(350, 50%, 6%)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headRef} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p
              className="text-[10px] tracking-[0.45em] text-champagne uppercase font-sans mb-5 transition-all duration-700"
              style={{ opacity: headInView ? 1 : 0 }}
            >
              — Visual Stories
            </p>
            <h2
              className="font-serif text-[clamp(2.8rem,5.5vw,5rem)] text-ivory leading-[0.95] transition-all duration-700 delay-100"
              style={{ opacity: headInView ? 1 : 0, transform: headInView ? 'translateY(0)' : 'translateY(30px)' }}
            >
              The Gallery
            </h2>
          </div>

          <div
            className="flex items-center gap-6 transition-all duration-700 delay-200"
            style={{ opacity: headInView ? 1 : 0 }}
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-champagne/60 hover:text-champagne transition-colors duration-300 group"
            >
              <Instagram size={16} />
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans">@shikanpastries</span>
              <span className="w-0 group-hover:w-8 h-px bg-champagne transition-all duration-300" />
            </a>
          </div>
        </div>

        {/* Masonry Grid */}
        <div
          className="grid grid-cols-3 gap-3 md:gap-4"
          style={{ gridTemplateRows: 'repeat(3, 280px)' }}
        >
          {GALLERY.map((item, i) => (
            <GalleryItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-champagne/50 hover:text-champagne transition-colors duration-300 group"
          >
            <span className="text-[11px] tracking-[0.3em] uppercase font-sans">View Full Gallery on Instagram</span>
            <span className="w-8 h-px bg-champagne/30 group-hover:w-16 group-hover:bg-champagne transition-all duration-500" />
          </a>
        </div>
      </div>
    </section>
  );
}