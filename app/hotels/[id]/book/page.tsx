'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/layouts/Footer';
import { bookingService } from '@/src/apiServices/booking.services';
import { aiService } from '@/src/apiServices/ai.services';
import { clearCart } from '@/src/slices/cart.slice';
import type { AppDispatch, RootState } from '@/src/store';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const STEPS = ['Dates & Details', 'Review', 'Payment'];
const GST = 0.12;

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isAuthenticated } = useSelector((s: RootState) => s.auth);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hotelId, setHotelId] = useState('');
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') ?? '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') ?? '');
  const [guests, setGuests] = useState(Number(searchParams.get('guests') ?? 2));
  const [special, setSpecial] = useState('');
  const [budget, setBudget] = useState<any>(null);

  // Placeholder hotel — in real app fetched from DB
  const hotel = {
    name: 'Azure Cove Resort & Spa',
    city: 'Maldives',
    pricePerNight: 18500,
    rating: 5.0,
    slug: hotelId || 'azure-cove-resort',
    images: [{ url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80' }],
  };

  useEffect(() => {
    params.then(({ id }) => setHotelId(id));
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, []);

  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
        )
      : 1;
  const subtotal = hotel.pricePerNight * nights;
  const taxes = Math.round(subtotal * GST);
  const total = subtotal + taxes;

  async function fetchBudget() {
    if (budget) return;
    try {
      const res = await aiService.getBudgetPlan({
        city: hotel.city,
        nights,
        guests,
        pricePerNight: hotel.pricePerNight,
        roomType: 'deluxe',
      });
      setBudget(res.data);
    } catch {
      /* silent */
    }
  }

  async function handlePayment() {
    setLoading(true);
    try {
      // 1. Create booking + Razorpay order
      const res = await bookingService.createBooking({
        hotelId,
        roomId: 'default',
        checkIn,
        checkOut,
        guests,
        specialRequests: special,
      });
      const { razorpayOrderId, amount, keyId, bookingId } = res.data;

      // 2. Load Razorpay script
      await new Promise<void>((resolve) => {
        if (window.Razorpay) return resolve();
        const s = document.createElement('script');
        s.src = 'https://checkout.razorpay.com/v1/checkout.js';
        s.onload = () => resolve();
        document.body.appendChild(s);
      });

      // 3. Open checkout
      const rzp = new window.Razorpay({
        key: keyId,
        amount: amount * 100,
        currency: 'INR',
        name: 'NestIQ',
        description: `${hotel.name} · ${nights} night${nights > 1 ? 's' : ''}`,
        order_id: razorpayOrderId,
        prefill: { name: user?.fullname, email: user?.email },
        theme: { color: '#E07B39' },
        handler: async (response: any) => {
          await bookingService.verifyPayment({ ...response, bookingId });
          dispatch(clearCart());
          toast.success('Booking confirmed!');
          router.push(`/bookings?confirmed=${bookingId}`);
        },
      });
      rzp.open();
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Payment failed. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navigation />
      <div style={{ minHeight: '100vh', background: '#F7F6F2', paddingTop: 68 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '2.5rem 2rem 5rem' }}>
          <Link
            href={`/hotels/${hotelId}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.8125rem',
              color: '#888',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '1.5rem',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} /> Back to hotel
          </Link>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 340px',
              gap: '2rem',
              alignItems: 'start',
            }}
          >
            {/* ── Left: form ──────────────────────────────────── */}
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                border: '1px solid #E8E6E1',
                overflow: 'hidden',
              }}
            >
              {/* Step indicator */}
              <div style={{ display: 'flex', borderBottom: '1px solid #F0EDE8' }}>
                {STEPS.map((s, i) => (
                  <div
                    key={s}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      textAlign: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                      borderBottom: `2px solid ${i === step ? '#111' : 'transparent'}`,
                      color: i === step ? '#111' : '#aaa',
                      transition: 'all 0.2s',
                    }}
                  >
                    {i + 1}. {s}
                  </div>
                ))}
              </div>

              <div style={{ padding: '1.75rem' }}>
                {/* Step 0 — Dates & guests */}
                {step === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h2
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: '#111',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Complete Your Booking
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>
                          Check-in
                        </label>
                        <input
                          type="date"
                          value={checkIn}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setCheckIn(e.target.value)}
                          style={{
                            width: '100%',
                            border: '1.5px solid #E8E6E1',
                            borderRadius: 10,
                            padding: '0.6rem 0.875rem',
                            fontSize: '0.875rem',
                            outline: 'none',
                            fontFamily: 'Inter, sans-serif',
                            color: '#111',
                          }}
                        />
                      </div>
                      <div>
                        <label className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>
                          Check-out
                        </label>
                        <input
                          type="date"
                          value={checkOut}
                          min={checkIn}
                          onChange={(e) => setCheckOut(e.target.value)}
                          style={{
                            width: '100%',
                            border: '1.5px solid #E8E6E1',
                            borderRadius: 10,
                            padding: '0.6rem 0.875rem',
                            fontSize: '0.875rem',
                            outline: 'none',
                            fontFamily: 'Inter, sans-serif',
                            color: '#111',
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>
                        Guests
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          border: '1.5px solid #E8E6E1',
                          borderRadius: 10,
                          padding: '0.6rem 0.875rem',
                          width: 'fit-content',
                        }}
                      >
                        <button
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: '50%',
                            border: '1px solid #E8E6E1',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: '#111',
                            minWidth: 20,
                            textAlign: 'center',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {guests}
                        </span>
                        <button
                          onClick={() => setGuests(Math.min(10, guests + 1))}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: '50%',
                            border: '1px solid #E8E6E1',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          +
                        </button>
                        <span
                          style={{
                            fontSize: '0.875rem',
                            color: '#888',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          adults
                        </span>
                      </div>
                    </div>

                    {/* AI Budget Planner */}
                    {checkIn && checkOut && (
                      <div
                        style={{
                          background: 'rgba(224,123,57,0.05)',
                          border: '1px solid rgba(224,123,57,0.15)',
                          borderRadius: 12,
                          padding: '1rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 8,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Sparkles size={13} color="#E07B39" />
                            <span
                              style={{
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                color: '#E07B39',
                                fontFamily: 'Inter, sans-serif',
                              }}
                            >
                              AI Budget Planner
                            </span>
                          </div>
                          {!budget && (
                            <button
                              onClick={fetchBudget}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                color: '#E07B39',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 500,
                              }}
                            >
                              Generate estimate →
                            </button>
                          )}
                        </div>
                        {budget && (
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr 1fr',
                              gap: 10,
                              marginBottom: 8,
                            }}
                          >
                            {[
                              { l: 'Hotel', v: budget.hotelBudget },
                              { l: 'Food', v: budget.foodBudget },
                              { l: 'Travel', v: budget.travelBudget },
                            ].map((x) => (
                              <div key={x.l} style={{ textAlign: 'center' }}>
                                <p
                                  style={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    color: '#111',
                                  }}
                                >
                                  ₹{(x.v / 1000).toFixed(1)}K
                                </p>
                                <p
                                  style={{
                                    fontSize: '0.7rem',
                                    color: '#aaa',
                                    fontFamily: 'Inter, sans-serif',
                                  }}
                                >
                                  {x.l}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                        {budget?.tips?.[0] && (
                          <p
                            style={{
                              fontSize: '0.75rem',
                              color: '#888',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            💡 {budget.tips[0]}
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>
                        Special Requests (optional)
                      </label>
                      <textarea
                        value={special}
                        onChange={(e) => setSpecial(e.target.value)}
                        rows={3}
                        placeholder="Early check-in, anniversary decoration, dietary needs…"
                        style={{
                          width: '100%',
                          border: '1.5px solid #E8E6E1',
                          borderRadius: 10,
                          padding: '0.75rem 0.875rem',
                          fontSize: '0.875rem',
                          outline: 'none',
                          fontFamily: 'Inter, sans-serif',
                          color: '#111',
                          resize: 'none',
                        }}
                      />
                    </div>

                    <button
                      onClick={() => setStep(1)}
                      disabled={!checkIn || !checkOut}
                      className="btn-dark"
                      style={{
                        justifyContent: 'center',
                        padding: '0.875rem',
                        borderRadius: 12,
                        fontSize: '0.9rem',
                        opacity: !checkIn || !checkOut ? 0.4 : 1,
                      }}
                    >
                      Continue to Review →
                    </button>
                  </div>
                )}

                {/* Step 1 — Review */}
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h2
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: '#111',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Review Your Stay
                    </h2>
                    <div
                      style={{ background: '#F7F6F2', borderRadius: 12, padding: '1rem 1.25rem' }}
                    >
                      <p
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: '#111',
                          marginBottom: 4,
                        }}
                      >
                        {hotel.name}
                      </p>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: '#888',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {checkIn} → {checkOut} · {nights} night{nights > 1 ? 's' : ''} · {guests}{' '}
                        guest{guests > 1 ? 's' : ''}
                      </p>
                      {special && (
                        <p
                          style={{
                            fontSize: '0.8rem',
                            color: '#888',
                            fontFamily: 'Inter, sans-serif',
                            marginTop: 4,
                          }}
                        >
                          Note: {special}
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        onClick={() => setStep(0)}
                        className="btn-outline-dark"
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          padding: '0.875rem',
                          borderRadius: 12,
                          fontSize: '0.875rem',
                        }}
                      >
                        ← Back
                      </button>
                      <button
                        onClick={() => setStep(2)}
                        className="btn-dark"
                        style={{
                          flex: 2,
                          justifyContent: 'center',
                          padding: '0.875rem',
                          borderRadius: 12,
                          fontSize: '0.875rem',
                        }}
                      >
                        Proceed to Payment →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2 — Payment */}
                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h2
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: '#111',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Secure Payment
                    </h2>
                    <div
                      style={{
                        background: '#F7F6F2',
                        borderRadius: 12,
                        padding: '1rem 1.25rem',
                        fontSize: '0.85rem',
                        color: '#888',
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: 1.6,
                      }}
                    >
                      You&apos;ll be redirected to Razorpay — India&apos;s most trusted payment
                      gateway. Your payment is fully secured with 256-bit SSL encryption.
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="btn-brand"
                      style={{
                        justifyContent: 'center',
                        padding: '0.9rem',
                        borderRadius: 12,
                        fontSize: '0.9375rem',
                        gap: 8,
                      }}
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />{' '}
                          Processing…
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={16} /> Pay ₹{total.toLocaleString('en-IN')} Securely
                        </>
                      )}
                    </button>

                    <p
                      style={{
                        textAlign: 'center',
                        fontSize: '0.72rem',
                        color: '#bbb',
                        fontFamily: 'Inter, sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                      }}
                    >
                      <ShieldCheck size={12} /> 256-bit SSL · Powered by Razorpay
                    </p>

                    <button
                      onClick={() => setStep(1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        color: '#aaa',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      ← Back to review
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: order summary ─────────────────────────── */}
            <div style={{ position: 'sticky', top: 88 }}>
              <div
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  border: '1px solid #E8E6E1',
                  overflow: 'hidden',
                }}
              >
                {/* Hotel */}
                <div
                  style={{
                    padding: '1.25rem',
                    display: 'flex',
                    gap: '0.875rem',
                    borderBottom: '1px solid #F0EDE8',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: 80,
                      height: 64,
                      borderRadius: 10,
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={hotel.images[0]?.url ?? ''}
                      alt={hotel.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: '#111',
                        marginBottom: 2,
                      }}
                    >
                      {hotel.name}
                    </p>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: '#aaa',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {hotel.city}
                    </p>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: '#E07B39',
                        fontFamily: 'Inter, sans-serif',
                        marginTop: 2,
                      }}
                    >
                      ★ {hotel.rating}
                    </p>
                  </div>
                </div>

                {/* Price breakdown */}
                <div style={{ padding: '1.25rem' }}>
                  {[
                    {
                      l: `₹${hotel.pricePerNight.toLocaleString('en-IN')} × ${nights} night${nights > 1 ? 's' : ''}`,
                      v: subtotal,
                    },
                    { l: 'Taxes & GST (12%)', v: taxes },
                  ].map((r) => (
                    <div
                      key={r.l}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem',
                        fontFamily: 'Inter, sans-serif',
                        color: '#666',
                        marginBottom: 8,
                      }}
                    >
                      <span>{r.l}</span>
                      <span>₹{r.v.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                  <div
                    style={{
                      borderTop: '1px solid #F0EDE8',
                      paddingTop: 10,
                      marginTop: 4,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.9375rem',
                        color: '#111',
                      }}
                    >
                      Total
                    </span>
                    <span
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.9375rem',
                        color: '#111',
                      }}
                    >
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Cancellation */}
                <div
                  style={{
                    padding: '1rem 1.25rem',
                    background: '#0a0a0a',
                    margin: '0 1rem 1rem',
                    borderRadius: 12,
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.6)',
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: 1.65,
                    }}
                  >
                    <span style={{ color: '#fff', fontWeight: 600 }}>Free cancellation</span> until
                    48 hours before check-in. After that, 1 night charge applies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
