import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Shield, Sparkles, Zap } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const team = [
  {
    name: 'Arjun Sharma',
    role: 'Founder & CEO',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Product',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
  },
  {
    name: 'Rohan Mehta',
    role: 'Lead AI Engineer',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
  },
  {
    name: 'Sneha Krishnan',
    role: 'Head of Curation',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80',
  },
];

const values = [
  {
    icon: Sparkles,
    title: 'AI-First',
    desc: 'We believe the future of travel discovery is conversational. Not filters — just tell us what you want.',
  },
  {
    icon: Shield,
    title: 'Trust & Transparency',
    desc: 'Every property is verified. Every review is genuine. No paid placements, ever.',
  },
  {
    icon: Heart,
    title: 'India-Focused',
    desc: 'Built specifically for the Indian traveler, with deep knowledge of local destinations, seasons, and culture.',
  },
  {
    icon: Zap,
    title: 'Effortless',
    desc: 'From search to booking in under two minutes. We remove every unnecessary step from your journey.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />

      {/* Hero */}
      <section style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
        <Image
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=85"
          alt="About NestIQ"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.52)' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 2rem',
          }}
        >
          <p
            className="eyebrow"
            style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.75rem' }}
          >
            About Us
          </p>
          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: '#fff',
              lineHeight: 1.1,
              maxWidth: 640,
            }}
          >
            We&apos;re reimagining how India discovers its perfect stay
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: '#fff', padding: '6rem 3rem' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          <div>
            <p className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
              Our Mission
            </p>
            <h2
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: '#111',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              Hotel search that actually understands you
            </h2>
            <p
              style={{
                fontSize: '0.9375rem',
                color: '#555',
                lineHeight: 1.8,
                fontFamily: 'Inter, sans-serif',
                marginBottom: '1rem',
              }}
            >
              Hotel booking in India hasn&apos;t changed in 20 years. You type a city, scroll
              through hundreds of generic results ranked by who paid the most, and settle for
              something that&apos;s merely available.
            </p>
            <p
              style={{
                fontSize: '0.9375rem',
                color: '#555',
                lineHeight: 1.8,
                fontFamily: 'Inter, sans-serif',
                marginBottom: '2rem',
              }}
            >
              NestIQ is different. We use AI to understand what you actually want — the vibe, the
              experience, the feeling — and match you with hotels that genuinely deliver it.
            </p>
            <Link
              href="/search"
              className="btn-dark"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              Start Exploring <ArrowRight size={15} />
            </Link>
          </div>
          <div
            style={{
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              aspectRatio: '4/3',
            }}
            className="img-zoom"
          >
            <Image
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=85"
              alt="NestIQ mission"
              fill
              style={{ objectFit: 'cover' }}
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#F7F6F2', padding: '6rem 3rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto 3.5rem' }}>
            <p className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
              What We Stand For
            </p>
            <h2
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: '#111',
              }}
            >
              Our values
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  background: '#fff',
                  borderRadius: 18,
                  padding: '1.75rem',
                  border: '1px solid #E8E6E1',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(224,123,57,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <v.icon size={20} color="#E07B39" />
                </div>
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#111',
                    marginBottom: '0.6rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#666',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.7,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#0f0f0f', padding: '5rem 3rem' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {[
            { val: '25+', label: 'Curated Properties' },
            { val: '10K+', label: 'Happy Travelers' },
            { val: '4.8★', label: 'Average Rating' },
            { val: '15+', label: 'Destinations' },
          ].map((s) => (
            <div key={s.label}>
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {s.val}
              </p>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'Inter, sans-serif',
                  marginTop: 8,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ background: '#fff', padding: '6rem 3rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto 3.5rem' }}>
            <p className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
              The Team
            </p>
            <h2
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: '#111',
              }}
            >
              Built by travelers, for travelers
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {team.map((t) => (
              <div key={t.name} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    position: 'relative',
                    width: 96,
                    height: 96,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 1rem',
                  }}
                  className="img-zoom"
                >
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="96px"
                  />
                </div>
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    color: '#111',
                    marginBottom: 4,
                  }}
                >
                  {t.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#888', fontFamily: 'Inter, sans-serif' }}>
                  {t.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#F7F6F2', padding: '5rem 3rem' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: '#111',
              marginBottom: '1rem',
            }}
          >
            Ready to find your perfect stay?
          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              color: '#777',
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            Join thousands of travelers who&apos;ve discovered extraordinary stays across India with
            NestIQ.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/search"
              className="btn-dark"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              Explore Hotels <ArrowRight size={15} />
            </Link>
            <Link
              href="/concierge"
              className="btn-outline-dark"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <Sparkles size={14} /> AI Concierge
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
