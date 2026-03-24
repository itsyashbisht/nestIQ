'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ArrowLeft, Check, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { registerUser } from '@/src/thunks/auth.thunk';
import { clearAuthError } from '@//src/slices/auth.slice';
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

const STEPS = [
  { id: 0, label: 'Account', sub: 'Credentials' },
  { id: 1, label: 'Personal', sub: 'Your info' },
  { id: 2, label: 'Address', sub: 'Location' },
];

const PERKS = [
  'AI hotel discovery tailored to your taste',
  'Exclusive deals and last-minute offers',
  'One-click booking via Razorpay',
  'AI Concierge available 24 / 7',
];

const STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Chandigarh',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry',
];

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error, isAuthenticated } = useSelector((s: RootState) => s.auth);

  const [step, setStep] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    fullname: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    if (isAuthenticated) router.replace('/');
  }, [isAuthenticated, router]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function validate(): boolean {
    if (step === 0) {
      if (!form.username.trim()) {
        toast.error('Username is required');
        return false;
      }
      if (!form.email.includes('@')) {
        toast.error('Enter a valid email');
        return false;
      }
      if (form.password.length < 6) {
        toast.error('Password must be 6+ characters');
        return false;
      }
    }
    if (step === 1) {
      if (!form.fullname.trim()) {
        toast.error('Full name is required');
        return false;
      }
      if (form.phoneNumber.replace(/\D/g, '').length < 10) {
        toast.error('Enter a valid phone number');
        return false;
      }
    }
    if (step === 2) {
      if (!form.address.trim()) {
        toast.error('Address is required');
        return false;
      }
      if (!form.city.trim()) {
        toast.error('City is required');
        return false;
      }
      if (!form.state) {
        toast.error('Select your state');
        return false;
      }
      if (form.pincode.replace(/\D/g, '').length !== 6) {
        toast.error('Enter a valid 6-digit pincode');
        return false;
      }
    }
    return true;
  }

  function handleNext() {
    if (validate()) setStep((s) => s + 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const res = await dispatch(
      registerUser({
        ...form,
        phoneNumber: Number(form.phoneNumber.replace(/\D/g, '')),
        pincode: Number(form.pincode),
      })
    );
    if (registerUser.fulfilled.match(res)) {
      toast.success('Account created! Welcome to NestIQ.');
      router.replace('/');
    }
  }

  /* ── Input style — neutral, no color accent ──────────────── */
  const inputSx = (name: string): React.CSSProperties => ({
    width: '100%',
    background: focused === name ? '#FAFAF8' : C.bg,
    border: `1.5px solid ${focused === name ? C.text : C.border}`,
    borderRadius: 12,
    padding: '0.78rem 1rem',
    fontSize: '0.9rem',
    fontFamily: 'Inter, sans-serif',
    color: C.text,
    outline: 'none',
    boxShadow: focused === name ? '0 0 0 3px rgba(26,26,26,0.06)' : 'none',
    transition: 'border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
  });

  const labelSx: React.CSSProperties = {
    display: 'block',
    fontSize: '0.72rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.09em',
    color: C.muted,
    fontFamily: 'Inter, sans-serif',
    marginBottom: '0.5rem',
  };

  /* ── Step indicator dot ──────────────────────────────────── */
  function StepDot({ id }: { id: number }) {
    const done = step > id;
    const active = step === id;
    return (
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: done ? C.text : active ? C.text : 'transparent',
          border: done || active ? 'none' : `1.5px solid ${C.border}`,
          transition: 'all 0.25s',
        }}
      >
        {done ? (
          <Check size={12} color="#fff" />
        ) : (
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: active ? '#fff' : C.faint,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {id + 1}
          </span>
        )}
      </div>
    );
  }

  /* ── Shared pill button styles ───────────────────────────── */
  const btnPrimary: React.CSSProperties = {
    width: '100%',
    background: C.text,
    color: '#fff',
    border: 'none',
    borderRadius: 9999,
    padding: '0.9rem 1.5rem',
    fontSize: '0.9375rem',
    fontWeight: 600,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    transition: 'background 0.2s',
    letterSpacing: '0.005em',
  };

  const btnSecondary: React.CSSProperties = {
    flex: 1,
    background: C.bgSoft,
    color: C.text,
    border: `1.5px solid ${C.border}`,
    borderRadius: 9999,
    padding: '0.875rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    transition: 'background 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg }}>
      {/* ══════════════════════════════════════
          LEFT — photo panel
      ══════════════════════════════════════ */}
      <div
        style={{ flex: '0 0 44%', position: 'relative', overflow: 'hidden' }}
        className="hidden lg:block"
      >
        <Image
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1400&q=90"
          alt="NestIQ"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.22) 56%, rgba(0,0,0,0.38) 100%)',
          }}
        />

        {/* Logo */}
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

        {/* Bottom content */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2.5rem 2.5rem 3.5rem',
          }}
        >
          {/* Perks — neutral check marks, no orange */}
          <div style={{ marginBottom: '2rem' }}>
            <p
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.38)',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '1rem',
              }}
            >
              What you get
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {PERKS.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {/* White check circle — no orange */}
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.18)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={10} color="#fff" />
                  </div>
                  <span
                    style={{
                      fontSize: '0.825rem',
                      color: 'rgba(255,255,255,0.75)',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <h2
            style={{
              fontFamily: 'Poppins, Inter, sans-serif',
              fontSize: 'clamp(1.4rem, 2.5vw, 1.875rem)',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.022em',
              lineHeight: 1.2,
              maxWidth: 320,
              marginBottom: '0.5rem',
            }}
          >
            Your perfect stay is just one search away.
          </h2>
          <p
            style={{
              fontSize: '0.825rem',
              color: 'rgba(255,255,255,0.38)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Join 10,000+ travelers who found their ideal stay with NestIQ.
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
            }}
          >
            <ArrowLeft size={14} /> Back
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
            Have an account?{' '}
            <Link href="/login" style={{ color: C.text, fontWeight: 600, textDecoration: 'none' }}>
              Sign In
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
            padding: '1.25rem 2.5rem 4rem',
          }}
        >
          <div style={{ width: '100%', maxWidth: 420 }}>
            {/* Heading — fully neutral */}
            <div style={{ marginBottom: '1.75rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
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
                Create Account
              </span>
              <h1
                style={{
                  fontFamily: 'Poppins, Inter, sans-serif',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  color: C.text,
                  lineHeight: 1.15,
                  marginBottom: '0.4rem',
                }}
              >
                Join NestIQ
              </h1>
              <p style={{ fontSize: '0.875rem', color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                Discover India&apos;s finest stays, powered by AI.
              </p>
            </div>

            {/* Step indicators — neutral dark */}
            <div style={{ marginBottom: '1.75rem' }}>
              {/* Progress track */}
              <div
                style={{
                  height: 2,
                  background: C.bgWarm,
                  borderRadius: 9999,
                  overflow: 'hidden',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${(step / (STEPS.length - 1)) * 100}%`,
                    background: 'linear-gradient(90deg, #1A1A1A 0%, #E07B39 100%)',
                    borderRadius: 9999,
                    transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                {STEPS.map((s) => (
                  <div
                    key={s.id}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <StepDot id={s.id} />
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          color: step === s.id ? C.text : step > s.id ? C.muted : C.faint,
                          fontFamily: 'Inter, sans-serif',
                          transition: 'color 0.25s',
                          lineHeight: 1.2,
                        }}
                      >
                        {s.label}
                      </p>
                      <p
                        style={{
                          fontSize: '0.62rem',
                          color: C.faint,
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {s.sub}
                      </p>
                    </div>
                    {/* Connector line */}
                    {s.id < STEPS.length - 1 && (
                      <div
                        style={{
                          width: 20,
                          height: 1,
                          background: step > s.id ? C.text : C.border,
                          transition: 'background 0.3s',
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── STEP 0: Account ───────────────────────────── */}
            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={labelSx}>Username</label>
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

                <div>
                  <label style={labelSx}>Email Address</label>
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

                <div>
                  <label style={labelSx}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      name="password"
                      type={showPw ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      onFocus={() => setFocused('password')}
                      onBlur={() => setFocused(null)}
                      required
                      placeholder="Min 6 characters"
                      style={{ ...inputSx('password'), paddingRight: '3rem' }}
                      autoComplete="new-password"
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
                  {/* Password strength — neutral gray bars */}
                  {form.password.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
                      {[2, 4, 6, 8].map((t) => (
                        <div
                          key={t}
                          style={{
                            flex: 1,
                            height: 3,
                            borderRadius: 9999,
                            background: form.password.length >= t ? C.text : C.bgWarm,
                            transition: 'background 0.2s',
                          }}
                        />
                      ))}
                      <span
                        style={{
                          fontSize: '0.65rem',
                          color: C.muted,
                          fontFamily: 'Inter, sans-serif',
                          marginLeft: 4,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {form.password.length >= 8
                          ? 'Strong'
                          : form.password.length >= 4
                            ? 'Medium'
                            : 'Weak'}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  style={{ ...btnPrimary, marginTop: '0.25rem' }}
                >
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* ── STEP 1: Personal ──────────────────────────── */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={labelSx}>Full Name</label>
                  <input
                    name="fullname"
                    type="text"
                    value={form.fullname}
                    onChange={handleChange}
                    onFocus={() => setFocused('fullname')}
                    onBlur={() => setFocused(null)}
                    required
                    placeholder="Yash Bisht"
                    style={inputSx('fullname')}
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label style={labelSx}>Phone Number</label>
                  <input
                    name="phoneNumber"
                    type="tel"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    onFocus={() => setFocused('phoneNumber')}
                    onBlur={() => setFocused(null)}
                    required
                    placeholder="9876543210"
                    maxLength={10}
                    style={inputSx('phoneNumber')}
                    autoComplete="tel"
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                  <button type="button" onClick={() => setStep(0)} style={btnSecondary}>
                    ← Back
                  </button>
                  <button type="button" onClick={handleNext} style={{ ...btnPrimary, flex: 2 }}>
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Address ───────────────────────────── */}
            {step === 2 && (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
              >
                <div>
                  <label style={labelSx}>Street Address</label>
                  <input
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    onFocus={() => setFocused('address')}
                    onBlur={() => setFocused(null)}
                    required
                    placeholder="123, MG Road"
                    style={inputSx('address')}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                  <div>
                    <label style={labelSx}>City</label>
                    <input
                      name="city"
                      type="text"
                      value={form.city}
                      onChange={handleChange}
                      onFocus={() => setFocused('city')}
                      onBlur={() => setFocused(null)}
                      required
                      placeholder="Bangalore"
                      style={inputSx('city')}
                    />
                  </div>
                  <div>
                    <label style={labelSx}>Pincode</label>
                    <input
                      name="pincode"
                      type="text"
                      value={form.pincode}
                      onChange={handleChange}
                      onFocus={() => setFocused('pincode')}
                      onBlur={() => setFocused(null)}
                      required
                      placeholder="560001"
                      maxLength={6}
                      style={inputSx('pincode')}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelSx}>State</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        background: C.bg,
                        border: `1.5px solid ${C.border}`,
                        borderRadius: 12,
                        padding: '0.78rem 2.5rem 0.78rem 1rem',
                        fontSize: '0.9rem',
                        fontFamily: 'Inter, sans-serif',
                        color: form.state ? C.text : C.faint,
                        outline: 'none',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s',
                        appearance: 'none',
                      }}
                    >
                      <option value="">Select state…</option>
                      {STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronRight
                      size={14}
                      color={C.faint}
                      style={{
                        position: 'absolute',
                        right: 14,
                        top: '50%',
                        transform: 'translateY(-50%) rotate(90deg)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                  <button type="button" onClick={() => setStep(1)} style={btnSecondary}>
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      ...btnPrimary,
                      flex: 2,
                      background: loading ? '#6A6A6A' : C.text,
                      cursor: loading ? 'not-allowed' : 'pointer',
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
                        Creating…
                      </>
                    ) : (
                      <>
                        <Check size={15} /> Create Account
                      </>
                    )}
                  </button>
                </div>

                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '0.72rem',
                    color: C.faint,
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.6,
                  }}
                >
                  By continuing you agree to our{' '}
                  <Link
                    href="/terms"
                    style={{ color: C.muted, textDecoration: 'underline', textUnderlineOffset: 2 }}
                  >
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    style={{ color: C.muted, textDecoration: 'underline', textUnderlineOffset: 2 }}
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}

            <p
              style={{
                textAlign: 'center',
                fontSize: '0.8375rem',
                color: C.muted,
                fontFamily: 'Inter, sans-serif',
                marginTop: '1.5rem',
              }}
            >
              Already have an account?{' '}
              <Link
                href="/login"
                style={{ color: C.text, fontWeight: 600, textDecoration: 'none' }}
              >
                Sign In →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
