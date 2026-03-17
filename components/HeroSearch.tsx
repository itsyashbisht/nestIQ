'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store';
import { setQuery } from '@/src/slices/search.slice';

export default function HeroSearch() {
  const [value, setValue] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    dispatch(setQuery(value.trim()));
    router.push(`/search?q=${encodeURIComponent(value.trim())}`);
  }

  return (
    <form onSubmit={handleSearch}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          /* Exact Serenity search bar: glass-morphism pill */
          background: 'rgba(255,255,255,0.13)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 9999,
          padding: '0.5rem 0.5rem 0.5rem 1.125rem',
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search Destination"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#FFFFFF',
            fontSize: '0.8125rem',
            fontFamily: 'Inter, sans-serif',
            minWidth: 0,
            lineHeight: 1,
          }}
        />
        {/* White circle button — exact Serenity style */}
        <button
          type="submit"
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'opacity 0.2s',
          }}
        >
          <Search size={13} color="#1A1A1A" strokeWidth={2.5} />
        </button>
      </div>
    </form>
  );
}
