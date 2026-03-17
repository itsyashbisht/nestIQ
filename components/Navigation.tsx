'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import type { AppDispatch, RootState } from '@/src/store';
import { logoutUser } from '@/src/thunks/auth.thunk';
import { toast } from 'react-toastify';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();

  const { user, isAuthenticated } = useSelector((s: RootState) => s.auth);
  const cartItems = useSelector((s: RootState) => s.cart.items);

  const isHome = pathname === '/';
  /* Transparent only on home hero — white on all other pages + after scroll */
  const isDark = isHome && !scrolled;

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    setScrolled(false);
    const fn = () => setScrolled(window.scrollY > 72);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [isHome]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await dispatch(logoutUser());
    toast.success('Logged out');
    router.push('/');
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
    { label: 'About', href: '/about' },
    { label: 'Offers', href: '/search?tab=deals' },
    { label: 'Listing', href: '/owner/hotels/new' },
  ];

  /* Exact Serenity animation */
  const menuV = {
    closed: { opacity: 0, y: '-100%', transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1] } },
    open: { opacity: 1, y: '0%', transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1] } },
  };
  const linkV = {
    initial: { y: 60, opacity: 0 },
    enter: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1], delay: 0.12 + i * 0.07 },
    }),
    exit: (i: number) => ({
      y: 30,
      opacity: 0,
      transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1], delay: i * 0.04 },
    }),
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        /* Serenity: transparent on hero, pure white with very subtle border on scroll */
        background: isDark ? 'transparent' : '#FFFFFF',
        borderBottom: isDark ? 'none' : '1px solid #F0EDE8',
        boxShadow: isDark ? 'none' : '0 1px 0 rgba(0,0,0,0.04)',
        transition: 'background 0.32s ease, border-color 0.32s ease, box-shadow 0.32s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 2.5rem',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo — Serenity uses small pill-style wordmark */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: isDark ? 'rgba(255,255,255,0.12)' : 'transparent',
            backdropFilter: isDark ? 'blur(10px)' : 'none',
            border: isDark ? '1px solid rgba(255,255,255,0.2)' : 'none',
            borderRadius: isDark ? 9999 : 0,
            padding: isDark ? '0.3rem 0.875rem' : '0',
            fontFamily: 'Poppins, Inter, sans-serif',
            fontWeight: 700,
            fontSize: '0.9375rem',
            color: isDark ? '#FFFFFF' : '#1A1A1A',
            letterSpacing: '-0.015em',
            textDecoration: 'none',
            transition: 'all 0.3s',
          }}
        >
          NestIQ*
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex" style={{ gap: '2.5rem' }}>
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isDark
                    ? active
                      ? '#FFFFFF'
                      : 'rgba(255,255,255,0.7)'
                    : active
                      ? '#1A1A1A'
                      : '#6A6A6A',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: 2,
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-line"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 1.5,
                      borderRadius: 99,
                      background: isDark ? '#FFFFFF' : '#1A1A1A',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '1rem' }}>
          {/* Bookings icon */}
          <button
            onClick={() => router.push('/bookings')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isDark ? 'rgba(255,255,255,0.75)' : '#6A6A6A',
              fontSize: '0.875rem',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              position: 'relative',
              transition: 'color 0.2s',
            }}
          >
            <ShoppingBag size={18} strokeWidth={2} />
            Bookings
            {cartItems.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -8,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#E07B39',
                  color: '#fff',
                  fontSize: '0.5rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 16,
              background: isDark ? 'rgba(255,255,255,0.18)' : '#E8E4DE',
            }}
          />

          {/* Auth */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <Link
                href="/profile"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isDark ? 'rgba(255,255,255,0.75)' : '#4A4A4A',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {user?.fullname?.split(' ')[0]}
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  color: isDark ? 'rgba(255,255,255,0.4)' : '#B0B0B0',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Sign out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Link
                href="/login"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isDark ? 'rgba(255,255,255,0.75)' : '#4A4A4A',
                  fontFamily: 'Inter, sans-serif',
                  textDecoration: 'none',
                }}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isDark ? 'rgba(255,255,255,0.95)' : '#1A1A1A',
                  color: isDark ? '#1A1A1A' : '#FFFFFF',
                  borderRadius: 9999,
                  padding: '0.45rem 1.1rem',
                  fontSize: '0.825rem',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden" style={{ alignItems: 'center', gap: '0.875rem' }}>
          <button
            onClick={() => router.push('/bookings')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              color: isDark ? '#fff' : '#1A1A1A',
              padding: 4,
            }}
          >
            <ShoppingBag size={20} strokeWidth={2} />
            {cartItems.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: -2,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: '#E07B39',
                  color: '#fff',
                  fontSize: '0.48rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cartItems.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isDark ? '#fff' : '#1A1A1A',
              padding: 4,
              zIndex: 110,
            }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="m"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuV}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              position: 'fixed',
              inset: 0,
              background: '#FFFFFF',
              zIndex: 90,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 2.5rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                ...navLinks,
                { label: 'Bookings', href: '/bookings' },
                { label: 'Account', href: '/profile' },
              ].map((link, i) => {
                const active = pathname === link.href;
                return (
                  <div key={link.label} style={{ overflow: 'hidden' }}>
                    <motion.div
                      custom={i}
                      variants={linkV}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                    >
                      <Link
                        href={link.href}
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: 'clamp(2rem, 8vw, 2.75rem)',
                          fontWeight: 700,
                          letterSpacing: '-0.03em',
                          color: active ? '#1A1A1A' : '#CACAC8',
                          textDecoration: 'none',
                          position: 'relative',
                          display: 'inline-block',
                        }}
                      >
                        {link.label}
                        {active && (
                          <motion.span
                            layoutId="mobile-line"
                            style={{
                              position: 'absolute',
                              bottom: -4,
                              left: 0,
                              width: '100%',
                              height: 3,
                              background: '#E07B39',
                              borderRadius: 99,
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              style={{
                position: 'absolute',
                bottom: '2.5rem',
                left: '2.5rem',
                right: '2.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#C8C8C6',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                © 2025 NestIQ
              </p>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#C8C8C6',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#C8C8C6',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Sign In →
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
