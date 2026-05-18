import React, { useRef, useState, useEffect } from 'react';
import { MapPin, Phone, Instagram, Mail, Send } from 'lucide-react';

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

const ORDER_TYPES = ['Wedding Cake', 'Birthday', 'Corporate Event', 'Custom Creation', 'Gift Box', 'Other'];

export default function ContactSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef);

  const [form, setForm] = useState({ name: '', phone: '', email: '', type: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Shikan Pastries! 🍰\n\n*Name:* ${form.name}\n*Order Type:* ${form.type}\n*Email:* ${form.email}\n*Message:* ${form.message}`
    );
    window.open(`https://wa.me/254700000000?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-32 md:py-44 grain-overlay overflow-hidden" style={{ background: 'hsl(350, 50%, 6%)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headRef} className="mb-20">
          <p
            className="text-[10px] tracking-[0.45em] text-champagne uppercase font-sans mb-5 transition-all duration-700"
            style={{ opacity: headInView ? 1 : 0 }}
          >
            — Place an Order
          </p>
          <h2
            className="font-serif text-[clamp(2.8rem,6vw,5.5rem)] text-ivory leading-[0.95] transition-all duration-700 delay-100"
            style={{ opacity: headInView ? 1 : 0, transform: headInView ? 'translateY(0)' : 'translateY(30px)' }}
          >
            Begin Your
            <br />
            <em className="text-champagne">Sweet Journey</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24">
          {/* Form */}
          <div>
            {sent ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border border-champagne/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-gold">
                    <Send size={20} className="text-champagne" />
                  </div>
                  <h3 className="font-serif text-3xl text-ivory mb-4 italic">Message Sent</h3>
                  <p className="text-sm text-ivory/40 font-sans font-light">We'll be in touch within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] text-champagne/50 uppercase font-sans mb-2">Your Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Full name"
                      className="w-full bg-transparent border-b border-champagne/15 pb-3 text-ivory/80 font-sans text-sm font-light placeholder-ivory/20 focus:outline-none focus:border-champagne/50 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] text-champagne/50 uppercase font-sans mb-2">Phone / WhatsApp</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+254 700 000 000"
                      className="w-full bg-transparent border-b border-champagne/15 pb-3 text-ivory/80 font-sans text-sm font-light placeholder-ivory/20 focus:outline-none focus:border-champagne/50 transition-colors duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.3em] text-champagne/50 uppercase font-sans mb-2">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-champagne/15 pb-3 text-ivory/80 font-sans text-sm font-light placeholder-ivory/20 focus:outline-none focus:border-champagne/50 transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.3em] text-champagne/50 uppercase font-sans mb-3">Order Type</label>
                  <div className="flex flex-wrap gap-2">
                    {ORDER_TYPES.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, type: t }))}
                        className="text-[10px] tracking-[0.15em] uppercase font-sans px-3 py-1.5 transition-all duration-200"
                        style={{
                          background: form.type === t ? 'hsl(355, 72%, 52%)' : 'transparent',
                          color: form.type === t ? 'hsl(30, 40%, 96%)' : 'rgba(220,80,90,0.5)',
                          border: `1px solid ${form.type === t ? 'hsl(355, 72%, 52%)' : 'rgba(220,80,90,0.25)'}`,
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.3em] text-champagne/50 uppercase font-sans mb-2">Tell Us More</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder="Describe your vision, occasion, quantity, or any details that help us create something extraordinary for you..."
                    className="w-full bg-transparent border-b border-champagne/15 pb-3 text-ivory/80 font-sans text-sm font-light placeholder-ivory/20 focus:outline-none focus:border-champagne/50 transition-colors duration-300 resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full mt-4">
                  <span>Send via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-[9px] tracking-[0.35em] text-champagne/40 uppercase font-sans mb-6">Find Us</p>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Maai Mahiu, Nakuru', sub: 'Delivery across Nakuru & Nairobi' },
                  { icon: Phone, label: '+254 700 000 000', sub: 'WhatsApp Orders Welcome' },
                  { icon: Mail, label: 'hello@shikanpastries.com', sub: 'Enquiries & Collaborations' },
                  { icon: Instagram, label: '@shikanpastries', sub: 'Follow for Daily Creations' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 border border-champagne/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-champagne/50 transition-colors duration-300">
                      <Icon size={12} className="text-champagne/50 group-hover:text-champagne transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-sm text-ivory/70 font-sans">{label}</p>
                      <p className="text-[10px] text-ivory/25 font-sans mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
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

            {/* Quote */}
            <div className="border-l-2 border-champagne/30 pl-6">
              <p className="font-serif text-lg text-ivory/70 italic leading-relaxed">
                "Every order is a relationship. We don't just bake — we listen, we dream, we create."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}