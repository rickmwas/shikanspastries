import React, { useRef, useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/shikan/Navbar';
import BottomNav from '../components/shikan/BottomNav';
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

/* ─── LIGHTBOX with swipe support ──────────────────────── */
function Lightbox({ photo, index, total, onClose, onPrev, onNext }) {
  const startX = useRef(null);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose, onPrev, onNext]);

  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 50) { dx < 0 ? onNext() : onPrev(); }
    startX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(6,2,3,0.97)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 w-11 h-11 border border-champagne/20 flex items-center justify-center text-ivory/60 hover:text-champagne hover:border-champagne/50 transition-all z-10 touch-active"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
      >
        <X size={16} />
      </button>

      {/* Prev / Next */}
      {total > 1 && (
        <>
          <button
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 border border-champagne/20 flex items-center justify-center text-ivory/50 hover:text-champagne hover:border-champagne/50 transition-all z-10 touch-active"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 border border-champagne/20 flex items-center justify-center text-ivory/50 hover:text-champagne hover:border-champagne/50 transition-all z-10 touch-active"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Image */}
      <div
        className="flex flex-col items-center px-14 sm:px-16 max-w-4xl w-full mx-auto"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={photo.url}
          alt={photo.label}
          className="max-w-full max-h-[75svh] object-contain"
        />
        <div className="flex items-center justify-between w-full mt-4 px-1">
          <p className="font-serif text-sm sm:text-base text-ivory/60 italic">{photo.label}</p>
          <p className="text-[9px] tracking-[0.2em] text-ivory/20 font-sans">{index + 1} / {total}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── PHOTO ITEM (desktop masonry) ─────────────────────── */
function PhotoItem({ photo, index, onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className={`${photo.span} relative overflow-hidden cursor-pointer min-h-[160px] group`}
      onClick={() => onOpen(index)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1)' : 'scale(0.97)',
        transition: `opacity 0.8s ease ${index * 0.07}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s`,
      }}
    >
      <img
        src={photo.url}
        alt={photo.label}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
        loading="lazy"
        style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/20 to-transparent flex flex-col justify-end p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
      >
        <p className="font-serif text-base md:text-lg text-ivory italic">{photo.label}</p>
        <p className="text-[8px] tracking-[0.3em] text-champagne/70 uppercase font-sans mt-1">View full →</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function Gallery() {
  const [lbIdx, setLbIdx]   = useState(null);

  const open   = useCallback((i) => setLbIdx(i), []);
  const close  = useCallback(() => setLbIdx(null), []);
  const prev   = useCallback(() => setLbIdx(i => (i - 1 + PHOTOS.length) % PHOTOS.length), []);
  const next   = useCallback(() => setLbIdx(i => (i + 1) % PHOTOS.length), []);

  return (
    <div className="min-h-screen bg-espresso">
      <Navbar />

      {/* Header */}
      <div
        className="pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto"
        style={{ borderBottom: '1px solid hsla(355,72%,52%,0.1)' }}
      >
        <p className="text-[9px] tracking-[0.5em] text-champagne/70 uppercase font-sans mb-3 sm:mb-4">— Our Work</p>
        <h1
          className="font-serif text-ivory leading-[0.9] mb-4 sm:mb-5"
          style={{ fontSize: 'clamp(2.4rem, 9vw, 6rem)' }}
        >
          The <em className="text-champagne">Gallery</em>
        </h1>
        <p className="text-sm text-ivory/35 font-sans max-w-sm leading-relaxed">
          A glimpse into our creations — captured live at events and in our studio in Maai Mahiu.
        </p>
      </div>

      <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto py-8 sm:py-12">

        {/* ── Mobile: 2-col grid, last item full width ── */}
        <div className="md:hidden grid grid-cols-2 gap-2">
          {PHOTOS.map((p, i) => {
            const isLast = i === PHOTOS.length - 1;
            return (
              <div
                key={i}
                className={`relative overflow-hidden cursor-pointer group${isLast && PHOTOS.length % 2 !== 0 ? ' col-span-2' : ''}`}
                style={{ aspectRatio: isLast && PHOTOS.length % 2 !== 0 ? '16/9' : '1/1' }}
                onClick={() => open(i)}
              >
                <img
                  src={p.url} alt={p.label}
                  className="w-full h-full object-cover transition-transform duration-500 active:scale-105"
                  loading="lazy"
                />
                {/* Always-on label on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                  <p className="font-serif text-xs text-ivory/80 italic">{p.label}</p>
                </div>
                {/* Tap indicator */}
                <div className="absolute top-2 right-2">
                  <span className="w-6 h-6 bg-black/40 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Desktop masonry ── */}
        <div className="hidden md:grid grid-cols-3 gap-3" style={{ gridTemplateRows: 'repeat(3, 240px)' }}>
          {PHOTOS.map((p, i) => <PhotoItem key={i} photo={p} index={i} onOpen={open} />)}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm text-ivory/35 font-sans mb-5 sm:mb-7 max-w-sm mx-auto leading-relaxed">
            Want to see your cake here? Tag us on Instagram or send us your photos!
          </p>
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center"
          >
            <span>Share Your Cake</span>
          </a>
        </div>
      </div>

      <div className="pb-bottom-nav md:pb-0">
        <Footer />
      </div>
      <FloatingWhatsApp />
      <BottomNav />

      {lbIdx !== null && (
        <Lightbox
          photo={PHOTOS[lbIdx]}
          index={lbIdx}
          total={PHOTOS.length}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}
