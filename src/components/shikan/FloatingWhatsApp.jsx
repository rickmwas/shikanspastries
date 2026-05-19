import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const WA_ICON = ({ size = 22, color = 'white' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
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
    const t = setTimeout(() => setPulse(true), 4000);
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

  /* Position FAB above the bottom nav on mobile */
  const fabBottom = isMobile 
    ? 'calc(84px + env(safe-area-inset-bottom, 0px))'
    : '32px';
  const popupBottom = isMobile
    ? 'calc(144px + env(safe-area-inset-bottom, 0px))'
    : '112px';

  return (
    <>
      {/* Elegant Chat Popup */}
      <div
        className="fixed right-4 sm:right-6 z-45 transition-all duration-500 ease-out"
        style={{
          bottom: popupBottom,
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.92)',
          pointerEvents: open ? 'all' : 'none',
          perspective: '1000px',
        }}
      >
        <div
          className="w-72 overflow-hidden backdrop-blur-md"
          style={{
            background: 'rgba(10, 3, 5, 0.8)',
            border: '1px solid hsla(355, 72%, 52%, 0.2)',
            borderRadius: '16px',
            boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 hsla(355, 72%, 52%, 0.1)',
          }}
        >
          {/* Header */}
          <div 
            className="px-6 py-5 flex items-center gap-3 border-b"
            style={{ borderColor: 'hsla(355, 72%, 52%, 0.1)' }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'hsla(355, 72%, 52%, 0.15)' }}>
              <WA_ICON size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-ivory text-sm font-sans font-light">Shikan Pastries</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span 
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background: '#22c55e',
                    animation: 'glow-breath 2s ease-in-out infinite',
                  }}
                />
                <p className="text-ivory/40 text-[10px] font-sans font-light">Usually replies instantly</p>
              </div>
            </div>
            <button
              className="w-8 h-8 flex items-center justify-center text-ivory/50 hover:text-ivory transition-colors duration-300"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>

          {/* Message */}
          <div className="p-6">
            <div 
              className="p-4 mb-6"
              style={{
                background: 'linear-gradient(135deg, hsla(355, 72%, 52%, 0.1) 0%, hsla(355, 72%, 52%, 0.05) 100%)',
                borderRadius: '12px',
                border: '1px solid hsla(355, 72%, 52%, 0.15)',
              }}
            >
              <p className="text-ivory/70 text-sm font-sans font-light leading-relaxed">
                Welcome to Shikan Pastries 👋 — your premier artisan cake studio. We'd love to create something beautiful for your celebration.
              </p>
            </div>
            <button
              onClick={sendMessage}
              className="btn-primary w-full text-[11px]"
              style={{ padding: '0.9rem 1.2rem' }}
            >
              <span>Start Conversation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating FAB — Elegant & Minimal */}
      <button
        onClick={handleOpen}
        className="fixed right-4 sm:right-6 z-50 transition-all duration-400"
        style={{
          width: '52px',
          height: '52px',
          bottom: fabBottom,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: 'hsl(355, 72%, 52%)',
          border: '1px solid hsla(30, 40%, 92%, 0.1)',
          cursor: 'pointer',
          boxShadow: open 
            ? '0 12px 40px -10px rgba(207, 54, 59, 0.5)' 
            : '0 8px 24px -8px rgba(207, 54, 59, 0.35)',
          transform: open ? 'scale(1)' : 'scale(1)',
        }}
        onMouseEnter={(e) => {
          if (!open) {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 12px 40px -10px rgba(207, 54, 59, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px -8px rgba(207, 54, 59, 0.35)';
          }
        }}
        aria-label="Chat on WhatsApp"
      >
        {/* Soft pulse glow (subtle) */}
        {pulse && !open && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: '50%',
              background: 'hsl(355, 72%, 52%)',
              animation: 'soft-pulse 2.5s ease-in-out infinite',
            }}
          />
        )}

        {/* Icon */}
        <div
          className="transition-all duration-400 relative z-10"
          style={{ 
            transform: open ? 'rotate(-45deg) scale(0.8)' : 'rotate(0deg) scale(1)',
            opacity: open ? 0.7 : 1,
          }}
        >
          {open ? (
            <X size={20} style={{ color: 'hsl(30, 40%, 96%)' }} />
          ) : (
            <WA_ICON size={20} />
          )}
        </div>
      </button>
    </>
  );
}
