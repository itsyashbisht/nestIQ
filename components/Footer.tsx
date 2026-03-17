import Link from 'next/link';

const SOCIALS = ['Twitter', 'Instagram', 'YouTube', 'Facebook'];

export default function Footer() {
  return (
    <footer style={{ background: '#000000', color: '#FFFFFF' }}>
      {/* Main content */}
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '4.5rem 3rem 3rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '5rem',
          alignItems: 'start',
        }}
      >
        {/* Left */}
        <div>
          <Link
            href="/"
            style={{
              fontFamily: 'Poppins, Inter, sans-serif',
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              display: 'block',
              marginBottom: '1.5rem',
              textDecoration: 'none',
            }}
          >
            NestIQ*
          </Link>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            {SOCIALS.map((s) => (
              <Link
                key={s}
                href="#"
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'Inter, sans-serif',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.52)',
              lineHeight: 1.8,
              marginBottom: '1.75rem',
              maxWidth: 480,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            At NestIQ, we believe every stay should be extraordinary. From luxurious accommodations
            to curated experiences, we ensure that every moment is unforgettable.
          </p>
          <Link
            href="/search?tab=deals"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              color: '#FFFFFF',
              border: '1.5px solid rgba(255,255,255,0.35)',
              borderRadius: 9999,
              padding: '0.6rem 1.5rem',
              fontSize: '0.8rem',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
          >
            See All Special Offers
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 3rem' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '1.25rem 3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Terms & Conditions', 'Cookie Policy'].map((l) => (
            <Link
              key={l}
              href="/privacy"
              style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.26)',
                fontFamily: 'Inter, sans-serif',
                textDecoration: 'none',
              }}
            >
              {l}
            </Link>
          ))}
        </div>
        <p
          style={{
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.2)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Copyright 2025. All Rights Reserved
        </p>
        <Link
          href="/privacy"
          style={{
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.26)',
            fontFamily: 'Inter, sans-serif',
            textDecoration: 'none',
          }}
        >
          Cookies Policy
        </Link>
      </div>
    </footer>
  );
}
