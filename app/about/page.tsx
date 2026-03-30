import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import Navbar from '@/components/layouts/Navigation';
import Footer from '@/components/layouts/Footer';

import { SectionHeader } from '@/components/sectionHeader';

const STATS = [
  { value: '150+', label: 'Hand-Picked Havens' },
  { value: '24/7', label: 'AI-Concierge Access' },
  { value: '12', label: 'Indian States Explored' },
  { value: '98.4%', label: 'Guest Satisfaction' },
];

const TEAM = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & Chief Curator',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    name: 'Priya Nair',
    role: 'Head of AI & Discovery',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    name: 'James Wren',
    role: 'Editorial Director',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
];

const VALUES = [
  {
    title: 'Curation over Volume',
    desc: 'We list fewer properties intentionally. Every stay in our portfolio has been personally vetted by our editorial team.',
  },
  {
    title: 'AI with a Human Soul',
    desc: 'Our technology is a tool for empathy, not replacement. AI handles the data; humans handle the heart.',
  },
  {
    title: 'Radical Transparency',
    desc: 'No hidden fees, no inflated rates. Honest pricing is a non-negotiable pillar of our identity.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
      <Navbar />
      <div className="pt-20">
        <section className="relative h-[70vh] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(156,54,181,0.14)_0%,rgba(0,0,0,0.24)_32%,rgba(0,0,0,0.78)_100%)]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'var(--secondary)' }}
            >
              The New Era of Hospitality
            </p>
            <h1
              className="font-poppins font-black text-6xl md:text-7xl text-white"
              style={{ letterSpacing: '-0.04em', lineHeight: 1.05 }}
            >
              NestIQ is a curated
              <br />
              intelligence platform.
            </h1>
          </div>
        </section>

        <section className="py-28" style={{ background: 'var(--surface)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeader
                  label="Our Mission"
                  title="Curation Beyond the Algorithm."
                  subtitle="While the world moves toward mass-aggregation, we lean into intentionality. Our mission bridges AI-driven precision and human-led storytelling — every destination is more than a room, it's a narrative."
                  className="mb-8"
                />
                <Link href="/search" className="btn-amber gap-2 inline-flex">
                  Explore the Portfolio <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="card-editorial p-7 text-center">
                    <p
                      className="font-poppins font-black text-4xl text-on-surface mb-2"
                      style={{ letterSpacing: '-0.03em' }}
                    >
                      {s.value}
                    </p>
                    <p className="text-xs text-primary font-medium leading-relaxed">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24" style={{ background: 'var(--surface-container-low)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <SectionHeader
                label="Our Story"
                title="Born from a single miserable hotel stay."
                className="mb-6"
              />
              <div className="space-y-4 text-primary leading-relaxed text-sm">
                <p>
                  In 2019, our founder booked what was marketed as a "luxury boutique hotel" in
                  Rajasthan. What arrived was a poorly-managed property with no soul, no service,
                  and no story to tell. That experience planted a seed.
                </p>
                <p>
                  The question wasn't "how do we find better hotels?" — it was "how do we understand
                  what makes a stay extraordinary, and can we teach a machine to feel it?" Two years
                  of research, 400+ property visits, and a team of passionate curators later, NestIQ
                  was born.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-28" style={{ background: 'var(--surface)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              label="Our Values"
              title="The principles we refuse to compromise."
              className="mb-12"
            />
            <div className="grid md:grid-cols-3 gap-6">
              {VALUES.map((v, i) => (
                <div
                  key={v.title}
                  className={`card-editorial p-8 ${i === 1 ? 'border-l-4 border-secondary' : ''}`}
                >
                  <span
                    className="font-poppins font-black text-5xl mb-4 block"
                    style={{ color: 'var(--surface-container)' }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="font-poppins font-bold text-lg text-on-surface mb-3">{v.title}</h3>
                  <p className="text-sm text-primary leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24" style={{ background: 'var(--surface-container-low)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              label="The Curators"
              title="Humans behind the intelligence."
              className="mb-12"
            />
            <div className="grid md:grid-cols-3 gap-8">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="card-editorial p-6 flex flex-col items-center text-center"
                >
                  <div className="relative mb-4">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="absolute inset-0 rounded-full ring-2 ring-[var(--secondary-container)]" />
                  </div>
                  <h4 className="font-poppins font-bold text-on-surface">{member.name}</h4>
                  <p className="text-xs text-primary mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28" style={{ background: '#0f0f0f' }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--secondary)' }}
              >
                Global Presence
              </p>
              <h2
                className="font-poppins font-black text-4xl text-white mb-4"
                style={{ letterSpacing: '-0.03em' }}
              >
                Curating the world,
                <br />
                one sanctuary at a time.
              </h2>
              <div className="flex flex-wrap gap-4 mt-6">
                {['London · Mayfair', 'Kyoto · Gion', 'Mumbai · Bandra', 'New York · SoHo'].map(
                  (loc) => (
                    <div key={loc} className="flex items-center gap-2 text-sm text-white/60">
                      <MapPin size={13} style={{ color: 'var(--secondary)' }} /> {loc}
                    </div>
                  )
                )}
              </div>
            </div>
            <Link href="/contact" className="btn-amber flex-shrink-0">
              Connect with Us <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
