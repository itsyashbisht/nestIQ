'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MapPin, RotateCcw, Send, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'Plan a 3-day romantic trip to Coorg under ₹15,000',
  'Best luxury hotels in Udaipur with lake views',
  'Family-friendly resorts near Bangalore for a weekend',
  'Budget backpacker stays in Manali in December',
  'Wellness retreats in Kerala for 5 nights',
];

export default function ConciergePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm your NestIQ AI Concierge 🌟\n\nI can help you plan complete trips, find hotels that match your vibe, compare properties, estimate budgets, and check weather for your travel dates. Just tell me where you want to go and what kind of experience you're looking for!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<any[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
      const res = await fetch(`${BASE}/api/v1/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          isConcierge: true,
        }),
      });

      if (!res.body) throw new Error('No stream');

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let full = '';

      setMessages((m) => [...m, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = dec.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          // Vercel AI SDK data stream
          if (line.startsWith('0:')) {
            try {
              const txt = JSON.parse(line.slice(2));
              full += txt;
              setMessages((m) => {
                const updated = [...m];
                updated[updated.length - 1] = { role: 'assistant', content: full };
                return updated;
              });
            } catch {
              /* skip malformed */
            }
          }
          // Hotel results from tool use
          if (line.startsWith('8:')) {
            try {
              const data = JSON.parse(line.slice(2));
              if (data?.hotels) setHotels(data.hotels.slice(0, 3));
            } catch {
              /* skip */
            }
          }
        }
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: "Sorry, I couldn't connect right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  function reset() {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! I'm your NestIQ AI Concierge 🌟\n\nHow can I help you plan your next stay?",
      },
    ]);
    setHotels([]);
    setInput('');
  }

  return (
    <>
      <Navigation />

      <div style={{ minHeight: '100vh', background: '#F7F6F2', paddingTop: 68 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 3rem 0' }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(224,123,57,0.08)',
                  border: '1px solid rgba(224,123,57,0.18)',
                  borderRadius: 9999,
                  padding: '0.3rem 0.9rem',
                  marginBottom: '0.5rem',
                }}
              >
                <Sparkles size={13} color="#E07B39" />
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#E07B39',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  AI-Powered
                </span>
              </div>
              <h1
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  color: '#111',
                  lineHeight: 1.15,
                }}
              >
                Your Travel Concierge
              </h1>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#888',
                  fontFamily: 'Inter, sans-serif',
                  marginTop: 4,
                }}
              >
                Plan trips, find hotels, estimate budgets — just describe what you want.
              </p>
            </div>
            <button
              onClick={reset}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0.5rem 1rem',
                borderRadius: 9999,
                border: '1px solid #E8E6E1',
                background: '#fff',
                fontSize: '0.8rem',
                color: '#666',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              <RotateCcw size={13} /> New Chat
            </button>
          </div>
        </div>

        {/* Main layout: chat left, results right */}
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 3rem 4rem',
            display: 'grid',
            gridTemplateColumns: hotels.length ? '1fr 340px' : '1fr',
            gap: '1.5rem',
            alignItems: 'start',
          }}
        >
          {/* Chat panel */}
          <div
            style={{
              background: '#0f0f0f',
              borderRadius: 24,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100vh - 240px)',
              minHeight: 500,
            }}
          >
            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                    gap: 10,
                    alignItems: 'flex-start',
                  }}
                >
                  {m.role === 'assistant' && (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #E07B39, #C96A28)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <Sparkles size={13} color="#fff" />
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: '78%',
                      padding: '0.75rem 1rem',
                      borderRadius: m.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                      background: m.role === 'user' ? '#E07B39' : '#1a1a1a',
                      color: m.role === 'user' ? '#fff' : 'rgba(255,255,255,0.85)',
                      fontSize: '0.875rem',
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: 1.65,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {m.content ||
                      (loading && i === messages.length - 1 ? (
                        <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
                          {[0, 1, 2].map((j) => (
                            <span
                              key={j}
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.35)',
                                display: 'inline-block',
                                animation: 'bounce 1.2s ease-in-out infinite',
                                animationDelay: `${j * 0.2}s`,
                              }}
                            />
                          ))}
                        </span>
                      ) : (
                        ''
                      ))}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Suggestion pills — show on fresh chat */}
            {messages.length <= 1 && (
              <div style={{ padding: '0 1.5rem 1rem' }}>
                <p
                  style={{
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.3)',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '0.6rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Try asking
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      style={{
                        textAlign: 'left',
                        padding: '0.5rem 0.875rem',
                        borderRadius: 10,
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(255,255,255,0.04)',
                        color: 'rgba(255,255,255,0.55)',
                        fontSize: '0.8rem',
                        fontFamily: 'Inter, sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.18s',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input bar */}
            <form
              onSubmit={handleSubmit}
              style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about travel across India…"
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  padding: '0.65rem 1rem',
                  fontSize: '0.875rem',
                  color: '#fff',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#E07B39',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  opacity: !input.trim() || loading ? 0.4 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                <Send size={16} color="#fff" />
              </button>
            </form>
          </div>

          {/* Hotel results sidebar — shown when AI returns hotels */}
          {hotels.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#aaa',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Suggested Hotels
              </p>
              {hotels.map((h: any, i: number) => (
                <Link key={i} href={`/hotels/${h.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="hotel-card" style={{ border: '1px solid #E8E6E1' }}>
                    <div
                      style={{
                        position: 'relative',
                        aspectRatio: '16/9',
                        overflow: 'hidden',
                        borderRadius: '16px 16px 0 0',
                      }}
                      className="img-zoom"
                    >
                      <Image
                        src={
                          h.images?.[0]?.url ??
                          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
                        }
                        alt={h.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="340px"
                      />
                    </div>
                    <div style={{ padding: '0.875rem' }}>
                      <h4
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#111',
                          marginBottom: 3,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {h.name}
                      </h4>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: '0.75rem',
                          color: '#aaa',
                          fontFamily: 'Inter, sans-serif',
                          marginBottom: 6,
                        }}
                      >
                        <MapPin size={11} />
                        {h.city}, {h.state}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Star size={11} style={{ fill: '#E07B39', color: '#E07B39' }} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#111' }}>
                            {h.rating}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: '#111',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          ₹{h.pricePerNight?.toLocaleString('en-IN')}/night
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <Link
                href="/search"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '0.6rem',
                  borderRadius: 12,
                  border: '1px solid #E8E6E1',
                  background: '#fff',
                  fontSize: '0.8rem',
                  fontFamily: 'Inter, sans-serif',
                  color: '#666',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                View all results <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>

      <Footer />
    </>
  );
}
