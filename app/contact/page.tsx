'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Loader2, Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';

const TOPICS = [
  'General Enquiry',
  'Booking Support',
  'List My Property',
  'Partnership',
  'Press & Media',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [loading, setLoad] = useState(false);
  const [sent, setSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoad(true);
    await new Promise((r) => setTimeout(r, 1400)); // Simulate API
    setLoad(false);
    setSent(true);
    toast.success("Message sent! We'll get back to you shortly.");
  }

  return (
    <>
      <Navigation />

      <div style={{ minHeight: '100vh', background: '#fff', paddingTop: 68 }}>
        {/* Header */}
        <div style={{ background: '#F7F6F2', padding: '4rem 3rem 5rem', textAlign: 'center' }}>
          <p className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
            Get in Touch
          </p>
          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: '#111',
              marginBottom: '1rem',
            }}
          >
            We&apos;d love to hear from you
          </h1>
          <p
            style={{
              fontSize: '0.9375rem',
              color: '#777',
              fontFamily: 'Inter, sans-serif',
              maxWidth: 440,
              margin: '0 auto',
            }}
          >
            Whether you have a question about a booking, want to list your property, or just want to
            say hello — we&apos;re here.
          </p>
        </div>

        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '4rem 3rem 6rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '5rem',
            alignItems: 'start',
          }}
        >
          {/* Left — contact info */}
          <div>
            <h2
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#111',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              Contact Information
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                marginBottom: '2.5rem',
              }}
            >
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'hello@nestiq.in',
                  href: 'mailto:hello@nestiq.in',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+91 98765 43210',
                  href: 'tel:+919876543210',
                },
                { icon: MapPin, label: 'Office', value: 'Bangalore, Karnataka', href: null },
              ].map((c) => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: '#F7F6F2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <c.icon size={16} color="#E07B39" />
                  </div>
                  <div>
                    <p className="eyebrow" style={{ display: 'block', marginBottom: 2 }}>
                      {c.label}
                    </p>
                    {c.href ? (
                      <a
                        href={c.href}
                        style={{
                          fontSize: '0.9rem',
                          color: '#111',
                          fontFamily: 'Inter, sans-serif',
                          textDecoration: 'none',
                          fontWeight: 500,
                        }}
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: '#111',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                        }}
                      >
                        {c.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Support hours */}
            <div
              style={{
                background: '#F7F6F2',
                borderRadius: 16,
                padding: '1.25rem 1.5rem',
                marginBottom: '2rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#111',
                  marginBottom: '0.5rem',
                }}
              >
                Support Hours
              </p>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#777',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.7,
                }}
              >
                Mon – Sat: 9:00 AM – 9:00 PM IST
                <br />
                Sunday: 10:00 AM – 6:00 PM IST
              </p>
            </div>

            {/* AI concierge prompt */}
            <div style={{ background: '#0f0f0f', borderRadius: 16, padding: '1.25rem 1.5rem' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}
              >
                <Sparkles size={14} color="#E07B39" />
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#E07B39',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Faster answers
                </p>
              </div>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.65,
                  marginBottom: '0.875rem',
                }}
              >
                For instant help with bookings, hotel queries, or trip planning — our AI Concierge
                is available 24/7.
              </p>
              <Link
                href="/concierge"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '0.5rem 1rem',
                  borderRadius: 9999,
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontFamily: 'Inter, sans-serif',
                  textDecoration: 'none',
                }}
              >
                <Sparkles size={12} /> Chat with AI Concierge
              </Link>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {sent ? (
              <div
                style={{
                  background: '#F7F6F2',
                  borderRadius: 24,
                  padding: '4rem 2rem',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(26,158,90,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}
                >
                  <Check size={24} color="#1a9e5a" />
                </div>
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#111',
                    marginBottom: '0.75rem',
                  }}
                >
                  Message Sent!
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#777',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                  }}
                >
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', email: '', topic: '', message: '' });
                  }}
                  style={{
                    background: 'none',
                    border: '1px solid #E8E6E1',
                    borderRadius: 9999,
                    padding: '0.5rem 1.25rem',
                    fontSize: '0.8rem',
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    color: '#555',
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>
                      Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      style={{
                        width: '100%',
                        border: '1.5px solid #E8E6E1',
                        borderRadius: 10,
                        padding: '0.65rem 0.875rem',
                        fontSize: '0.875rem',
                        outline: 'none',
                        fontFamily: 'Inter, sans-serif',
                        color: '#111',
                      }}
                    />
                  </div>
                  <div>
                    <label className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      required
                      style={{
                        width: '100%',
                        border: '1.5px solid #E8E6E1',
                        borderRadius: 10,
                        padding: '0.65rem 0.875rem',
                        fontSize: '0.875rem',
                        outline: 'none',
                        fontFamily: 'Inter, sans-serif',
                        color: '#111',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>
                    Topic
                  </label>
                  <select
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      border: '1.5px solid #E8E6E1',
                      borderRadius: 10,
                      padding: '0.65rem 0.875rem',
                      fontSize: '0.875rem',
                      outline: 'none',
                      fontFamily: 'Inter, sans-serif',
                      color: form.topic ? '#111' : '#aaa',
                      background: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="">Select a topic</option>
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us how we can help…"
                    required
                    style={{
                      width: '100%',
                      border: '1.5px solid #E8E6E1',
                      borderRadius: 10,
                      padding: '0.75rem 0.875rem',
                      fontSize: '0.875rem',
                      outline: 'none',
                      fontFamily: 'Inter, sans-serif',
                      color: '#111',
                      lineHeight: 1.7,
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-dark"
                  style={{
                    justifyContent: 'center',
                    padding: '0.875rem',
                    borderRadius: 12,
                    fontSize: '0.9rem',
                    gap: 8,
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />{' '}
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
