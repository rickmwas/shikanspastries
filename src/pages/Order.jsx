import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Instagram, Mail, Check } from 'lucide-react';
import Navbar from '../components/shikan/Navbar';
import Footer from '../components/shikan/Footer';
import FloatingWhatsApp from '../components/shikan/FloatingWhatsApp';

const ORDER_TYPES = ['Wedding Cake', 'Birthday Cake', 'Kids Birthday', 'Custom Design', 'Event Spread', 'Other'];

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

export default function Order() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: '', message: '' });
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);
  const inView = useInView(formRef);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Shikan Pastries! 🎂\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Order Type:* ${form.type}\n*Email:* ${form.email || 'N/A'}\n*Details:* ${form.message}`
    );
    window.open(`https://wa.me/254700000000?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <div className="min-h-screen bg-espresso">
      <Navbar />

      {/* Header */}
      <div
        className="pt-32 pb-16 px-5 md:px-12 max-w-6xl mx-auto relative overflow-hidden"
        style={{ borderBottom: '1px solid hsla(355,72%,52%,0.1)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 90% 50%, hsla(355,72%,52%,0.05) 0%, transparent 70%)' }} />
        <p className="text-[9px] tracking-[0.5em] text-champagne/70 uppercase font-sans mb-4">— Place an Order</p>
        <h1 className="font-serif text-[clamp(2.8rem,8vw,6rem)] text-ivory leading-[0.9] mb-5">
          Let's Create <br /><em className="text-champagne">Something Beautiful</em>
        </h1>
        <p className="text-sm text-ivory/35 font-sans max-w-md leading-relaxed">
          Based in Maai Mahiu, Nakuru — we take orders for delivery and pickup across the region. Fill in the form and we'll reach out on WhatsApp.
        </p>
      </div>

      <div className="pt-14 pb-24 px-5 md:px-12 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-14 lg:gap-24">
          {/* Form */}
          <div ref={formRef}>
            {sent ? (
              <div
                className="py-24 text-center"
                style={{ opacity: 1 }}
              >
                <div
                  className="w-16 h-16 flex items-center justify-center mx-auto mb-7"
                  style={{ background: 'hsl(355, 72%, 52%)' }}
                >
                  <Check size={24} className="text-ivory" />
                </div>
                <h3 className="font-serif text-4xl text-ivory mb-3 italic">Message Sent!</h3>
                <p className="text-sm text-ivory/40 font-sans mt-2 leading-relaxed max-w-xs mx-auto">We'll reach out on WhatsApp within a few hours. Thank you for choosing Shikan!</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <div className="grid sm:grid-cols-2 gap-7">
                  {[
                    { name: 'name',  label: 'Your Name *',         placeholder: 'Full name',           type: 'text',  required: true },
                    { name: 'phone', label: 'Phone / WhatsApp *',   placeholder: '+254 700 000 000',    type: 'text',  required: true },
                  ].map(f => (
                    <div key={f.name} className="group">
                      <label className="block text-[8px] tracking-[0.35em] text-champagne/40 uppercase font-sans mb-3 group-focus-within:text-champagne/70 transition-colors">{f.label}</label>
                      <input
                        name={f.name} value={form[f.name]} onChange={handleChange}
                        required={f.required} type={f.type} placeholder={f.placeholder}
                        className="w-full bg-transparent border-b border-champagne/15 pb-3 text-ivory/80 font-sans text-sm font-light placeholder-ivory/15 focus:outline-none focus:border-champagne/50 transition-colors duration-400"
                      />
                    </div>
                  ))}
                </div>

                <div className="group">
                  <label className="block text-[8px] tracking-[0.35em] text-champagne/40 uppercase font-sans mb-3 group-focus-within:text-champagne/70 transition-colors">Email (optional)</label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-champagne/15 pb-3 text-ivory/80 font-sans text-sm font-light placeholder-ivory/15 focus:outline-none focus:border-champagne/50 transition-colors duration-400"
                  />
                </div>

                <div>
                  <label className="block text-[8px] tracking-[0.35em] text-champagne/40 uppercase font-sans mb-4">Order Type</label>
                  <div className="flex flex-wrap gap-2">
                    {ORDER_TYPES.map(t => (
                      <button
                        key={t} type="button"
                        onClick={() => setForm(prev => ({ ...prev, type: t }))}
                        className="text-[9px] tracking-[0.15em] uppercase font-sans px-4 py-2.5 transition-all duration-250"
                        style={{
                          background: form.type === t ? 'hsl(355, 72%, 52%)' : 'transparent',
                          color: form.type === t ? 'hsl(30, 40%, 96%)' : 'hsla(355,72%,52%,0.45)',
                          border: `1px solid ${form.type === t ? 'hsl(355, 72%, 52%)' : 'hsla(355,72%,52%,0.2)'}`,
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[8px] tracking-[0.35em] text-champagne/40 uppercase font-sans mb-3 group-focus-within:text-champagne/70 transition-colors">Tell Us More *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    rows={5} required
                    placeholder="Describe your occasion, theme, flavour preference, number of servings, and delivery date..."
                    className="w-full bg-transparent border-b border-champagne/15 pb-3 text-ivory/80 font-sans text-sm font-light placeholder-ivory/15 focus:outline-none focus:border-champagne/50 transition-colors duration-400 resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  <span>Send via WhatsApp</span>
                </button>
                <p className="text-[9px] text-ivory/20 font-sans text-center">
                  We'll respond within a few hours on WhatsApp
                </p>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div
            className="space-y-10"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s',
            }}
          >
            <div>
              <p className="text-[8px] tracking-[0.4em] text-champagne/35 uppercase font-sans mb-6">Find Us</p>
              <div className="space-y-5">
                {[
                  { icon: MapPin,    label: 'Maai Mahiu, Nakuru',        sub: 'Delivery across Nakuru & Nairobi' },
                  { icon: Phone,     label: '+254 700 000 000',           sub: 'WhatsApp Orders Welcome' },
                  { icon: Mail,      label: 'hello@shikanpastries.com',   sub: 'Enquiries & Collaborations' },
                  { icon: Instagram, label: '@shikanpastries',            sub: 'Follow for Daily Creations' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-4 group">
                    <div className="w-9 h-9 border border-champagne/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-champagne/40 transition-colors duration-400">
                      <Icon size={12} className="text-champagne/40 group-hover:text-champagne/70 transition-colors duration-400" />
                    </div>
                    <div>
                      <p className="text-sm text-ivory/65 font-sans">{label}</p>
                      <p className="text-[10px] text-ivory/22 font-sans mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-champagne/10 pt-9">
              <p className="text-[8px] tracking-[0.4em] text-champagne/35 uppercase font-sans mb-5">Hours</p>
              <div className="space-y-2.5">
                {[
                  { day: 'Mon – Fri',  hrs: '8:00 AM – 7:00 PM' },
                  { day: 'Saturday',   hrs: '9:00 AM – 6:00 PM' },
                  { day: 'Sunday',     hrs: 'By Appointment' },
                ].map(h => (
                  <div key={h.day} className="flex justify-between items-center">
                    <span className="text-xs text-ivory/28 font-sans">{h.day}</span>
                    <span className="text-xs text-ivory/55 font-sans font-light">{h.hrs}</span>
                  </div>
                ))}
              </div>
            </div>

            <blockquote className="border-l-2 border-champagne/25 pl-5">
              <p className="font-serif text-lg text-ivory/50 italic leading-relaxed">
                "We don't just bake — we listen, we dream, we create."
              </p>
            </blockquote>

            <div className="bg-walnut p-6" style={{ borderLeft: '2px solid hsl(355,72%,52%)' }}>
              <p className="text-[8px] tracking-[0.3em] text-champagne/60 uppercase font-sans mb-3">Please Note</p>
              <p className="text-xs text-ivory/38 font-sans leading-relaxed">
                We recommend ordering at least <strong className="text-ivory/55">3–5 days in advance</strong> for standard cakes, and <strong className="text-ivory/55">2 weeks</strong> for elaborate wedding designs.
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
