'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  DollarSign,
  Hotel,
  LayoutDashboard,
  MapPin,
  Plus,
  Star,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react';
import { bookingService } from '@/src/apiServices/booking.services';
import type { RootState } from '@/src/store';

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/owner/dashboard', active: true },
  { icon: Hotel, label: 'My Hotels', href: '/owner/hotels' },
  { icon: BookOpen, label: 'Bookings', href: '/owner/bookings' },
  { icon: TrendingUp, label: 'Revenue', href: '/owner/revenue' },
];

const STATUS_MAP = {
  confirmed: { icon: CheckCircle, color: '#1a9e5a', bg: 'rgba(26,158,90,0.1)' },
  pending: { icon: Clock, color: '#d48a1a', bg: 'rgba(212,138,26,0.1)' },
  cancelled: { icon: XCircle, color: '#d43a2a', bg: 'rgba(212,58,42,0.1)' },
  completed: { icon: CheckCircle, color: '#3a7ad4', bg: 'rgba(58,122,212,0.1)' },
};

export default function OwnerDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((s: RootState) => s.auth);

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    bookingService
      .getAllBookings()
      .then((res) => setBookings(res.data?.bookings ?? res.data ?? []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const totalRevenue = bookings
    .filter((b) => b.status === 'confirmed' || b.status === 'completed')
    .reduce((s, b) => s + (b.totalAmount ?? 0), 0);
  const confirmed = bookings.filter((b) => b.status === 'confirmed').length;
  const totalGuests = bookings.reduce((s, b) => s + (b.guests ?? 0), 0);

  const stats = [
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: `₹${(totalRevenue / 1000).toFixed(1)}K`,
      sub: 'All time',
    },
    { icon: BookOpen, label: 'Confirmed Bookings', value: confirmed, sub: 'Active' },
    { icon: Users, label: 'Total Guests', value: totalGuests, sub: 'All bookings' },
    { icon: Star, label: 'Avg Rating', value: '4.8', sub: 'Across properties' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F6F2' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: '#0f0f0f',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem 0.875rem',
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: '1.125rem',
            color: '#fff',
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
            paddingLeft: '0.5rem',
            textDecoration: 'none',
          }}
        >
          NestIQ*
        </Link>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '0.625rem 0.75rem',
                borderRadius: 10,
                fontSize: '0.875rem',
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                textDecoration: 'none',
                background: item.active ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: item.active ? '#fff' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.2s',
              }}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', paddingLeft: '0.5rem' }}>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {user?.fullname}
          </p>
          <p
            style={{
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.2)',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {user?.role}
          </p>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Top bar */}
        <div
          style={{
            background: '#fff',
            borderBottom: '1px solid #E8E6E1',
            padding: '1rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#111',
                letterSpacing: '-0.02em',
              }}
            >
              Dashboard
            </h1>
            <p style={{ fontSize: '0.75rem', color: '#aaa', fontFamily: 'Inter, sans-serif' }}>
              Welcome back, {user?.fullname?.split(' ')[0]}
            </p>
          </div>
          <Link
            href="/owner/hotels/new"
            className="btn-dark"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem' }}
          >
            <Plus size={14} /> Add Hotel
          </Link>
        </div>

        <div style={{ padding: '2rem' }}>
          {/* Stats grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 14,
              marginBottom: '2rem',
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '1.25rem',
                  border: '1px solid #E8E6E1',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.875rem',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: '#888',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    {s.label}
                  </p>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 9,
                      background: '#F7F6F2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <s.icon size={15} color="#E07B39" />
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#111',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontSize: '0.7rem',
                    color: '#bbb',
                    fontFamily: 'Inter, sans-serif',
                    marginTop: 4,
                  }}
                >
                  {s.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Recent bookings */}
          <div
            style={{
              background: '#fff',
              borderRadius: 20,
              border: '1px solid #E8E6E1',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid #F0EDE8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: '#111',
                }}
              >
                Recent Bookings
              </h2>
              <Link
                href="/owner/bookings"
                style={{
                  fontSize: '0.8rem',
                  color: '#E07B39',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  textDecoration: 'none',
                }}
              >
                View all <ArrowRight size={13} />
              </Link>
            </div>

            {loading ? (
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div className="skeleton" style={{ width: 48, height: 48, borderRadius: 10 }} />
                    <div style={{ flex: 1, display: 'flex', gap: 8, flexDirection: 'column' }}>
                      <div className="skeleton" style={{ height: 14, width: '50%' }} />
                      <div className="skeleton" style={{ height: 12, width: '35%' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center' }}>
                <BookOpen size={36} color="#ddd" style={{ margin: '0 auto 1rem' }} />
                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#aaa',
                  }}
                >
                  No bookings yet
                </p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#FAFAF8' }}>
                      {['Hotel', 'Guest', 'Dates', 'Guests', 'Amount', 'Status'].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: '0.75rem 1.25rem',
                            textAlign: 'left',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            color: '#aaa',
                            fontFamily: 'Inter, sans-serif',
                            borderBottom: '1px solid #F0EDE8',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 8).map((b: any, i: number) => {
                      const s =
                        STATUS_MAP[b.status as keyof typeof STATUS_MAP] ?? STATUS_MAP.pending;
                      const Icon = s.icon;
                      return (
                        <tr
                          key={b._id}
                          style={{ borderBottom: i < 7 ? '1px solid #F0EDE8' : 'none' }}
                        >
                          <td style={{ padding: '0.875rem 1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div
                                style={{
                                  position: 'relative',
                                  width: 40,
                                  height: 36,
                                  borderRadius: 8,
                                  overflow: 'hidden',
                                  flexShrink: 0,
                                }}
                              >
                                <Image
                                  src={
                                    b.hotel?.images?.[0]?.url ??
                                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200'
                                  }
                                  alt=""
                                  fill
                                  style={{ objectFit: 'cover' }}
                                  sizes="40px"
                                />
                              </div>
                              <div>
                                <p
                                  style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    color: '#111',
                                    fontFamily: 'Inter, sans-serif',
                                  }}
                                >
                                  {b.hotel?.name ?? 'Hotel'}
                                </p>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 3,
                                    fontSize: '0.68rem',
                                    color: '#bbb',
                                    fontFamily: 'Inter, sans-serif',
                                  }}
                                >
                                  <MapPin size={9} />
                                  {b.hotel?.city}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td
                            style={{
                              padding: '0.875rem 1.25rem',
                              fontSize: '0.8rem',
                              color: '#555',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            {b.guestId ?? 'Guest'}
                          </td>
                          <td
                            style={{
                              padding: '0.875rem 1.25rem',
                              fontSize: '0.75rem',
                              color: '#888',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            {new Date(b.checkIn).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}{' '}
                            —{' '}
                            {new Date(b.checkOut).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </td>
                          <td
                            style={{
                              padding: '0.875rem 1.25rem',
                              fontSize: '0.8rem',
                              color: '#555',
                              fontFamily: 'Inter, sans-serif',
                              textAlign: 'center',
                            }}
                          >
                            {b.guests}
                          </td>
                          <td
                            style={{
                              padding: '0.875rem 1.25rem',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              color: '#111',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            ₹{b.totalAmount?.toLocaleString('en-IN') ?? '—'}
                          </td>
                          <td style={{ padding: '0.875rem 1.25rem' }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 5,
                                padding: '0.25rem 0.65rem',
                                borderRadius: 9999,
                                fontSize: '0.7rem',
                                fontWeight: 500,
                                fontFamily: 'Inter, sans-serif',
                                background: s.bg,
                                color: s.color,
                                textTransform: 'capitalize',
                              }}
                            >
                              <Icon size={10} /> {b.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
