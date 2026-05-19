const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef, useState, useEffect } from 'react';

const FOUNDER_IMG = 'https://media.db.com/images/public/user_68ab3fb0c4e2b103946eed58/f0623e6b4_image.png';
const CRAFT_IMG = 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/9f40173e8_generated_image.png';

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

const PILLARS = [
  { num: '01', title: 'The Ingredients', text: 'We source the finest local Kenyan produce alongside imported European couverture chocolate, building layers of flavour that honour both worlds.' },
  { num: '02', title: 'The Craft', text: 'Each creation demands hours of patient work — hand-piped, hand-glazed, finished by touch. No shortcuts. Only devotion.' },
  { num: '03', title: 'The Ritual', text: 'Shikan believes that eating should feel like a ceremony. We craft for those who savour slowly, who choose beauty intentionally.' },
];

function PillarItem({ pillar, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.2);
  return (
    <div
      ref={ref}
      className="py-12 md:py-16 px-8 md:px-10 border-b md:border-b-0 md:border-r border-champagne/10 last:border-0 transition-all duration-900"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${100 + index * 150}ms`,
      }}
    >
      <p className="font-serif text-6xl md:text-7xl text-champagne/15 mb-8 font-light transition-all duration-700" style={{ transform: inView ? 'scale(1)' : 'scale(0.9)' }}>{pillar.num}</p>
      <h4 className="font-serif text-xl md:text-2xl text-ivory mb-5 leading-tight">{pillar.title}</h4>
      <p className="text-sm text-ivory/45 font-sans font-light leading-relaxed">{pillar.text}</p>
      <div className="h-px bg-champagne/30 mt-8 transition-all duration-700" style={{ width: inView ? '40px' : '0px' }} />
    </div>
  );
}

export default function StorySection() {
  const secRef = useRef(null);
  const inView = useInView(secRef, 0.05);

  return (
    <section id="story" className="py-40 md:py-56 overflow-hidden grain-overlay relative" style={{ background: 'hsl(25, 20%, 10%)' }}>
      <div className="absolute top-1/2 left-0 pointer-events-none -translate-y-1/2" style={{ background: 'radial-gradient(ellipse 80% 80% at 0% 50%, hsla(355, 72%, 52%, 0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 mb-32 md:mb-40 items-center" ref={secRef}>
          <div className="relative transition-all duration-1000" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-80px)' }}>
            <div className="relative">
              <img src={FOUNDER_IMG} alt="Shikan Founder" className="w-full aspect-[3/4] object-cover object-top" style={{ filter: 'sepia(0.15) contrast(1.08) brightness(0.88) saturate(1.05)' }} />
              <div className="absolute -bottom-8 -right-8 w-3/4 h-3/4 border-2 pointer-events-none transition-all duration-1000" style={{ borderColor: 'hsla(355, 72%, 52%, 0.2)', transform: inView ? 'scale(1) translate(0, 0)' : 'scale(0.95) translate(10px, 10px)' }} />
              <div className="absolute -top-6 -left-6 w-28 h-28 border border-champagne/15 transition-all duration-1000 delay-200" style={{ background: inView ? 'hsla(355, 72%, 52%, 0.03)' : 'transparent' }} />
            </div>
            <div className="absolute bottom-10 -right-6 md:-right-10 px-8 py-6 transition-all duration-1000 delay-300" style={{ background: 'rgba(10, 3, 5, 0.9)', border: '1px solid hsla(355, 72%, 52%, 0.25)', backdropFilter: 'blur(16px)', transform: inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)' }}>
              <p className="font-serif text-4xl text-champagne leading-none mb-2">6+</p>
              <p className="text-[9px] tracking-[0.3em] text-ivory/40 uppercase font-sans font-light">Years of Craft</p>
            </div>
          </div>

          <div className="transition-all duration-1000 delay-200" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(80px)' }}>
            <p className="text-[9px] tracking-[0.45em] text-champagne/60 uppercase font-sans mb-8 font-light">— The Story</p>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,4.2rem)] text-ivory leading-[1.05] mb-8 md:mb-10">
              Born of Passion,<br /><em className="text-champagne font-serif font-400">Rooted in Maai Mahiu</em>
            </h2>
            <div className="space-y-6 text-ivory/55 font-sans font-light text-sm md:text-base leading-relaxed max-w-lg">
              <p>Shikan Pastries was born from a singular obsession — the belief that Maai Mahiu deserved pastries crafted with love and artistry, rooted in the warmth and spirit of Nakuru County.</p>
              <p>Our founder began with a single oven, a worn notebook of recipes, and an unshakeable vision: to elevate the everyday act of indulgence into something genuinely beautiful.</p>
              <p>Today, every piece that leaves our kitchen tells that same story — of relentless craft, of local pride, and of pastry as an art form.</p>
            </div>
            <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t" style={{ borderColor: 'hsla(355, 72%, 52%, 0.15)' }}>
              <p className="font-serif text-xl md:text-2xl text-champagne italic leading-snug">"Pastry is my poetry."</p>
              <p className="text-[9px] tracking-[0.3em] text-ivory/30 uppercase font-sans mt-4 font-light">— Shikan, Founder & Head Pastry Chef</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border-t" style={{ borderColor: 'hsla(355, 72%, 52%, 0.15)' }}>
          {PILLARS.map((p, i) => (<PillarItem key={p.num} pillar={p} index={i} />))}
        </div>

        <div className="mt-32 md:mt-40 relative overflow-hidden">
          <div className="relative aspect-video md:aspect-auto md:h-[60vh]">
            <img src={CRAFT_IMG} alt="The Craft" className="w-full h-full object-cover" style={{ filter: 'brightness(0.6) contrast(1.15) saturate(0.9)' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/30 to-espresso/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 md:px-20 py-12">
              <div>
                <p className="text-[9px] tracking-[0.45em] text-champagne/70 uppercase font-sans mb-6 font-light">— Craftsmanship</p>
                <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-ivory leading-[1.1] max-w-2xl">
                  Made by<br />Hand, Finished<br /><em className="text-champagne">with Love</em>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}