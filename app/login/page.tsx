'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ArrowLeft, Eye, EyeOff, MapPin } from 'lucide-react';
import { loginUser } from '@/src/thunks/auth.thunk';
import { clearAuthError } from '@/src/slices/auth.slice';
import type { AppDispatch, RootState } from '@/src/store';

/* ── Serenity-exact color tokens ────────────────────────────── */
const C = {
  bg: '#FFFFFF',
  bgSoft: '#F5F5F3',
  bgWarm: '#F2F0EB',
  text: '#1A1A1A',
  body: '#4A4A4A',
  muted: '#8A8A8A',
  faint: '#B0B0B0',
  border: '#E8E4DE',
};

/* ── Floating hotel cards ────────────────────────────────────── */
const CARDS = [
  {
    name: 'Evergreen Lodge & Spa',
    city: 'Coorg, Karnataka',
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=160&q=80',
  },
  {
    name: 'Azure Cove Resort',
    city: 'Maldives',
    rating: 5.0,
    img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=160&q=80',
  },
  {
    name: 'VistaGrand Suites',
    city: 'Udaipur, Rajasthan',
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=160&q=80',
  },
];

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error, isAuthenticated } = useSelector((s: RootState) => s.auth);

  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) router.replace('/');
  }, [isAuthenticated, router]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(res)) {
      toast.success('Welcome back!');
      router.replace('/');
    }
  }

  /* Input style — border goes near-black on focus, no color accent */
  const inputSx = (name: string): React.CSSProperties => ({
    width: '100%',
    background: name === focused ? '#FAFAF8' : C.bg,
    border: `1.5px solid ${focused === name ? '#1A1A1A' : C.border}`,
    borderRadius: 12,
    padding: '0.78rem 1rem',
    fontSize: '0.9rem',
    fontFamily: 'Inter, sans-serif',
    color: C.text,
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg }}>
      {/* ══════════════════════════════════════
          LEFT — full-bleed photo panel
      ══════════════════════════════════════ */}
      <div
        style={{ flex: '0 0 52%', position: 'relative', overflow: 'hidden' }}
        className="hidden lg:block"
      >
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=90"
          alt="NestIQ"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Serenity-style gradient: heavy at bottom, lighter at top */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.32) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.22) 0%, transparent 55%)',
          }}
        />

        {/* Logo — tiny glass pill top-left (matches Serenity) */}
        <div style={{ position: 'absolute', top: 32, left: 36 }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: 9999,
              padding: '0.32rem 1rem',
              fontFamily: 'Poppins, Inter, sans-serif',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: '#fff',
              letterSpacing: '-0.015em',
              textDecoration: 'none',
            }}
          >
            NestIQ*
          </Link>
        </div>

        {/* Floating hotel cards — offset stack */}
        <div
          style={{
            position: 'absolute',
            top: 90,
            right: 28,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: 236,
          }}
        >
          {CARDS.map((card, i) => (
            <div
              key={card.name}
              style={{
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: 16,
                padding: '0.65rem 0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transform: i === 1 ? 'translateX(14px)' : i === 2 ? 'translateX(7px)' : 'none',
                opacity: i === 2 ? 0.7 : 1,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  overflow: 'hidden',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                <Image
                  src={card.img}
                  alt={card.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="40px"
                />
              </div>
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {card.name}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
                  <MapPin size={9} color="rgba(255,255,255,0.48)" />
                  <span
                    style={{
                      fontSize: '0.64rem',
                      color: 'rgba(255,255,255,0.48)',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {card.city}
                  </span>
                </div>
              </div>
              {/* Rating — neutral white, no orange */}
              <div
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1,
                  }}
                >
                  {card.rating}
                </span>
                <span
                  style={{
                    fontSize: '0.55rem',
                    color: 'rgba(255,255,255,0.45)',
                    fontFamily: 'Inter, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  stars
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom — stats + headline */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2.5rem 2.5rem 3rem',
          }}
        >
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.75rem' }}>
            {[
              { v: '25+', l: 'Curated Hotels' },
              { v: '10K+', l: 'Happy Travelers' },
              { v: '4.8', l: 'Average Rating' },
            ].map((s) => (
              <div key={s.l}>
                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.v}
                </p>
                <p
                  style={{
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'Inter, sans-serif',
                    marginTop: 4,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {s.l}
                </p>
              </div>
            ))}
          </div>
          <h2
            style={{
              fontFamily: 'Poppins, Inter, sans-serif',
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.022em',
              lineHeight: 1.2,
              maxWidth: 340,
              marginBottom: '0.6rem',
            }}
          >
            Discover India&apos;s finest stays, curated just for you.
          </h2>
          <p
            style={{
              fontSize: '0.825rem',
              color: 'rgba(255,255,255,0.42)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            AI-Powered · Verified · Instant Booking
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          RIGHT — form panel
      ══════════════════════════════════════ */}
      <div
        style={{
          flex: 1,
          background: C.bg,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.75rem 2.5rem',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.8125rem',
              color: C.muted,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            <ArrowLeft size={14} /> Back to home
          </Link>
          <Link
            href="/"
            className="lg:hidden"
            style={{
              fontFamily: 'Poppins, Inter, sans-serif',
              fontWeight: 700,
              fontSize: '1.0625rem',
              color: C.text,
              letterSpacing: '-0.02em',
              textDecoration: 'none',
            }}
          >
            NestIQ*
          </Link>
          <p style={{ fontSize: '0.8125rem', color: C.muted, fontFamily: 'Inter, sans-serif' }}>
            No account?{' '}
            <Link
              href="/register"
              style={{ color: C.text, fontWeight: 600, textDecoration: 'none' }}
            >
              Register
            </Link>
          </p>
        </div>

        {/* Centred form */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem 2.5rem 4rem',
          }}
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            {/* Heading — NO orange, pure neutral */}
            <div style={{ marginBottom: '2.25rem' }}>
              {/* Neutral eyebrow pill — matches Serenity's muted labels */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '0.3rem 0.875rem',
                  borderRadius: 9999,
                  background: C.bgWarm,
                  border: `1px solid ${C.border}`,
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: C.muted,
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '1rem',
                }}
              >
                Welcome Back
              </span>
              <h1
                style={{
                  fontFamily: 'Poppins, Inter, sans-serif',
                  fontSize: '1.875rem',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  color: C.text,
                  lineHeight: 1.15,
                  marginBottom: '0.5rem',
                }}
              >
                Sign in to NestIQ
              </h1>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: C.muted,
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.65,
                }}
              >
                Access your bookings, saved hotels and personalised recommendations.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
            >
              {/* Username */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.09em',
                    color: C.muted,
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '0.5rem',
                  }}
                >
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  onFocus={() => setFocused('username')}
                  onBlur={() => setFocused(null)}
                  required
                  placeholder="your_username"
                  style={inputSx('username')}
                  autoComplete="username"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.09em',
                    color: C.muted,
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '0.5rem',
                  }}
                >
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  required
                  placeholder="you@email.com"
                  style={inputSx('email')}
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                  }}
                >
                  <label
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.09em',
                      color: C.muted,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Password
                  </label>
                  {/* Neutral — not orange */}
                  <Link
                    href="/forgot-password"
                    style={{
                      fontSize: '0.75rem',
                      color: C.muted,
                      fontFamily: 'Inter, sans-serif',
                      textDecoration: 'underline',
                      textUnderlineOffset: 2,
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    name="password"
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    required
                    placeholder="••••••••"
                    style={{ ...inputSx('password'), paddingRight: '3rem' }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    style={{
                      position: 'absolute',
                      right: 14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: C.faint,
                      display: 'flex',
                      padding: 2,
                    }}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit — fully rounded pill, near-black */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: '0.25rem',
                  width: '100%',
                  background: loading ? '#6A6A6A' : C.text,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 9999 /* fully rounded — Serenity style */,
                  padding: '0.9rem 1.5rem',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'background 0.2s',
                  letterSpacing: '0.005em',
                }}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        border: '2.5px solid rgba(255,255,255,0.25)',
                        borderTopColor: '#fff',
                        animation: 'spin 0.75s linear infinite',
                        display: 'inline-block',
                      }}
                    />
                    Signing in…
                  </>
                ) : (
                  'Sign In →'
                )}
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, height: 1, background: C.bgWarm }} />
                <span
                  style={{ fontSize: '0.72rem', color: C.faint, fontFamily: 'Inter, sans-serif' }}
                >
                  or
                </span>
                <div style={{ flex: 1, height: 1, background: C.bgWarm }} />
              </div>

              {/* Create account — fully rounded, soft bg */}
              <Link
                href="/register"
                style={{
                  display: 'block',
                  width: '100%',
                  background: C.bgSoft,
                  color: C.text,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: 9999 /* fully rounded */,
                  padding: '0.875rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              >
                Create a new account
              </Link>
            </form>

            {/* Trust badges — neutral dots, no orange */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                marginTop: '2.25rem',
              }}
            >
              {['256-bit SSL', 'Razorpay Secured', 'No spam'].map((t) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: C.border,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{ fontSize: '0.68rem', color: C.faint, fontFamily: 'Inter, sans-serif' }}
                  >
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
