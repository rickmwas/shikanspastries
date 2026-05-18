import React, { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Navbar from '../components/shikan/Navbar';
import Footer from '../components/shikan/Footer';
import FloatingWhatsApp from '../components/shikan/FloatingWhatsApp';

const PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=85', label: 'Wedding Showcase',  span: 'col-span-2 row-span-2' },
  { url: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=80',  label: 'Wedding Cake',     span: 'col-span-1 row-span-1' },
  { url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80',  label: 'Event Spread',     span: 'col-span-1 row-span-1' },
  { url: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800&q=80',     label: 'Floral Cake',      span: 'col-span-1 row-span-1' },
  { url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',  label: 'Birthday Special', span: 'col-span-1 row-span-1' },
  { url: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=800&q=80',     label: 'Multi-Tier',       span: 'col-span-1 row-span-1' },
  { url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',  label: 'Birthday Cake',    span: 'col-span-1 row-span-1' },
];

function useInView(ref, threshold = 0.08) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function PhotoItem({ photo, index, onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`${photo.span} relative overflow-hidden cursor-pointer min-h-[160px] group`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(photo)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1)' : 'scale(0.96)',
        transition: `opacity 0.8s ease ${index * 0.07}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s`,
      }}
    >
      <img
        src={photo.url}
        alt={photo.label}
        className="w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent flex flex-col justify-end p-4 md:p-5 transition-opacity duration-400"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <p className="font-serif text-base md:text-lg text-ivory italic">{photo.label}</p>
        <p className="text-[8px] tracking-[0.3em] text-champagne/70 uppercase font-sans mt-1">View →</p>
      </div>
      {/* Always-visible subtle gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}

function Lightbox({ photo, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(8,2,4,0.95)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 w-10 h-10 border border-champagne/20 flex items-center justify-center text-ivory/60 hover:text-champagne hover:border-champagne/50 transition-all z-10"
        onClick={onClose}
      >
        <X size={16} />
      </button>
      <div className="max-w-3xl max-h-[85vh] mx-5" onClick={e => e.stopPropagation()}>
        <img src={photo.url} alt={photo.label} className="max-w-full max-h-[78vh] object-contain" />
        <p className="font-serif text-base text-ivory/60 italic text-center mt-4">{photo.label}</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="min-h-screen bg-espresso">
      <Navbar />

      {/* Header */}
      <div
        className="pt-32 pb-14 px-5 md:px-12 max-w-7xl mx-auto"
        style={{ borderBottom: '1px solid hsla(355,72%,52%,0.1)' }}
      >
        <p className="text-[9px] tracking-[0.5em] text-champagne/70 uppercase font-sans mb-4">— Our Work</p>
        <h1 className="font-serif text-[clamp(2.8rem,8vw,6rem)] text-ivory leading-[0.9] mb-5">
          The <em className="text-champagne">Gallery</em>
        </h1>
        <p className="text-sm text-ivory/35 font-sans max-w-sm leading-relaxed">
          A glimpse into our creations — captured live at events and in our studio in Maai Mahiu.
        </p>
      </div>

      <div className="px-5 md:px-12 max-w-7xl mx-auto py-12 pb-28">
        {/* Mobile grid */}
        <div className="grid grid-cols-2 gap-2 md:hidden">
          {PHOTOS.map((p, i) => (
            <div
              key={i}
              className="relative overflow-hidden aspect-square cursor-pointer group"
              onClick={() => setLightbox(p)}
            >
              <img src={p.url} alt={p.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <p className="font-serif text-xs text-ivory italic">{p.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop masonry */}
        <div className="hidden md:grid grid-cols-3 gap-3" style={{ gridTemplateRows: 'repeat(3, 240px)' }}>
          {PHOTOS.map((p, i) => <PhotoItem key={i} photo={p} index={i} onOpen={setLightbox} />)}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-ivory/35 font-sans mb-7 max-w-sm mx-auto leading-relaxed">
            Want to see your cake here? Tag us on Instagram or send us your photos!
          </p>
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

      {lightbox && <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}
