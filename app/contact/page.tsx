'use client';
import { useState } from 'react';
import { Check, Mail, Phone, Send, Sparkles } from 'lucide-react';
import Navbar from '@/components/layouts/Navigation';
import Footer from '@/components/layouts/Footer';
import { SectionHeader } from '@/components/index.tsx';

const OFFICES = [
  { city: 'London, UK', area: 'Mayfair District', address: '42 Curzon Street', icon: '🇬🇧' },
  { city: 'Kyoto, JP', area: 'Gion District', address: 'Hanamikoji Dori', icon: '🇯🇵' },
  { city: 'Mumbai, IN', area: 'Bandra West', address: 'Hill Road, Linking Road', icon: '🇮🇳' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '', type: 'General Inquiry' });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
      <Navbar />
      <div className="pt-20">
        <section className="py-20" style={{ background: 'var(--surface-container-low)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              label="Connect with our Specialists"
              title="Our editorial concierge is ready for you."
              subtitle="Whether you're seeking a secluded mountain retreat or an urban sanctuary, we'll curate your next escape."
              className="max-w-2xl"
            />
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-6">
                <div className="card-editorial p-6 flex items-center gap-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--secondary-container)' }}
                  >
                    <Phone size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                      Private Line
                    </p>
                    <p className="font-poppins font-bold text-on-surface">+1 (800) 459-NEST</p>
                    <p className="text-xs text-primary mt-0.5">Available 24/7 for Elite Members</p>
                  </div>
                </div>
                <div className="card-editorial p-6 flex items-center gap-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--secondary-container)' }}
                  >
                    <Mail size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                      Editorial Desk
                    </p>
                    <p className="font-poppins font-bold text-on-surface">
                      curator@nestiq.hospitality
                    </p>
                    <p className="text-xs text-primary mt-0.5">Responses within 2 hours</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-poppins font-bold text-base text-on-surface mb-4">
                    Global Ateliers
                  </h3>
                  <div className="space-y-3">
                    {OFFICES.map((o) => (
                      <div
                        key={o.city}
                        className="flex items-start gap-4 p-4 rounded-xl"
                        style={{ background: 'var(--surface-container-low)' }}
                      >
                        <span className="text-2xl">{o.icon}</span>
                        <div>
                          <p className="font-semibold text-on-surface text-sm">{o.city}</p>
                          <p className="text-xs text-primary">
                            {o.area} · {o.address}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl p-6 text-white" style={{ background: '#0f0f0f' }}>
                  <Sparkles size={16} className="text-amber-400 mb-3" />
                  <h4 className="font-poppins font-bold text-base mb-2">
                    Intelligence Peak — Instant Curation
                  </h4>
                  <p className="text-sm text-white/60 mb-4">
                    Experience our AI-driven concierge for immediate availability checks and
                    personalised itineraries.
                  </p>
                  <a href="/concierge" className="btn-amber text-sm">
                    Start AI Session
                  </a>
                </div>
              </div>

              <div className="card-editorial p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                      style={{ background: 'var(--secondary-container)' }}
                    >
                      <Check size={24} className="text-secondary" />
                    </div>
                    <h3 className="font-poppins font-bold text-xl text-on-surface mb-2">
                      Message Received
                    </h3>
                    <p className="text-sm text-primary">
                      Our specialists will respond within 2 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-poppins font-bold text-xl text-on-surface mb-6">
                      Send a Message
                    </h3>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-primary mb-1.5 block">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => set('name', e.target.value)}
                            className="input-field"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-primary mb-1.5 block">
                            Email
                          </label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => set('email', e.target.value)}
                            className="input-field"
                            placeholder="you@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-primary mb-1.5 block">
                          Inquiry Type
                        </label>
                        <select
                          value={form.type}
                          onChange={(e) => set('type', e.target.value)}
                          className="input-field"
                        >
                          {[
                            'General Inquiry',
                            'Booking Assistance',
                            'Partnership',
                            'Press & Media',
                            'Technical Support',
                          ].map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-primary mb-1.5 block">
                          Message
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) => set('message', e.target.value)}
                          rows={5}
                          className="input-field resize-none"
                          placeholder="Describe your ideal escape…"
                        />
                      </div>
                      <button
                        onClick={() => setSubmitted(true)}
                        className="btn-primary w-full gap-2"
                      >
                        <Send size={15} /> Send to Concierge
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
