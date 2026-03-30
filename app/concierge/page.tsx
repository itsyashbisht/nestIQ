'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { BookmarkCheck, Crown, MessageCircle, RotateCcw, Send, Sparkles, User } from 'lucide-react';
import Navbar from '@/components/layouts/Navigation';
import HotelCard from '@/components/HotelCard';
import { MOCK_HOTELS } from '@/src/lib/data';
import { cn } from '@/src/lib/utils';
// @ts-ignore
import { Message } from '@/types';

const QUICK_PROMPTS = [
  'Find a romantic getaway',
  'Best wellness retreats',
  'Architectural marvels',
  'Hidden gems in India',
  'Beachfront under $500',
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Welcome back, Elena. I've been curating some exceptional experiences since our last conversation. Are you looking for a serene wellness retreat, or perhaps an architectural marvel for your next stay?",
    timestamp: new Date(),
  },
];

const AI_RESPONSES: Record<string, string> = {
  romantic:
    "For a romantic escape, I'd recommend The Ethereal Atoll in the Maldives — overwater villas with unparalleled privacy — or The Alila Diwa Sanctuary in Goa for a lush, paddy-field retreat. Both are exceptionally curated for intimacy.",
  wellness:
    'For wellness, The Alila Diwa Sanctuary in South Goa offers Ayurvedic treatments and a yoga pavilion amidst nature. Alternatively, consider the Kyoto Silent Monolith for a meditative forest experience with Japanese onsen traditions.',
  default:
    "That's a wonderful direction to explore. Based on your travel history and preferences, I've identified several properties that align perfectly with this vision. Let me pull up your curated shortlist.",
};

function getBotReply(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('romantic') || lower.includes('couple')) return AI_RESPONSES.romantic;
  if (lower.includes('wellness') || lower.includes('spa') || lower.includes('retreat'))
    return AI_RESPONSES.wellness;
  return AI_RESPONSES.default;
}

export default function ConciergePage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));
    const reply = getBotReply(msg);
    setMessages((prev) => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: 'assistant', content: reply, timestamp: new Date() },
    ]);
    setLoading(false);
  };

  const SIDEBAR_NAV = [
    { icon: <Sparkles size={16} />, label: 'AI Advisor', key: 'advisor' },
    { icon: <BookmarkCheck size={16} />, label: 'Saved Stays', key: 'saved' },
    { icon: <MessageCircle size={16} />, label: 'Recent Chats', key: 'chats' },
    { icon: <Crown size={16} />, label: 'Member Perks', key: 'perks' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface)' }}>
      <Navbar />
      <div className="flex-1 flex pt-16 overflow-hidden" style={{ height: 'calc(100vh - 0px)' }}>
        {/* Sidebar */}
        <aside
          className="hidden lg:flex flex-col w-72 flex-shrink-0 p-5 gap-2 overflow-y-auto"
          style={{
            background: 'var(--surface-container-low)',
            borderRight: '1px solid var(--surface-container)',
          }}
        >
          {/* Header */}
          <div className="px-3 py-2 mb-2">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-secondary" />
              <span className="font-poppins font-bold text-base text-on-surface">
                NestIQ Concierge
              </span>
            </div>
            <p className="text-xs text-primary">Your Digital Curator</p>
          </div>

          {/* Nav */}
          {SIDEBAR_NAV.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left',
                activeTab === item.key
                  ? 'bg-surface-container text-on-surface'
                  : 'text-primary hover:bg-surface-container'
              )}
            >
              <span className={activeTab === item.key ? 'text-secondary' : ''}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          <div className="h-px my-2" style={{ background: 'var(--surface-container)' }} />

          {/* Recent searches */}
          <p className="text-xs font-semibold uppercase tracking-widest text-primary px-3 mb-1">
            Recent Searches
          </p>
          {['Romantic Maldives getaway', 'Kyoto wellness retreat', 'Goa coastal escape'].map(
            (s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-left px-4 py-2.5 rounded-xl text-xs text-primary hover:bg-surface-container hover:text-on-surface transition-colors"
              >
                {s}
              </button>
            )
          )}

          {/* Saved stays */}
          <div className="h-px my-2" style={{ background: 'var(--surface-container)' }} />
          <p className="text-xs font-semibold uppercase tracking-widest text-primary px-3 mb-2">
            Saved Stays
          </p>
          {MOCK_HOTELS.slice(0, 2).map((h) => (
            <Link
              key={h.id}
              href={`/hotel/${h.id}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container transition-colors group"
            >
              <img
                src={h.image}
                alt={h.name}
                className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-on-surface truncate">{h.name}</p>
                <p className="text-[10px] text-primary truncate">{h.location}</p>
              </div>
            </Link>
          ))}
        </aside>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="glass-nav border-b border-white/30 px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(145deg, #9c36b5, #7e2d93)' }}
              >
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="font-poppins font-semibold text-sm text-on-surface">
                  NestIQ Concierge
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <p className="text-[10px] text-primary">Ready to curate your next escape</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setMessages(INITIAL_MESSAGES)}
              className="flex items-center gap-1.5 text-xs text-primary hover:text-on-surface transition-colors px-3 py-2 rounded-lg hover:bg-surface-container"
            >
              <RotateCcw size={13} /> Reset Chat
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-hide">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {msg.role === 'assistant' && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(145deg, #9c36b5, #7e2d93)' }}
                  >
                    <Sparkles size={13} className="text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[70%] rounded-2xl px-5 py-4 text-sm leading-relaxed',
                    msg.role === 'assistant' ? 'rounded-tl-sm' : 'rounded-tr-sm text-white'
                  )}
                  style={
                    msg.role === 'assistant'
                      ? {
                          background: 'var(--surface-container-lowest)',
                          boxShadow: '0 2px 8px rgba(45,52,50,0.06)',
                        }
                      : { background: 'linear-gradient(145deg, #5f5e5e, #535252)' }
                  }
                >
                  <p style={{ color: msg.role === 'assistant' ? 'var(--on-surface)' : 'white' }}>
                    {msg.content}
                  </p>
                </div>
                {msg.role === 'user' && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'var(--surface-container)' }}
                  >
                    <User size={14} className="text-primary" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(145deg, #9c36b5, #7e2d93)' }}
                >
                  <Sparkles size={13} className="text-white" />
                </div>
                <div
                  className="rounded-2xl rounded-tl-sm px-5 py-4"
                  style={{ background: 'var(--surface-container-lowest)' }}
                >
                  <div className="flex gap-1 items-center h-5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ background: 'var(--secondary)', animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Suggested hotels after conversation */}
            {messages.length > 2 && (
              <div className="py-2">
                <p className="text-xs text-primary mb-3 font-medium">Curated for you:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {MOCK_HOTELS.slice(0, 2).map((h) => (
                    <HotelCard key={h.id} hotel={h} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-6 py-2 flex gap-2 overflow-x-auto scrollbar-hide flex-shrink-0">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--surface-container-low)', color: 'var(--on-surface)' }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-6 pb-6 pt-2 flex-shrink-0">
            <div
              className="flex gap-3 p-3 rounded-2xl"
              style={{
                background: 'var(--surface-container-lowest)',
                boxShadow: '0 4px 20px rgba(45,52,50,0.08)',
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask your concierge anything…"
                className="flex-1 bg-transparent text-sm outline-none text-on-surface placeholder-primary"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40 transition-all hover:scale-105 flex-shrink-0"
                style={{ background: 'linear-gradient(145deg, #9c36b5, #7e2d93)' }}
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
