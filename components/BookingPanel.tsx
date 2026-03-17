'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Loader2, Sparkles, Users } from 'lucide-react';
import { aiService } from '@/src/apiServices/ai.services';
import type { AppDispatch } from '@/src/store';
import type { IHotel } from '@/src/types';

interface Props {
  hotel: IHotel | any;
}

const GST = 0.12;

export default function BookingPanel({ hotel }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [budget, setBudget] = useState<any>(null);
  const [loadBudget, setLoadBudget] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
        )
      : 0;

  const subtotal = hotel.pricePerNight * (nights || 1);
  const taxes = Math.round(subtotal * GST);
  const total = subtotal + taxes;

  async function fetchBudget() {
    if (!checkIn || !checkOut) return;
    setLoadBudget(true);
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
    } finally {
      setLoadBudget(false);
    }
  }

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        border: '1px solid #E8E6E1',
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid #F0EDE8' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#111',
            }}
          >
            ₹{hotel.pricePerNight.toLocaleString('en-IN')}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#aaa', fontFamily: 'Inter, sans-serif' }}>
            /night
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
          <span style={{ fontSize: '0.8rem', color: '#E07B39', fontWeight: 600 }}>
            ★ {hotel.rating}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#bbb', fontFamily: 'Inter, sans-serif' }}>
            · {hotel.reviewCount} reviews
          </span>
        </div>
      </div>

      {/* Dates + guests */}
      <div style={{ padding: '1.25rem 1.5rem' }}>
        <div
          style={{
            border: '1.5px solid #E8E6E1',
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: '0.875rem',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: '0.75rem', borderRight: '1px solid #E8E6E1' }}>
              <p className="eyebrow" style={{ marginBottom: 4 }}>
                Check-in
              </p>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  setBudget(null);
                }}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.875rem',
                  color: '#111',
                  fontFamily: 'Inter, sans-serif',
                  width: '100%',
                  cursor: 'pointer',
                }}
              />
            </div>
            <div style={{ padding: '0.75rem' }}>
              <p className="eyebrow" style={{ marginBottom: 4 }}>
                Check-out
              </p>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                  setBudget(null);
                }}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.875rem',
                  color: '#111',
                  fontFamily: 'Inter, sans-serif',
                  width: '100%',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>
          <div
            style={{
              padding: '0.75rem',
              borderTop: '1px solid #E8E6E1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Users size={14} color="#888" />
              <span
                style={{ fontSize: '0.875rem', color: '#111', fontFamily: 'Inter, sans-serif' }}
              >
                Guests
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
                  color: '#555',
                }}
              >
                −
              </button>
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#111',
                  fontFamily: 'Inter, sans-serif',
                  minWidth: 16,
                  textAlign: 'center',
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
                  color: '#555',
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Price breakdown */}
        {nights > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                fontFamily: 'Inter, sans-serif',
                color: '#666',
                marginBottom: 6,
              }}
            >
              <span>
                ₹{hotel.pricePerNight.toLocaleString('en-IN')} × {nights} night
                {nights > 1 ? 's' : ''}
              </span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                fontFamily: 'Inter, sans-serif',
                color: '#666',
                marginBottom: 10,
              }}
            >
              <span>Taxes & GST (12%)</span>
              <span>₹{taxes.toLocaleString('en-IN')}</span>
            </div>
            <div
              style={{
                borderTop: '1px solid #F0EDE8',
                paddingTop: 10,
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
        )}

        {/* AI Budget planner */}
        {checkIn && checkOut && (
          <div
            style={{
              marginBottom: '1rem',
              background: 'rgba(224,123,57,0.05)',
              border: '1px solid rgba(224,123,57,0.15)',
              borderRadius: 12,
              padding: '0.875rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: budget ? '0.75rem' : 0,
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
                  disabled={loadBudget}
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
                  {loadBudget ? (
                    <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    'Generate →'
                  )}
                </button>
              )}
            </div>
            {budget && (
              <div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  {[
                    { label: 'Hotel', val: budget.hotelBudget },
                    { label: 'Food', val: budget.foodBudget },
                    { label: 'Travel', val: budget.travelBudget },
                  ].map((i) => (
                    <div key={i.label} style={{ textAlign: 'center' }}>
                      <p
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#111',
                        }}
                      >
                        ₹{(i.val / 1000).toFixed(1)}K
                      </p>
                      <p
                        style={{
                          fontSize: '0.65rem',
                          color: '#aaa',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {i.label}
                      </p>
                    </div>
                  ))}
                </div>
                {budget.tips?.[0] && (
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: '#888',
                      fontFamily: 'Inter, sans-serif',
                      borderTop: '1px solid rgba(224,123,57,0.1)',
                      paddingTop: 8,
                    }}
                  >
                    💡 {budget.tips[0]}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Reserve button */}
        <Link
          href={`/hotels/${hotel.slug}/book${checkIn ? `?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}` : ''}`}
          className="btn-brand"
          style={{
            width: '100%',
            justifyContent: 'center',
            fontSize: '0.9rem',
            padding: '0.875rem',
            borderRadius: 12,
          }}
        >
          {nights > 0 ? `Reserve · ₹${total.toLocaleString('en-IN')}` : 'Check Availability'}
        </Link>

        <p
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: '#bbb',
            marginTop: '0.75rem',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Free cancellation · No charge until check-in
        </p>
      </div>
    </div>
  );
}
