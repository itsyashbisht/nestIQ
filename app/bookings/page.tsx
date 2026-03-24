'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Archive, Check, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layouts/Navigation';
import Footer from '@/components/layouts/Footer';
import BookingCard from '@/components/BookingCard';
import { EmptyState } from '@/components/index.tsx';
import { MOCK_BOOKINGS } from '@/src/lib/data';

const TABS = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const confirmedBooking = MOCK_BOOKINGS.find((b) => b.status === 'confirmed');

  const filtered =
    activeTab === 'All'
      ? MOCK_BOOKINGS
      : MOCK_BOOKINGS.filter((b) => b.status === activeTab.toLowerCase());

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
      <Navbar />
      <div className="pt-20">
        {/* Confirmation banner */}
        {confirmedBooking && (
          <div
            className="border-b border-surface-container"
            style={{ background: 'var(--surface-container-low)' }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--secondary-container)' }}
                >
                  <Check size={16} className="text-secondary" />
                </div>
                <p className="text-sm text-on-surface">
                  <span className="font-semibold">Reservation Confirmed.</span> Your stay at{' '}
                  <strong>{confirmedBooking.hotelName}</strong> is ready for your arrival on{' '}
                  {confirmedBooking.checkIn}.
                </p>
              </div>
              <Link
                href={`/bookings/${confirmedBooking.id}`}
                className="flex items-center gap-1 text-sm font-semibold text-secondary hover:underline flex-shrink-0"
              >
                Manage Booking <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-10">
            <p className="section-label mb-2">My Journeys</p>
            <h1
              className="font-poppins font-black text-3xl md:text-4xl text-on-surface mb-2"
              style={{ letterSpacing: '-0.03em' }}
            >
              A curated archive of your global explorations.
            </h1>
            <p className="text-primary text-sm">
              Upcoming escapes and past sanctuaries, all in one place.
            </p>
          </div>

          {/* Tabs */}
          <div
            className="flex items-center gap-1 p-1 rounded-2xl mb-8 w-fit"
            style={{ background: 'var(--surface-container-low)' }}
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-white text-on-surface shadow-sm'
                    : 'text-primary hover:text-on-surface'
                }`}
              >
                {tab}
                {tab !== 'All' && (
                  <span
                    className="ml-1.5 text-xs font-semibold"
                    style={{ color: activeTab === tab ? 'var(--secondary)' : 'var(--primary)' }}
                  >
                    {MOCK_BOOKINGS.filter((b) => b.status === tab.toLowerCase()).length || ''}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Booking list */}
          {filtered.length === 0 ? (
            <EmptyState
              icon="🌍"
              title="No journeys found"
              description="Your next great escape is just a search away."
              action={
                <Link href="/search" className="btn-primary">
                  Discover Stays
                </Link>
              }
            />
          ) : (
            <div className="space-y-5">
              {filtered.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}

          {/* Historical Records CTA */}
          {activeTab === 'All' && (
            <div
              className="mt-10 flex items-center justify-between p-6 rounded-2xl"
              style={{ background: 'var(--surface-container-low)' }}
            >
              <div className="flex items-center gap-3">
                <Archive size={20} className="text-secondary" />
                <div>
                  <p className="font-semibold text-on-surface text-sm">Historical Records</p>
                  <p className="text-xs text-primary">
                    View your complete travel archive going back to 2021.
                  </p>
                </div>
              </div>
              <Link
                href="#"
                className="flex items-center gap-1 text-sm font-semibold text-secondary hover:underline"
              >
                View Full Archive <ChevronRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
