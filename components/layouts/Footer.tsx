import Link from 'next/link';

const LINKS = {
  Product: ['Home', 'Search', 'Concierge', 'Offers'],
  Company: ['About Us', 'Careers', 'Press', 'Contact'],
  Support: ['Help Centre', 'Cancellation', 'Privacy', 'Terms'],
};

export default function Footer() {
  return (
    <footer style={{ background: '#1A1A18', color: '#FFFFFF' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 2rem 0' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontWeight: 700,
                fontSize: '1.25rem',
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              NestIQ*
            </Link>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.75,
                maxWidth: 280,
              }}
            >
              AI-powered hotel discovery across India. Find your perfect stay in seconds.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              {['Twitter', 'Instagram', 'LinkedIn'].map((s) => (
                <Link
                  key={s}
                  href="#"
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(255,255,255,0.4)',
                    transition: 'color 0.2s',
                  }}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '1rem',
                }}
              >
                {title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {links.map((l) => (
                  <Link
                    key={l}
                    href="#"
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.55)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {l}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 0',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>
            © 2025 NestIQ. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((l) => (
              <Link
                key={l}
                href="#"
                style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
