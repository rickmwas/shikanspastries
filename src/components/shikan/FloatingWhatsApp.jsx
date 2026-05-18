import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const WA_ICON = ({ size = 22, color = 'white' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function FloatingWhatsApp() {
  const [open,  setOpen]  = useState(false);
  const [pulse, setPulse] = useState(false);
  /* We track mobile so we can shift the FAB above the bottom nav */
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = () => {
    setOpen(o => !o);
    setPulse(false);
  };

  const sendMessage = () => {
    window.open(
      'https://wa.me/254700000000?text=Hello%20Shikan%20Pastries!%20I%20would%20like%20to%20place%20an%20order.',
      '_blank'
    );
    setOpen(false);
  };

  /* On mobile, bottom-nav is 64px tall + safe area. On desktop, use 24px. */
  const fabBottom  = isMobile ? 'calc(64px + env(safe-area-inset-bottom, 0px) + 12px)' : '24px';
  const popupBottom = isMobile
    ? 'calc(64px + env(safe-area-inset-bottom, 0px) + 84px)'
    : '88px';

  return (
    <>
      {/* Popup card */}
      <div
        className="fixed right-4 sm:right-6 z-50 transition-all duration-400 ease-out"
        style={{
          bottom: popupBottom,
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
          pointerEvents: open ? 'all' : 'none',
        }}
      >
        <div
          className="w-72 overflow-hidden shadow-2xl"
          style={{ background: 'hsl(350, 45%, 9%)', border: '1px solid hsla(355,72%,52%,0.2)' }}
        >
          {/* Header strip */}
          <div className="px-5 py-4 flex items-center gap-3" style={{ background: 'hsl(355, 65%, 44%)' }}>
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
              <WA_ICON size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-sans font-medium">Shikan Pastries</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                <p className="text-white/60 text-[10px] font-sans">Usually replies instantly</p>
              </div>
            </div>
            <button
              className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X size={13} />
            </button>
          </div>

          {/* Chat bubble */}
          <div className="p-5">
            <div className="bg-walnut p-4 mb-5 relative" style={{ borderRadius: '0 8px 8px 8px' }}>
              <div
                className="absolute -top-2 left-0 w-0 h-0"
                style={{
                  borderLeft: '8px solid transparent',
                  borderRight: '0px solid transparent',
                  borderBottom: '8px solid hsl(350, 38%, 12%)',
                }}
              />
              <p className="text-ivory/75 text-xs font-sans font-light leading-relaxed">
                Hello! 👋 Welcome to Shikan Pastries — Maai Mahiu's artisan cake studio. How can we create something beautiful for you today?
              </p>
              <p className="text-ivory/20 text-[9px] font-sans mt-2 text-right">Just now</p>
            </div>
            <button
              onClick={sendMessage}
              className="btn-primary w-full"
              style={{ padding: '0.85rem 1rem' }}
            >
              <span>Start Conversation</span>
            </button>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={handleOpen}
        className="fixed right-4 sm:right-6 z-50 w-14 h-14 flex items-center justify-center shadow-2xl transition-all duration-350 hover:scale-110 active:scale-95"
        style={{
          background: 'hsl(355, 65%, 44%)',
          bottom: fabBottom,
        }}
        aria-label="Chat on WhatsApp"
      >
        {pulse && !open && (
          <span
            className="absolute inset-0 animate-pulse-glow pointer-events-none"
            style={{ background: 'hsl(355, 65%, 44%)' }}
          />
        )}
        <div
          className="transition-all duration-300"
          style={{ transform: open ? 'rotate(90deg) scale(0.85)' : 'rotate(0deg) scale(1)' }}
        >
          {open ? <X size={20} className="text-white" /> : <WA_ICON size={22} />}
        </div>
      </button>
    </>
  );
}
