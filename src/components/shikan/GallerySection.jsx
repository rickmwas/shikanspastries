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
      className={`${item.span} relative overflow-hidden cursor-pointer group`}
      style={{ minHeight: 'clamp(180px, 22vw, 280px)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated entrance */}
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'scale(1)' : 'scale(0.95)',
          transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.08}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.08}s`,
        }}
        className="w-full h-full relative"
      >
        {/* Image */}
        <img
          src={item.img}
          alt={item.label}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{
            transform: hovered ? 'scale(1.06)' : 'scale(1.0)',
            filter: hovered 
              ? 'brightness(0.65) contrast(1.15) saturate(0.95)' 
              : 'brightness(0.75) contrast(1.1) saturate(0.9)',
          }}
        />

        {/* Overlay — elegant gradient */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: hovered 
              ? 'linear-gradient(135deg, rgba(10,3,5,0.7) 0%, rgba(207,54,59,0.2) 100%)'
              : 'linear-gradient(135deg, rgba(10,3,5,0.3) 0%, rgba(10,3,5,0.6) 100%)',
          }}
        />

        {/* Label + Icon */}
        <div
          className="absolute inset-0 flex items-end p-5 md:p-6 transition-all duration-500"
          style={{
            opacity: hovered ? 1 : 0.6,
          }}
        >
          <div className="flex items-center justify-between w-full gap-4">
            <p className="font-serif text-base md:text-lg text-ivory italic leading-tight">
              {item.label}
            </p>
            <div
              className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded transition-all duration-300"
              style={{
                background: hovered ? 'hsla(355, 72%, 52%, 0.25)' : 'transparent',
              }}
            >
              <Instagram 
                size={14} 
                className="text-champagne transition-transform duration-300"
                style={{
                  transform: hovered ? 'scale(1.1)' : 'scale(1)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef);

  return (
    <section id="gallery" className="py-40 md:py-56 grain-overlay relative overflow-hidden" style={{ background: 'hsl(350, 50%, 6%)' }}>
      {/* Subtle background glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% 20%, hsla(355, 72%, 52%, 0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header with improved hierarchy */}
        <div ref={headRef} className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <p
              className="text-[9px] tracking-[0.45em] text-champagne/60 uppercase font-sans mb-6 transition-all duration-700"
              style={{ opacity: headInView ? 1 : 0, transform: headInView ? 'translateY(0)' : 'translateY(-10px)' }}
            >
              — Visual Stories
            </p>
            <h2
              className="font-serif text-[clamp(2.8rem,6.5vw,5.5rem)] text-ivory leading-[0.92] transition-all duration-900 delay-100"
              style={{ 
                opacity: headInView ? 1 : 0, 
                transform: headInView ? 'translateY(0)' : 'translateY(40px)',
                letterSpacing: '-0.02em',
              }}
            >
              The Gallery
            </h2>
            <div
              className="h-px w-16 bg-champagne/40 mt-8 transition-all duration-900 delay-200"
              style={{ width: headInView ? '64px' : '0px' }}
            />
          </div>

          <div
            className="transition-all duration-900 delay-300"
            style={{ opacity: headInView ? 1 : 0, transform: headInView ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-ivory/50 group-hover:text-champagne transition-colors duration-300">Follow Us</span>
                <span className="text-[11px] tracking-[0.25em] uppercase font-sans text-champagne font-light">@shikanpastries</span>
              </div>
              <Instagram size={16} className="text-champagne/50 group-hover:text-champagne transition-colors duration-300" />
            </a>
          </div>
        </div>

        {/* Masonry Grid with improved styling */}
        <div
          className="grid grid-cols-3 gap-4 md:gap-5"
          style={{ gridTemplateRows: 'repeat(3, clamp(180px, 22vw, 280px))' }}
        >
          {GALLERY.map((item, i) => (
            <GalleryItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA with refined styling */}
        <div 
          className="mt-20 md:mt-28 pt-16 md:pt-24 border-t"
          style={{ borderColor: 'hsla(355, 72%, 52%, 0.15)' }}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 group"
          >
            <div className="flex flex-col">
              <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-ivory/40 group-hover:text-champagne transition-colors duration-300">Discover More</span>
              <span className="text-sm tracking-[0.15em] font-sans text-ivory group-hover:text-champagne transition-colors duration-300 font-light">On Instagram</span>
            </div>
            <div className="w-8 h-px bg-champagne/30 group-hover:w-16 group-hover:bg-champagne transition-all duration-400" />
          </a>
        </div>
      </div>
    </section>
  );
}