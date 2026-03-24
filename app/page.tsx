'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layouts/Navigation';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Mail,
  Minus,
  Plus,
  Share2,
  Sparkles,
  Star,
} from 'lucide-react';

const features = [
  [
    'Mood-First Matching',
    "Our AI understands that luxury isn't a price point; it's a feeling. We match you with properties that echo your emotional needs.",
  ],
  [
    'The Hidden List',
    "Access boutique properties and private villas that don't appear on mainstream platforms, exclusively for NestIQ members.",
  ],
  [
    'Real-Time Concierge',
    'From the moment you browse to the moment you check out, our AI concierge handles every detail, reservation, and surprise.',
  ],
  [
    'Transparent Value',
    'No hidden fees. Just direct-to-property rates with exclusive perks curated by our high-net-worth partner network.',
  ],
] as const;

const offers = [
  {
    title: 'The Peak Retreat',
    location: 'Zermatt, Switzerland',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGieVCjzNXK-tMRinS0MeIYaMFhbpIlx8MVhEbo4qpzSY96R-QgF6RwPGquBSGbZh1dDZ7U5UvR0aWnePL52a_E6h8ygy5ScESRT6yQcgNSzjZXpl2KraQU_Qv7geTOsN36ILrxF8m-5FPOucwbA-9yhUh1dDIMeuDH4OJ6QJjhYHlmCZOsAhHiuBzoG2EZJ3veGYHwpbDa_fuIE5wduzwpt6XUQx-qxmLxaWbh6y6sdQoKif2ZjYee-H4IQCxX4aO020hozWfNgU',
    badge: 'Member Exclusive',
    desc: 'Complimentary breakfast, ski-in/ski-out access, and private sauna sessions.',
    price: '$850',
    reviews: '4.9 (124 reviews)',
  },
  {
    title: 'Villa Luminosa',
    location: 'Amalfi Coast, Italy',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUNghY3lq6GGPv0Im6GHnyGHEzZ6_uznA0HE82yMyx3KbqS3h4UjTuoSC1_LfSWdRSE3KVUcEKWVbQJIs68H_2SLPLTDJnDJ_copTH6NeHRhLCP1nrkI1N75BbEMldmo5N_d7aZU77sfG4-_EVF_nTe-O1b7uRXbF1AHdsHzkgqJ0gD5Pd62fh7SEhtW9Kt5Yf87Kz3pQjM5IO0eWQ90fszURfNP8DvXuqG4ZpDgmB4XbakEzq-xUv4CrUkVP5TtKjZxAitD14jFA',
    badge: 'Last Minute',
    desc: 'Private boat tour included plus 20% off all spa treatments this month.',
    price: '$1,200',
    reviews: '5.0 (89 reviews)',
  },
  {
    title: 'Azure Sanctuary',
    location: 'Baa Atoll, Maldives',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZU2ThBxPAkutZLrdsEk8wRH_FKG5TabvUvcE9uAYtJPgl9wFgL9RtrL3wbm6I8jdMUQJWtoN_C-bThzY5qrYTi0FGhpreoIQMhquR46LsiqUNCDOsg7kyR5AoaEnXymWilzs03h2pcUJTPOfESBxWJ5djRGPXmnUFN7-gPes3UhB6Vn2m6KMr-aL_wyg8YjlIuEm2ZiNPodYN6EBisIrOPOf3YIAY1KMOaUkCMAYjpicBZtHkSkUHxgnEO07utlOKlHY861PiDjE',
    badge: 'Seasonal Highlight',
    desc: 'Extended stay discount: Stay 7 nights, pay for 5. Sunset cruise included.',
    price: '$2,450',
    reviews: '4.8 (210 reviews)',
  },
] as const;

const faqs = [
  ['How does the AI understand my "mood"?'],
  [
    'Can I book for corporate retreats?',
    "Absolutely. We have a dedicated 'Bespoke Corporate' tier that handles multi-guest discovery, synchronized itineraries, and exclusive meeting space access in any of our global destinations.",
  ],
  ['What are Member-Exclusive rates?'],
  ['How do I access the "Hidden List"?'],
] as const;

const footerColumns = [
  ['Platform', ['Discovery', 'Membership', 'Corporate', 'Partners']],
  ['Resources', ['Journal', 'Travel Guides', 'Help Center', 'Concierge API']],
  ['Legal', ['Privacy Policy', 'Terms of Service', 'Cookies', 'Special Offers']],
] as const;

function SectionEyebrow({
  children,
  muted = false,
}: Readonly<{ children: React.ReactNode; muted?: boolean }>) {
  return (
    <span
      className={`text-sm font-bold uppercase tracking-[0.2em] ${muted ? 'text-stone-500' : 'text-orange-700'}`}
    >
      {children}
    </span>
  );
}

function HeroCard() {
  return (
    <div className="ml-auto max-w-md space-y-6 rounded-2xl bg-white/80 p-8 shadow-[0px_20px_40px_rgba(45,52,50,0.12)] backdrop-blur-xl xl:max-w-[24rem] xl:p-7 2xl:max-w-[22rem] 2xl:space-y-5 2xl:p-6">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-700">
          AI Concierge Discovery
        </span>
        <h2
          className="text-3xl font-bold text-[#2d3432] 2xl:text-[1.75rem]"
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        >
          Plan Your Escape
        </h2>
      </div>
      <div className="space-y-4">
        <label className="flex flex-col gap-1 rounded-[1rem] bg-[#f2f4f2] p-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
            Destination
          </span>
          <input
            type="text"
            placeholder="Where do you want to feel?"
            className="border-none bg-transparent p-0 font-medium text-[#2d3432] outline-none placeholder:text-stone-400 focus:ring-0"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 rounded-[1rem] bg-[#f2f4f2] p-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
              Arrival
            </span>
            <input
              type="text"
              placeholder="Add date"
              className="border-none bg-transparent p-0 font-medium text-[#2d3432] outline-none placeholder:text-stone-400 focus:ring-0"
            />
          </label>
          <label className="flex flex-col gap-1 rounded-[1rem] bg-[#f2f4f2] p-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
              Guests
            </span>
            <input
              type="text"
              placeholder="2 Adults"
              className="border-none bg-transparent p-0 font-medium text-[#2d3432] outline-none placeholder:text-stone-400 focus:ring-0"
            />
          </label>
        </div>
        <label className="flex flex-col gap-1 rounded-[1rem] border-l-4 border-orange-700 bg-[#f2f4f2] p-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-700">
            Desired Mood
          </span>
          <div className="relative">
            <select className="w-full appearance-none border-none bg-transparent p-0 font-medium text-[#2d3432] outline-none focus:ring-0">
              <option>Quiet Contemplation</option>
              <option>Social Energy</option>
              <option>Wild Adventure</option>
              <option>Deep Rest</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          </div>
        </label>
      </div>
      <button className="w-full rounded-full bg-[linear-gradient(145deg,#5f5e5e_0%,#535252_100%)] py-4 font-bold text-[#faf7f6] shadow-lg">
        Begin Journey
      </button>
    </div>
  );
}

function Offer({ offer }: Readonly<{ offer: (typeof offers)[number] }>) {
  return (
    <article className="group cursor-pointer">
      <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-[1rem] lg:max-h-[46vh] lg:aspect-[3/4] 2xl:max-h-[42vh] 2xl:aspect-[0.78]">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-orange-700 backdrop-blur">
          {offer.badge}
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
          <div className="text-white">
            <p className="text-xs font-medium uppercase tracking-[0.22em] opacity-80">
              {offer.location}
            </p>
            <h3
              className="text-2xl font-bold"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              {offer.title}
            </h3>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-700 text-white">
            <ChevronRight className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="mb-2 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-orange-700 text-orange-700" />
        ))}
        <span className="ml-2 text-xs font-bold text-stone-500">{offer.reviews}</span>
      </div>
      <p className="mb-4 text-sm text-stone-600">{offer.desc}</p>
      <p
        className="text-xl font-bold text-[#2d3432]"
        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
      >
        From {offer.price}
        <span className="text-sm font-normal text-stone-500"> / night</span>
      </p>
    </article>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-stone-900 pb-10 pt-20">
      <div className="mx-auto mb-16 flex max-w-[1920px] flex-col items-start justify-between gap-10 px-5 sm:px-8 md:flex-row lg:px-12">
        <div className="max-w-sm space-y-8">
          <span className="text-xl font-bold text-stone-50">NestIQ</span>
          <p
            className="text-sm leading-relaxed tracking-wide text-stone-400"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            The world&apos;s leading AI platform for editorial luxury hospitality discovery. We find
            the places that feel like home, but better.
          </p>
          <div className="flex gap-4">
            {[Globe, Share2, Mail].map((Icon, i) => (
              <button
                key={i}
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-white transition-colors hover:text-orange-400"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-16">
          {footerColumns.map(([title, links]) => (
            <div key={title} className="space-y-6">
              <p className="font-medium text-white">{title}</p>
              <div
                className="flex flex-col gap-4 text-sm tracking-wide text-stone-400"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                {links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="text-stone-500 transition-colors hover:text-stone-200"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1920px] flex-col items-center justify-between gap-6 border-t border-stone-800 px-5 pt-10 sm:px-8 md:flex-row lg:px-12">
        <p
          className="text-sm tracking-wide text-stone-400"
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        >
          © 2024 NestIQ. All rights reserved.
        </p>
        <div className="flex gap-8 text-sm font-medium text-stone-400">
          <span className="flex items-center gap-2">
            English <ChevronDown className="h-4 w-4" />
          </span>
          <span className="flex items-center gap-2">
            USD <ChevronDown className="h-4 w-4" />
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="bg-[#f9f9f7] font-[Inter] text-[#2d3432]">
      <Navbar />

      <section className="relative flex min-h-[calc(100vh-5rem)] w-full items-center pt-20 xl:h-[calc(100vh-5rem)] xl:min-h-[calc(100vh-5rem)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1743592323402-2a8392831f44?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxury resort"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0)_40%,rgba(0,0,0,0)_70%,rgba(249,249,247,1)_100%)]" />
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-[1680px] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-12 xl:gap-16 2xl:max-w-[1560px]">
          <div className="space-y-8">
            <h1
              className="text-5xl font-extrabold leading-[1.03] tracking-tighter text-white sm:text-6xl xl:text-[4.5rem] 2xl:text-[4rem]"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Find a stay that <br />
              matches your mood
            </h1>
            <p className="max-w-lg text-lg font-light leading-relaxed text-white/90 xl:max-w-[32rem] xl:text-[1.05rem] 2xl:text-base">
              Beyond luxury, we curate emotional resonance. Experience the world&apos;s most
              intimate retreats through our AI-guided discovery platform.
            </p>
            <div className="flex gap-4">
              <Link
                href="/search"
                className="rounded-full bg-[linear-gradient(145deg,#5f5e5e_0%,#535252_100%)] px-7 py-3.5 text-base font-semibold text-[#faf7f6] transition-transform hover:scale-105 xl:px-8 xl:py-4"
              >
                Explore stays
              </Link>
              <Link
                href="/search?tab=deals"
                className="rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 xl:px-8 xl:py-4"
              >
                View offers
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroCard />
          </div>
        </div>
        <div className="absolute bottom-10 left-0 z-10 w-full px-5 sm:px-8 lg:px-12 2xl:bottom-8">
          <div className="mx-auto flex max-w-[1680px] flex-col justify-between gap-6 border-t border-white/20 pt-6 lg:flex-row lg:items-end 2xl:max-w-390">
            <div className="flex flex-wrap gap-10 lg:gap-16">
              {[
                ['Destinations', '450+'],
                ['Curated Stays', '12,000'],
                ['AI Matches', '98.4%'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.28em] text-white/60">
                    {label}
                  </p>
                  <p
                    className="text-xl font-bold text-white xl:text-2xl"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              {[ChevronLeft, ChevronRight].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-white hover:text-[#2d3432]"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-420 items-center bg-[#f9f9f7] px-5 py-16 sm:px-8 lg:min-h-[calc(100vh-76px)] lg:px-12 xl:py-20 2xl:max-w-390">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="space-y-12">
            <div className="space-y-4">
              <SectionEyebrow>The NestIQ Difference</SectionEyebrow>
              <h2
                className="text-4xl font-extrabold leading-tight tracking-tighter text-[#2d3432] sm:text-5xl 2xl:text-[2.8rem]"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Beyond the standard <br />
                booking experience.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {features.map(([title, copy]) => (
                <div key={title} className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffdbc9] text-orange-700">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4
                    className="text-xl font-bold text-[#2d3432]"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    {title}
                  </h4>
                  <p className="text-sm leading-relaxed text-stone-600">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden flex justify-center items-center w-[80%]  ">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCWAfslXfkrKIm_qpqZrzsi5Fzi0FWBDfxnRNv6klEoyU4YFsVM6KHwxDedGnDX9eygADVAU-YdVjsh6CuzDUdjhWQNKlc0xYu3DXa6ngwsfGc_Cms8aoExddwf5vsvLicviwmMBhsPR13q4lyntNA-dzimJ5x1HS_f5WMQOBIJ319Bc0c_Vlnpp05bG7aykQpeQWYpyovXs_3Y7jzydEDc9G6a8kG2TDTOzuJaHZJmdocGLy4yP7zGoMw13A_N9LasTGMVa79cAE"
                alt="Luxury Interior"
                width={544}
                height={680}
                className="aspect-4/5 w-[90%] h-auto object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-8 -left-2 max-w-xs rounded-2xl bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:-left-8">
              <p className="mb-2 text-lg font-bold italic text-orange-700">
                &quot;Finally, a platform that understands why I travel, not just where I&apos;m
                going.&quot;
              </p>
              <p className="text-sm font-bold text-[#2d3432]">Julianne V., Design Director</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-center bg-[#f2f4f2] py-16 lg:min-h-[calc(100vh-76px)] xl:py-20">
        <div className="mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-12 2xl:max-w-[1560px]">
          <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-6">
              <SectionEyebrow muted>Our Story</SectionEyebrow>
              <h2
                className="text-4xl font-extrabold leading-tight tracking-tighter text-[#2d3432] sm:text-5xl"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Crafted for better stays, <br />
                imagined for discovery.
              </h2>
            </div>
            <p className="max-w-sm text-base text-stone-600">
              We started with a simple belief: the journey shouldn&apos;t be stressful. NestIQ
              combines human taste with artificial intelligence to find the space where you belong.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:h-[58vh] md:min-h-[540px] md:grid-cols-4 md:grid-rows-2 2xl:h-[54vh] 2xl:min-h-[500px]">
            <div className="group relative overflow-hidden rounded-[1rem] md:col-span-2 md:row-span-2">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF63o-1w9l1a29tvwF66CTQvXwYafBTwbdsOe3wtAdG6QjWS1fNKCqC1PrnIwgQ_hkujACZRClaacVkx0dGowaQmWD3Nghm9oCA0H4GdDPkidvf5x-asaFyFfRYXSWIpqEnnwkEghT2THKCdpWuvsts_2_uZ41Wa9jd7DBiQfjrTWj9cjfpUsbqMSgUaiXVdCOCsC_L65a5FRkkXsSf2PJEpzSYYhU3hO1d6vsYFfZXm1wlmeomfIoiTF6HhkZWgbgUwiQM6qHC2E"
                alt="Hotel Architecture"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-10">
                <h3
                  className="mb-2 text-3xl font-bold text-white"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  The Philosophy
                </h3>
                <p className="max-w-md text-white/80">
                  How we redefine hospitality for the modern era.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[1rem]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFLswt-Nes1HsKFaybAR63CDHsbP56PQaFtahS9gRoAnc8t-mpSZURGwMXghf6q9KW__DZTxhvoekAb8l_MZML13QHYvZWKs4ye3g_qXJniyFPUijVke-UqiC7CpXdBAJO28j0A5lz5ICCxUmXJt3GyCdv6_tdf67NKAo6oOUt0WE51PSEf1nLXcXh1SoM63YxNEP33fjDA-flCCLarmEelkYXCSB9H1dkGpQ_zRbfeuVB-xNrX4AuQe7AvI9vuFwEO-0gd4ms6Qc"
                alt="Luxury spa"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-between rounded-[1rem] bg-orange-700 p-10 text-white">
              <Globe className="h-10 w-10" />
              <div>
                <h4
                  className="mb-2 text-2xl font-bold"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  Global Network
                </h4>
                <p className="text-sm text-white/80">Spanning 5 continents and 120 cities.</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[1rem] md:col-span-2">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA15Y9kE8ICZzgi79N15O4VIjaPNPUa02VLV9_w95Si_rUkXgknmBTPUTU-d3sr3eZlQ2eODrkp6h1jvfY9s0UndY_QhfvXKbSGBZDPl-ssaAZLB5ET727jhxHwImyXEWbrM0dKlZW8ZAN_5siXSHBU0QcZQsqS1d00XkK1GlRWYD0eZo_mwhriKRdjftrJhBCb4fi2VbLz5lqKYC245Ye02jwtgSx9F7jowoeoWOTNhWPZLYA8RqKngS2h4-FdfQst1RtKYqWewtM"
                alt="Resort pool"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all group-hover:bg-black/40">
                <button className="rounded-full bg-white px-8 py-3 font-bold text-[#2d3432]">
                  Watch Film
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1680px] items-center px-5 py-16 sm:px-8 lg:min-h-[calc(100vh-76px)] lg:px-12 xl:py-20 2xl:max-w-[1560px]">
        <div className="w-full">
          <div className="mb-10 flex items-center justify-between">
            <div className="space-y-4">
              <SectionEyebrow>Curated Collections</SectionEyebrow>
              <h2
                className="text-4xl font-extrabold tracking-tighter text-[#2d3432]"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Current Special Offers
              </h2>
            </div>
            <Link
              href="/search?tab=deals"
              className="border-b border-[#2d3432] pb-1 font-bold text-[#2d3432] transition-colors hover:border-orange-700 hover:text-orange-700"
            >
              See all offers
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {offers.map((offer) => (
              <Offer key={offer.title} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      <section className="flex items-center bg-[#2d3432] px-5 py-16 text-[#f9f9f7] sm:px-8 lg:min-h-[calc(100vh-76px)] lg:px-12 xl:py-20">
        <div className="mx-auto grid w-full max-w-[1680px] grid-cols-1 items-center gap-12 lg:grid-cols-2 xl:gap-16 2xl:max-w-[1560px]">
          <div className="space-y-10">
            <div className="flex gap-3">
              <span className="rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] backdrop-blur">
                Editor&apos;s Choice
              </span>
              <span className="rounded-full border border-orange-700/30 bg-orange-700/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-orange-300">
                AI Top Pick
              </span>
            </div>
            <h2
              className="text-5xl font-extrabold leading-tight tracking-tighter sm:text-6xl 2xl:text-[3.6rem]"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              The Kyoto <br />
              Silent Monolith
            </h2>
            <p className="text-xl font-light leading-relaxed text-[#f9f9f7]/70">
              A marvel of minimalist architecture nested in the heart of Kyoto&apos;s bamboo
              forests. This stay is selected for those seeking deep contemplative silence and
              architectural purity.
            </p>
            <ul className="space-y-4">
              {[
                'Private Zen garden and meditation pavillion',
                'Michelin-starred Kaiseki dining in-room',
                'Traditional forest onsen experience',
              ].map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <Plus className="h-5 w-5 text-orange-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/search"
              className="inline-flex rounded-full bg-[#f9f9f7] px-12 py-5 text-lg font-bold text-[#2d3432] transition-all hover:bg-orange-700 hover:text-white"
            >
              Book the Experience
            </Link>
          </div>
          <div className="group relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrglo7bRFMCyeb8G-4DMFA3BAyx75jpGxdQw8lMDfDZiY_7xN53FC5DSuhbNam6ABQ0sOhAU9-7ESRQ29Zv4gHIc-u0HTW0O4WdU2Hv0lrDNgMkwN_qp4ZZfpc1R7kBNy-tiJDvL9Fly7JibsMhm9lakXvgxl3PMI9jrUjDsmzxk4fc7PdkMX8QXve7LYkmu217hiRtfX4SYi8QjD5sU7A0duapyPvS87SPaO1sWfi1rlVlTaiMnBz1ft5x0GkUo0p66uDagaevEc"
              alt="Kyoto Hotel"
              width={900}
              height={900}
              className="aspect-square w-full rounded-[1rem] object-cover shadow-2xl"
            />
            <div className="absolute -right-4 -top-4 flex h-40 w-40 flex-col items-center justify-center rounded-full border-8 border-[#2d3432] bg-orange-700 p-6 text-center transition-transform group-hover:scale-110 sm:-right-10 sm:-top-10 sm:h-48 sm:w-48">
              <span
                className="text-3xl font-extrabold text-white"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                99%
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white">
                AI Mood Match
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1680px] items-center bg-[#f9f9f7] px-5 py-16 sm:px-8 lg:min-h-[calc(100vh-76px)] lg:px-12 xl:py-20 2xl:max-w-[1560px]">
        <div className="w-full">
          <div className="mb-10 space-y-4 text-center">
            <SectionEyebrow>Curated Support</SectionEyebrow>
            <h2
              className="text-4xl font-extrabold tracking-tighter text-[#2d3432] sm:text-5xl"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Frequently Asked
            </h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map(([question, answer], index) => (
              <details
                key={question}
                open={index === 1}
                className={`rounded-[1rem] p-8 ${index === 1 ? 'border-l-4 border-orange-700 bg-[#e5e9e6]' : 'bg-[#ecefec] transition-all hover:bg-[#e5e9e6]'}`}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <h4
                    className="text-lg font-bold"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    {question}
                  </h4>
                  {index === 1 ? (
                    <Minus className="h-5 w-5 text-orange-700" />
                  ) : (
                    <Plus className="h-5 w-5 text-stone-700" />
                  )}
                </summary>
                {answer ? (
                  <p className="mt-4 text-sm leading-relaxed text-stone-600">{answer}</p>
                ) : null}
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[72vh] items-center overflow-hidden py-16 xl:min-h-[68vh] xl:py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjpGEDVYBWwAyGbW9OIrcHkcZl_a2a23vXElxNEfnSmR9XJArU4GSTQqQyyYHARncyaRP7SdgPF2MNWU2otYhcIMhrbuzae1kSCoFcLlg9UCiE0VOC_ifFCy7fPFz0KJYdEwY825SgL59WYNqP4HdIEaZTsyhPi3TeMiYUB7pkwSeTXqQTVfxjdiAieyko6WBJvrbklEzF16w9AkWQpei9kr2grGQkfmflnB__qYplDEniZ2H2xArPwcZMmbwTlCBK3xRcWvsjm8w"
            alt="Luxury boat on lake"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1680px] space-y-8 px-5 text-center text-white sm:px-8 lg:px-12 2xl:max-w-[1560px]">
          <div className="space-y-4">
            <h2
              className="text-5xl font-extrabold leading-tight tracking-tighter sm:text-6xl"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Join the Insiders Club
            </h2>
            <p className="mx-auto max-w-xl text-xl font-light text-white/80">
              Be the first to hear about private property launches, seasonal escapes, and AI-curated
              travel insights.
            </p>
          </div>
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Your primary email"
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-white outline-none transition-all placeholder:text-white/60 focus:bg-white/20 focus:ring-2 focus:ring-orange-700"
            />
            <button className="rounded-full bg-white px-10 py-4 font-bold text-[#2d3432] transition-all hover:bg-orange-700 hover:text-white">
              Subscribe
            </button>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            Privacy first. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
