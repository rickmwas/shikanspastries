import React from 'react';
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

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'rgba(10, 3, 5, 0.92)',
        backdropFilter: 'blur(24px) saturate(180%)',
        borderTop: '1px solid hsla(355,72%,52%,0.1)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex items-stretch">
        {LINKS.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              to={href}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-all duration-300 relative"
              style={{ minHeight: 64 }}
            >
              {/* Active indicator */}
              {active && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 animate-slide-up-in"
                  style={{ background: 'hsl(355, 72%, 52%)' }}
                />
              )}
              <Icon
                size={18}
                strokeWidth={active ? 1.75 : 1.25}
                style={{
                  color: active ? 'hsl(355, 72%, 62%)' : 'hsla(30, 40%, 92%, 0.28)',
                  transition: 'color 0.3s ease',
                }}
              />
              <span
                className="font-sans"
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: active ? 'hsl(355, 72%, 62%)' : 'hsla(30, 40%, 92%, 0.22)',
                  transition: 'color 0.3s ease',
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
