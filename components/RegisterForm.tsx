'use client';

import { type ChangeEvent, type FormEvent } from 'react';
import { StepIndicator } from '@/components/stepIndicator';
import { Check, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { type ValidationErrors } from '@/src/lib/validators/auth.validator';
import { AuthFormState } from '@/src/hooks/useAuthForm';
import Link from 'next/link';

interface RegisterFormProps {
  form: AuthFormState;
  errors: ValidationErrors;
  step: number; // 1 | 2 | 3
  agreed: boolean;
  loading: boolean;
  error: string | null;
  showPass: boolean;
  onField: (key: keyof AuthFormState, value: string) => void;
  onToggleAgreed: () => void;
  onShowPass: (val: boolean) => void;
  onAdvance: () => void; // validates + moves to next step
  onRetreat: () => void; // moves back
  onSubmit: (e: FormEvent) => void; // only fires on step 3
}

const REG_STEPS = ['Account', 'Personal', 'Address'];

export function RegisterForm({
  step,
  error,
  errors,
  agreed,
  loading,
  showPass,
  onField,
  onAdvance,
  onRetreat,
  onSubmit,
  form,
  onToggleAgreed,
  onShowPass,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate>
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
        <StepIndicator steps={REG_STEPS} current={step} />
      </div>

      <div className="space-y-4">
        {step === 1 && (
          <>
            <div className="space-y-1">
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  type="text"
                  placeholder="Username"
                  className="input-field pl-11"
                  value={form.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onField('username', e.target.value)}
                />
              </div>
              {errors.username && <p className="text-xs text-red-600">{errors.username}</p>}
            </div>
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
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
            </div>
            <div className="space-y-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={onToggleAgreed}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    agreed
                      ? 'bg-secondary'
                      : 'bg-surface-container border border-surface-container-high'
                  }`}
                >
                  {agreed && <Check size={11} className="text-white" />}
                </span>
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
              {errors.agreed && <p className="text-xs text-red-600">{errors.agreed}</p>}
            </div>
            <button
              type="button"
              onClick={() => onAdvance()}
              disabled={!agreed}
              className="w-full rounded-full bg-[linear-gradient(145deg,#9c36b5_0%,#7e2d93_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(156,54,181,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(156,54,181,0.3)] disabled:opacity-50"
            >
              Continue to Personal Details
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-1">
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  type="text"
                  value={form.fullname}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onField('fullname', e.target.value)}
                  placeholder="Full Name"
                  className="input-field pl-11"
                />
              </div>
              {errors.fullname && <p className="text-xs text-red-600">{errors.fullname}</p>}
            </div>
            <div className="space-y-1">
              <input
                type="tel"
                value={form.phoneNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onField('phoneNumber', e.target.value)}
                placeholder="Phone Number"
                className="input-field"
              />
              {errors.phoneNumber && <p className="text-xs text-red-600">{errors.phoneNumber}</p>}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onRetreat()}
                className="flex-1 rounded-full border border-[rgba(156,54,181,0.16)] bg-white/70 px-6 py-3 text-sm font-semibold text-[#1f2a37] transition-all duration-200 hover:bg-[#f7eef9]"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => onAdvance()}
                className="flex-1 rounded-full bg-[linear-gradient(145deg,#9c36b5_0%,#7e2d93_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(156,54,181,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(156,54,181,0.3)]"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="space-y-1">
              <input
                type="text"
                value={form.address}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onField('address', e.target.value)}
                placeholder="Address"
                className="input-field"
              />
              {errors.address && <p className="text-xs text-red-600">{errors.address}</p>}
            </div>
            <div className="space-y-1">
              <input
                type="text"
                value={form.city}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onField('city', e.target.value)}
                placeholder="City"
                className="input-field"
              />
              {errors.city && <p className="text-xs text-red-600">{errors.city}</p>}
            </div>
            <div className="space-y-1">
              <input
                type="text"
                value={form.state}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onField('state', e.target.value)}
                placeholder="State"
                className="input-field"
              />
              {errors.state && <p className="text-xs text-red-600">{errors.state}</p>}
            </div>
            <div className="space-y-1">
              <input
                type="text"
                value={form.pincode}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onField('pincode', e.target.value)}
                placeholder="Pincode"
                className="input-field"
              />
              {errors.pincode && <p className="text-xs text-red-600">{errors.pincode}</p>}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onRetreat()}
                className="flex-1 rounded-full border border-[rgba(156,54,181,0.16)] bg-white/70 px-6 py-3 text-sm font-semibold text-[#1f2a37] transition-all duration-200 hover:bg-[#f7eef9]"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-full bg-[linear-gradient(145deg,#9c36b5_0%,#7e2d93_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(156,54,181,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(156,54,181,0.3)] disabled:opacity-60"
              >
                {loading ? 'Creating...' : 'Create Haven'}
              </button>
            </div>
            {error && <p className="text-sm text-red-600">{String(error)}</p>}
          </>
        )}
      </div>

      {step === 1 && (
        <>
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: 'var(--surface-container-high)' }} />
            <span className="text-xs text-primary">Or connect with</span>
            <div className="flex-1 h-px" style={{ background: 'var(--surface-container-high)' }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="btn-secondary text-sm">
              Google
            </button>
            <button type="button" className="btn-secondary text-sm">
              Apple
            </button>
          </div>
        </>
      )}
    </form>
  );
}
