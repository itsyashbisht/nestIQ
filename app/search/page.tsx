'use client';
import { useMemo, useState } from 'react';
import { ChevronRight, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import Navbar from '@/components/layouts/Navigation';
import Footer from '@/components/layouts/Footer';
import HotelCard from '@/components/HotelCard';
import { AIInsight } from '@/components/index.tsx';
import { MOCK_HOTELS, MOODS, VIBES } from '@/src/lib/data';
import { cn } from '@/lib/utils';

const RATINGS = ['3+', '4+', '4.5+'];
const SORTS = ['Most Curated', 'Price: Low to High', 'Price: High to Low', 'Newest Additions'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [priceMin, setPriceMin] = useState(200);
  const [priceMax, setPriceMax] = useState(1500);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [minRating, setMinRating] = useState('4+');
  const [sortBy, setSortBy] = useState('Most Curated');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleVibe = (v: string) =>
    setSelectedVibes((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  const filtered = useMemo(() => {
    let hotels = [...MOCK_HOTELS];
    if (query)
      hotels = hotels.filter(
        (h) =>
          h.name.toLowerCase().includes(query.toLowerCase()) ||
          h.location.toLowerCase().includes(query.toLowerCase())
      );
    if (selectedVibes.length)
      hotels = hotels.filter((h) => h.tags.some((t) => selectedVibes.includes(t)));
    const minR = parseFloat(minRating);
    hotels = hotels.filter((h) => h.rating >= minR && h.price >= priceMin && h.price <= priceMax);
    if (sortBy === 'Price: Low to High') hotels.sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') hotels.sort((a, b) => b.price - a.price);
    return hotels;
  }, [query, selectedVibes, minRating, sortBy, priceMin, priceMax]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
      <Navbar />
      <div className="pt-20">
        {/* Search header */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1
            className="font-poppins font-black text-4xl md:text-5xl text-on-surface mb-8"
            style={{ letterSpacing: '-0.03em' }}
          >
            Find your next sanctuary.
          </h1>
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-2xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
              <input
                type="text"
                placeholder="Search destinations, properties, vibes…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input-field pl-11 pr-4 py-4 text-base rounded-2xl"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X size={16} className="text-primary" />
                </button>
              )}
            </div>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={cn(
                'btn-secondary px-5 gap-2 rounded-2xl',
                filtersOpen && 'bg-surface-container'
              )}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>

          {/* Quick mood chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {MOODS.slice(0, 5).map((mood) => (
              <button
                key={mood}
                onClick={() => setQuery(mood)}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-medium transition-all',
                  query === mood ? 'text-white' : 'hover:bg-surface-container'
                )}
                style={
                  query === mood
                    ? { background: 'var(--secondary)', color: 'white' }
                    : { background: 'var(--surface-container-low)', color: 'var(--on-surface)' }
                }
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20 flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className={cn('lg:w-72 shrink-0 space-y-6', !filtersOpen && 'hidden lg:block')}>
            {/* AI Insight */}
            <AIInsight title="AI Curator's Insight">
              {query
                ? `Searching for "${query}" — I've found ${filtered.length} curated properties matching your preferences.`
                : "Tell me how you want to feel on your next escape and I'll find your perfect match."}
            </AIInsight>

            {/* Price Range */}
            <div className="card-editorial p-6">
              <h3 className="font-poppins font-semibold text-sm text-on-surface mb-4">
                Price Range (Nightly)
              </h3>
              <div className="flex items-center justify-between text-xs text-primary mb-3">
                <span>${priceMin}</span>
                <span>${priceMax}+</span>
              </div>
              <input
                type="range"
                min={100}
                max={3000}
                step={50}
                value={priceMax}
                onChange={(e) => setPriceMax(+e.target.value)}
                className="w-full accent-secondary"
              />
            </div>

            {/* Vibe */}
            <div className="card-editorial p-6">
              <h3 className="font-poppins font-semibold text-sm text-on-surface mb-4">
                Travel Vibe
              </h3>
              <div className="flex flex-wrap gap-2">
                {VIBES.map((v) => (
                  <button
                    key={v}
                    onClick={() => toggleVibe(v)}
                    className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition-all')}
                    style={
                      selectedVibes.includes(v)
                        ? { background: 'var(--secondary)', color: 'white' }
                        : { background: 'var(--surface-container-low)', color: 'var(--on-surface)' }
                    }
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Min Rating */}
            <div className="card-editorial p-6">
              <h3 className="font-poppins font-semibold text-sm text-on-surface mb-4">
                Minimum Rating
              </h3>
              <div className="flex gap-2">
                {RATINGS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className="flex-1 py-2 rounded-xl text-xs font-medium transition-all"
                    style={
                      minRating === r
                        ? { background: 'var(--secondary)', color: 'white' }
                        : { background: 'var(--surface-container-low)', color: 'var(--on-surface)' }
                    }
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="card-editorial p-6">
              <h3 className="font-poppins font-semibold text-sm text-on-surface mb-4">Sort By</h3>
              <div className="space-y-1">
                {SORTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                      sortBy === s
                        ? 'font-semibold text-on-surface bg-surface-container'
                        : 'text-primary hover:bg-surface-container-low'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Membership Perk */}
            <div
              className="rounded-xl p-5 text-white overflow-hidden relative"
              style={{ background: '#0f0f0f' }}
            >
              <Sparkles size={16} className="text-amber-400 mb-2" />
              <p className="font-poppins font-semibold text-sm mb-1">Membership Perk</p>
              <p className="text-white/60 text-xs mb-3">
                Unlock "Invisible Service" hotels with your NestIQ Elite status.
              </p>
              <button className="btn-amber text-xs px-4 py-2 gap-1">
                Learn more <ChevronRight size={12} />
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-primary">
                <span className="font-semibold text-on-surface">{filtered.length}</span> properties
                found
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-auto text-xs py-2 px-3"
              >
                {SORTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🌿</p>
                <h3 className="font-poppins font-semibold text-lg mb-2">No sanctuaries found</h3>
                <p className="text-sm text-primary">
                  Try adjusting your filters or explore a different mood.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
