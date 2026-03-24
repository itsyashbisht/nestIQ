import Link from 'next/link';
import { Calendar, MapPin, Moon, MoreHorizontal } from 'lucide-react';
// @ts-ignore
import { Booking } from '@/types';
import { formatCurrency, formatDate } from '@/src/lib/utils';
import { Badge } from '@/components/ui/badge';

const STATUS_VARIANTS: Record<Booking['status'], 'success' | 'warning' | 'default' | 'error'> = {
  confirmed: 'success',
  pending: 'warning',
  completed: 'default',
  cancelled: 'error',
};

export default function BookingCard({ booking }: { booking: Booking }) {
  return (
    <div className="card-editorial overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
          <img src={booking.image} alt={booking.hotelName} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 flex flex-col justify-between flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge variant={STATUS_VARIANTS[booking.status]} className="mb-2 capitalize">
                {booking.status}
              </Badge>
              <h3 className="font-poppins font-semibold text-lg text-on-surface">
                {booking.hotelName}
              </h3>
              <div className="flex items-center gap-1 text-xs text-primary mt-1">
                <MapPin size={11} />
                <span>{booking.location}</span>
              </div>
            </div>
            <button className="p-2 rounded-xl hover:bg-surface-container-low transition-colors flex-shrink-0">
              <MoreHorizontal size={16} className="text-primary" />
            </button>
          </div>
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={14} className="text-secondary" />
              <span className="text-primary text-xs">
                {formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Moon size={14} className="text-secondary" />
              <span className="text-primary text-xs">{booking.nights} Nights</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-container">
            <div>
              <p className="text-xs text-primary">Total Amount</p>
              <p className="font-poppins font-bold text-lg text-on-surface">
                {formatCurrency(booking.total)}
              </p>
            </div>
            <Link href={`/bookings/${booking.id}`} className="btn-secondary text-xs px-4 py-2">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
