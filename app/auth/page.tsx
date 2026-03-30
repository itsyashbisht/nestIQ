'use client';

import { type FormEvent, Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import { useAuthForm } from '@/src/hooks/useAuthForm';

type AuthMode = 'login' | 'register';

function AuthPageContent() {
  const params = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(
    params.get('mode') === 'register' ? 'register' : 'login'
  );

  const auth = useAuthForm();

  function handleLoginSubmit(e: FormEvent) {
    e.preventDefault();
    auth.submitLogin();
  }

  function handleRegisterSubmit(e: FormEvent) {
    e.preventDefault();
    auth.submitRegister();
  }

  function switchMode(next: AuthMode) {
    setMode(next);
    if (next === 'register') auth.setRegStep(1);
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#0f0f0f' }}>
      <div className="hidden lg:flex lg:w-2/5 xl:w-1/2 flex-col justify-between shrink-0 p-12 relative overflow-hidden">
        <Image
          src="https://unsplash.com/photos/xzC31x_RmZI/download?force=true&w=1200"
          alt="Luxury hotel corridor with warm lighting"
          fill
          priority
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(156,54,181,0.18)_0%,rgba(18,14,22,0.42)_36%,rgba(0,0,0,0.84)_100%)]" />

        <div className="relative z-10">
          <Link href="/" className="font-poppins font-black text-2xl text-white">
            Nest<span className="text-secondary">IQ</span>
          </Link>
        </div>

        <div className="relative z-10">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-md mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm">
                JV
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Julian Vance</p>
                <p className="text-white/60 text-xs">Elite Concierge Member</p>
              </div>
            </div>
            <p className="text-white/80 text-sm italic leading-relaxed">
              &quot;Every stay is an editorial masterpiece waiting to be lived.&quot;
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: '48', label: 'Countries' },
              { value: '850+', label: 'Hotels' },
              { value: '24/7', label: 'Support' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-poppins font-black text-xl text-white">{item.value}</p>
                <p className="text-white/55 text-xs">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex-1 lg:w-3/5 xl:w-1/2 flex items-center justify-center p-8 lg:p-10"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(156,54,181,0.12), transparent 26%), linear-gradient(180deg, var(--surface) 0%, var(--surface-container-low) 100%)',
        }}
      >
        <div className="w-full max-w-md xl:max-w-lg">
          <Link
            href="/"
            className="lg:hidden font-poppins font-black text-xl text-on-surface mb-8 block"
          >
            Nest<span className="text-secondary">IQ</span>
          </Link>

          <div
            className="flex items-center gap-1 rounded-[1.25rem] border p-1 mb-8 shadow-[0_10px_24px_rgba(45,52,50,0.06)]"
            style={{
              background: 'rgba(255,255,255,0.78)',
              borderColor: 'rgba(156,54,181,0.12)',
              backdropFilter: 'blur(18px)',
            }}
          >
            {(['login', 'register'] as AuthMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all
                  ${
                    mode === m
                      ? 'text-white shadow-[0_12px_24px_rgba(156,54,181,0.24)]'
                      : 'text-primary hover:text-on-surface'
                  }`}
                style={
                  mode === m
                    ? {
                        background: 'linear-gradient(145deg, #9c36b5 0%, #7e2d93 100%)',
                      }
                    : undefined
                }
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {mode === 'login' ? (
            <LoginForm
              form={auth.form}
              errors={auth.errors}
              loading={auth.loading}
              error={auth.error}
              showPass={auth.showPass}
              onField={auth.handleField}
              onShowPass={auth.setShowPass}
              onSubmit={handleLoginSubmit}
            />
          ) : (
            <RegisterForm
              form={auth.form}
              errors={auth.errors}
              step={auth.regStep}
              agreed={auth.agreed}
              loading={auth.loading}
              error={auth.error}
              showPass={auth.showPass}
              onField={auth.handleField}
              onToggleAgreed={auth.handleToggleAgreed}
              onShowPass={auth.setShowPass}
              onAdvance={auth.advanceStep}
              onRetreat={auth.retreatStep}
              onSubmit={handleRegisterSubmit}
            />
          )}

          <p className="text-center text-xs text-primary mt-8">
            {mode === 'login' ? 'New here? ' : 'Already a member? '}
            <button
              type="button"
              onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
              className="font-semibold hover:underline text-secondary"
            >
              {mode === 'login' ? 'Create Your Haven' : 'Sign In to Lounge'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthPageContent />
    </Suspense>
  );
}
