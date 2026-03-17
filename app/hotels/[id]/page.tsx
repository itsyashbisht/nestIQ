import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Car, Clock, MapPin, Star, Utensils, Waves, Wifi } from 'lucide-react';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import HotelChat from '../../../components/HotelChat';
import BookingPanel from '../../../components/BookingPanel';

interface Props {
  params: Promise<{ id: string }>;
}

// Amenity icon map
const amenityIcons: Record<string, React.ReactNode> = {
  'Free WiFi': <Wifi size={14} />,
  Parking: <Car size={14} />,
  Restaurant: <Utensils size={14} />,
  Pool: <Waves size={14} />,
};

async function getHotel(slug: string) {
  try {
    const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
    const res = await fetch(`${BASE}/api/v1/hotel/slug/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export default async function HotelDetailPage({ params }: Props) {
  const { id } = await params;
  const hotel = await getHotel(id);

  // Fallback when no backend
  const h = hotel ?? {
    _id: id,
    name: 'Azure Cove Resort & Spa',
    slug: id,
    description:
      'A pristine oceanfront retreat offering world-class suites, infinity pools overlooking the turquoise sea, and personalised luxury service that anticipates your every need. Nestled between the ocean and lush tropical gardens, every detail has been crafted to deliver an exceptional stay.',
    city: 'Maldives',
    state: 'Islands',
    address: 'North Malé Atoll, Maldives',
    category: 'luxury',
    vibes: ['romantic', 'wellness', 'adventure'],
    rating: 5.0,
    reviewCount: 142,
    pricePerNight: 18500,
    checkInTime: '14:00',
    checkOutTime: '11:00',
    images: [
      { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=90' },
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85' },
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85' },
      { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=85' },
      { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=85' },
    ],
    amenities: [
      'Free WiFi',
      'Pool',
      'Spa',
      'Restaurant',
      'Bar',
      'Parking',
      'Airport Transfer',
      'Room Service',
      'Gym',
      'Beachfront',
    ],
    nearbyAttractions: ['Coral Gardens', 'Sunset Point', 'Local Market', 'Water Sports Centre'],
  };

  const imgs = h.images ?? [];

  return (
    <>
      <Navigation />
      <div style={{ minHeight: '100vh', background: '#fff', paddingTop: 68 }}>
        {/* ── Photo gallery bento ─────────────────────────────── */}
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '1.5rem 3rem 0' }}>
          <Link
            href="/search"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.8125rem',
              color: '#888',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '1rem',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} /> Back to Search
          </Link>

          {/* Gallery grid — 1 large + 4 small like AirBnb */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '280px 280px',
              gap: 8,
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            {/* Main large */}
            <div style={{ gridRow: '1 / 3', position: 'relative' }} className="img-zoom">
              <Image
                src={
                  imgs[0]?.url ??
                  'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=90'
                }
                alt={h.name}
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="50vw"
              />
            </div>
            {/* 4 smaller */}
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ position: 'relative' }} className="img-zoom">
                <Image
                  src={
                    imgs[i]?.url ??
                    `https://images.unsplash.com/photo-${1566073771259 + i * 1000000}-${i}?w=600&q=80`
                  }
                  alt=""
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="25vw"
                />
              </div>
            ))}
            {/* Last with +more overlay */}
            <div style={{ position: 'relative' }} className="img-zoom">
              <Image
                src={
                  imgs[4]?.url ??
                  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=85'
                }
                alt=""
                fill
                style={{ objectFit: 'cover' }}
                sizes="25vw"
              />
              {imgs.length > 5 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    +{imgs.length - 5} photos
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Main content ────────────────────────────────────── */}
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '2.5rem 3rem 5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 380px',
              gap: '3.5rem',
              alignItems: 'start',
            }}
          >
            {/* Left ─── */}
            <div>
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '2rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: '0.5rem' }}>
                    {h.vibes?.slice(0, 3).map((v: string) => (
                      <span
                        key={v}
                        style={{
                          padding: '0.2rem 0.65rem',
                          borderRadius: 9999,
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          background: '#F5F5F5',
                          color: '#555',
                          fontFamily: 'Inter, sans-serif',
                          textTransform: 'capitalize',
                        }}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <h1
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.025em',
                      color: '#111',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {h.name}
                  </h1>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={14} color="#aaa" />
                      <span
                        style={{
                          fontSize: '0.875rem',
                          color: '#888',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {h.city}, {h.state}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={14} style={{ fill: '#E07B39', color: '#E07B39' }} />
                      <span
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: '#111',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {h.rating}
                      </span>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          color: '#bbb',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        ({h.reviewCount} reviews)
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={14} color="#aaa" />
                      <span
                        style={{
                          fontSize: '0.8rem',
                          color: '#888',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        Check-in {h.checkInTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: '#111',
                      lineHeight: 1,
                    }}
                  >
                    ₹{h.pricePerNight.toLocaleString('en-IN')}
                  </p>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: '#aaa',
                      fontFamily: 'Inter, sans-serif',
                      marginTop: 2,
                    }}
                  >
                    per night
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid #F0EDE8', margin: '1.5rem 0' }} />

              {/* Description */}
              <div style={{ marginBottom: '2rem' }}>
                <h2
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: '#111',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  About this property
                </h2>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#555',
                    lineHeight: 1.8,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {h.description}
                </p>
              </div>

              {/* Amenities */}
              <div style={{ marginBottom: '2rem' }}>
                <h2
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: '#111',
                    marginBottom: '1rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Amenities
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                    gap: 10,
                  }}
                >
                  {h.amenities?.map((a: string) => (
                    <div
                      key={a}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '0.6rem 0.875rem',
                        borderRadius: 10,
                        background: '#F7F6F2',
                        border: '1px solid #F0EDE8',
                      }}
                    >
                      <span style={{ color: '#E07B39' }}>
                        {amenityIcons[a] ?? (
                          <span
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: '50%',
                              background: '#E07B39',
                              display: 'inline-block',
                            }}
                          />
                        )}
                      </span>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontFamily: 'Inter, sans-serif',
                          color: '#444',
                        }}
                      >
                        {a}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby */}
              {h.nearbyAttractions?.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h2
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.0625rem',
                      fontWeight: 700,
                      color: '#111',
                      marginBottom: '1rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Nearby Attractions
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {h.nearbyAttractions.map((a: string) => (
                      <span
                        key={a}
                        style={{
                          padding: '0.35rem 0.9rem',
                          borderRadius: 9999,
                          fontSize: '0.8rem',
                          border: '1px solid #E8E6E1',
                          color: '#555',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        📍 {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Chat */}
              <div style={{ marginBottom: '2rem' }}>
                <h2
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: '#111',
                    marginBottom: '1rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Ask about this hotel
                </h2>
                <HotelChat hotelId={h.slug ?? id} hotelName={h.name} />
              </div>
            </div>

            {/* Right — Booking panel (sticky) ─── */}
            <div style={{ position: 'sticky', top: 88 }}>
              <BookingPanel hotel={h} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
