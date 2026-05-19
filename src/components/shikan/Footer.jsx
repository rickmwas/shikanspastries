import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Heart, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  const WhatsAppIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  return (
    <footer className="grain-overlay" style={{ background: 'hsl(350, 55%, 4%)', borderTop: '1px solid hsla(355,72%,52%,0.08)' }}>
      {/* Top CTA strip */}
      <div
        className="py-10 md:py-12 px-5 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto"
        style={{ borderBottom: '1px solid hsla(355,72%,52%,0.06)' }}
      >
        <div>
          <p className="font-serif text-2xl md:text-3xl text-ivory italic mb-1">Ready to place an order?</p>
          <p className="text-xs text-ivory/30 font-sans">We'll get back to you within a few hours.</p>
        </div>
        <Link to="/order" className="btn-primary flex-shrink-0">
          <span>Order Now</span>
        </Link>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 py-14 md:py-16 grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-8 h-8 flex items-center justify-center flex-shrink-0"
              style={{
                background: 'hsl(355, 72%, 52%)',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <span className="font-serif text-xs italic text-ivory" style={{ fontWeight: 500 }}>S</span>
            </div>
            <div>
              <span className="font-serif text-2xl text-ivory italic leading-none">Shikan</span>
              <span className="block text-[7px] tracking-[0.4em] text-champagne/50 uppercase font-sans mt-0.5">Pastries</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mb-2">
            <MapPin size={9} className="text-champagne/40" />
            <p className="text-[11px] text-ivory/25 font-sans">Maai Mahiu, Nakuru, Kenya</p>
          </div>
          <div className="flex items-center gap-1.5 mb-5">
            <Phone size={9} className="text-champagne/40" />
            <p className="text-[11px] text-ivory/25 font-sans">+254 700 000 000</p>
          </div>

          <p className="text-xs text-ivory/20 font-sans font-light leading-relaxed max-w-xs mb-7">
            Artisan pastries handcrafted with love — custom cakes for every occasion, delivered across Kenya.
          </p>

          <div className="flex items-center gap-2">
            {[
              { href: 'https://instagram.com/shikanpastries', icon: <Instagram size={11} />, label: 'Instagram' },
              { href: 'https://wa.me/254700000000', icon: <WhatsAppIcon />, label: 'WhatsApp' },
              { href: 'mailto:hello@shikanpastries.com', icon: <Mail size={11} />, label: 'Email' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="w-8 h-8 border border-champagne/15 flex items-center justify-center text-champagne/30 hover:text-champagne hover:border-champagne/45 transition-all duration-400"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <p className="text-[7px] tracking-[0.4em] text-champagne/30 uppercase font-sans mb-6">Navigate</p>
          <div className="space-y-3.5">
            {[
              { label: 'Home',       href: '/' },
              { label: 'Collection', href: '/collection' },
              { label: 'Gallery',    href: '/gallery' },
              { label: 'Order',      href: '/order' },
            ].map(l => (
              <Link
                key={l.label}
                to={l.href}
                className="block text-xs text-ivory/25 font-sans hover:text-champagne/70 transition-colors duration-400"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Specialties */}
        <div>
          <p className="text-[7px] tracking-[0.4em] text-champagne/30 uppercase font-sans mb-6">Specialties</p>
          <div className="space-y-3.5">
            {['Wedding Cakes', 'Birthday Cakes', 'Kids Cakes', 'Custom Designs', 'Event Spreads'].map(s => (
              <Link
                key={s}
                to="/collection"
                className="block text-xs text-ivory/25 font-sans hover:text-champagne/70 transition-colors duration-400"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[7px] tracking-[0.4em] text-champagne/30 uppercase font-sans mb-6">Contact</p>
          <div className="space-y-3.5">
            <p className="text-xs text-ivory/25 font-sans leading-relaxed">Maai Mahiu, Nakuru<br />Kenya</p>
            <p className="text-xs text-ivory/25 font-sans">+254 700 000 000</p>
            <p className="text-xs text-ivory/25 font-sans break-all">hello@shikanpastries.com</p>
          </div>

          <div className="mt-7 p-4 bg-walnut" style={{ borderLeft: '1px solid hsla(355,72%,52%,0.3)' }}>
            <p className="text-[8px] tracking-[0.25em] text-champagne/50 uppercase font-sans mb-1.5">Order Lead Time</p>
            <p className="text-[10px] text-ivory/30 font-sans leading-relaxed">
              3–5 days standard<br />2+ weeks for weddings
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-5 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: '1px solid hsla(355,72%,52%,0.06)' }}
      >
        <p className="text-[9px] text-ivory/12 font-sans">
          © {year} Shikan Pastries. All rights reserved.
        </p>
        <div className="text-[9px] text-ivory/10 font-sans flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
          <span className="flex items-center gap-1.5">
            Crafted with <Heart size={7} className="text-champagne/25" /> in Maai Mahiu
          </span>
          <span className="hidden sm:inline text-ivory/5">•</span>
          <span>
            By <a href="https://mwangidev.terraseptsolutions.com" target="_blank" rel="noopener noreferrer" className="hover:text-champagne/40 transition-colors duration-300">TerraSept Solutions</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
