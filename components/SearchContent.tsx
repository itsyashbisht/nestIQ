'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Search, SlidersHorizontal, Sparkles, Star, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/src/store';
import {
  resetFilters,
  setFilters,
  setQuery,
  setResults,
  setSearchLoading,
} from '@/src/slices/search.slice';
import { aiService } from '@/src/apiServices/ai.services';
import { hotelService } from '@/src/apiServices/hotel.services';
import type { IHotel, SearchFilters } from '@/src/types';

interface Props {
  initialQuery: string;
  initialCity: string;
}

const VIBES = ['romantic', 'family', 'adventure', 'business', 'solo', 'wellness'] as const;
const CATEGORIES = ['budget', 'comfort', 'luxury', 'boutique'] as const;
const SORT_OPTS = [
  { label: 'Best Match', value: 'relevance' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
];

export default function SearchContent({ initialQuery, initialCity }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { results, loading, aiInsight, total, filters, query } = useSelector(
    (s: RootState) => s.search
  );

  const [inputValue, setInputValue] = useState(initialQuery);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  /* Run on mount if query/city passed */
  useEffect(() => {
    if (initialQuery) runAiSearch(initialQuery);
    else if (initialCity) runFilterSearch({ city: initialCity });
    else runFilterSearch({});
  }, []); // eslint-disable-line

  async function runAiSearch(q: string) {
    dispatch(setSearchLoading(true));
    dispatch(setQuery(q));
    try {
      const res = await aiService.searchHotels(q);
      dispatch(
        setResults({
          results: res.data?.hotels ?? [],
          total: res.data?.total ?? 0,
          aiInsight: res.data?.aiInsight ?? `Showing results for "${q}"`,
        })
      );
    } catch {
      dispatch(setResults({ results: [], total: 0 }));
    } finally {
      dispatch(setSearchLoading(false));
    }
  }

  async function runFilterSearch(f: Partial<SearchFilters>) {
    dispatch(setSearchLoading(true));
    const merged = { ...filters, ...f };
    dispatch(setFilters(f));
    try {
      const res = await hotelService.getAllHotels(merged);
      dispatch(setResults({ results: res.data ?? [], total: res.data?.length ?? 0 }));
    } catch {
      dispatch(setResults({ results: [], total: 0 }));
    } finally {
      dispatch(setSearchLoading(false));
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!inputValue.trim()) return;
    router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    runAiSearch(inputValue.trim());
  }

  function applyFilters() {
    runFilterSearch({
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
    setSidebarOpen(false);
  }

  function handleReset() {
    dispatch(resetFilters());
    setMinPrice('');
    setMaxPrice('');
    setInputValue('');
    runFilterSearch({});
  }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '2rem 3rem 4rem' }}>
      {/* ── Search bar ─────────────────────────────────────────── */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12, marginBottom: '1.75rem' }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: '#fff',
            border: '1px solid #E8E6E1',
            borderRadius: 9999,
            padding: '0.6rem 0.6rem 0.6rem 1.25rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}
        >
          <Sparkles size={15} color="#E07B39" style={{ flexShrink: 0 }} />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your perfect stay…"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '0.875rem',
              fontFamily: 'Inter, sans-serif',
              color: '#111',
              background: 'transparent',
            }}
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => setInputValue('')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 2,
                color: '#aaa',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="btn-dark"
          style={{
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.875rem',
          }}
        >
          <Search size={15} /> Search
        </button>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '0 1.25rem',
            borderRadius: 9999,
            border: '1px solid #E8E6E1',
            background: sidebarOpen ? '#111' : '#fff',
            color: sidebarOpen ? '#fff' : '#555',
            fontSize: '0.875rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          <SlidersHorizontal size={15} /> Filters
        </button>
      </form>

      {/* ── AI insight ─────────────────────────────────────────── */}
      {aiInsight && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(224,123,57,0.06)',
            border: '1px solid rgba(224,123,57,0.18)',
            borderRadius: 12,
            padding: '0.75rem 1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <Sparkles size={15} color="#E07B39" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '0.85rem', color: '#555', fontFamily: 'Inter, sans-serif' }}>
            <span style={{ fontWeight: 600, color: '#E07B39' }}>AI: </span>
            {aiInsight}
          </p>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: sidebarOpen ? '260px 1fr' : '1fr',
          gap: '2rem',
          transition: 'grid-template-columns 0.3s',
        }}
      >
        {/* ── Sidebar ─────────────────────────────────────────── */}
        {sidebarOpen && (
          <aside
            style={{
              background: '#fff',
              borderRadius: 18,
              padding: '1.5rem',
              border: '1px solid #E8E6E1',
              height: 'fit-content',
              position: 'sticky',
              top: 88,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: '#111',
                }}
              >
                Filters
              </h3>
              <button
                onClick={handleReset}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  color: '#aaa',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Reset
              </button>
            </div>

            {/* Price */}
            <FilterGroup label="Price Range (₹/night)">
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min"
                  type="number"
                  style={{
                    flex: 1,
                    border: '1px solid #E8E6E1',
                    borderRadius: 8,
                    padding: '0.45rem 0.6rem',
                    fontSize: '0.8rem',
                    outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
                <input
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  type="number"
                  style={{
                    flex: 1,
                    border: '1px solid #E8E6E1',
                    borderRadius: 8,
                    padding: '0.45rem 0.6rem',
                    fontSize: '0.8rem',
                    outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
              </div>
            </FilterGroup>

            {/* Vibe */}
            <FilterGroup label="Travel Style">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {VIBES.map((v) => (
                  <button
                    key={v}
                    onClick={() =>
                      dispatch(setFilters({ vibe: filters.vibe === v ? undefined : v }))
                    }
                    style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: 9999,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                      border: filters.vibe === v ? 'none' : '1px solid #E8E6E1',
                      background: filters.vibe === v ? '#111' : 'transparent',
                      color: filters.vibe === v ? '#fff' : '#666',
                      textTransform: 'capitalize',
                      transition: 'all 0.2s',
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </FilterGroup>

            {/* Category */}
            <FilterGroup label="Category">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() =>
                      dispatch(setFilters({ category: filters.category === c ? undefined : c }))
                    }
                    style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: 9999,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                      border: filters.category === c ? 'none' : '1px solid #E8E6E1',
                      background: filters.category === c ? '#111' : 'transparent',
                      color: filters.category === c ? '#fff' : '#666',
                      textTransform: 'capitalize',
                      transition: 'all 0.2s',
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </FilterGroup>

            {/* Rating */}
            <FilterGroup label="Min Rating">
              <div style={{ display: 'flex', gap: 6 }}>
                {[3, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() =>
                      dispatch(setFilters({ rating: filters.rating === r ? undefined : r }))
                    }
                    style={{
                      padding: '0.3rem 0.65rem',
                      borderRadius: 9999,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                      border: filters.rating === r ? 'none' : '1px solid #E8E6E1',
                      background: filters.rating === r ? '#E07B39' : 'transparent',
                      color: filters.rating === r ? '#fff' : '#666',
                      transition: 'all 0.2s',
                    }}
                  >
                    {r}★+
                  </button>
                ))}
              </div>
            </FilterGroup>

            <button
              onClick={applyFilters}
              className="btn-dark"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
            >
              Apply Filters
            </button>
          </aside>
        )}

        {/* ── Results ─────────────────────────────────────────── */}
        <div>
          {/* Header row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            <p style={{ fontSize: '0.875rem', color: '#888', fontFamily: 'Inter, sans-serif' }}>
              {loading ? (
                'Searching…'
              ) : (
                <>
                  <span style={{ fontWeight: 600, color: '#111' }}>{total} hotels</span>
                  {initialQuery && <> for &ldquo;{initialQuery}&rdquo;</>}
                </>
              )}
            </p>
            <select
              value={filters.sortBy ?? 'relevance'}
              onChange={(e) => {
                dispatch(setFilters({ sortBy: e.target.value as SearchFilters['sortBy'] }));
                runFilterSearch({ sortBy: e.target.value as SearchFilters['sortBy'] });
              }}
              style={{
                border: '1px solid #E8E6E1',
                borderRadius: 9999,
                padding: '0.4rem 0.9rem',
                fontSize: '0.8rem',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                background: '#fff',
                cursor: 'pointer',
              }}
            >
              {SORT_OPTS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} style={{ borderRadius: 16, overflow: 'hidden', background: '#fff' }}>
                  <div
                    className="skeleton"
                    style={{ aspectRatio: '4/3', width: '100%', borderRadius: 0 }}
                  />
                  <div
                    style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: 8 }}
                  >
                    <div className="skeleton" style={{ height: 16, width: '75%' }} />
                    <div className="skeleton" style={{ height: 12, width: '50%' }} />
                    <div className="skeleton" style={{ height: 14, width: '40%' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
              <p
                style={{
                  fontSize: '1rem',
                  color: '#aaa',
                  marginBottom: 8,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                }}
              >
                No hotels found
              </p>
              <p style={{ fontSize: '0.875rem', color: '#ccc', fontFamily: 'Inter, sans-serif' }}>
                Try adjusting your search or filters
              </p>
            </div>
          )}

          {/* Grid */}
          {!loading && results.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}
            >
              {results.map((hotel) => (
                <SearchHotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Filter group wrapper ── */
function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <p className="eyebrow" style={{ display: 'block', marginBottom: '0.6rem' }}>
        {label}
      </p>
      {children}
    </div>
  );
}

/* ── Hotel card in search results ── */
function SearchHotelCard({ hotel }: { hotel: IHotel }) {
  return (
    <Link href={`/hotels/${hotel.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="hotel-card" style={{ border: '1px solid #F0EDE8' }}>
        <div
          style={{
            position: 'relative',
            aspectRatio: '4/3',
            overflow: 'hidden',
            borderRadius: '16px 16px 0 0',
          }}
          className="img-zoom"
        >
          <Image
            src={
              hotel.images?.[0]?.url ??
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'
            }
            alt={hotel.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <span
              style={{
                padding: '0.2rem 0.65rem',
                borderRadius: 9999,
                fontSize: '0.65rem',
                fontWeight: 500,
                background: 'rgba(255,255,255,0.92)',
                color: '#333',
                backdropFilter: 'blur(4px)',
                fontFamily: 'Inter, sans-serif',
                textTransform: 'capitalize',
              }}
            >
              {hotel.category}
            </span>
          </div>
        </div>
        <div style={{ padding: '0.875rem 1rem 1rem', background: '#fff' }}>
          <h4
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#111',
              marginBottom: '0.25rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.01em',
            }}
          >
            {hotel.name}
          </h4>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: '0.75rem',
              color: '#aaa',
              marginBottom: '0.6rem',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <MapPin size={11} />
            {hotel.city}, {hotel.state}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: '0.6rem' }}>
            {hotel.vibes.slice(0, 2).map((v) => (
              <span
                key={v}
                style={{
                  padding: '0.15rem 0.55rem',
                  borderRadius: 9999,
                  fontSize: '0.65rem',
                  background: '#F5F5F5',
                  color: '#777',
                  textTransform: 'capitalize',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {v}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Star size={12} style={{ fill: '#E07B39', color: '#E07B39' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111' }}>
                {hotel.rating}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#ccc' }}>({hotel.reviewCount})</span>
            </div>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#111',
              }}
            >
              ₹{hotel.pricePerNight.toLocaleString('en-IN')}
              <span style={{ fontSize: '0.7rem', fontWeight: 400, color: '#bbb' }}>/night</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
