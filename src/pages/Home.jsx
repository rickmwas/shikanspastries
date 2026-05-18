import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, MapPin } from 'lucide-react';
import Navbar from '../components/shikan/Navbar';
import Footer from '../components/shikan/Footer';
import FloatingWhatsApp from '../components/shikan/FloatingWhatsApp';
import LoadingScreen from '../components/shikan/LoadingScreen';
import TestimonialsSection from '../components/shikan/TestimonialsSection';

const IMGS = {
  hero:    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1400&q=85',
  wedding: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=900&q=80',
  event:   'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=900&q=80',
  cake1:   'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=900&q=80',
  cake2:   'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=900&q=80',
  cake3:   'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=900&q=80',
  cake4:   'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=80',
};

function useInView(ref, threshold = 0.12) {
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
      <div className="absolute inset-0 will-change-transform" style={{ transform: `translateY(${scrollY * 0.22}px)` }}>
        <img
          src={IMGS.hero} alt="Shikan Pastries"
          className="w-full h-full object-cover object-center scale-110"
          style={{ filter: 'brightness(0.38) contrast(1.12) saturate(1.1)' }}
        />
      </div>
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/60 to-transparent" />
      {/* Top glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 35% at 50% 0%, hsla(355,72%,52%,0.06) 0%, transparent 70%)' }} />

      {/* Location pill */}
      <div
        className="absolute top-24 left-5 md:left-12 flex items-center gap-2 transition-all duration-1000 delay-500"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-10px)' }}
      >
        <MapPin size={9} className="text-champagne" />
        <span className="text-[9px] tracking-[0.4em] text-ivory/40 uppercase font-sans">Maai Mahiu, Nakuru</span>
      </div>

      {/* Right side vertical label */}
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
        style={{ opacity: visible ? 0.35 : 0, transition: 'opacity 1.2s ease 0.8s' }}
      >
        <div className="w-px h-16 bg-champagne/30" />
        <span className="writing-vertical text-[8px] tracking-[0.35em] text-ivory/30 uppercase font-sans">Est. 2018</span>
        <div className="w-px h-16 bg-champagne/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 md:px-12 pb-24 md:pb-32 pt-32 max-w-7xl mx-auto w-full">
        <div
          className="flex items-center gap-3 mb-6 transition-all duration-1000"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <div className="w-8 h-px bg-champagne/50" />
          <p className="text-[9px] tracking-[0.45em] text-champagne/80 uppercase font-sans font-medium">Artisan Pastries & Custom Cakes</p>
        </div>

        <h1
          className="font-serif text-[clamp(3.5rem,13vw,10rem)] text-ivory leading-[0.88] mb-10"
          style={{ letterSpacing: '-0.025em', textShadow: '0 8px 50px rgba(0,0,0,0.6)' }}
        >
          <span
            className="block italic transition-all duration-1000 delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(60px)' }}
          >
            Every Bite
          </span>
          <span
            className="block text-champagne transition-all duration-1000 delay-300"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(60px)' }}
          >
            Tells a
          </span>
          <span
            className="block italic transition-all duration-1000 delay-400"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(60px)' }}
          >
            Story
          </span>
        </h1>

        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-16 transition-all duration-1000 delay-600"
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
          className="pt-8 border-t border-white/8 flex gap-10 overflow-x-auto scrollbar-none transition-all duration-1000 delay-700"
          style={{ opacity: visible ? 0.9 : 0 }}
        >
          {[
            { v: '500+', l: 'Cakes Monthly' },
            { v: '6+',   l: 'Years Crafting' },
            { v: '100%', l: 'Handmade' },
            { v: '★ 5.0', l: 'Avg. Rating' },
          ].map(s => (
            <div key={s.l} className="flex-shrink-0">
              <p className="font-serif text-2xl md:text-3xl text-champagne">{s.v}</p>
              <p className="text-[8px] tracking-[0.2em] text-ivory/25 uppercase font-sans mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => document.querySelector('#featured')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute right-6 md:right-12 bottom-10 flex flex-col items-center gap-2 text-champagne/30 hover:text-champagne/70 transition-colors duration-400"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 1.2s, color 0.4s' }}
      >
        <span className="text-[8px] tracking-[0.3em] uppercase font-sans">Scroll</span>
        <ArrowDown size={12} className="animate-bounce mt-1" />
      </button>
    </section>
  );
}

function FeaturedSection() {
  const ref = useRef(null);
  const inView = useInView(ref);

  const cards = [
    { img: IMGS.wedding, title: 'Wedding Cakes',  sub: 'From KES 15,000', href: '/collection' },
    { img: IMGS.cake1,   title: 'Kids Birthdays', sub: 'From KES 3,000',  href: '/collection' },
    { img: IMGS.cake3,   title: 'Custom Cakes',   sub: 'From KES 2,000',  href: '/collection' },
  ];

  return (
    <section id="featured" className="py-20 md:py-32 bg-espresso grain-overlay">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div ref={ref} className="mb-12 md:mb-20">
          <p
            className="text-[9px] tracking-[0.5em] text-champagne/70 uppercase font-sans mb-4"
            style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease' }}
          >
            — What We Make
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2
              className="font-serif text-[clamp(2.2rem,6vw,5rem)] text-ivory leading-[0.92]"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(35px)', transition: 'all 0.8s ease 0.1s' }}
            >
              Made with <em className="text-champagne">Love</em><br />in Maai Mahiu
            </h2>
            <Link
              to="/collection"
              className="flex items-center gap-2.5 text-champagne/50 hover:text-champagne transition-colors group self-start md:self-auto"
              style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}
            >
              <span className="text-[9px] tracking-[0.3em] uppercase font-sans">Full Collection</span>
              <ArrowRight size={11} className="group-hover:translate-x-1.5 transition-transform duration-400" />
            </Link>
          </div>
        </div>

        {/* 3-up grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {cards.map((c, i) => (
            <Link
              key={c.title}
              to={c.href}
              className="group relative overflow-hidden block"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(50px)',
                transition: `opacity 0.8s ease ${0.1 + i * 0.12}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.12}s`,
              }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={c.img} alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/30 to-transparent" />
              {/* Hover shimmer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                style={{ background: 'linear-gradient(135deg, hsla(355,72%,52%,0.08) 0%, transparent 60%)' }}
              />
              {/* Text */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="text-[8px] tracking-[0.3em] text-champagne/60 uppercase font-sans mb-1.5 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">{c.sub}</p>
                <h3 className="font-serif text-[1.6rem] text-ivory italic leading-tight">{c.title}</h3>
                <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span className="text-[8px] tracking-[0.3em] text-champagne uppercase font-sans">View Collection</span>
                  <ArrowRight size={9} className="text-champagne" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden" style={{ background: 'hsl(350, 42%, 8%)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, hsla(355,72%,52%,0.05) 0%, transparent 70%)' }}
      />
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div ref={ref} className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Images collage */}
          <div
            className="grid grid-cols-2 gap-2.5"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-50px)', transition: 'all 1s cubic-bezier(0.22,1,0.36,1)' }}
          >
            <div className="row-span-2 overflow-hidden" style={{ aspectRatio: '2/3' }}>
              <img src={IMGS.event} alt="Shikan Event" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="overflow-hidden aspect-square">
              <img src={IMGS.cake4} alt="Birthday cake" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="overflow-hidden aspect-square">
              <img src={IMGS.cake2} alt="Custom cake" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          {/* Text */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(50px)', transition: 'all 1s cubic-bezier(0.22,1,0.36,1) 0.2s' }}>
            <p className="text-[9px] tracking-[0.5em] text-champagne/70 uppercase font-sans mb-5">— Our Story</p>
            <h2 className="font-serif text-[clamp(2rem,5vw,4.2rem)] text-ivory leading-[1.02] mb-7">
              Born in <em className="text-champagne">Maai Mahiu</em>,<br />
              Loved Across Kenya
            </h2>
            <div className="space-y-4 text-sm text-ivory/40 font-sans font-light leading-[1.85]">
              <p>
                Shikan Pastries started with a single oven, a love for baking, and a dream — to bring beautifully crafted cakes to every special moment, right here in Nakuru County.
              </p>
              <p>
                Every cake that leaves our hands is made from scratch, decorated by hand, and designed to make your celebration unforgettable.
              </p>
            </div>

            <blockquote className="mt-9 pl-5 border-l-2 border-champagne/35">
              <p className="font-serif text-xl text-ivory/65 italic leading-snug">"Pastry is my poetry."</p>
              <p className="text-[8px] tracking-[0.25em] text-champagne/40 uppercase font-sans mt-2">— Shikan, Founder</p>
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

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref);

  const steps = [
    { n: '01', title: 'Consult', body: 'Share your vision — theme, flavors, occasion, and date. We listen carefully to every detail.' },
    { n: '02', title: 'Design', body: 'We sketch and propose a design tailored to your celebration. No two cakes are ever the same.' },
    { n: '03', title: 'Craft', body: 'Our bakers handcraft your cake from scratch using premium ingredients and artisan techniques.' },
    { n: '04', title: 'Deliver', body: 'Your cake arrives beautifully packaged, ready to be the centrepiece of your special moment.' },
  ];

  return (
    <section className="py-20 md:py-28 bg-espresso" ref={ref}>
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="mb-14 md:mb-20 text-center">
          <p
            className="text-[9px] tracking-[0.5em] text-champagne/70 uppercase font-sans mb-4"
            style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease' }}
          >
            — How It Works
          </p>
          <h2
            className="font-serif text-[clamp(2rem,5vw,4rem)] text-ivory"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.8s ease 0.1s' }}
          >
            From Dream to <em className="text-champagne">Dessert</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-champagne/10">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="bg-espresso p-7 md:p-10 group hover:bg-walnut transition-colors duration-500"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.8s ease ${i * 0.1}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s, background-color 0.5s`,
              }}
            >
              <p className="font-serif text-4xl text-champagne/15 group-hover:text-champagne/25 transition-colors duration-500 mb-5 italic">{s.n}</p>
              <h3 className="font-serif text-xl text-ivory italic mb-3">{s.title}</h3>
              <p className="text-[11px] text-ivory/35 font-sans font-light leading-loose">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden grain-overlay" style={{ background: 'hsl(355, 72%, 52%)' }}>
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)',
        }}
      />
      <div ref={ref} className="max-w-4xl mx-auto px-5 md:px-12 text-center relative z-10">
        <h2
          className="font-serif text-[clamp(2.2rem,7vw,5.5rem)] text-white leading-[0.92] mb-6 italic"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(35px)', transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)' }}
        >
          Your Perfect Cake<br />Starts Here
        </h2>
        <p
          className="text-sm text-white/65 font-sans max-w-sm mx-auto mb-10 leading-relaxed"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.12s' }}
        >
          We deliver across Maai Mahiu, Naivasha, Nairobi and surrounding areas. Order 3–5 days in advance for best results.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}
        >
          <Link
            to="/order"
            className="inline-block bg-espresso text-ivory font-sans text-[9px] tracking-[0.28em] uppercase px-9 py-4 border border-white/15 hover:bg-white hover:text-espresso transition-all duration-400"
          >
            Place Your Order
          </Link>
          <Link
            to="/gallery"
            className="inline-block bg-transparent text-white font-sans text-[9px] tracking-[0.28em] uppercase px-9 py-4 border border-white/40 hover:border-white hover:bg-white/10 transition-all duration-400"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-espresso overflow-x-hidden">
      {!loaded && <LoadingScreen />}
      <div className="transition-opacity duration-1000" style={{ opacity: loaded ? 1 : 0 }}>
        <Navbar />
        <HeroSection />
        <FeaturedSection />
        <StorySection />
        <ProcessSection />
        <TestimonialsSection />
        <CTABanner />
        <Footer />
        <FloatingWhatsApp />
      </div>
    </div>
  );
}
