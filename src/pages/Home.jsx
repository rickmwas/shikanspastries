const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, MapPin } from 'lucide-react';
import Navbar from '../components/shikan/Navbar';
import Footer from '../components/shikan/Footer';
import FloatingWhatsApp from '../components/shikan/FloatingWhatsApp';
import LoadingScreen from '../components/shikan/LoadingScreen';
import TestimonialsSection from '../components/shikan/TestimonialsSection';

const IMGS = {
  hero: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/87bdd2c04_shikan7.jpg',
  wedding: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/76558444d_shikan.jpg',
  event: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/6d1b3c918_shikanevent.jpg',
  cake1: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/27c1429ab_shikan4.jpg',
  cake2: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/1b504253d_shikan3.jpg',
  cake3: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/2edb493f9_shikan2.jpg',
  cake4: 'https://media.db.com/images/public/6a0892e01776c18f7673a4ea/7ed032e97_shikan1.jpg',
};

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden grain-overlay">
      {/* Parallax bg */}
      <div className="absolute inset-0 will-change-transform" style={{ transform: `translateY(${scrollY * 0.25}px)` }}>
        <img src={IMGS.hero} alt="Shikan Pastries" className="w-full h-full object-cover object-center scale-110"
          style={{ filter: 'brightness(0.45) contrast(1.1) saturate(1.1)' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/50 to-transparent" />

      {/* Location pill */}
      <div
        className="absolute top-24 left-5 md:left-12 flex items-center gap-2 transition-all duration-1000 delay-500"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-10px)' }}
      >
        <MapPin size={10} className="text-champagne" />
        <span className="text-[9px] tracking-[0.35em] text-ivory/50 uppercase font-sans">Maai Mahiu, Nakuru</span>
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 md:px-12 pb-24 md:pb-28 pt-32 max-w-7xl mx-auto w-full">
        <div
          className="flex items-center gap-3 mb-6 transition-all duration-1000"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <div className="w-6 h-px bg-champagne/60" />
          <p className="text-[10px] tracking-[0.4em] text-champagne uppercase font-sans font-medium">Artisan Pastries & Custom Cakes</p>
        </div>

        <h1 className="font-serif text-[clamp(3.2rem,12vw,9rem)] text-white leading-[0.9] mb-8" style={{ letterSpacing: '-0.02em', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
          <span
            className="block italic transition-all duration-1000 delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(50px)' }}
          >
            Every Bite
          </span>
          <span
            className="block text-champagne transition-all duration-1000 delay-300"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(50px)' }}
          >
            Tells a
          </span>
          <span
            className="block italic transition-all duration-1000 delay-400"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(50px)' }}
          >
            Story
          </span>
        </h1>

        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-1000 delay-600"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <Link to="/collection" className="btn-primary text-center block sm:inline-block">
            <span>View Our Cakes</span>
          </Link>
          <Link to="/order" className="btn-outline text-center block sm:inline-block">
            <span>Order Now</span>
          </Link>
        </div>

        {/* Stats bar */}
        <div
          className="mt-16 pt-8 border-t border-champagne/10 flex gap-8 overflow-x-auto transition-all duration-1000 delay-700"
          style={{ opacity: visible ? 0.85 : 0 }}
        >
          {[
            { v: '500+', l: 'Cakes Monthly' },
            { v: '6+', l: 'Years Crafting' },
            { v: '100%', l: 'Handmade' },
            { v: '★ 5.0', l: 'Reviews' },
          ].map(s => (
            <div key={s.l} className="flex-shrink-0">
              <p className="font-serif text-xl md:text-2xl text-champagne">{s.v}</p>
              <p className="text-[9px] tracking-[0.15em] text-ivory/30 uppercase font-sans mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => document.querySelector('#featured')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute right-5 md:right-12 bottom-8 flex flex-col items-center gap-2 text-champagne/40 hover:text-champagne transition-colors"
      >
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  );
}

function FeaturedSection() {
  const ref = useRef(null);
  const inView = useInView(ref);

  const cards = [
    { img: IMGS.wedding, title: 'Wedding Cakes', sub: 'From KES 15,000', href: '/collection' },
    { img: IMGS.cake1, title: 'Kids Birthdays', sub: 'From KES 3,000', href: '/collection' },
    { img: IMGS.cake3, title: 'Custom Cakes', sub: 'From KES 2,000', href: '/collection' },
  ];

  return (
    <section id="featured" className="py-16 md:py-28 bg-espresso grain-overlay">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div ref={ref} className="mb-10 md:mb-16">
          <p className="text-[10px] tracking-[0.45em] text-champagne uppercase font-sans mb-3"
            style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease' }}>
            — What We Make
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-serif text-[clamp(2rem,6vw,4.5rem)] text-ivory leading-[0.95]"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.1s' }}
            >
              Made with <em className="text-champagne">Love</em><br />in Maai Mahiu
            </h2>
            <Link to="/collection"
              className="flex items-center gap-2 text-champagne/60 hover:text-champagne transition-colors group self-start md:self-auto"
              style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease 0.2s' }}
            >
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans">Full Collection</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 3-up grid — 1 col mobile, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
          {cards.map((c, i) => (
            <Link
              key={c.title}
              to={c.href}
              className="group relative overflow-hidden block"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.7s ease ${0.15 + i * 0.1}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.1}s`,
              }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-transparent flex flex-col justify-end p-5">
                <h3 className="font-serif text-2xl text-ivory italic mb-1">{c.title}</h3>
                <p className="text-[10px] tracking-[0.2em] text-champagne uppercase font-sans">{c.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function RealWorkSection() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section className="py-16 md:py-28" style={{ background: 'hsl(350, 38%, 9%)' }}>
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div ref={ref} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Images collage */}
          <div
            className="grid grid-cols-2 gap-2"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-40px)', transition: 'all 0.9s ease' }}
          >
            <div className="row-span-2 overflow-hidden aspect-[2/3]">
              <img src={IMGS.event} alt="Shikan Event" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden aspect-square">
              <img src={IMGS.cake4} alt="Birthday cake" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden aspect-square">
              <img src={IMGS.cake2} alt="Custom cake" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Text */}
          <div
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.9s ease 0.2s' }}
          >
            <p className="text-[10px] tracking-[0.45em] text-champagne uppercase font-sans mb-4">— Our Story</p>
            <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] text-ivory leading-[1.05] mb-6">
              Born in <em className="text-champagne">Maai Mahiu</em>,<br />
              Loved Across Kenya
            </h2>
            <div className="space-y-4 text-sm text-ivory/45 font-sans font-light leading-loose">
              <p>
                Shikan Pastries started with a single oven, a love for baking, and a dream — to bring beautifully crafted cakes to every special moment, right here in Nakuru County.
              </p>
              <p>
                Every cake that leaves our hands is made from scratch, decorated by hand, and designed to make your celebration unforgettable.
              </p>
            </div>

            <blockquote className="mt-8 border-l-2 border-champagne/40 pl-5">
              <p className="font-serif text-xl text-ivory/70 italic">"Pastry is my poetry."</p>
              <p className="text-[10px] tracking-[0.2em] text-champagne/40 uppercase font-sans mt-2">— Shikan, Founder</p>
            </blockquote>

            <Link to="/collection" className="mt-10 btn-primary inline-block">
              <span>See All Our Cakes</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden grain-overlay"
      style={{ background: 'hsl(355, 72%, 52%)' }}
    >
      <div ref={ref} className="max-w-4xl mx-auto px-5 md:px-12 text-center">
        <h2
          className="font-serif text-[clamp(2rem,7vw,5rem)] text-white leading-[0.95] mb-6 italic"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}
        >
          Your Perfect Cake<br />Starts Here
        </h2>
        <p
          className="text-sm text-white/70 font-sans max-w-sm mx-auto mb-8 leading-relaxed"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.1s' }}
        >
          We deliver across Maai Mahiu, Naivasha, Nairobi and surrounding areas. Order 3–5 days in advance.
        </p>
        <Link
          to="/order"
          className="inline-block bg-espresso text-ivory font-sans text-[10px] tracking-[0.25em] uppercase px-8 py-4 border border-white/20 hover:bg-white hover:text-espresso transition-all duration-400"
        >
          Place Your Order
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-espresso overflow-x-hidden">
      {!loaded && <LoadingScreen />}
      <div className="transition-opacity duration-1000" style={{ opacity: loaded ? 1 : 0 }}>
        <Navbar />
        <HeroSection />
        <FeaturedSection />
        <RealWorkSection />
        <TestimonialsSection />
        <CTABanner />
        <Footer />
        <FloatingWhatsApp />
      </div>
    </div>
  );
}