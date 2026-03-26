import { getMyBookings } from '@/src/thunks/booking.thunk';

export interface CreateBookingRequest {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
}

export interface UpdateBookingRequest {
  bookingId: string;
  status: string;
}
