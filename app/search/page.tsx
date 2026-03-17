import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSearch from '@/components/HeroSearch';
import { hotelService } from '@/src/apiServices/hotel.services';
import type { IHotel } from '@/src/types';

/* ── Static data ─────────────────────────────────────────────── */
const bentoImages = [
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=85',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=85',
  'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&q=85',
  'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=85',
  'https://images.unsplash.com/photo-1587502537745-84b86da1204f?w=800&q=85',
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=85',
];

const placeholders = [
  {
    name: 'Elysian Haven Resort',
    city: 'Udaipur',
    cat: 'Luxury',
    rating: 4.9,
    price: 8500,
    img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
  },
  {
    name: 'Opal Bay Retreat',
    city: 'Goa',
    cat: 'Boutique',
    rating: 4.7,
    price: 5200,
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  },
  {
    name: 'Majestic Urban Hotel',
    city: 'Mumbai',
    cat: 'Comfort',
    rating: 4.5,
    price: 4800,
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
  },
  {
    name: 'VistaGrand Suites',
    city: 'Delhi',
    cat: 'Luxury',
    rating: 4.8,
    price: 6200,
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  },
  {
    name: 'The Royal Crest',
    city: 'Jaipur',
    cat: 'Heritage',
    rating: 4.9,
    price: 7800,
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80',
  },
  {
    name: 'Evergreen Lodge & Spa',
    city: 'Coorg',
    cat: 'Boutique',
    rating: 4.8,
    price: 3900,
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80',
  },
  {
    name: 'Tranquil Cove Hotel',
    city: 'Alleppey',
    cat: 'Wellness',
    rating: 4.7,
    price: 4500,
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
  },
  {
    name: 'Lure Retreat & Spa',
    city: 'Manali',
    cat: 'Mountain',
    rating: 4.8,
    price: 5500,
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  },
];

const featuredTags = [
  'Beachfront',
  'Wellness',
  'Adventure',
  'Scenic',
  'Family Friendly',
  'Exclusive',
];

const faqs = [
  {
    q: 'What time is check-in and check-out?',
    a: 'Check-in from 2:00 PM, check-out by 11:00 AM. Early and late options available on request.',
  },
  {
    q: 'Does NestIQ offer airport transfers?',
    a: 'Yes — transfers can be arranged for most properties. Request during booking or via AI Concierge.',
  },
  {
    q: 'Does the hotel have a spa and wellness centre?',
    a: "Many properties feature spas. Filter by 'Wellness' when searching to find them quickly.",
  },
  {
    q: 'How can I modify or cancel my reservation?',
    a: 'Visit your Bookings page. Most hotels offer free cancellation up to 48 hours before arrival.',
  },
  {
    q: 'Do you offer honeymoon or romantic packages?',
    a: "Yes — use the 'Romantic' filter when searching to find curated honeymoon properties.",
  },
];

async function getFeaturedHotels(): Promise<IHotel[]> {
  try {
    const res = await hotelService.getAllHotels({ sortBy: 'rating', limit: 8 });
    return res.data ?? [];
  } catch {
    return [];
  }
}

/* ── Shared tokens (inline style objects) ─────────────────────── */
const C = {
  bg: '#FFFFFF',
  bgSoft: '#F5F5F3' /* Serenity's section backgrounds */,
  bgWarm: '#F2F0EB' /* Serenity's featured section */,
  text: '#1A1A1A',
  body: '#4A4A4A',
  muted: '#8A8A8A',
  faint: '#B0B0B0',
  border: '#E8E4DE',
  brand: '#E07B39',
  brandH: '#C96A28',
  black: '#000000',
};

const heading = (size: string, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: 'Poppins, Inter, sans-serif',
  fontSize: size,
  fontWeight: 700,
  letterSpacing: '-0.022em',
  lineHeight: 1.12,
  color: C.text,
  ...extra,
});

export default async function HomePage() {
  const dbHotels = await getFeaturedHotels();
  const cards = dbHotels.length > 0 ? dbHotels : null;

  return (
    <>
      <Navigation />

      {/* ══════════════════════════════════════════
          1 · HERO
          Full-viewport · headline bottom-left · search bottom-right
      ══════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '100svh',
          minHeight: 580,
          maxHeight: 960,
          overflow: 'hidden',
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=2400&q=90"
          alt="NestIQ hero"
          fill
          priority
          quality={90}
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        {/* Same gradient layers as Serenity */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.12) 48%, rgba(0,0,0,0.22) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.28) 0%, transparent 55%)',
          }}
        />

        {/* Bottom content */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 3rem 3rem' }}>
          <div
            style={{
              maxWidth: 1400,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '2rem',
            }}
          >
            <h1
              style={{
                fontFamily: 'Poppins, Inter, sans-serif',
                fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.12,
                color: '#FFFFFF',
                maxWidth: 520,
                textShadow: '0 2px 18px rgba(0,0,0,0.25)',
              }}
            >
              Not just a hotel, but
              <br />a place that feels like home
            </h1>
            <div style={{ flexShrink: 0, width: 265 }}>
              <HeroSearch />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2 · ABOUT — white bg, centred header, bento grid
      ══════════════════════════════════════════ */}
      <section style={{ background: C.bg, padding: '6rem 3rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 3.5rem' }}>
            <p className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
              About Us
            </p>
            <h2 style={heading('clamp(1.75rem,3.5vw,2.75rem)', { marginBottom: '1rem' })}>
              Welcome to NestIQ
            </h2>
            <p
              style={{
                fontSize: '0.9rem',
                color: C.body,
                lineHeight: 1.78,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              From mountain escapes to personalised experiences, NestIQ is designed to make every
              guest feel at home. Discover India&apos;s finest hotels — curated, verified, and
              matched to exactly what you want.
            </p>
          </div>

          {/* Bento grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gridTemplateRows: '230px 230px',
              gap: 10,
            }}
          >
            <div
              style={{ gridRow: '1/3', borderRadius: 18, overflow: 'hidden', position: 'relative' }}
              className="img-zoom"
            >
              <Image
                src={bentoImages[0]!}
                alt=""
                fill
                style={{ objectFit: 'cover' }}
                sizes="25vw"
              />
            </div>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{ borderRadius: 18, overflow: 'hidden', position: 'relative' }}
                className="img-zoom"
              >
                <Image
                  src={bentoImages[i]!}
                  alt=""
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3 · OFFERS — #F5F5F3 bg, asymmetric header, 4×2 grid
      ══════════════════════════════════════════ */}
      <section
        style={{ background: C.bgSoft, padding: '5.5rem 3rem', borderTop: `1px solid ${C.border}` }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Asymmetric header — exact Serenity layout */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '2rem',
              marginBottom: '2.75rem',
            }}
          >
            <div style={{ maxWidth: 400 }}>
              <p className="eyebrow" style={{ display: 'block', marginBottom: '0.6rem' }}>
                Special Offer
              </p>
              <h2 style={heading('clamp(1.5rem,3vw,2.5rem)', { lineHeight: 1.15 })}>
                Limited-Time Offers
                <br />
                You Can&apos;t Miss!
              </h2>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'right', maxWidth: 300, paddingTop: 4 }}>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: C.muted,
                  lineHeight: 1.72,
                  marginBottom: '1rem',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Enjoy unbeatable rates, complimentary perks, and extra nights on us. Your perfect
                getaway just got better.
              </p>
              <Link href="/search?tab=deals" className="btn-primary" style={{ fontSize: '0.8rem' }}>
                See All Special Offers
              </Link>
            </div>
          </div>

          {/* Row 1 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: 16,
              marginBottom: 16,
            }}
          >
            {(cards ? cards.slice(0, 4) : placeholders.slice(0, 4)).map((h: any, i: number) => (
              <HotelTile key={i} h={h} isDb={!!cards} />
            ))}
          </div>
          {/* Row 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {(cards ? cards.slice(4, 8) : placeholders.slice(4, 8)).map((h: any, i: number) => (
              <HotelTile key={i + 4} h={h} isDb={!!cards} />
            ))}
          </div>

          {/* Arrows */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
            <NavBtn left />
            <NavBtn />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4 · FEATURED STAY — #F2F0EB warm bg
      ══════════════════════════════════════════ */}
      <section style={{ background: C.bgWarm, padding: '5.5rem 3rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 0.85fr',
              gap: 14,
              alignItems: 'stretch',
            }}
          >
            {/* Large image */}
            <div
              style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', minHeight: 460 }}
              className="img-zoom"
            >
              <Image
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=90"
                alt="Azure Cove Resort"
                fill
                style={{ objectFit: 'cover' }}
                sizes="55vw"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, transparent 52%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2rem 2.25rem',
                }}
              >
                <p
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: '0.75rem',
                    marginBottom: '0.35rem',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Maldives, Stay in style
                </p>
                <h3
                  style={{
                    ...heading('clamp(1.2rem,2.5vw,1.75rem)'),
                    color: '#fff',
                    marginBottom: '0.6rem',
                  }}
                >
                  Azure Cove Resort &amp; Spa
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.825rem',
                    lineHeight: 1.65,
                    maxWidth: 380,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  A pristine oceanfront retreat offering world-class suites, infinity pools, and
                  personalised service that anticipates your every need.
                </p>
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1 }}>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: 16,
                    overflow: 'hidden',
                    minHeight: 200,
                  }}
                  className="img-zoom"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80"
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="22vw"
                  />
                </div>
                <div
                  style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}
                  className="img-zoom"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80"
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="22vw"
                  />
                  {/* Review badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: C.text,
                      color: '#fff',
                      borderRadius: 12,
                      padding: '8px 14px',
                      textAlign: 'center',
                      minWidth: 58,
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.6rem',
                        color: 'rgba(255,255,255,0.45)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: 2,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      Review
                    </p>
                    <p
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        lineHeight: 1,
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      5.0
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {featuredTags.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: '0.35rem 0.9rem',
                      borderRadius: 9999,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      background: C.bg,
                      border: `1px solid ${C.border}`,
                      color: C.body,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Link
                  href="/search"
                  className="btn-primary"
                  style={{ fontSize: '0.8rem', padding: '0.55rem 1.25rem' }}
                >
                  Book Now
                </Link>
                <Link
                  href="/search"
                  className="btn-outline"
                  style={{ fontSize: '0.8rem', padding: '0.55rem 1.25rem' }}
                >
                  See Details
                </Link>
                <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
                  <NavBtn left />
                  <NavBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5 · FAQ — white bg, large heading left, accordion right
      ══════════════════════════════════════════ */}
      <section
        style={{ background: C.bg, padding: '5.5rem 3rem', borderTop: `1px solid ${C.border}` }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <p className="eyebrow" style={{ display: 'block', marginBottom: '0.65rem' }}>
            FAQ
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr',
              gap: '5rem',
              alignItems: 'start',
            }}
          >
            {/* Left */}
            <div>
              <h2
                style={heading('clamp(2rem,4.5vw,3.5rem)', {
                  lineHeight: 1.08,
                  marginBottom: '1.25rem',
                })}
              >
                Got Questions?
                <br />
                We&apos;ve Got Answers!
              </h2>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: C.muted,
                  lineHeight: 1.75,
                  maxWidth: 320,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Find everything you need to know about your stay at NestIQ, from check-in details to
                personalised experiences.
              </p>
            </div>

            {/* Right: accordion + photo */}
            <div>
              <div style={{ borderTop: `1px solid ${C.bgWarm}` }}>
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group"
                    style={{ borderBottom: `1px solid ${C.bgWarm}` }}
                  >
                    <summary
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.1rem 0',
                        cursor: 'pointer',
                        listStyle: 'none',
                        gap: '1rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: C.text,
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {faq.q}
                      </span>
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          border: `1.5px solid ${C.border}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontSize: '1.1rem',
                          color: C.faint,
                          fontFamily: 'Inter, sans-serif',
                          transition: 'transform 0.22s, border-color 0.22s, color 0.22s',
                        }}
                        className="group-open:rotate-45 group-open:border-black group-open:text-black"
                      >
                        +
                      </span>
                    </summary>
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: C.muted,
                        lineHeight: 1.75,
                        paddingBottom: '1.1rem',
                        maxWidth: '92%',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
              <div
                style={{
                  position: 'relative',
                  borderRadius: 18,
                  overflow: 'hidden',
                  marginTop: 28,
                  height: 240,
                }}
                className="img-zoom"
              >
                <Image
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=85"
                  alt=""
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6 · JOIN — #F5F5F3 bg, full-width image + button
      ══════════════════════════════════════════ */}
      <section style={{ background: C.bgSoft, padding: '5.5rem 3rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '2rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <p className="eyebrow" style={{ display: 'block', marginBottom: '0.65rem' }}>
                Join NestIQ
              </p>
              <h2 style={heading('clamp(1.5rem,3vw,2.5rem)', { lineHeight: 1.15 })}>
                Join the NestIQ Insiders Club!
              </h2>
            </div>
            <p
              style={{
                fontSize: '0.85rem',
                color: C.muted,
                lineHeight: 1.7,
                maxWidth: 300,
                textAlign: 'right',
                paddingTop: 4,
                flexShrink: 0,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Sign up to discover curated properties, exclusive discounts, and personalised
              recommendations — straight to your inbox.
            </p>
          </div>

          <div
            style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: 400 }}
            className="img-zoom"
          >
            <Image
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=2000&q=85"
              alt="Join NestIQ"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="100vw"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.36)' }} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Link href="/register" className="btn-outline-white">
                Join Our Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ── Hotel tile ───────────────────────────────────────────────── */
function HotelTile({ h, isDb }: { h: any; isDb: boolean }) {
  const name = h.name;
  const city = h.city;
  const cat = isDb ? h.category : h.cat;
  const rating = h.rating;
  const price = isDb ? h.pricePerNight : h.price;
  const img = isDb ? (h.images?.[0]?.url ?? '') : h.img;
  const href = isDb ? `/hotels/${h.slug}` : '/search';

  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="hotel-card" style={{ border: `1px solid #EDEAE4` }}>
        {/* Image */}
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
            src={img || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="25vw"
          />
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <span
              style={{
                padding: '0.2rem 0.65rem',
                borderRadius: 9999,
                fontSize: '0.65rem',
                fontWeight: 500,
                background: 'rgba(255,255,255,0.92)',
                color: '#3A3A3A',
                backdropFilter: 'blur(4px)',
                fontFamily: 'Inter, sans-serif',
                textTransform: 'capitalize',
              }}
            >
              {cat}
            </span>
          </div>
        </div>
        {/* Info */}
        <div style={{ padding: '0.8rem 0.9rem 1rem', background: '#FFFFFF' }}>
          <h4
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#1A1A1A',
              marginBottom: '0.2rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </h4>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: '0.72rem',
              color: '#8A8A8A',
              marginBottom: '0.5rem',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <MapPin size={10} />
            {city}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Star size={11} style={{ fill: '#E07B39', color: '#E07B39' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1A1A1A' }}>
                {rating}
              </span>
            </div>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#1A1A1A',
              }}
            >
              ₹{price.toLocaleString('en-IN')}
              <span style={{ fontSize: '0.67rem', fontWeight: 400, color: '#B0B0B0' }}>/night</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Arrow button ─────────────────────────────────────────────── */
function NavBtn({ left }: { left?: boolean }) {
  return (
    <button
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: left ? 'transparent' : '#1A1A1A',
        border: left ? `1px solid #E0DDD8` : 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: left ? '#8A8A8A' : '#FFFFFF',
        transition: 'all 0.2s',
      }}
    >
      <ArrowRight size={14} style={{ transform: left ? 'rotate(180deg)' : 'none' }} />
    </button>
  );
}
