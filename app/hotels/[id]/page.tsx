'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ChevronRight, Heart, MapPin, Share2, Star } from 'lucide-react';
import Navbar from '@/components/layouts/Navigation';
import Footer from '@/components/layouts/Footer';
import { AIInsight, Badge } from '@/components/index.tsx';
import { MOCK_HOTELS } from '@/src/lib/data';
import { formatCurrency } from '@/src/lib/utils';

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const hotel = MOCK_HOTELS.find((h) => h.id === params.id) || MOCK_HOTELS[0];
  const [activeImage, setActiveImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [saved, setSaved] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.max(0, (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
      : 0;

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
      <Navbar />
      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-5">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-on-surface transition-colors"
          >
            <ArrowLeft size={16} /> Back to search
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          {/* Title row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {hotel.tags.map((tag) => (
                  <Badge key={tag} variant="amber">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1
                className="font-poppins font-black text-3xl md:text-4xl text-on-surface mb-2"
                style={{ letterSpacing: '-0.03em' }}
              >
                {hotel.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Star size={15} fill="#9b4701" className="text-secondary" />
                  <span className="font-semibold text-secondary">{hotel.rating}</span>
                  <span className="text-primary">({hotel.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-primary">
                  <MapPin size={14} />
                  <span>{hotel.location}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setSaved(!saved)}
                className={`p-3 rounded-xl border transition-all ${saved ? 'border-secondary bg-secondary-container text-secondary' : 'border-surface-container-high hover:bg-surface-container-low text-primary'}`}
              >
                <Heart size={18} fill={saved ? '#9b4701' : 'none'} />
              </button>
              <button className="p-3 rounded-xl border border-surface-container-high hover:bg-surface-container-low text-primary transition-all">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[420px] mb-12 rounded-[2rem] overflow-hidden">
            <div
              className="col-span-2 row-span-2 overflow-hidden cursor-pointer"
              onClick={() => setActiveImage(0)}
            >
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {hotel.images.slice(1, 4).map((img, i) => (
              <div
                key={i}
                className="overflow-hidden cursor-pointer"
                onClick={() => setActiveImage(i + 1)}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
            {hotel.images.length < 4 &&
              Array(4 - hotel.images.length)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="overflow-hidden"
                    style={{ background: 'var(--surface-container)' }}
                  >
                    <img
                      src={hotel.images[0]}
                      alt=""
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                ))}
          </div>

          {/* Content + Booking widget */}
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {/* About */}
              <div>
                <h2 className="font-poppins font-bold text-2xl text-on-surface mb-4">
                  The Essence of Sanctuary
                </h2>
                <p className="text-primary leading-relaxed">{hotel.description}</p>
              </div>

              {/* AI Insight */}
              {hotel.aiMatch && (
                <AIInsight title="AI Match Score">
                  This property matches your travel profile at <strong>{hotel.aiMatch}%</strong>.
                  Based on your preference for quiet retreats and architectural landmarks, this
                  sanctuary is an exceptional fit.
                </AIInsight>
              )}

              {/* Amenities */}
              <div>
                <h3 className="font-poppins font-semibold text-lg text-on-surface mb-5">
                  What's Included
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {hotel.amenities.map((a) => (
                    <div
                      key={a}
                      className="flex items-center gap-3 p-4 rounded-xl transition-colors cursor-pointer hover:bg-surface-container group"
                      style={{ background: 'var(--surface-container-low)' }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-secondary flex-shrink-0"
                        style={{ background: 'var(--secondary-container)' }}
                      >
                        <Check size={14} />
                      </div>
                      <span className="text-sm font-medium text-on-surface">{a}</span>
                      <ChevronRight
                        size={14}
                        className="text-primary ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-poppins font-semibold text-lg text-on-surface mb-4">
                  Location
                </h3>
                <div
                  className="rounded-[1.5rem] overflow-hidden h-48 relative"
                  style={{ background: 'var(--surface-container)' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={32} className="text-secondary mx-auto mb-2" />
                      <p className="font-semibold text-on-surface">{hotel.location}</p>
                      <p className="text-xs text-primary mt-1">Interactive map coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 card-editorial p-8 space-y-6">
                <div>
                  <p className="text-xs text-primary mb-1">Starting from</p>
                  <p className="font-poppins font-black text-3xl text-on-surface">
                    {formatCurrency(hotel.price)}
                    <span className="text-base font-normal text-primary">/night</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={12} fill="#9b4701" className="text-secondary" />
                    <span className="text-xs font-semibold text-secondary">{hotel.rating}</span>
                    <span className="text-xs text-primary">
                      · {hotel.reviews.toLocaleString()} reviews
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-primary mb-1.5 block">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="input-field text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-primary mb-1.5 block">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="input-field text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-primary mb-1.5 block">Guests</label>
                    <div className="flex items-center gap-3 input-field">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-on-surface hover:bg-surface-container transition-colors"
                      >
                        −
                      </button>
                      <span className="flex-1 text-center text-sm font-medium">{guests}</span>
                      <button
                        onClick={() => setGuests(guests + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-on-surface hover:bg-surface-container transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {nights > 0 && (
                  <div className="space-y-2 py-4 border-t border-surface-container text-sm">
                    <div className="flex justify-between text-primary">
                      <span>
                        {formatCurrency(hotel.price)} × {nights} nights
                      </span>
                      <span>{formatCurrency(hotel.price * nights)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-on-surface pt-2 border-t border-surface-container">
                      <span>Total</span>
                      <span>{formatCurrency(hotel.price * nights)}</span>
                    </div>
                  </div>
                )}

                <Link href={`/booking?hotelId=${hotel.id}`} className="btn-primary w-full">
                  Reserve This Sanctuary
                </Link>
                <p className="text-xs text-primary text-center">You won't be charged yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
