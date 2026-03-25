'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Discover', href: '/search?tab=deals' },
  { label: 'Concierge', href: '/concierge' },
  { label: 'Journeys', href: '/bookings' },
  { label: 'Listing', href: '/owner/hotels/new' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (mobileOpen || currentScrollY <= 0) {
        setIsVisible(true);
      } else {
        const isScrollingUp = currentScrollY < lastScrollY.current;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

        if (scrollDelta > 8) {
          setIsVisible(isScrollingUp);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('?')[0] ?? href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-white/30 glass-nav transition-transform duration-300 ease-out',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-[1920px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex-shrink-0 text-2xl font-bold tracking-tighter text-on-surface"
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        >
          NestIQ
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'text-sm font-medium tracking-tight transition-colors',
                isActive(l.href)
                  ? 'border-b-2 border-blue-700 pb-1 font-semibold text-blue-700'
                  : 'text-stone-600 hover:text-slate-900'
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/bookings"
            className="rounded-full p-2 text-stone-600 transition-colors hover:text-blue-700"
            aria-label="Bookings"
          >
            <CalendarDays size={20} />
          </Link>
          <Link
            href="/auth"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-slate-900"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="scale-95 rounded-full bg-[linear-gradient(145deg,#2563eb_0%,#1d4ed8_100%)] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.2)] transition-all hover:opacity-95 active:scale-100"
          >
            Register
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-xl hover:bg-surface-container-low"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-surface-container px-6 py-5 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                isActive(l.href)
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-surface-container-low text-stone-700'
              )}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-surface-container flex gap-3">
            <Link href="/login" className="btn-secondary flex-1 text-center text-sm py-2">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary flex-1 text-center text-sm py-2">
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
