const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../components/shikan/Navbar';
import Footer from '../components/shikan/Footer';
import FloatingWhatsApp from '../components/shikan/FloatingWhatsApp';

const PHOTOS = [
  { url: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/87bdd2c04_shikan7.jpg', label: 'Wedding Showcase', span: 'col-span-2 row-span-2' },
  { url: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/76558444d_shikan.jpg', label: 'Wedding Cake', span: 'col-span-1 row-span-1' },
  { url: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/6d1b3c918_shikanevent.jpg', label: 'Event Spread', span: 'col-span-1 row-span-1' },
  { url: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/27c1429ab_shikan4.jpg', label: 'Princess Cake', span: 'col-span-1 row-span-1' },
  { url: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/1b504253d_shikan3.jpg', label: 'Birthday Special', span: 'col-span-1 row-span-1' },
  { url: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/2edb493f9_shikan2.jpg', label: 'Custom Cake', span: 'col-span-1 row-span-1' },
  { url: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/7ed032e97_shikan1.jpg', label: 'Character Cake', span: 'col-span-1 row-span-1' },
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

function PhotoItem({ photo, index }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`${photo.span} relative overflow-hidden cursor-pointer min-h-[160px]`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1)' : 'scale(0.97)',
        transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s`,
      }}
    >
      <img
        src={photo.url}
        alt={photo.label}
        className="w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
      />
      <div
        className="absolute inset-0 bg-espresso/60 flex items-end p-4 transition-opacity duration-400"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <p className="font-serif text-base text-ivory italic">{photo.label}</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="min-h-screen bg-espresso">
      <Navbar />
      <div className="pt-28 pb-10 px-5 md:px-12 max-w-7xl mx-auto">
        <p className="text-[10px] tracking-[0.45em] text-champagne uppercase font-sans mb-3">— Our Work</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] text-ivory leading-[0.95] mb-4">
          The <em className="text-champagne">Gallery</em>
        </h1>
        <p className="text-sm text-ivory/40 font-sans max-w-sm leading-relaxed">
          A glimpse into our creations — captured live at events and in our studio in Maai Mahiu.
        </p>
      </div>

      {/* Mobile: simple grid. Desktop: masonry-style */}
      <div className="px-5 md:px-12 max-w-7xl mx-auto pb-24">
        {/* Mobile grid */}
        <div className="grid grid-cols-2 gap-2 md:hidden">
          {PHOTOS.map((p, i) => (
            <div key={i} className="relative overflow-hidden aspect-square">
              <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-transparent flex items-end p-2">
                <p className="font-serif text-xs text-ivory italic">{p.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop masonry */}
        <div
          className="hidden md:grid grid-cols-3 gap-3"
          style={{ gridTemplateRows: 'repeat(3, 240px)' }}
        >
          {PHOTOS.map((p, i) => <PhotoItem key={i} photo={p} index={i} />)}
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm text-ivory/40 font-sans mb-6">Want to see your cake here? Tag us or send us your photos!</p>
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-block"
          >
            <span>Share Your Cake</span>
          </a>
        </div>
      </div>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}