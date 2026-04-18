'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface IHotel {
  _id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  category: 'budget' | 'comfort' | 'luxury' | 'boutique';
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  vibes: string[];
  images: { url: string; public_id: string }[];
}

interface HotelCardProps {
  hotel: IHotel;
  variant?: 'default' | 'horizontal' | 'featured';
  className?: string;
}

const CATEGORY_STYLES: Record<IHotel['category'], string> = {
  luxury: 'border border-amber-300/50 bg-amber-50/80 text-amber-900',
  boutique: 'border border-stone-300/70 bg-white/75 text-stone-700',
  comfort: 'border border-sky-200/70 bg-sky-50/70 text-sky-900',
  budget: 'border border-emerald-200/70 bg-emerald-50/70 text-emerald-900',
};

function getRatingLabel(rating: number) {
  if (rating >= 4.7) return 'Exceptional';
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4.2) return 'Very Good';
  if (rating >= 4.0) return 'Good';
  return 'Rated';
}

function ImageSkeleton() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-stone-100">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-stone-100 via-stone-50 to-stone-100" />
    </div>
  );
}

function ImageDots({
  count,
  activeIndex,
  onSelect,
  light = false,
}: {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  light?: boolean;
}) {
  if (count <= 1) return null;

  return (
    <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`View image ${index + 1}`}
          aria-pressed={activeIndex === index}
          className={cn(
            'h-1.5 rounded-full transition-all duration-300',
            activeIndex === index ? 'w-5' : 'w-1.5',
            light
              ? activeIndex === index
                ? 'bg-white'
                : 'bg-white/45'
              : activeIndex === index
                ? 'bg-stone-900'
                : 'bg-stone-400/60'
          )}
          onClick={(e) => {
            e.preventDefault();
            onSelect(index);
          }}
        />
      ))}
    </div>
  );
}

export default function HotelCard({ hotel, variant = 'default', className }: HotelCardProps) {
  const images = hotel.images?.length ? hotel.images : [{ url: '/placeholder-hotel.jpg', public_id: 'placeholder' }];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const image = images[Math.min(activeImageIndex, images.length - 1)]?.url ?? '/placeholder-hotel.jpg';
  const location = `${hotel.city}, ${hotel.state}`;
  const href = `/hotels/${hotel._id}`;
  const ratingLabel = getRatingLabel(hotel.rating);

  const handleImageSelect = (index: number) => {
    setImageLoaded(false);
    setActiveImageIndex(index);
  };

  if (variant === 'horizontal') {
    return (
      <Link
        href={href}
        className={cn(
          'card-editorial group flex overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
          className
        )}
      >
        <div className="relative w-48 shrink-0 overflow-hidden bg-stone-100">
          {!imageLoaded && <ImageSkeleton />}
          <Image
            src={image}
            alt={hotel.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="192px"
            onLoad={() => setImageLoaded(true)}
          />
          <ImageDots
            count={images.length}
            activeIndex={activeImageIndex}
            onSelect={handleImageSelect}
            light
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between p-5">
          <div>
            <span
              className={cn(
                'mb-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em]',
                CATEGORY_STYLES[hotel.category]
              )}
            >
              {hotel.category}
            </span>

            <h3 className="mb-1 truncate font-sans text-base font-semibold text-on-surface">
              {hotel.name}
            </h3>

            <div className="flex items-center gap-1 text-xs text-primary">
              <MapPin size={11} />
              <span>{location}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <Star size={13} fill="#0f172a" className="text-slate-900" />
              <span className="text-sm font-semibold text-slate-900">{hotel.rating.toFixed(1)}</span>
              <span className="text-xs text-primary">{ratingLabel}</span>
              <span className="text-xs text-primary">({hotel.reviewCount.toLocaleString()})</span>
            </div>
            <div className="text-right">
              <span className="font-sans text-base font-semibold tracking-[-0.02em] text-on-surface">
                <span className="mr-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-primary/80">
                  From
                </span>
                ₹{hotel.pricePerNight.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        href={href}
        className={cn(
          'group relative block h-105 overflow-hidden rounded-4xl transition-shadow duration-300 hover:shadow-xl',
          className
        )}
      >
        {!imageLoaded && <ImageSkeleton />}
        <Image
          src={image}
          alt={hotel.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(15,15,15,0.08)_38%,rgba(15,15,15,0.72)_100%)]" />

        <div className="absolute left-4 top-4">
          <span
            className={cn(
              'inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm',
              hotel.category === 'luxury'
                ? 'border border-amber-200/40 bg-amber-50/20 text-amber-50'
                : 'border border-white/20 bg-white/10 text-white/90'
            )}
          >
            {hotel.category}
          </span>
        </div>

        <button
          className="glass-card absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={15} className="text-on-surface" />
        </button>

        <ImageDots
          count={images.length}
          activeIndex={activeImageIndex}
          onSelect={handleImageSelect}
          light
        />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          {hotel.vibes.length > 0 && (
            <div className="mb-2 flex gap-1.5">
              {hotel.vibes.slice(0, 2).map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-medium capitalize text-white/92 backdrop-blur-sm"
                >
                  {v}
                </span>
              ))}
            </div>
          )}

          <h3 className="mb-1 truncate font-sans text-xl font-semibold text-white">{hotel.name}</h3>

          <div className="flex items-center justify-between gap-4 pt-1">
            <div>
              <div className="flex items-center gap-1 text-sm text-white/80">
                <MapPin size={12} className="text-white/70" />
                <span>{location}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-white/80">
                <Star size={12} fill="white" className="text-white" />
                <span className="font-semibold text-white">{hotel.rating.toFixed(1)}</span>
                <span>{ratingLabel}</span>
                <span>({hotel.reviewCount.toLocaleString()})</span>
              </div>
            </div>

            <div className="text-right text-white">
              <span className="font-sans text-lg font-semibold tracking-[-0.02em]">
                <span className="mr-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/65">
                  From
                </span>
                ₹{hotel.pricePerNight.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        'card-editorial group block transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        className
      )}
    >
      <div className="relative h-52 overflow-hidden rounded-t-3xl bg-stone-100">
        {!imageLoaded && <ImageSkeleton />}
        <Image
          src={image}
          alt={hotel.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(15,15,15,0.02)_45%,rgba(15,15,15,0.30)_100%)]" />

        <button
          className="glass-card absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={13} className="text-on-surface" />
        </button>

        {hotel.vibes.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {hotel.vibes.slice(0, 2).map((v) => (
              <span
                key={v}
                className="rounded-full border border-white/35 bg-white/12 px-2 py-0.5 text-[10px] font-medium capitalize text-white backdrop-blur-sm"
              >
                {v}
              </span>
            ))}
          </div>
        )}

        <ImageDots
          count={images.length}
          activeIndex={activeImageIndex}
          onSelect={handleImageSelect}
          light
        />
      </div>

      <div className="px-5 pb-5 pt-4">
        <span
          className={cn(
            'mb-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em]',
            CATEGORY_STYLES[hotel.category]
          )}
        >
          {hotel.category}
        </span>

        <h3 className="mb-1 truncate font-sans text-base font-semibold text-on-surface">{hotel.name}</h3>

        <div className="mb-4 flex items-center gap-1 text-xs text-primary">
          <MapPin size={11} />
          <span>{location}</span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <Star size={13} fill="#0f172a" className="text-slate-900" />
            <span className="text-sm font-semibold text-slate-900">{hotel.rating.toFixed(1)}</span>
            <span className="text-xs text-primary">{ratingLabel}</span>
            <span className="text-xs text-primary">({hotel.reviewCount.toLocaleString()})</span>
          </div>
          <div className="text-right">
            <span className="font-sans text-base font-semibold tracking-[-0.02em] text-on-surface">
              <span className="mr-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-primary/80">
                From
              </span>
              ₹{hotel.pricePerNight?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
