'use client';

import { useEffect, useRef, useState } from 'react';
import { RotateCcw, Send, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK = [
  'Is this good for a honeymoon?',
  "What's nearby?",
  'Best room for 2?',
  'Is breakfast included?',
];

interface Props {
  hotelId: string;
  hotelName: string;
}

export default function HotelChat({ hotelId, hotelName }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I know everything about ${hotelName}. Ask me about rooms, nearby places, food, or anything to help you decide!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
      const res = await fetch(`${BASE}/api/v1/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg], hotelId }),
      });

      if (!res.body) throw new Error('No stream');

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let full = '';

      setMessages((m) => [...m, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value);
        // Handle Vercel AI SDK data stream format
        const lines = chunk.split('\n');
        for (const line of lines) {
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
              /* skip */
            }
          }
        }
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: "Sorry, I couldn't connect. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div
      style={{
        background: '#0f0f0f',
        borderRadius: 20,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: 480,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#E07B39',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={15} color="#fff" />
          </div>
          <div>
            <p
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#fff',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              NestIQ Assistant
            </p>
            <p
              style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Ask anything about this hotel
            </p>
          </div>
        </div>
        <button
          onClick={() =>
            setMessages([{ role: 'assistant', content: `Hi! How can I help with ${hotelName}?` }])
          }
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            color: 'rgba(255,255,255,0.3)',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              gap: 8,
              alignItems: 'flex-start',
            }}
          >
            {m.role === 'assistant' && (
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: 'rgba(224,123,57,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <Sparkles size={11} color="#E07B39" />
              </div>
            )}
            <div
              style={{
                maxWidth: '80%',
                padding: '0.65rem 0.9rem',
                borderRadius: m.role === 'user' ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
                background: m.role === 'user' ? '#E07B39' : '#1a1a1a',
                color: m.role === 'user' ? '#fff' : 'rgba(255,255,255,0.82)',
                fontSize: '0.8125rem',
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.6,
              }}
            >
              {m.content ||
                (loading && i === messages.length - 1 ? (
                  <span style={{ display: 'flex', gap: 4, padding: '0.2rem 0' }}>
                    {[0, 1, 2].map((j) => (
                      <span
                        key={j}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.4)',
                          animation: 'pulse 1.4s ease-in-out infinite',
                          animationDelay: `${j * 0.15}s`,
                          display: 'inline-block',
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

      {/* Quick prompts */}
      {messages.length <= 1 && (
        <div
          style={{
            padding: '0 1.25rem 0.75rem',
            display: 'flex',
            gap: 6,
            overflowX: 'auto',
            flexWrap: 'nowrap',
          }}
        >
          {QUICK.map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              style={{
                flexShrink: 0,
                padding: '0.3rem 0.75rem',
                borderRadius: 9999,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.72rem',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '0.75rem 1.25rem',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          gap: 8,
          alignItems: 'center',
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything…"
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 9999,
            padding: '0.5rem 1rem',
            fontSize: '0.8125rem',
            color: '#fff',
            outline: 'none',
            fontFamily: 'Inter, sans-serif',
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          style={{
            width: 34,
            height: 34,
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
          <Send size={14} color="#fff" />
        </button>
      </form>
    </div>
  );
}
