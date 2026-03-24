'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { StepIndicator } from '@/components/index.tsx';

const REG_STEPS = ['Account', 'Personal', 'Address'];

export default function AuthPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>(
    params.get('mode') === 'register' ? 'register' : 'login'
  );
  const [showPass, setShowPass] = useState(false);
  const [regStep, setRegStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);

  const handleField = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#0f0f0f' }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[440px] flex-shrink-0 p-12 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
        <div className="relative z-10">
          <Link href="/" className="font-poppins font-black text-2xl text-white">
            Nest<span style={{ color: '#f59e0b' }}>IQ</span>
          </Link>
        </div>
        <div className="relative z-10">
          <div className="glass-dark rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                JV
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Julian Vance</p>
                <p className="text-white/50 text-xs">Elite Concierge Member</p>
              </div>
            </div>
            <p className="text-white/80 text-sm italic leading-relaxed">
              "Every stay is an editorial masterpiece waiting to be lived."
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { v: '48', l: 'Countries' },
              { v: '850+', l: 'Hotels' },
              { v: '24/7', l: 'Support' },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-poppins font-black text-xl text-white">{s.v}</p>
                <p className="text-white/50 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div
        className="flex-1 flex items-center justify-center p-8"
        style={{ background: 'var(--surface)' }}
      >
        <div className="w-full max-w-md">
          {/* Logo (mobile) */}
          <Link
            href="/"
            className="lg:hidden font-poppins font-black text-xl text-on-surface mb-8 block"
          >
            Nest<span className="text-secondary">IQ</span>
          </Link>

          {/* Mode tabs */}
          <div
            className="flex items-center gap-1 p-1 rounded-2xl mb-8"
            style={{ background: 'var(--surface-container-low)' }}
          >
            {['login', 'register'].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m as any);
                  setRegStep(1);
                }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
                  mode === m ? 'bg-white text-on-surface shadow-sm' : 'text-primary'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {mode === 'login' ? (
            <>
              <h2
                className="font-poppins font-black text-2xl text-on-surface mb-1"
                style={{ letterSpacing: '-0.03em' }}
              >
                Welcome back.
              </h2>
              <p className="text-primary text-sm mb-8">Sign in to your curated lounge.</p>
              <div className="space-y-4">
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="input-field pl-11"
                    value={form.email}
                    onChange={(e) => handleField('email', e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                  />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Password"
                    className="input-field pl-11 pr-11"
                    value={form.password}
                    onChange={(e) => handleField('password', e.target.value)}
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-on-surface"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <Link href="#" className="text-xs text-secondary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full">
                  {loading ? 'Signing in…' : 'Sign In to Lounge'}
                </button>
              </div>

              <div className="flex items-center gap-4 my-6">
                <div
                  className="flex-1 h-px"
                  style={{ background: 'var(--surface-container-high)' }}
                />
                <span className="text-xs text-primary">Or connect with</span>
                <div
                  className="flex-1 h-px"
                  style={{ background: 'var(--surface-container-high)' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-secondary text-sm gap-2">🌐 Google</button>
                <button className="btn-secondary text-sm gap-2">🍎 Apple</button>
              </div>
            </>
          ) : (
            <>
              <h2
                className="font-poppins font-black text-2xl text-on-surface mb-1"
                style={{ letterSpacing: '-0.03em' }}
              >
                Create Your Haven
              </h2>
              <p className="text-primary text-sm mb-6">
                Enter your details to begin your journey with NestIQ.
              </p>
              <div className="mb-8">
                <StepIndicator steps={REG_STEPS} current={regStep} />
              </div>

              <div className="space-y-4">
                {regStep === 1 && (
                  <>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="input-field pl-11"
                        value={form.email}
                        onChange={(e) => handleField('email', e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                      />
                      <input
                        type={showPass ? 'text' : 'password'}
                        placeholder="Password"
                        className="input-field pl-11 pr-11"
                        value={form.password}
                        onChange={(e) => handleField('password', e.target.value)}
                      />
                      <button
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div
                        onClick={() => setAgreed(!agreed)}
                        className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${agreed ? 'bg-secondary' : 'bg-surface-container border border-surface-container-high'}`}
                      >
                        {agreed && <Check size={11} className="text-white" />}
                      </div>
                      <span className="text-xs text-primary leading-relaxed">
                        I agree to the{' '}
                        <Link href="#" className="text-secondary underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="#" className="text-secondary underline">
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                    <button
                      onClick={() => setRegStep(2)}
                      disabled={!agreed}
                      className="btn-primary w-full disabled:opacity-50"
                    >
                      Continue to Personal Details
                    </button>
                  </>
                )}
                {regStep === 2 && (
                  <>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                      />
                      <input type="text" placeholder="Full Name" className="input-field pl-11" />
                    </div>
                    <input type="tel" placeholder="Phone Number" className="input-field" />
                    <input type="date" className="input-field" />
                    <div className="flex gap-3">
                      <button onClick={() => setRegStep(1)} className="btn-secondary flex-1">
                        Back
                      </button>
                      <button onClick={() => setRegStep(3)} className="btn-primary flex-1">
                        Continue
                      </button>
                    </div>
                  </>
                )}
                {regStep === 3 && (
                  <>
                    <input type="text" placeholder="Address" className="input-field" />
                    <input type="text" placeholder="City" className="input-field" />
                    <select className="input-field">
                      <option>Country</option>
                      <option>India</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                    </select>
                    <div className="flex gap-3">
                      <button onClick={() => setRegStep(2)} className="btn-secondary flex-1">
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn-primary flex-1"
                      >
                        {loading ? 'Creating…' : 'Create Haven'}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {regStep === 1 && (
                <>
                  <div className="flex items-center gap-4 my-6">
                    <div
                      className="flex-1 h-px"
                      style={{ background: 'var(--surface-container-high)' }}
                    />
                    <span className="text-xs text-primary">Or connect with</span>
                    <div
                      className="flex-1 h-px"
                      style={{ background: 'var(--surface-container-high)' }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="btn-secondary text-sm">🌐 Google</button>
                    <button className="btn-secondary text-sm">🍎 Apple</button>
                  </div>
                </>
              )}
            </>
          )}

          <p className="text-center text-xs text-primary mt-8">
            {mode === 'login' ? 'New here? ' : 'Already a member? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-secondary font-semibold hover:underline"
            >
              {mode === 'login' ? 'Create Your Haven' : 'Sign In to Lounge'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
