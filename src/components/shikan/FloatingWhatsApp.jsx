import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
    setPulse(false);
  };

  const sendMessage = () => {
    window.open('https://wa.me/254700000000?text=Hello%20Shikan%20Pastries!%20I%20would%20like%20to%20place%20an%20order.', '_blank');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup card */}
      <div
        className="transition-all duration-400 ease-out"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
          pointerEvents: open ? 'all' : 'none',
        }}
      >
        <div
          className="w-72 rounded-none overflow-hidden shadow-2xl"
          style={{ background: 'hsl(350, 38%, 11%)', border: '1px solid rgba(200,50,60,0.2)' }}
        >
          {/* Header */}
          <div className="px-5 py-4 flex items-center gap-3" style={{ background: 'hsl(355, 65%, 45%)' }}>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white text-xs font-sans font-medium">Shikan Pastries</p>
              <p className="text-white/70 text-[10px] font-sans">Usually replies instantly</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <X size={14} />
            </button>
          </div>

          {/* Chat bubble */}
          <div className="p-5">
            <div className="bg-walnut rounded-none p-4 mb-5">
              <p className="text-ivory/80 text-xs font-sans font-light leading-relaxed">
                Hello! 👋 Welcome to Shikan Pastries — Nairobi's luxury artisan pastry studio. How can we create something beautiful for you today?
              </p>
            </div>
            <button
              onClick={sendMessage}
              className="w-full btn-primary text-center text-[10px]"
              style={{ padding: '0.75rem 1rem' }}
            >
              <span>Start Conversation</span>
            </button>
          </div>
        </div>
      </div>

      {/* FAB Button */}
      <button
        onClick={handleOpen}
        className="relative w-14 h-14 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
        style={{ background: 'hsl(355, 65%, 45%)' }}
      >
        {/* Pulse ring */}
        {pulse && (
          <span
            className="absolute inset-0 rounded-none animate-ping opacity-40"
            style={{ background: 'hsl(355, 65%, 45%)' }}
          />
        )}
        {open ? (
          <X size={20} className="text-white" />
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )}
      </button>
    </div>
  );
}