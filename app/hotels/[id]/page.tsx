'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Heart, Loader2, MapPin, Share2, SlidersHorizontal, Star } from 'lucide-react';
import { toast } from 'react-toastify';

import Navbar from '@/components/layouts/Navigation';
import Footer from '@/components/layouts/Footer';
import { Badge } from '@/components/badge';
import { RoomCard, type RoomCardRoom } from '@/components/RoomCard';
import { useAppDispatch } from '@/src/hooks/useAppDispatch';
import { useAppSelector } from '@/src/hooks/useAppSelector';
import { roomServices } from '@/src/apiServices/room.services';
import { getHotelById } from '@/src/thunks/hotel.thunk';
import { calculateNights, formatCurrency, getRatingLabel } from '@/src/lib/utils';

type SortBy = 'price_asc' | 'price_desc' | 'capacity' | 'availability';

export default function HotelDetailPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const hotelId = params.id;
  const { hotel, error, status } = useAppSelector((state) => state.hotel);

  const [saved, setSaved] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const [roomsLoading, setRoomsLoading] = useState(false);
  const [rooms, setRooms] = useState<RoomCardRoom[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>('price_asc');

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (!hotelId) return;
    dispatch(getHotelById(hotelId));
  }, [dispatch, hotelId]);

  useEffect(() => {
    setActiveImage(0);
  }, [hotelId]);

  useEffect(() => {
    let cancelled = false;

    async function loadRooms() {
      if (!hotelId) return;
      setRoomsLoading(true);
      try {
        const res = await roomServices.getRoomByHotel(hotelId);
        const data = res.data as any;
        const list: unknown = Array.isArray(data)
          ? data
          : Array.isArray(data?.rooms)
            ? data.rooms
            : data?.data;
        const next = (Array.isArray(list) ? list : []).filter(Boolean) as RoomCardRoom[];
        if (cancelled) return;

        setRooms(next);
        setSelectedRoomId((prev) => {
          if (prev && next.some((r) => r._id === prev)) return prev;
          const firstAvailable = next.find((r) => r.isAvailable !== false);
          return firstAvailable?._id ?? next[0]?._id ?? '';
        });
      } catch (e: any) {
        if (cancelled) return;
        setRooms([]);
        toast.error(e?.response?.data?.message ?? 'Failed to load rooms');
      } finally {
        if (!cancelled) setRoomsLoading(false);
      }
    }

    loadRooms();
    return () => {
      cancelled = true;
    };
  }, [hotelId]);

  const imageUrls = useMemo(() => {
    const urls = hotel?.images?.map((img) => img.url).filter(Boolean) ?? [];
    return urls.length > 0 ? urls : ['/hero.jpg'];
  }, [hotel?.images]);

  const mainImageUrl = imageUrls[Math.min(activeImage, imageUrls.length - 1)] ?? imageUrls[0];

  const locationLabel = useMemo(() => {
    if (!hotel) return '';
    return [hotel.city, hotel.state].filter(Boolean).join(', ');
  }, [hotel]);

  const addressLabel = useMemo(() => {
    if (!hotel) return '';
    return [hotel.address, locationLabel].filter(Boolean).join(', ');
  }, [hotel, locationLabel]);

  const reviewCountLabel = hotel?.reviewCount?.toLocaleString() ?? '0';
  const ratingLabel = hotel ? getRatingLabel(hotel.rating) : '';

  const selectedRoom = useMemo(
    () => rooms.find((r) => r._id === selectedRoomId) ?? null,
    [rooms, selectedRoomId]
  );

  const startingFrom = useMemo(() => {
    const prices = rooms.map((r) => r.pricePerNight).filter((p) => typeof p === 'number' && p > 0);
    return prices.length ? Math.min(...prices) : null;
  }, [rooms]);

  const filteredSortedRooms = useMemo(() => {
    const base = onlyAvailable ? rooms.filter((r) => r.isAvailable) : rooms;
    const next = [...base];
    next.sort((a, b) => {
      if (sortBy === 'price_asc') return (a.pricePerNight ?? 0) - (b.pricePerNight ?? 0);
      if (sortBy === 'price_desc') return (b.pricePerNight ?? 0) - (a.pricePerNight ?? 0);
      if (sortBy === 'capacity') return (b.maxGuests ?? 0) - (a.maxGuests ?? 0);
      if (sortBy === 'availability') {
        const avA = a.isAvailable !== false ? 1 : 0;
        const avB = b.isAvailable !== false ? 1 : 0;
        return avB - avA;
      }
      return 0;
    });
    return next;
  }, [onlyAvailable, rooms, sortBy]);

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const canReserve = Boolean(selectedRoom && nights > 0);

  const bookingParams = useMemo(() => {
    const p = new URLSearchParams();
    if (checkIn) p.set('checkIn', checkIn);
    if (checkOut) p.set('checkOut', checkOut);
    if (guests) p.set('guests', String(guests));
    if (selectedRoom?._id) p.set('roomId', selectedRoom._id);
    return p.toString();
  }, [checkIn, checkOut, guests, selectedRoom?._id]);

  const bookingHref = hotel
    ? `/hotels/${hotel._id}/book${bookingParams ? `?${bookingParams}` : ''}`
    : '/search';

  if (status === 'loading' && !hotel) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
        <Navbar />
        <div className="pt-20">
          <div className="max-w-[1440px] mx-auto px-6 py-16">
            <div className="card-editorial p-10 flex items-center justify-center gap-3 text-primary">
              <Loader2 className="animate-spin" size={18} />
              <span className="text-sm">Loading hotel details...</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
        <Navbar />
        <div className="pt-20">
          <div className="max-w-[1440px] mx-auto px-6 py-16">
            <div className="card-editorial p-10">
              <h1 className="font-poppins font-black text-2xl text-on-surface mb-2">
                Hotel not found
              </h1>
              <p className="text-sm text-primary mb-6">
                This property might have been removed or is temporarily unavailable.
              </p>
              <Link href="/search" className="btn-primary inline-flex">
                Back to search
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
      <Navbar />
      <div className="pt-20">
        <div className="max-w-[1440px] mx-auto px-6 py-5">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-on-surface transition-colors"
          >
            <ArrowLeft size={16} /> Back to search
          </Link>
        </div>

        {/* Hero */}
        <section className="max-w-[1440px] mx-auto px-6 pb-12">
          <div className="relative w-full h-[75vh] min-h-[520px] rounded-[3rem] overflow-hidden group border border-outline-variant/25">
            <Image
              src={mainImageUrl}
              width={1600}
              height={900}
              alt={hotel.name}
              className="w-full h-full object-cover scale-[1.04] group-hover:scale-100 transition-transform duration-[2000ms]"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,15,15,0.02)_0%,rgba(15,15,15,0.72)_100%)]" />

            <div className="absolute top-6 left-6 right-6 flex items-start justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20 text-white">
                  {hotel.category}
                </span>
                {hotel.vibes?.slice(0, 3).map((v) => (
                  <span
                    key={v}
                    className="bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/15 text-white"
                  >
                    {v}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSaved((v) => !v)}
                  className="p-3 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
                  aria-label={saved ? 'Remove from saved' : 'Save hotel'}
                >
                  <Heart size={18} fill={saved ? '#ffffff' : 'none'} />
                </button>
                <button
                  className="p-3 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
                  aria-label="Share"
                  onClick={async () => {
                    try {
                      if (!navigator?.clipboard?.writeText)
                        throw new Error('Clipboard not supported');
                      await navigator.clipboard.writeText(window.location.href);
                      toast.success('Link copied');
                    } catch {
                      toast.info('Copy link failed');
                    }
                  }}
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            <div className="absolute bottom-10 left-10 right-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="text-white min-w-0 max-w-3xl">
                <h1 className="font-poppins font-black text-4xl md:text-6xl leading-[1.05] tracking-tight">
                  {hotel.name}
                </h1>
                <div className="flex flex-wrap items-center gap-5 mt-4 text-sm text-white/90">
                  <span className="flex items-center gap-2 min-w-0">
                    <MapPin size={16} className="shrink-0" />
                    <span className="truncate">{addressLabel || locationLabel}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Star size={16} fill="#ffffff" className="text-white" />
                    <span className="font-bold">{hotel.rating}</span>
                    <span className="text-white/70">
                      ({reviewCountLabel}) . {ratingLabel}
                    </span>
                  </span>
                </div>
              </div>

              <div className="hidden lg:flex gap-3 p-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl">
                {imageUrls.slice(0, 3).map((img, i) => (
                  <button
                    key={img}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-transform hover:scale-[1.03] ${
                      i === Math.min(activeImage, imageUrls.length - 1)
                        ? 'border-white/70'
                        : 'border-transparent hover:border-white/40'
                    }`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <main className="max-w-360 mx-auto px-6 pb-24">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: hotel details */}
            <div className="lg:col-span-7 space-y-14">
              <section className="card-editorial p-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="amber" className="capitalize">
                    {hotel.category}
                  </Badge>
                  {hotel.vibes?.slice(0, 4).map((v) => (
                    <Badge key={v} variant="default" className="capitalize">
                      {v}
                    </Badge>
                  ))}
                  <Badge variant={hotel.isActive ? 'success' : 'warning'}>
                    {hotel.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="p-6 rounded-3xl border border-outline-variant/25 bg-surface-container-lowest">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                      Guest Rating
                    </p>
                    <p className="font-poppins font-black text-3xl text-on-surface">
                      {hotel.rating}
                    </p>
                    <p className="text-xs text-primary mt-1">
                      {reviewCountLabel} reviews . {ratingLabel}
                    </p>
                  </div>
                  <div className="p-6 rounded-3xl border border-outline-variant/25 bg-surface-container-lowest">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                      Check-in
                    </p>
                    <p className="font-poppins font-black text-2xl text-on-surface">
                      {hotel.checkInTime}
                    </p>
                    <p className="text-xs text-primary mt-1">Local time</p>
                  </div>
                  <div className="p-6 rounded-3xl border border-outline-variant/25 bg-surface-container-lowest">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                      Check-out
                    </p>
                    <p className="font-poppins font-black text-2xl text-on-surface">
                      {hotel.checkOutTime}
                    </p>
                    <p className="text-xs text-primary mt-1">Local time</p>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <span className="w-10 h-0.5 bg-secondary" />
                  <span className="font-bold tracking-widest text-[10px] uppercase">
                    The Experience
                  </span>
                </div>
                <h2 className="font-poppins font-black text-4xl text-on-surface leading-[1.1]">
                  A stay worth remembering
                </h2>
                <p className="text-primary leading-[1.9] tracking-[-0.01em] text-lg">
                  {hotel.description}
                </p>
              </section>

              <section className="space-y-6">
                <h3 className="font-poppins font-black text-3xl text-on-surface">Amenities</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {hotel.amenities?.map((a) => (
                    <div
                      key={a}
                      className="flex items-center gap-3 p-4 rounded-2xl border border-outline-variant/25 bg-surface-container-lowest hover:bg-surface-container-low transition-colors"
                    >
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-secondary shrink-0"
                        style={{ background: 'var(--secondary-container)' }}
                        aria-hidden="true"
                      >
                        <Star size={16} className="text-secondary" />
                      </div>
                      <span className="text-sm font-semibold text-on-surface">{a}</span>
                    </div>
                  ))}
                </div>
              </section>

              {hotel.nearbyAttractions?.length > 0 && (
                <section className="space-y-6">
                  <h3 className="font-poppins font-black text-3xl text-on-surface">
                    Nearby Attractions
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {hotel.nearbyAttractions.slice(0, 10).map((p) => (
                      <div
                        key={p}
                        className="p-5 rounded-2xl border border-outline-variant/25 bg-surface-container-lowest text-sm text-on-surface"
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="card-editorial p-8 overflow-hidden">
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: 'var(--secondary-container)' }}
                    aria-hidden="true"
                  >
                    <MapPin size={18} className="text-secondary" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-poppins font-black text-2xl text-on-surface truncate">
                      {locationLabel || 'Location'}
                    </h4>
                    <p className="text-sm text-primary truncate">{addressLabel || locationLabel}</p>
                  </div>
                </div>
                <div
                  className="rounded-3xl overflow-hidden h-44 relative"
                  style={{ background: 'var(--surface-container)' }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(156,54,181,0.15),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(123,77,132,0.18),transparent_55%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xs text-primary">Map preview coming soon</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right: rooms then booking at the end */}
            <aside className="lg:col-span-5 space-y-10">
              <div className="sticky top-24 z-10">
                <div className="card-editorial p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-primary font-semibold mb-1">
                        Rooms
                      </p>
                      <h2 className="font-poppins font-black text-2xl text-on-surface">Choose</h2>
                      <p className="text-xs text-primary mt-1">
                        {rooms.length} room{rooms.length === 1 ? '' : 's'} found
                      </p>
                    </div>
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ background: 'var(--secondary-container)' }}
                      aria-hidden="true"
                    >
                      <SlidersHorizontal size={16} className="text-secondary" />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <label className="text-xs text-primary font-medium flex items-center gap-2 input-field">
                      <input
                        type="checkbox"
                        checked={onlyAvailable}
                        onChange={(e) => setOnlyAvailable(e.target.checked)}
                      />
                      Only available
                    </label>
                    <select
                      className="input-field text-xs"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortBy)}
                      aria-label="Sort rooms"
                    >
                      <option value="price_asc">Price: low to high</option>
                      <option value="price_desc">Price: high to low</option>
                      <option value="capacity">Capacity</option>
                      <option value="availability">Availability</option>
                    </select>
                  </div>
                </div>
              </div>

              {roomsLoading ? (
                <div className="card-editorial p-8 flex items-center gap-3 text-primary">
                  <Loader2 className="animate-spin" size={18} />
                  <span className="text-sm">Loading rooms...</span>
                </div>
              ) : filteredSortedRooms.length === 0 ? (
                <div className="card-editorial p-8">
                  <h3 className="font-poppins font-bold text-lg text-on-surface mb-1">
                    No rooms available right now
                  </h3>
                  <p className="text-sm text-primary mb-5">
                    Try changing your filters or check back later.
                  </p>
                  <Link href="/search" className="btn-primary inline-flex">
                    Back to search
                  </Link>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredSortedRooms.map((room) => (
                    <RoomCard
                      key={room._id}
                      room={room}
                      selected={room._id === selectedRoomId}
                      onSelect={(id) => setSelectedRoomId(id)}
                    />
                  ))}
                </div>
              )}

              <div className="card-editorial p-8 space-y-6 shadow-[0_40px_80px_rgba(52,0,66,0.10)] border border-outline-variant/20">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">
                      Starting from
                    </p>
                    <p className="font-poppins font-black text-3xl text-primary">
                      {startingFrom !== null ? formatCurrency(startingFrom) : '---'}
                      <span className="text-base font-normal text-primary">/night</span>
                    </p>
                    <p className="text-xs text-primary mt-1">
                      {selectedRoom ? (
                        <>
                          Selected:{' '}
                          <span className="font-semibold text-on-surface">{selectedRoom.name}</span>
                          <span className="text-primary"> . {selectedRoom.type}</span>
                        </>
                      ) : (
                        'Select a room to continue'
                      )}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-primary mb-1.5 block">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="input-field text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-primary mb-1.5 block">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="input-field text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-primary mb-1.5 block">Guests</label>
                    <div className="flex items-center gap-3 input-field">
                      <button
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-on-surface hover:bg-surface-container transition-colors"
                        aria-label="Decrease guests"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center text-sm font-medium">{guests}</span>
                      <button
                        onClick={() => setGuests((g) => g + 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-on-surface hover:bg-surface-container transition-colors"
                        aria-label="Increase guests"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {selectedRoom && nights > 0 && (
                  <div className="space-y-3 py-6 border-y border-outline-variant/20 text-sm">
                    <div className="flex justify-between text-primary">
                      <span>
                        {selectedRoom.name} ({nights} night{nights > 1 ? 's' : ''})
                      </span>
                      <span>{formatCurrency(selectedRoom.pricePerNight * nights)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-black text-on-surface pt-2">
                      <span>Total</span>
                      <span className="text-secondary">
                        {formatCurrency(selectedRoom.pricePerNight * nights)}
                      </span>
                    </div>
                  </div>
                )}

                <Link
                  href={bookingHref}
                  className={`btn-primary w-full ${canReserve ? '' : 'pointer-events-none opacity-60'}`}
                  aria-disabled={!canReserve}
                >
                  Reserve
                </Link>
                <p className="text-xs text-primary text-center">You won't be charged yet</p>
              </div>
            </aside>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
