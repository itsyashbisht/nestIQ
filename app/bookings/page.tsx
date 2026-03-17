'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { ArrowRight, CalendarDays, CheckCircle, Clock, MapPin, XCircle } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { bookingService } from '@/src/apiServices/booking.services';
import type { RootState } from '@/src/store';

const STATUS = {
  confirmed: {
    icon: CheckCircle,
    label: 'Confirmed',
    color: '#1a9e5a',
    bg: 'rgba(26,158,90,0.08)',
    border: 'rgba(26,158,90,0.2)',
  },
  pending: {
    icon: Clock,
    label: 'Pending Payment',
    color: '#d48a1a',
    bg: 'rgba(212,138,26,0.08)',
    border: 'rgba(212,138,26,0.2)',
  },
  cancelled: {
    icon: XCircle,
    label: 'Cancelled',
    color: '#d43a2a',
    bg: 'rgba(212,58,42,0.08)',
    border: 'rgba(212,58,42,0.2)',
  },
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    color: '#3a7ad4',
    bg: 'rgba(58,122,212,0.08)',
    border: 'rgba(58,122,212,0.2)',
  },
};

export default function BookingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const confirmed = searchParams.get('confirmed');

  const { isAuthenticated } = useSelector((s: RootState) => s.auth);

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    bookingService
      .getMyBookings()
      .then((res) => setBookings(res.data ?? []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  return (
    <>
      <Navigation />
      <div style={{ minHeight: '100vh', background: '#F7F6F2', paddingTop: 68 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '2.5rem 2rem 5rem' }}>
          {/* Confirmed banner */}
          {confirmed && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(26,158,90,0.08)',
                border: '1px solid rgba(26,158,90,0.2)',
                borderRadius: 14,
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              <CheckCircle size={20} color="#1a9e5a" />
              <div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#1a9e5a',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Booking Confirmed!
                </p>
                <p style={{ fontSize: '0.8rem', color: '#666', fontFamily: 'Inter, sans-serif' }}>
                  Your booking has been confirmed. Check your email for details.
                </p>
              </div>
            </div>
          )}

          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#111',
              letterSpacing: '-0.02em',
              marginBottom: '1.75rem',
            }}
          >
            My Bookings
          </h1>

          {/* Loading */}
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    borderRadius: 18,
                    padding: '1.25rem',
                    border: '1px solid #E8E6E1',
                    display: 'flex',
                    gap: '1rem',
                  }}
                >
                  <div className="skeleton" style={{ width: 96, height: 80, borderRadius: 12 }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className="skeleton" style={{ height: 18, width: '60%' }} />
                    <div className="skeleton" style={{ height: 14, width: '40%' }} />
                    <div className="skeleton" style={{ height: 14, width: '30%' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && bookings.length === 0 && (
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                border: '1px solid #E8E6E1',
                padding: '4rem 2rem',
                textAlign: 'center',
              }}
            >
              <CalendarDays size={40} color="#ddd" style={{ margin: '0 auto 1rem' }} />
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: 6,
                }}
              >
                No bookings yet
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#aaa',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '1.5rem',
                }}
              >
                Find your perfect stay and book your first trip
              </p>
              <Link href="/search" className="btn-dark" style={{ display: 'inline-flex' }}>
                Explore Hotels <ArrowRight size={15} />
              </Link>
            </div>
          )}

          {/* List */}
          {!loading && bookings.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {bookings.map((b: any) => {
                const s = STATUS[b.status as keyof typeof STATUS] ?? STATUS.pending;
                const Icon = s.icon;
                return (
                  <div
                    key={b._id}
                    style={{
                      background: '#fff',
                      borderRadius: 18,
                      border: '1px solid #E8E6E1',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1rem', padding: '1.25rem' }}>
                      {/* Image */}
                      <div
                        style={{
                          position: 'relative',
                          width: 100,
                          height: 80,
                          borderRadius: 12,
                          overflow: 'hidden',
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={
                            b.hotel?.images?.[0]?.url ??
                            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
                          }
                          alt={b.hotel?.name ?? 'Hotel'}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="100px"
                        />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            marginBottom: 4,
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.9375rem',
                                fontWeight: 700,
                                color: '#111',
                                marginBottom: 2,
                              }}
                            >
                              {b.hotel?.name ?? 'Hotel'}
                            </h3>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                fontSize: '0.75rem',
                                color: '#aaa',
                                fontFamily: 'Inter, sans-serif',
                              }}
                            >
                              <MapPin size={11} />
                              {b.hotel?.city}, {b.hotel?.state}
                            </div>
                          </div>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 5,
                              padding: '0.25rem 0.75rem',
                              borderRadius: 9999,
                              fontSize: '0.72rem',
                              fontWeight: 500,
                              fontFamily: 'Inter, sans-serif',
                              background: s.bg,
                              color: s.color,
                              border: `1px solid ${s.border}`,
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={11} /> {s.label}
                          </span>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.25rem',
                            flexWrap: 'wrap',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 5,
                              fontSize: '0.8rem',
                              color: '#666',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            <CalendarDays size={12} />
                            {new Date(b.checkIn).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}{' '}
                            —{' '}
                            {new Date(b.checkOut).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                            <span style={{ color: '#bbb' }}>({b.nights}n)</span>
                          </div>
                          <span
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              fontSize: '0.875rem',
                              fontWeight: 700,
                              color: '#111',
                            }}
                          >
                            ₹{b.totalAmount?.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer row */}
                    <div
                      style={{
                        padding: '0.75rem 1.25rem',
                        background: '#FAFAF8',
                        borderTop: '1px solid #F0EDE8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '0.72rem',
                          color: '#bbb',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        ID: {b._id?.slice(-8).toUpperCase()}
                      </p>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {b.hotel?.slug && (
                          <Link
                            href={`/hotels/${b.hotel.slug}`}
                            style={{
                              fontSize: '0.8rem',
                              color: '#E07B39',
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: 500,
                              textDecoration: 'none',
                            }}
                          >
                            View Hotel
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
