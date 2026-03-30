'use client';

import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { ChangeEvent, type FormEvent } from 'react';

interface Props {
  form: { email: string; password: string };
  errors: Record<string, string>;
  loading: boolean;
  error: string | null;
  showPass: boolean;
  onField: (key: string, value: string) => void;
  onShowPass: (val: boolean) => void;
  onSubmit: (e: FormEvent) => void;
}

export function LoginForm({
  form,
  errors,
  loading,
  error,
  showPass,
  onField,
  onShowPass,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <h2
        className="font-poppins font-black text-2xl text-on-surface mb-1"
        style={{ letterSpacing: '-0.03em' }}
      >
        Welcome back.
      </h2>
      <p className="text-primary text-sm mb-8">Sign in to your curated lounge.</p>

      <div className="space-y-4">
        {/* Email */}
        <div className="space-y-1">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
            <input
              type="email"
              placeholder="Email Address"
              className="input-field pl-11"
              value={form.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onField('email', e.target.value)}
            />
          </div>
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              className="input-field pl-11 pr-11"
              value={form.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onField('password', e.target.value)}
            />
            <button
              type="button"
              onClick={() => onShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
        </div>

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-xs text-secondary hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[linear-gradient(145deg,#9c36b5_0%,#7e2d93_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(156,54,181,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(156,54,181,0.3)] disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign In to Lounge'}
        </button>

        {/* Server error */}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </form>
  );
}
