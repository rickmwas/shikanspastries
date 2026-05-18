const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Collection', href: '/collection' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Order', href: '/order' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: scrolled ? 'rgba(18, 4, 6, 0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,50,60,0.12)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-4 md:py-5 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="https://media.db.com/images/public/6a0892e01776c18f7673a4ea/edcc93092_ChatGPT_Image_May_18__2026__08_22_38_PM-removebg-preview.png"
              alt="Shikan's Pastries"
              className="h-16 md:h-20 w-auto object-contain"
              style={{ filter: 'brightness(1.05)' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.href}
                className="text-[10px] tracking-[0.2em] uppercase font-sans transition-colors duration-300 relative group"
                style={{ color: location.pathname === link.href ? 'hsl(355, 72%, 62%)' : 'rgba(245,228,208,0.55)' }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px bg-champagne transition-all duration-300"
                  style={{ width: location.pathname === link.href ? '100%' : '0%' }} />
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link to="/order" className="hidden md:block btn-primary text-[9px]" style={{ padding: '0.55rem 1.4rem' }}>
              <span>Order Now</span>
            </Link>
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center text-ivory/80 hover:text-champagne transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col md:hidden transition-all duration-500"
        style={{
          background: 'hsl(350, 50%, 5%)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div className="flex flex-col flex-1 justify-center px-8 gap-1 pt-20">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-serif text-[2.5rem] text-ivory/80 hover:text-champagne transition-colors duration-300 py-2 border-b border-champagne/8 italic"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(30px)',
                transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s, color 0.3s`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="px-8 pb-12">
          <Link to="/order" className="btn-primary block text-center w-full">
            <span>Place an Order</span>
          </Link>
          <p className="text-[9px] text-ivory/20 font-sans tracking-widest uppercase text-center mt-5">
            Maai Mahiu, Nakuru · Kenya
          </p>
        </div>
      </div>
    </>
  );
}