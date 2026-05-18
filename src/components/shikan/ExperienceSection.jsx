const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef, useState, useEffect } from 'react';

const WEDDING_IMG = 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/cbfbd68b0_generated_image.png';
const COLLECTION_IMG = 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/8a675abbf_generated_image.png';

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

const EXPERIENCES = [
  {
    title: 'Weddings',
    subtitle: 'Forever Begins with a Cake',
    desc: 'Bespoke multi-tier celebration cakes that become the centrepiece of your most cherished day. Each design is unique, personal, extraordinary.',
    img: WEDDING_IMG,
    price: 'From KES 25,000',
  },
  {
    title: 'Luxury Events',
    subtitle: 'Beyond the Ordinary',
    desc: 'Curated pastry installations, dessert tables, and custom sweet displays for corporate galas, product launches, and milestone celebrations.',
    img: COLLECTION_IMG,
    price: 'Custom Packages',
  },
  {
    title: 'Custom Creations',
    subtitle: 'Your Vision, Our Craft',
    desc: "Tell us your story and we'll sculpt it in sugar and chocolate. From intimate birthdays to grand statements — nothing is beyond our craft.",
    img: WEDDING_IMG,
    price: 'By Consultation',
  },
];

export default function ExperienceSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef);
  const [active, setActive] = useState(0);

  return (
    <section id="experiences" className="py-32 md:py-44 bg-espresso grain-overlay">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div ref={headRef} className="mb-20">
          <p
            className="text-[10px] tracking-[0.45em] text-champagne uppercase font-sans mb-5 transition-all duration-700"
            style={{ opacity: headInView ? 1 : 0 }}
          >
            — Experiences
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2
              className="font-serif text-[clamp(2.8rem,6vw,5.5rem)] text-ivory leading-[0.95] transition-all duration-700 delay-100"
              style={{ opacity: headInView ? 1 : 0, transform: headInView ? 'translateY(0)' : 'translateY(30px)' }}
            >
              Crafted for
              <br />
              <em className="text-champagne">Life's Milestones</em>
            </h2>
            <p
              className="text-sm text-ivory/40 font-sans font-light max-w-xs leading-relaxed transition-all duration-700 delay-200"
              style={{ opacity: headInView ? 1 : 0 }}
            >
              Every celebration deserves a pastry that matches its magnitude. We bring luxury to your most meaningful moments.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-0 mb-16 border-b border-champagne/10 overflow-x-auto">
          {EXPERIENCES.map((exp, i) => (
            <button
              key={exp.title}
              onClick={() => setActive(i)}
              className="px-6 py-4 whitespace-nowrap transition-all duration-300 relative"
              style={{ color: active === i ? 'hsl(355, 72%, 62%)' : 'rgba(255,255,255,0.3)' }}
            >
              <span className="text-[11px] tracking-[0.2em] uppercase font-sans">{exp.title}</span>
              <span
                className="absolute bottom-0 left-0 right-0 h-px bg-champagne transition-all duration-300"
                style={{ transform: active === i ? 'scaleX(1)' : 'scaleX(0)' }}
              />
            </button>
          ))}
        </div>

        {/* Active Panel */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              key={active}
              src={EXPERIENCES[active].img}
              alt={EXPERIENCES[active].title}
              className="w-full aspect-[4/3] object-cover animate-scale-in"
              style={{ filter: 'brightness(0.8) contrast(1.1) saturate(0.85)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="font-serif text-lg text-champagne italic">{EXPERIENCES[active].subtitle}</span>
            </div>
          </div>

          {/* Content */}
          <div key={`content-${active}`} className="animate-fade-up">
            <p className="text-[10px] tracking-[0.35em] text-champagne/60 uppercase font-sans mb-4">
              {EXPERIENCES[active].title}
            </p>
            <h3 className="font-serif text-4xl md:text-5xl text-ivory mb-8 leading-tight">
              {EXPERIENCES[active].subtitle}
            </h3>
            <p className="text-sm text-ivory/50 font-sans font-light leading-relaxed mb-8 max-w-md">
              {EXPERIENCES[active].desc}
            </p>

            <div className="flex items-center gap-6 mb-10">
              <div>
                <p className="text-[9px] tracking-[0.3em] text-champagne/40 uppercase font-sans">Starting</p>
                <p className="font-serif text-2xl text-champagne mt-1">{EXPERIENCES[active].price}</p>
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Begin a Conversation</span>
            </button>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-32 border-t border-champagne/10 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: '200+', label: 'Weddings Catered' },
            { val: '50+', label: 'Corporate Events' },
            { val: 'Custom', label: 'Every Design' },
            { val: '72hr', label: 'Lead Time' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl text-champagne mb-2">{s.val}</p>
              <p className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase font-sans">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}