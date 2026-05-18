import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const IMGS = {
  t1: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=700&q=80',
  t2: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=700&q=80',
  t3: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=700&q=80',
  t4: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=700&q=80',
};

const TESTIMONIALS = [
  {
    quote: "The wedding cake was so extraordinary that our guests were photographing it before they even photographed us. Shikan understood our vision completely.",
    name: "Amara & David N.",
    event: "Wedding — Karen, Nairobi",
    initial: "A",
    img: IMGS.t1,
    stars: 5,
  },
  {
    quote: "I ordered a custom birthday cake and it was genuinely the most beautiful thing I have ever tasted. The packaging alone made me emotional.",
    name: "Zawadi M.",
    event: "Birthday Celebration",
    initial: "Z",
    img: IMGS.t2,
    stars: 5,
  },
  {
    quote: "For our product launch dessert table, Shikan created an installation that stopped every single guest in their tracks. Pure artistry.",
    name: "Makena Ochieng",
    event: "Corporate Launch Event",
    initial: "M",
    img: IMGS.t3,
    stars: 5,
  },
  {
    quote: "There are very few things in Kenya that feel truly world-class. Shikan Pastries is one of them. Incomparable quality and care.",
    name: "James K.",
    event: "Luxury Gift Order",
    initial: "J",
    img: IMGS.t4,
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
  const [animDir, setAnimDir] = useState(1);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

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
    }, 320);
  };

  useEffect(() => {
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [animating]);

  const current = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 overflow-hidden grain-overlay relative"
      style={{ background: 'hsl(350, 45%, 7%)' }}
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 70% 50%, hsla(355,72%,52%,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div
          className="mb-14 md:mb-18 flex flex-col md:flex-row md:items-end md:justify-between gap-5"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.8s ease' }}
        >
          <div>
            <p className="text-[9px] tracking-[0.5em] text-champagne/70 uppercase font-sans mb-4">— What They Say</p>
            <h2 className="font-serif text-[clamp(2rem,5vw,4.2rem)] text-ivory leading-[0.92]">
              Loved by <em className="text-champagne">Real Clients</em>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 border border-champagne/20 flex items-center justify-center text-champagne/40 hover:text-champagne hover:border-champagne/50 transition-all duration-300 hover:bg-champagne/5"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => go(1)}
              className="w-11 h-11 border border-champagne/20 flex items-center justify-center text-champagne/40 hover:text-champagne hover:border-champagne/50 transition-all duration-300 hover:bg-champagne/5"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Main carousel */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="grid md:grid-cols-2 gap-0 overflow-hidden"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.15s' }}
        >
          {/* Photo */}
          <div
            className="relative overflow-hidden"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? `translateX(${animDir * -40}px)` : 'translateX(0)',
              transition: 'opacity 0.32s ease, transform 0.32s ease',
              aspectRatio: '4/3',
            }}
          >
            <img src={current.img} alt={current.name} className="w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent" />
            {/* Event badge */}
            <div
              className="absolute bottom-5 left-5 px-3.5 py-1.5 text-[8px] tracking-[0.25em] uppercase font-sans"
              style={{ background: 'hsl(355, 72%, 52%)', color: 'hsl(30, 40%, 96%)' }}
            >
              {current.event}
            </div>
            {/* Counter */}
            <div className="absolute top-5 right-5 text-[10px] font-sans text-ivory/25">
              {String(active + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </div>
          </div>

          {/* Review */}
          <div
            className="flex flex-col justify-between p-8 md:p-12"
            style={{
              background: 'hsl(350, 40%, 10%)',
              opacity: animating ? 0 : 1,
              transform: animating ? `translateX(${animDir * 40}px)` : 'translateX(0)',
              transition: 'opacity 0.32s ease, transform 0.32s ease',
            }}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-8">
              {Array(current.stars).fill(0).map((_, i) => (
                <Star key={i} size={11} fill="hsl(355, 72%, 52%)" className="text-champagne" />
              ))}
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {/* Large quote mark */}
              <div className="font-serif text-[5.5rem] leading-none text-champagne/8 -mb-6 -ml-1 select-none">"</div>
              <blockquote className="font-serif text-[clamp(1.1rem,2.2vw,1.65rem)] text-ivory/85 leading-[1.45] mb-8">
                {current.quote}
              </blockquote>
            </div>

            {/* Author */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-10 h-10 flex items-center justify-center font-serif text-base italic flex-shrink-0"
                  style={{ background: 'hsl(355, 72%, 52%)', color: 'hsl(30, 40%, 96%)' }}
                >
                  {current.initial}
                </div>
                <div>
                  <p className="font-sans text-sm text-ivory font-medium">{current.name}</p>
                  <p className="font-sans text-[9px] text-champagne/45 tracking-[0.2em] uppercase mt-0.5">{current.event}</p>
                </div>
              </div>

              {/* Dots + mobile arrows */}
              <div className="flex items-center justify-between pt-6 border-t border-champagne/10">
                <div className="flex items-center gap-1.5">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setAnimDir(i > active ? 1 : -1); setActive(i); }}
                      className="transition-all duration-400"
                      style={{
                        width: active === i ? '2rem' : '0.3rem',
                        height: '2px',
                        background: active === i ? 'hsl(355, 72%, 52%)' : 'rgba(200,50,60,0.2)',
                      }}
                    />
                  ))}
                </div>
                <div className="flex md:hidden items-center gap-2">
                  <button onClick={() => go(-1)} className="w-9 h-9 border border-champagne/20 flex items-center justify-center text-champagne/50 hover:text-champagne transition-all">
                    <ChevronLeft size={13} />
                  </button>
                  <button onClick={() => go(1)} className="w-9 h-9 border border-champagne/20 flex items-center justify-center text-champagne/50 hover:text-champagne transition-all">
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div
          className="mt-3 grid grid-cols-4 gap-2"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.3s' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              onClick={() => { setAnimDir(i > active ? 1 : -1); setActive(i); }}
              className="relative overflow-hidden transition-all duration-400"
              style={{ opacity: active === i ? 1 : 0.3, aspectRatio: '16/9' }}
            >
              <img src={t.img} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              {active === i && <div className="absolute inset-0 border border-champagne/70" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
