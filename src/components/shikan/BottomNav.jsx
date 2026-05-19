import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Image, ShoppingBag } from 'lucide-react';

const LINKS = [
  { href: '/',           label: 'Home',       Icon: Home },
  { href: '/collection', label: 'Collection', Icon: Layers },
  { href: '/gallery',    label: 'Gallery',    Icon: Image },
  { href: '/order',      label: 'Order',      Icon: ShoppingBag },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Only show on mobile
  if (!isMobile) return null;

  return (
    <>
      {/* Safe area spacer for mobile */}
      <div className="h-16" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }} />

      {/* Floating Dock — Glassmorphism */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          background: 'rgba(10, 3, 5, 0.6)',
          backdropFilter: 'blur(30px) saturate(200%)',
          borderTop: '1px solid hsla(355, 72%, 52%, 0.1)',
          boxShadow: 'inset 0 1px 0 hsla(355, 72%, 52%, 0.15)',
        }}
      >
        <div className="flex items-center justify-around h-16">
          {LINKS.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className="flex-1 flex flex-col items-center justify-center gap-1.5 py-2 transition-all duration-400 relative group"
              >
                {/* Active indicator bar */}
                {active && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, hsl(355, 72%, 52%) 50%, transparent 100%)',
                      animation: 'slideUpIn 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                )}

                {/* Icon */}
                <div
                  className="relative transition-all duration-400"
                  style={{
                    transform: active ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                  }}
                >
                  <Icon
                    size={18}
                    strokeWidth={active ? 1.75 : 1.25}
                    style={{
                      color: active ? 'hsl(355, 72%, 62%)' : 'hsla(30, 40%, 92%, 0.32)',
                      transition: 'color 0.4s ease, filter 0.4s ease',
                      filter: active ? 'drop-shadow(0 0 8px hsla(355, 72%, 52%, 0.3))' : 'none',
                    }}
                  />
                </div>

                {/* Label */}
                <span
                  className="font-sans"
                  style={{
                    fontSize: '9px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: active ? 'hsl(355, 72%, 62%)' : 'hsla(30, 40%, 92%, 0.25)',
                    transition: 'color 0.4s ease, font-weight 0.3s ease',
                    fontWeight: active ? 500 : 300,
                  }}
                >
                  {label}
                </span>

                {/* Hover background glow */}
                <div
                  className="absolute inset-0 rounded-lg -z-10 transition-all duration-400"
                  style={{
                    background: active 
                      ? 'radial-gradient(circle at center, hsla(355, 72%, 52%, 0.08) 0%, transparent 70%)'
                      : 'radial-gradient(circle at center, hsla(355, 72%, 52%, 0) 0%, transparent 70%)',
                    opacity: active ? 1 : 0,
                  }}
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
