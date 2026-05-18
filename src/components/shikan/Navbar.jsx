import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'Collection', href: '/collection' },
  { label: 'Gallery',    href: '/gallery' },
  { label: 'Order',      href: '/order' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: scrolled ? 'rgba(12, 3, 5, 0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,50,60,0.1)' : 'none',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 md:py-5 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" style={{ minHeight: 44 }}>
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center flex-shrink-0"
              style={{
                background: 'hsl(355, 72%, 52%)',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <span className="font-serif text-xs italic text-ivory" style={{ fontWeight: 500 }}>S</span>
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl text-ivory italic leading-none tracking-tight group-hover:text-champagne transition-colors duration-400">Shikan</span>
              <span className="block text-[7px] tracking-[0.4em] text-champagne/60 uppercase font-sans leading-none mt-0.5">Pastries</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.href}
                className="text-[10px] tracking-[0.22em] uppercase font-sans transition-colors duration-300 relative group"
                style={{ color: location.pathname === link.href ? 'hsl(355, 72%, 62%)' : 'rgba(245,228,208,0.5)' }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px bg-champagne transition-all duration-400"
                  style={{ width: location.pathname === link.href ? '100%' : '0%' }}
                />
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-2">
            <Link to="/order" className="hidden md:block btn-primary text-[9px]" style={{ padding: '0.6rem 1.5rem' }}>
              <span>Order Now</span>
            </Link>

            {/* Hamburger — 44×44 touch target */}
            <button
              className="md:hidden touch-target text-ivory/70 hover:text-champagne transition-colors relative"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">{menuOpen ? 'Close' : 'Menu'}</span>
              <div className="w-5 h-4 flex flex-col justify-between pointer-events-none">
                <span
                  className="block h-px bg-current transition-all duration-400 origin-center"
                  style={{ transform: menuOpen ? 'rotate(45deg) translate(3px, 6px)' : 'none', width: '100%' }}
                />
                <span
                  className="block h-px bg-current transition-all duration-400"
                  style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'scaleX(1)', width: '75%' }}
                />
                <span
                  className="block h-px bg-current transition-all duration-400 origin-center"
                  style={{ transform: menuOpen ? 'rotate(-45deg) translate(3px, -6px)' : 'none', width: '100%' }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col md:hidden transition-all duration-500"
        style={{
          background: 'hsl(350, 55%, 4%)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, hsla(355,72%,52%,0.07) 0%, transparent 70%)' }}
        />

        <div className="flex flex-col flex-1 justify-center px-7 gap-0.5 pt-16 relative">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-serif italic flex items-center justify-between group border-b border-white/5"
              style={{
                fontSize: 'clamp(2.4rem, 10vw, 3.2rem)',
                color: location.pathname === link.href ? 'hsl(355, 72%, 62%)' : 'hsla(30,40%,92%,0.8)',
                padding: '0.75rem 0',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(40px)',
                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s, color 0.3s`,
              }}
            >
              {link.label}
              <span
                className="text-2xl transition-colors duration-300 group-hover:text-champagne/60"
                style={{ fontStyle: 'normal', fontFamily: 'DM Sans', color: 'hsla(355,72%,52%,0.2)' }}
              >→</span>
            </Link>
          ))}
        </div>

        <div className="px-7 pb-10 relative" style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))' }}>
          <Link to="/order" className="btn-primary block text-center w-full mb-6">
            <span>Place an Order</span>
          </Link>
          <p className="text-[8px] text-ivory/15 font-sans tracking-[0.3em] uppercase text-center">
            Maai Mahiu, Nakuru · Kenya
          </p>
        </div>
      </div>
    </>
  );
}
