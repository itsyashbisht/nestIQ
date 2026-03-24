'use client';
import { useState } from 'react';
import { Check, ChevronRight, Edit2, Mail, MapPin, Shield, Sparkles, User } from 'lucide-react';
import Navbar from '@/components/layouts/Navigation';
import Footer from '@/components/layouts/Footer';
import { AIInsight, Badge } from '@/components/index.tsx';
import { MOCK_USER } from '@/src/lib/data';

const NAV_ITEMS = [
  { label: 'Profile Details', key: 'profile' },
  { label: 'Security & Access', key: 'security' },
  { label: 'Preferences', key: 'preferences' },
  { label: 'Notifications', key: 'notifications' },
];

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: MOCK_USER.name.split(' ')[0],
    lastName: MOCK_USER.name.split(' ')[1] || '',
    email: MOCK_USER.email,
    bio: MOCK_USER.bio,
    city: 'London',
    address: '42 Curzon Street',
  });

  const handleField = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
      <Navbar />
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-5">
              {/* Avatar card */}
              <div className="card-editorial p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center font-poppins font-black text-2xl text-white mx-auto"
                    style={{ background: 'linear-gradient(145deg, #9b4701, #b85200)' }}
                  >
                    {form.firstName[0]}
                    {form.lastName[0]}
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center border border-surface-container">
                    <Edit2 size={12} className="text-on-surface" />
                  </button>
                </div>
                <h3 className="font-poppins font-bold text-on-surface">
                  {form.firstName} {form.lastName}
                </h3>
                <div className="flex items-center justify-center gap-1.5 mt-1 mb-3">
                  <Badge variant="amber">{MOCK_USER.tier} Tier</Badge>
                </div>
                <p className="text-xs text-primary">Member since {MOCK_USER.memberSince}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Check size={12} className="text-green-600" />
                  <span className="text-xs text-green-600 font-medium">Verified Identity</span>
                </div>
              </div>

              {/* Nav */}
              <div className="card-editorial overflow-hidden">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveSection(item.key)}
                    className={`w-full flex items-center justify-between px-5 py-4 text-sm text-left transition-colors border-b border-surface-container last:border-0 ${
                      activeSection === item.key
                        ? 'font-semibold text-on-surface bg-surface-container-low'
                        : 'text-primary hover:bg-surface-container-low'
                    }`}
                  >
                    {item.label}
                    <ChevronRight
                      size={14}
                      className={activeSection === item.key ? 'text-secondary' : 'text-primary'}
                    />
                  </button>
                ))}
              </div>
            </aside>

            {/* Main */}
            <div className="lg:col-span-3 space-y-6">
              {activeSection === 'profile' && (
                <>
                  <div className="card-editorial p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-poppins font-bold text-xl text-on-surface">
                        Personal Information
                      </h2>
                      <button
                        onClick={() => setEditing(!editing)}
                        className="btn-secondary text-xs px-4 py-2 gap-1.5"
                      >
                        {editing ? (
                          <>
                            <Check size={12} /> Done
                          </>
                        ) : (
                          <>
                            <Edit2 size={12} /> Edit
                          </>
                        )}
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[
                        { label: 'First Name', key: 'firstName', icon: <User size={14} /> },
                        { label: 'Last Name', key: 'lastName', icon: <User size={14} /> },
                        {
                          label: 'Email Address',
                          key: 'email',
                          icon: <Mail size={14} />,
                          full: true,
                        },
                      ].map(({ label, key, icon, full }) => (
                        <div key={key} className={full ? 'sm:col-span-2' : ''}>
                          <label className="text-xs font-medium text-primary mb-2 flex items-center gap-1.5 block">
                            <span className="text-secondary">{icon}</span> {label}
                          </label>
                          {editing ? (
                            <input
                              type="text"
                              value={form[key as keyof typeof form]}
                              onChange={(e) => handleField(key, e.target.value)}
                              className="input-field"
                            />
                          ) : (
                            <p
                              className="text-sm font-medium text-on-surface py-3 px-4 rounded-xl"
                              style={{ background: 'var(--surface-container-low)' }}
                            >
                              {form[key as keyof typeof form]}
                            </p>
                          )}
                        </div>
                      ))}
                      <div className="sm:col-span-2">
                        <label className="text-xs font-medium text-primary mb-2 flex items-center gap-1.5 block">
                          <Sparkles size={14} className="text-secondary" /> Bio / Travel Preferences
                        </label>
                        {editing ? (
                          <textarea
                            value={form.bio}
                            onChange={(e) => handleField('bio', e.target.value)}
                            rows={3}
                            className="input-field resize-none"
                          />
                        ) : (
                          <p
                            className="text-sm text-on-surface py-3 px-4 rounded-xl leading-relaxed"
                            style={{ background: 'var(--surface-container-low)' }}
                          >
                            {form.bio}
                          </p>
                        )}
                      </div>
                    </div>
                    {editing && (
                      <div className="flex gap-3 mt-6">
                        <button onClick={() => setEditing(false)} className="btn-secondary">
                          Discard
                        </button>
                        <button onClick={() => setEditing(false)} className="btn-primary">
                          Update Profile
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Residence */}
                  <div className="card-editorial p-8">
                    <h2 className="font-poppins font-bold text-xl text-on-surface mb-6">
                      Residence Details
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-medium text-primary mb-2 flex items-center gap-1.5 block">
                          <MapPin size={14} className="text-secondary" /> Address
                        </label>
                        {editing ? (
                          <input
                            type="text"
                            value={form.address}
                            onChange={(e) => handleField('address', e.target.value)}
                            className="input-field"
                          />
                        ) : (
                          <p
                            className="text-sm font-medium text-on-surface py-3 px-4 rounded-xl"
                            style={{ background: 'var(--surface-container-low)' }}
                          >
                            {form.address}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs font-medium text-primary mb-2 flex items-center gap-1.5 block">
                          <MapPin size={14} className="text-secondary" /> City
                        </label>
                        {editing ? (
                          <input
                            type="text"
                            value={form.city}
                            onChange={(e) => handleField('city', e.target.value)}
                            className="input-field"
                          />
                        ) : (
                          <p
                            className="text-sm font-medium text-on-surface py-3 px-4 rounded-xl"
                            style={{ background: 'var(--surface-container-low)' }}
                          >
                            {form.city}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeSection === 'security' && (
                <div className="card-editorial p-8">
                  <h2 className="font-poppins font-bold text-xl text-on-surface mb-6 flex items-center gap-2">
                    <Shield size={20} className="text-secondary" /> Security &amp; Access
                  </h2>
                  <div className="space-y-4">
                    {[
                      'Change Password',
                      'Two-Factor Authentication',
                      'Active Sessions',
                      'Delete Account',
                    ].map((item, i) => (
                      <div
                        key={item}
                        className="flex items-center justify-between p-4 rounded-xl transition-colors cursor-pointer hover:bg-surface-container group"
                        style={{ background: 'var(--surface-container-low)' }}
                      >
                        <div>
                          <p className="text-sm font-medium text-on-surface">{item}</p>
                          <p className="text-xs text-primary mt-0.5">
                            {i === 1
                              ? 'Not enabled'
                              : i === 2
                                ? '1 active session'
                                : 'Manage your account'}
                          </p>
                        </div>
                        <ChevronRight
                          size={16}
                          className="text-primary group-hover:text-secondary transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Intelligence card always shown */}
              <AIInsight title="NestIQ Intelligence — Elite Membership Active">
                Based on your recent stays in Kyoto, I've curated a private collection of
                Scandinavian forest retreats and Japanese onsen ryokans that align with your
                preference for architectural silence. Shall I unlock the Hidden List?
              </AIInsight>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
