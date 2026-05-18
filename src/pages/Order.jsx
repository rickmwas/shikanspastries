import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Instagram, Mail } from 'lucide-react';
import Navbar from '../components/shikan/Navbar';
import Footer from '../components/shikan/Footer';
import FloatingWhatsApp from '../components/shikan/FloatingWhatsApp';

const ORDER_TYPES = ['Wedding Cake', 'Birthday Cake', 'Kids Birthday', 'Custom Design', 'Event Spread', 'Other'];

export default function Order() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Shikan Pastries! 🎂\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Order Type:* ${form.type}\n*Email:* ${form.email}\n*Details:* ${form.message}`
    );
    window.open(`https://wa.me/254700000000?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-espresso">
      <Navbar />

      <div className="pt-28 pb-20 px-5 md:px-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] tracking-[0.45em] text-champagne uppercase font-sans mb-3">— Place an Order</p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] text-ivory leading-[0.95] mb-4">
            Let's Create <br/><em className="text-champagne">Something Beautiful</em>
          </h1>
          <p className="text-sm text-ivory/40 font-sans max-w-md leading-relaxed">
            Based in Maai Mahiu, Nakuru — we take orders for delivery and pickup across the region.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20">
          {/* Form */}
          <div>
            {sent ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 border border-champagne/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🎂</span>
                </div>
                <h3 className="font-serif text-3xl text-ivory mb-3 italic">Message Sent!</h3>
                <p className="text-sm text-ivory/40 font-sans">We'll reach out within a few hours. Thank you!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] text-champagne/50 uppercase font-sans mb-2">Your Name *</label>
                    <input
                      name="name" value={form.name} onChange={handleChange} required
                      placeholder="Full name"
                      className="w-full bg-transparent border-b border-champagne/20 pb-3 text-ivory/80 font-sans text-sm font-light placeholder-ivory/20 focus:outline-none focus:border-champagne/60 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] text-champagne/50 uppercase font-sans mb-2">Phone / WhatsApp *</label>
                    <input
                      name="phone" value={form.phone} onChange={handleChange} required
                      placeholder="+254 700 000 000"
                      className="w-full bg-transparent border-b border-champagne/20 pb-3 text-ivory/80 font-sans text-sm font-light placeholder-ivory/20 focus:outline-none focus:border-champagne/60 transition-colors duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.3em] text-champagne/50 uppercase font-sans mb-2">Email (optional)</label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-champagne/20 pb-3 text-ivory/80 font-sans text-sm font-light placeholder-ivory/20 focus:outline-none focus:border-champagne/60 transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.3em] text-champagne/50 uppercase font-sans mb-3">Order Type</label>
                  <div className="flex flex-wrap gap-2">
                    {ORDER_TYPES.map(t => (
                      <button
                        key={t} type="button"
                        onClick={() => setForm(prev => ({ ...prev, type: t }))}
                        className="text-[10px] tracking-[0.12em] uppercase font-sans px-3 py-2 transition-all duration-200"
                        style={{
                          background: form.type === t ? 'hsl(355, 72%, 52%)' : 'transparent',
                          color: form.type === t ? 'hsl(30, 40%, 96%)' : 'rgba(220,80,90,0.5)',
                          border: `1px solid ${form.type === t ? 'hsl(355, 72%, 52%)' : 'rgba(220,80,90,0.25)'}`,
                        }}
                      >{t}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.3em] text-champagne/50 uppercase font-sans mb-2">Tell Us More *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    rows={4} required
                    placeholder="Describe your occasion, theme, flavour preference, number of servings, and delivery date..."
                    className="w-full bg-transparent border-b border-champagne/20 pb-3 text-ivory/80 font-sans text-sm font-light placeholder-ivory/20 focus:outline-none focus:border-champagne/60 transition-colors duration-300 resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  <span>Send via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="space-y-10">
            <div>
              <p className="text-[9px] tracking-[0.35em] text-champagne/40 uppercase font-sans mb-5">Find Us</p>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Maai Mahiu, Nakuru', sub: 'Delivery across Nakuru & Nairobi' },
                  { icon: Phone, label: '+254 700 000 000', sub: 'WhatsApp Orders Welcome' },
                  { icon: Mail, label: 'hello@shikanpastries.com', sub: 'Enquiries & Collaborations' },
                  { icon: Instagram, label: '@shikanpastries', sub: 'Follow for Daily Creations' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-4 group">
                    <div className="w-9 h-9 border border-champagne/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-champagne/50 transition-colors">
                      <Icon size={13} className="text-champagne/50 group-hover:text-champagne transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-ivory/70 font-sans">{label}</p>
                      <p className="text-[10px] text-ivory/25 font-sans mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-champagne/10 pt-8">
              <p className="text-[9px] tracking-[0.35em] text-champagne/40 uppercase font-sans mb-5">Hours</p>
              <div className="space-y-2">
                {[
                  { day: 'Mon – Fri', hrs: '8:00 AM – 7:00 PM' },
                  { day: 'Saturday', hrs: '9:00 AM – 6:00 PM' },
                  { day: 'Sunday', hrs: 'By Appointment' },
                ].map(h => (
                  <div key={h.day} className="flex justify-between items-center">
                    <span className="text-xs text-ivory/30 font-sans">{h.day}</span>
                    <span className="text-xs text-ivory/60 font-sans font-light">{h.hrs}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-l-2 border-champagne/30 pl-5">
              <p className="font-serif text-lg text-ivory/60 italic leading-relaxed">
                "We don't just bake — we listen, we dream, we create."
              </p>
            </div>

            <div className="bg-walnut p-5">
              <p className="text-[9px] tracking-[0.25em] text-champagne/60 uppercase font-sans mb-2">Note</p>
              <p className="text-xs text-ivory/40 font-sans leading-relaxed">
                We recommend ordering at least <strong className="text-ivory/60">3–5 days in advance</strong> for standard cakes, and <strong className="text-ivory/60">2 weeks</strong> for elaborate wedding designs.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}