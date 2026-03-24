'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, ChevronDown, MapPin, Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store';
import { setQuery } from '@/src/slices/search.slice';
import { motion } from 'framer-motion';

const POPULAR = ['Goa', 'Manali', 'Coorg', 'Udaipur', 'Kerala'];
const TYPES = ['All Types', 'Luxury', 'Boutique', 'Budget', 'Wellness'];

export default function HeroSearch() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [destination, setDestination] = useState('');
  const [type, setType] = useState('All Types');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [showDrop, setShowDrop] = useState(false);
  const [showType, setShowType] = useState(false);

  const today = new Date().toISOString().split('T')[0]!;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = destination.trim() || 'hotels in India';
    dispatch(setQuery(q));
    const params = new URLSearchParams({ q });
    if (type && type !== 'All Types') params.set('category', type.toLowerCase());
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', String(guests));
    router.push(`/search?${params.toString()}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <form onSubmit={handleSearch}>
        {/* Main search card */}
        <div className="bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.18)] overflow-visible relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {/* Destination */}
            <div className="relative px-5 py-4">
              <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-ink-muted mb-1">
                <MapPin size={10} />
                Location
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setShowDrop(true)}
                onBlur={() => setTimeout(() => setShowDrop(false), 150)}
                placeholder="Select location..."
                className="w-full bg-transparent text-sm font-semibold text-ink placeholder:text-ink-faint placeholder:font-normal outline-none"
                autoComplete="off"
              />
              {/* Dropdown */}
              {showDrop && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-border z-40 py-2 overflow-hidden"
                >
                  <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-ink-faint">
                    Popular
                  </p>
                  {POPULAR.map((place) => (
                    <button
                      key={place}
                      type="button"
                      onMouseDown={() => setDestination(place)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-ink-body hover:bg-surface hover:text-ink transition-colors text-left"
                    >
                      <span className="w-7 h-7 rounded-full bg-surface-warm flex items-center justify-center shrink-0">
                        <MapPin size={12} className="text-accent" />
                      </span>
                      {place}, India
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Type */}
            <div className="relative px-5 py-4">
              <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-ink-muted mb-1">
                Type
              </label>
              <button
                type="button"
                onClick={() => setShowType(!showType)}
                className="flex items-center gap-2 text-sm font-semibold text-ink w-full text-left"
              >
                {type}
                <ChevronDown
                  size={14}
                  className={`text-ink-muted transition-transform ml-auto ${showType ? 'rotate-180' : ''}`}
                />
              </button>
              {showType && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-border z-40 py-1.5 overflow-hidden"
                >
                  {TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setType(t);
                        setShowType(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        type === t
                          ? 'bg-accent-light text-accent-dark font-semibold'
                          : 'text-ink-body hover:bg-surface'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Price range (decorative for now) */}
            <div className="px-5 py-4">
              <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-ink-muted mb-1">
                <Calendar size={10} />
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="₹1,000"
                  className="w-full bg-transparent text-sm font-semibold text-ink placeholder:text-ink-faint placeholder:font-normal outline-none"
                />
                <span className="text-ink-faint text-xs">–</span>
                <input
                  type="number"
                  placeholder="₹9,000"
                  className="w-full bg-transparent text-sm font-semibold text-ink placeholder:text-ink-faint placeholder:font-normal outline-none"
                />
              </div>
            </div>

            {/* Search CTA */}
            <div className="px-4 py-3 flex items-center">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-ink text-white font-semibold text-sm py-3.5 px-6 rounded-xl hover:bg-ink/85 active:scale-95 transition-all duration-150"
              >
                <Search size={16} />
                Search Hotel
              </button>
            </div>
          </div>
        </div>

        {/* Popular tags */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <span className="text-xs text-white/60 font-medium">Popular:</span>
          {POPULAR.map((place) => (
            <button
              key={place}
              type="button"
              onClick={() => setDestination(place)}
              className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-xs font-medium text-white/85 hover:bg-white/25 hover:text-white transition-all"
            >
              {place}
            </button>
          ))}
        </div>
      </form>
    </motion.div>
  );
}
