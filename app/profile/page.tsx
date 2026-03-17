'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Check, Loader2, Lock, Mail, MapPin, Phone, User } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { updateUserDetails } from '@/src/thunks/user.thunk';
import { changePassword } from '@/src/thunks/auth.thunk';
import type { AppDispatch, RootState } from '@/src/store';

type Tab = 'profile' | 'security';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isAuthenticated, loading } = useSelector((s: RootState) => s.auth);
  const [tab, setTab] = useState<Tab>('profile');
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    fullname: '',
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [pwForm, setPwForm] = useState({ curPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (user) {
      setForm({
        fullname: user.fullname ?? '',
        username: user.username ?? '',
        email: user.email ?? '',
        phoneNumber: String(user.phoneNumber ?? ''),
        address: user.address ?? '',
        city: user.city ?? '',
        state: user.state ?? '',
        pincode: String(user.pincode ?? ''),
      });
    }
  }, [user, isAuthenticated]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    const res = await dispatch(
      updateUserDetails({
        ...form,
        phoneNumber: Number(form.phoneNumber),
        pincode: Number(form.pincode),
      })
    );
    if (updateUserDetails.fulfilled.match(res)) {
      toast.success('Profile updated!');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } else {
      toast.error((res.payload as string) ?? 'Update failed');
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    const res = await dispatch(
      changePassword({ curPassword: pwForm.curPassword, newPassword: pwForm.newPassword })
    );
    if (changePassword.fulfilled.match(res)) {
      toast.success('Password changed!');
      setPwForm({ curPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      toast.error((res.payload as string) ?? 'Password change failed');
    }
  }

  const inputStyle = {
    width: '100%',
    border: '1.5px solid #E8E6E1',
    borderRadius: 10,
    padding: '0.65rem 0.875rem',
    fontSize: '0.875rem',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    color: '#111',
    background: '#fff',
    transition: 'border-color 0.2s',
  };

  return (
    <>
      <Navigation />
      <div style={{ minHeight: '100vh', background: '#F7F6F2', paddingTop: 68 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '2.5rem 2rem 5rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {user?.fullname?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#111',
                  letterSpacing: '-0.02em',
                }}
              >
                {user?.fullname}
              </h1>
              <p style={{ fontSize: '0.8rem', color: '#888', fontFamily: 'Inter, sans-serif' }}>
                {user?.role === 'ADMIN' ? '🔑 Admin' : 'Member'} · {user?.email}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              gap: 4,
              marginBottom: '1.5rem',
              background: '#fff',
              borderRadius: 12,
              padding: 4,
              border: '1px solid #E8E6E1',
              width: 'fit-content',
            }}
          >
            {(['profile', 'security'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: 9,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8375rem',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                  transition: 'all 0.2s',
                  background: tab === t ? '#111' : 'transparent',
                  color: tab === t ? '#fff' : '#888',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Profile tab */}
          {tab === 'profile' && (
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                border: '1px solid #E8E6E1',
                padding: '2rem',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#111',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.01em',
                }}
              >
                Personal Information
              </h2>
              <form onSubmit={handleSaveProfile}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  {[
                    {
                      name: 'fullname',
                      label: 'Full Name',
                      icon: <User size={14} />,
                      placeholder: 'Your full name',
                    },
                    {
                      name: 'username',
                      label: 'Username',
                      icon: <User size={14} />,
                      placeholder: 'your_username',
                    },
                    {
                      name: 'email',
                      label: 'Email',
                      icon: <Mail size={14} />,
                      placeholder: 'you@email.com',
                    },
                    {
                      name: 'phoneNumber',
                      label: 'Phone',
                      icon: <Phone size={14} />,
                      placeholder: '9876543210',
                    },
                    {
                      name: 'address',
                      label: 'Address',
                      icon: <MapPin size={14} />,
                      placeholder: '123, MG Road',
                    },
                    {
                      name: 'city',
                      label: 'City',
                      icon: <MapPin size={14} />,
                      placeholder: 'Bangalore',
                    },
                    {
                      name: 'state',
                      label: 'State',
                      icon: <MapPin size={14} />,
                      placeholder: 'Karnataka',
                    },
                    {
                      name: 'pincode',
                      label: 'Pincode',
                      icon: <MapPin size={14} />,
                      placeholder: '560001',
                    },
                  ].map((f) => (
                    <div key={f.name}>
                      <label
                        className="eyebrow"
                        style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}
                      >
                        <span style={{ color: '#aaa' }}>{f.icon}</span>
                        {f.label}
                      </label>
                      <input
                        name={f.name}
                        value={form[f.name as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: saved ? '#1a9e5a' : '#111',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    padding: '0.75rem 1.75rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Saving…
                    </>
                  ) : saved ? (
                    <>
                      <Check size={15} /> Saved!
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Security tab */}
          {tab === 'security' && (
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                border: '1px solid #E8E6E1',
                padding: '2rem',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#111',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.01em',
                }}
              >
                Change Password
              </h2>
              <form
                onSubmit={handleChangePassword}
                style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {[
                  { name: 'curPassword', label: 'Current Password', placeholder: '••••••••' },
                  { name: 'newPassword', label: 'New Password', placeholder: 'Min 8 characters' },
                  {
                    name: 'confirmPassword',
                    label: 'Confirm Password',
                    placeholder: 'Re-enter new password',
                  },
                ].map((f) => (
                  <div key={f.name}>
                    <label
                      className="eyebrow"
                      style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}
                    >
                      <Lock size={13} color="#aaa" />
                      {f.label}
                    </label>
                    <input
                      type="password"
                      value={pwForm[f.name as keyof typeof pwForm]}
                      onChange={(e) => setPwForm((p) => ({ ...p, [f.name]: e.target.value }))}
                      placeholder={f.placeholder}
                      style={inputStyle}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-dark"
                  style={{
                    justifyContent: 'center',
                    padding: '0.75rem',
                    borderRadius: 12,
                    marginTop: 4,
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />{' '}
                      Updating…
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
