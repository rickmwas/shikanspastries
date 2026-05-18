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

export default function StorySection() {
  const secRef = useRef(null);
  const inView = useInView(secRef, 0.05);

  return (
    <section id="story" className="py-32 md:py-44 overflow-hidden grain-overlay" style={{ background: 'hsl(25, 20%, 10%)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Top: Asymmetric image + text */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32 items-center" ref={secRef}>
          {/* Image block */}
          <div
            className="relative transition-all duration-1000"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-60px)' }}
          >
            <div className="relative">
              <img
                src={FOUNDER_IMG}
                alt="Shikan Founder"
                className="w-full aspect-[3/4] object-cover object-top"
                style={{ filter: 'sepia(0.2) contrast(1.05) brightness(0.9)' }}
              />
              {/* Offset decorative frame */}
              <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 border border-champagne/20 pointer-events-none" />
              {/* Champagne accent block */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-champagne/10 border border-champagne/20" />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-8 -right-4 md:-right-8 bg-espresso border border-champagne/20 px-6 py-5">
              <p className="font-serif text-3xl text-champagne">6+</p>
              <p className="text-[9px] tracking-[0.25em] text-ivory/40 uppercase font-sans mt-1">Years of Craft</p>
            </div>
          </div>

          {/* Text block */}
          <div
            className="transition-all duration-1000 delay-200"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(60px)' }}
          >
            <p className="text-[10px] tracking-[0.45em] text-champagne uppercase font-sans mb-6">— The Story</p>
            <h2 className="font-serif text-[clamp(2.4rem,5vw,4.5rem)] text-ivory leading-[1.0] mb-8">
              Born of Passion,
              <br />
              <em className="text-champagne">Rooted in Maai Mahiu</em>
            </h2>
            <div className="space-y-5 text-ivory/50 font-sans font-light text-sm leading-loose max-w-md">
              <p>
                Shikan Pastries was born from a singular obsession — the belief that Maai Mahiu deserved pastries crafted with love and artistry, rooted in the warmth and spirit of Nakuru County.
              </p>
              <p>
                Our founder began with a single oven, a worn notebook of recipes, and an unshakeable vision: to elevate the everyday act of indulgence into something genuinely beautiful.
              </p>
              <p>
                Today, every piece that leaves our kitchen tells that same story — of relentless craft, of local pride, and of pastry as an art form.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-champagne/15">
              <p className="font-serif text-xl text-champagne italic">"Pastry is my poetry."</p>
              <p className="text-[10px] tracking-[0.25em] text-ivory/30 uppercase font-sans mt-2">— Shikan, Founder & Head Pastry Chef</p>
            </div>
          </div>
        </div>

        {/* Craft pillars */}
        <div className="grid md:grid-cols-3 gap-0 border-t border-champagne/15">
          {PILLARS.map((p, i) => (
            <PillarItem key={p.num} pillar={p} index={i} />
          ))}
        </div>

        {/* Full width craft image */}
        <div className="mt-32 relative overflow-hidden">
          <img
            src={CRAFT_IMG}
            alt="The Craft"
            className="w-full h-[50vh] md:h-[60vh] object-cover"
            style={{ filter: 'brightness(0.7) contrast(1.1) saturate(0.85)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-transparent to-espresso/40" />
          <div className="absolute inset-0 flex items-center px-8 md:px-20">
            <div>
              <p className="text-[10px] tracking-[0.45em] text-champagne uppercase font-sans mb-4">— Craftsmanship</p>
              <h3 className="font-serif text-4xl md:text-6xl text-ivory leading-tight max-w-md">
                Made by Hand.<br />
                <em className="text-champagne">Finished with Love.</em>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarItem({ pillar, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.2);
  return (
    <div
      ref={ref}
      className="py-10 px-8 border-b md:border-b-0 md:border-r border-champagne/10 last:border-0 transition-all duration-700"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${index * 0.15}s`,
      }}
    >
      <p className="font-serif text-5xl text-champagne/20 mb-6">{pillar.num}</p>
      <h4 className="font-serif text-xl text-ivory mb-4">{pillar.title}</h4>
      <p className="text-xs text-ivory/35 font-sans font-light leading-relaxed">{pillar.text}</p>
    </div>
  );
}