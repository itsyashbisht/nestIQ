import Link from 'next/link';
import { Heart, MapPin, Sparkles, Star } from 'lucide-react';
// @ts-ignore
import { Hotel } from '@/types';
import { cn, formatCurrency } from '@/src/lib/utils';

interface HotelCardProps {
  hotel: Hotel;
  variant?: 'default' | 'horizontal' | 'featured';
  className?: string;
}

export default function HotelCard({ hotel, variant = 'default', className }: HotelCardProps) {
  if (variant === 'horizontal') {
    return (
      <Link
        href={`/hotels/${hotel.id}`}
        className={cn(
          'card-editorial flex gap-0 overflow-hidden group hover:-translate-y-1 transition-transform duration-300',
          className
        )}
      >
        <div className="w-48 shrink-0 overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5 flex flex-col justify-between flex-1">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {hotel.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'var(--secondary-container)', color: 'var(--secondary)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-poppins font-semibold text-base text-on-surface mb-1">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-primary">
              <MapPin size={11} />
              <span>{hotel.location}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star size={13} fill="#9b4701" className="text-secondary" />
              <span className="text-sm font-semibold text-secondary">{hotel.rating}</span>
              <span className="text-xs text-primary">({hotel.reviews.toLocaleString()})</span>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-on-surface">
                {formatCurrency(hotel.price)}
              </span>
              <span className="text-xs text-primary">/nt</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/hotels/${hotel.id}`}
        className={cn('relative group rounded-4xl overflow-hidden h-105 block', className)}
      >
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {hotel.aiMatch && (
          <div className="absolute top-4 left-4 glass-dark text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Sparkles size={11} className="text-amber-400" />
            {hotel.aiMatch}% Match
          </div>
        )}
        <button className="absolute top-4 right-4 w-9 h-9 glass-card rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart size={15} className="text-on-surface" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {hotel.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-poppins font-bold text-xl text-white mb-1">{hotel.name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-white/70" />
              <span className="text-sm text-white/80">{hotel.location}</span>
            </div>
            <span className="text-white font-bold">
              {formatCurrency(hotel.price)}
              <span className="text-white/60 text-xs font-normal">/nt</span>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/hotels/${hotel.id}`}
      className={cn(
        'card-editorial group hover:-translate-y-1 transition-transform duration-300 block',
        className
      )}
    >
      <div className="relative overflow-hidden h-52 rounded-t-[1.5rem]">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {hotel.aiMatch && (
          <div className="absolute top-3 left-3 glass-dark text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles size={9} className="text-amber-400" />
            {hotel.aiMatch}%
          </div>
        )}
        <button className="absolute top-3 right-3 w-8 h-8 glass-card rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart size={13} className="text-on-surface" />
        </button>
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {hotel.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-poppins font-semibold text-base text-on-surface mb-1">{hotel.name}</h3>
        <div className="flex items-center gap-1 text-xs text-primary mb-3">
          <MapPin size={11} />
          <span>{hotel.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={13} fill="#9b4701" className="text-secondary" />
            <span className="text-sm font-semibold text-secondary">{hotel.rating}</span>
            <span className="text-xs text-primary">({hotel.reviews.toLocaleString()})</span>
          </div>
          <div>
            <span className="text-base font-bold text-on-surface">
              {formatCurrency(hotel.price)}
            </span>
            <span className="text-xs text-primary">/nt</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
