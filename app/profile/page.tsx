'use client';

import { useState } from 'react';
import {
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Edit2,
  Mail,
  MapPin,
  Shield,
  Sparkles,
  User,
} from 'lucide-react';
import Navbar from '@/components/layouts/Navigation';
import Footer from '@/components/layouts/Footer';
import { MOCK_USER } from '@/src/lib/data';
import { Badge } from '@/components/badge';
import { AIInsight } from '@/components/AIInsight';
import { cn } from '@/src/lib/utils';
import { useAppSelector } from '@/src/hooks/useAppSelector';

const NAV_ITEMS = [
  { label: 'Profile Details', key: 'profile' },
  { label: 'Security & Access', key: 'security' },
  { label: 'Preferences', key: 'preferences' },
  { label: 'Notifications', key: 'notifications' },
] as const;

const PREFERENCE_TAGS = [
  'Wellness Retreats',
  'Architectural Stays',
  'Private Dining',
  'Mountain Escapes',
  'Slow Travel',
  'Spa Access',
];

const SECURITY_ITEMS = [
  {
    title: 'Change Password',
    description: 'Refresh your credentials and keep account access current.',
    status: 'Updated 14 days ago',
  },
  {
    title: 'Two-Factor Authentication',
    description: 'Add an extra verification layer before sign-in completes.',
    status: 'Not enabled',
  },
  {
    title: 'Active Sessions',
    description: 'Review trusted devices currently signed into NestIQ.',
    status: '1 active session',
  },
  {
    title: 'Delete Account',
    description: 'Permanently remove your account and saved data.',
    status: 'Protected action',
  },
];

const NOTIFICATION_ITEMS = [
  {
    title: 'Curated stay alerts',
    description: 'Tailored offers that match your profile.',
    enabled: true,
  },
  {
    title: 'Booking updates',
    description: 'Reservation confirmations, reminders, and changes.',
    enabled: true,
  },
  {
    title: 'Concierge messages',
    description: 'Priority communication from the NestIQ concierge desk.',
    enabled: true,
  },
  {
    title: 'Product news',
    description: 'New features, perks, and member program updates.',
    enabled: false,
  },
];

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState<(typeof NAV_ITEMS)[number]['key']>('profile');
  const [editing, setEditing] = useState(false);
  const authUser = useAppSelector((state) => state.user.profile);

  const fullName = authUser?.fullname?.trim() || MOCK_USER.name;
  const nameParts = fullName.split(' ').filter(Boolean);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ');
  const email = authUser?.email || MOCK_USER.email;
  const cityValue = authUser?.city || 'London';
  const addressValue = authUser?.address || '42 Curzon Street';

  const [form, setForm] = useState({
    firstName,
    lastName,
    email,
    bio: MOCK_USER.bio,
    city: cityValue,
    address: addressValue,
  });

  const profileInitials = `${form.firstName[0] ?? ''}${form.lastName[0] ?? ''}`.trim() || 'N';
  const joinedLocation = [form.city, 'United Kingdom'].filter(Boolean).join(', ');

  const handleField = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(156,54,181,0.12), transparent 24%), linear-gradient(180deg, var(--surface) 0%, #f5f4ef 100%)',
      }}
    >
      <Navbar />

      <main className="pt-20">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
          <section className="relative overflow-hidden rounded-4xl border border-white/70 bg-white px-6 py-8 shadow-[0_30px_80px_rgba(45,52,50,0.08)] sm:px-8 lg:px-10">
            <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(135deg,rgba(156,54,181,0.16),rgba(126,45,147,0.03)_45%,rgba(255,255,255,0)_100%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
              <div className="flex flex-col gap-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-secondary/15 bg-secondary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                  <Sparkles size={14} />
                  Elite Member Profile
                </div>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-[linear-gradient(145deg,#9c36b5,#7e2d93)] font-poppins text-3xl font-black text-white shadow-[0_18px_40px_rgba(156,54,181,0.24)]">
                      {profileInitials}
                    </div>
                    <button className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white text-on-surface shadow-md transition-transform hover:scale-105">
                      <Edit2 size={14} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="section-label mb-2">Member Identity</p>
                      <h1 className="headline-display text-4xl sm:text-5xl">
                        {form.firstName} {form.lastName}
                      </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-primary">
                      <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-low px-3 py-1.5">
                        <Check size={14} className="text-green-600" />
                        Verified identity
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-low px-3 py-1.5">
                        <CalendarDays size={14} className="text-secondary" />
                        Member since {MOCK_USER.memberSince}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-primary sm:text-base">
                  A refined travel profile for personalized recommendations, concierge priority, and
                  stays aligned with your pace, aesthetic, and comfort preferences.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {[
                  { label: 'Tier', value: MOCK_USER.tier, note: 'Active membership' },
                  { label: 'Saved Style', value: 'Quiet Luxury', note: 'Primary preference' },
                  { label: 'Next Trip', value: 'Kyoto', note: 'Curated shortlist' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-[rgba(95,94,94,0.08)] bg-[rgba(255,255,255,0.72)] p-4 backdrop-blur-sm"
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                      {item.label}
                    </p>
                    <p className="font-poppins text-xl font-bold text-on-surface">{item.value}</p>
                    <p className="mt-1 text-xs text-primary">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="card-editorial p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="section-label mb-2">Overview</p>
                    <h2 className="font-poppins text-xl font-bold text-on-surface">
                      Profile Summary
                    </h2>
                  </div>
                  <Badge variant="amber">{MOCK_USER.tier} Tier</Badge>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.25rem] bg-surface-container-low p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                      Contact
                    </p>
                    <p className="mt-2 text-sm font-medium text-on-surface">{form.email}</p>
                  </div>

                  <div className="rounded-[1.25rem] bg-surface-container-low p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                      Location
                    </p>
                    <p className="mt-2 text-sm font-medium text-on-surface">{joinedLocation}</p>
                  </div>

                  <div className="rounded-[1.25rem] bg-surface-container-low p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                      Preferred Pace
                    </p>
                    <p className="mt-2 text-sm font-medium text-on-surface">
                      Deliberate, quiet, design-led journeys
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-editorial p-3">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveSection(item.key)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-[1.25rem] px-4 py-4 text-left text-sm transition-all',
                      activeSection === item.key
                        ? 'bg-[linear-gradient(145deg,rgba(156,54,181,0.12),rgba(126,45,147,0.03))] font-semibold text-on-surface shadow-[inset_0_0_0_1px_rgba(156,54,181,0.12)]'
                        : 'text-primary hover:bg-surface-container-low'
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronRight
                      size={16}
                      className={activeSection === item.key ? 'text-secondary' : 'text-primary'}
                    />
                  </button>
                ))}
              </div>

              <AIInsight title="NestIQ Intelligence" className="rounded-[1.5rem]">
                Your profile suggests a strong affinity for private wellness escapes, textured
                interiors, and low-density luxury stays. Concierge ranking has been tuned around
                those traits.
              </AIInsight>
            </aside>

            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: 'Journeys Completed', value: '14', note: 'Across 6 countries' },
                  { label: 'Wishlist Saves', value: '27', note: 'Curated collections' },
                  { label: 'Concierge Requests', value: '08', note: 'Handled this year' },
                  { label: 'Profile Strength', value: '92%', note: 'Ready for better matching' },
                ].map((item) => (
                  <div key={item.label} className="card-editorial p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                      {item.label}
                    </p>
                    <p className="mt-3 font-poppins text-3xl font-bold text-on-surface">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm text-primary">{item.note}</p>
                  </div>
                ))}
              </div>

              {activeSection === 'profile' && (
                <>
                  <section className="card-editorial p-6 sm:p-8">
                    <div className="mb-8 flex flex-col gap-4 border-b border-surface-container pb-6 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="section-label mb-2">Profile Details</p>
                        <h2 className="font-poppins text-2xl font-bold text-on-surface">
                          Personal Information
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-primary">
                          Keep your identity, contact details, and travel context current so NestIQ
                          can personalize recommendations with higher confidence.
                        </p>
                      </div>

                      <button
                        onClick={() => setEditing(!editing)}
                        className={cn(
                          editing ? 'btn-primary' : 'btn-secondary',
                          'self-start text-xs sm:self-auto'
                        )}
                      >
                        {editing ? (
                          <>
                            <Check size={14} /> Done Editing
                          </>
                        ) : (
                          <>
                            <Edit2 size={14} /> Edit Profile
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      {[
                        { label: 'First Name', key: 'firstName', icon: User },
                        { label: 'Last Name', key: 'lastName', icon: User },
                        { label: 'Email Address', key: 'email', icon: Mail, full: true },
                      ].map(({ label, key, icon: Icon, full }) => (
                        <div key={key} className={full ? 'md:col-span-2' : ''}>
                          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/75">
                            <Icon size={14} className="text-secondary" />
                            {label}
                          </label>

                          {editing ? (
                            <input
                              type="text"
                              value={form[key as keyof typeof form]}
                              onChange={(e) =>
                                handleField(key as keyof typeof form, e.target.value)
                              }
                              className="input-field rounded-2xl"
                            />
                          ) : (
                            <div className="rounded-[1.25rem] border border-surface-container bg-surface-container-low px-4 py-4 text-sm font-medium text-on-surface">
                              {form[key as keyof typeof form]}
                            </div>
                          )}
                        </div>
                      ))}

                      <div className="md:col-span-2">
                        <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/75">
                          <Sparkles size={14} className="text-secondary" />
                          Bio / Travel Preferences
                        </label>

                        {editing ? (
                          <textarea
                            value={form.bio}
                            onChange={(e) => handleField('bio', e.target.value)}
                            rows={4}
                            className="input-field rounded-2xl resize-none"
                          />
                        ) : (
                          <div className="rounded-[1.25rem] border border-surface-container bg-surface-container-low px-4 py-4 text-sm leading-7 text-on-surface">
                            {form.bio}
                          </div>
                        )}
                      </div>
                    </div>

                    {editing && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button onClick={() => setEditing(false)} className="btn-secondary">
                          Discard
                        </button>
                        <button onClick={() => setEditing(false)} className="btn-primary">
                          Update Profile
                        </button>
                      </div>
                    )}
                  </section>

                  <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                    <div className="card-editorial p-6 sm:p-8">
                      <div className="mb-6">
                        <p className="section-label mb-2">Residence</p>
                        <h2 className="font-poppins text-2xl font-bold text-on-surface">
                          Address & Location
                        </h2>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="md:col-span-2">
                          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/75">
                            <MapPin size={14} className="text-secondary" />
                            Address
                          </label>
                          {editing ? (
                            <input
                              type="text"
                              value={form.address}
                              onChange={(e) => handleField('address', e.target.value)}
                              className="input-field rounded-2xl"
                            />
                          ) : (
                            <div className="rounded-[1.25rem] border border-surface-container bg-surface-container-low px-4 py-4 text-sm font-medium text-on-surface">
                              {form.address}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/75">
                            <MapPin size={14} className="text-secondary" />
                            City
                          </label>
                          {editing ? (
                            <input
                              type="text"
                              value={form.city}
                              onChange={(e) => handleField('city', e.target.value)}
                              className="input-field rounded-2xl"
                            />
                          ) : (
                            <div className="rounded-[1.25rem] border border-surface-container bg-surface-container-low px-4 py-4 text-sm font-medium text-on-surface">
                              {form.city}
                            </div>
                          )}
                        </div>

                        <div className="rounded-[1.25rem] border border-secondary/12 bg-[linear-gradient(145deg,rgba(156,54,181,0.08),rgba(126,45,147,0.02))] p-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                            Location Influence
                          </p>
                          <p className="mt-3 text-sm leading-6 text-on-surface">
                            Urban design hotels and private countryside estates are prioritized for
                            your shortlist because of your current city and recent browsing pattern.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="card-editorial p-6 sm:p-8">
                      <p className="section-label mb-2">Membership</p>
                      <h2 className="font-poppins text-2xl font-bold text-on-surface">
                        Benefits Snapshot
                      </h2>
                      <div className="mt-6 space-y-4">
                        {[
                          'Priority concierge response under 10 minutes',
                          'Access to member-only stay collections',
                          'Personalized seasonal recommendations',
                        ].map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 rounded-[1.25rem] bg-surface-container-low p-4"
                          >
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/12 text-secondary">
                              <Check size={14} />
                            </span>
                            <p className="text-sm leading-6 text-on-surface">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </>
              )}

              {activeSection === 'security' && (
                <section className="card-editorial p-6 sm:p-8">
                  <div className="mb-8 flex flex-col gap-3 border-b border-surface-container pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="section-label mb-2">Security & Access</p>
                      <h2 className="flex items-center gap-2 font-poppins text-2xl font-bold text-on-surface">
                        <Shield size={22} className="text-secondary" />
                        Account Protection
                      </h2>
                    </div>
                    <Badge variant="amber">Trusted Session</Badge>
                  </div>

                  <div className="grid gap-4">
                    {SECURITY_ITEMS.map((item) => (
                      <button
                        key={item.title}
                        className="group flex items-center justify-between rounded-[1.5rem] border border-surface-container bg-[linear-gradient(180deg,#fff_0%,#fafaf8_100%)] p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(45,52,50,0.08)]"
                      >
                        <div className="pr-4">
                          <p className="text-base font-semibold text-on-surface">{item.title}</p>
                          <p className="mt-2 text-sm leading-6 text-primary">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="hidden rounded-full bg-surface-container-low px-3 py-1 text-xs font-medium text-primary sm:inline-flex">
                            {item.status}
                          </span>
                          <ChevronRight
                            size={18}
                            className="text-primary transition-colors group-hover:text-secondary"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === 'preferences' && (
                <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <div className="card-editorial p-6 sm:p-8">
                    <p className="section-label mb-2">Preferences</p>
                    <h2 className="font-poppins text-2xl font-bold text-on-surface">Travel DNA</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-primary">
                      These signals shape your recommendations, shortlist ordering, and concierge
                      suggestions.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {PREFERENCE_TAGS.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-secondary/15 bg-secondary/8 px-4 py-2 text-sm font-medium text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                      {[
                        { label: 'Atmosphere', value: 'Quiet, intimate, discreet' },
                        { label: 'Design Bias', value: 'Warm minimalism with texture' },
                        { label: 'Stay Rhythm', value: '3-5 night slow itineraries' },
                        { label: 'Top Amenity', value: 'Private spa and chef dining' },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[1.25rem] bg-surface-container-low p-4"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                            {item.label}
                          </p>
                          <p className="mt-2 text-sm font-medium leading-6 text-on-surface">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <AIInsight title="Preference Signal">
                    Your strongest affinity leans toward secluded luxury with high sensory calm.
                    Similar members convert best on wellness resorts, forest lodges, and small
                    design-forward ryokans.
                  </AIInsight>
                </section>
              )}

              {activeSection === 'notifications' && (
                <section className="card-editorial p-6 sm:p-8">
                  <div className="mb-8">
                    <p className="section-label mb-2">Notifications</p>
                    <h2 className="flex items-center gap-2 font-poppins text-2xl font-bold text-on-surface">
                      <Bell size={22} className="text-secondary" />
                      Communication Preferences
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {NOTIFICATION_ITEMS.map((item) => (
                      <div
                        key={item.title}
                        className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-surface-container bg-[linear-gradient(180deg,#fff_0%,#fafaf8_100%)] p-5"
                      >
                        <div className="min-w-0">
                          <p className="text-base font-semibold text-on-surface">{item.title}</p>
                          <p className="mt-2 text-sm leading-6 text-primary">{item.description}</p>
                        </div>

                        <div
                          className={cn(
                            'relative h-7 w-12 shrink-0 rounded-full transition-colors',
                            item.enabled ? 'bg-secondary' : 'bg-surface-container-high'
                          )}
                        >
                          <span
                            className={cn(
                              'absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all',
                              item.enabled ? 'left-6' : 'left-1'
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
