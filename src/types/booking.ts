import { IHotel } from '@/src/types/hotel';
import { IRoom } from '@/src/types/room';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface IBooking {
  _id: string;
  guestId: string;
  hotelId: string;
  roomId: string;
  hotel?: IHotel;
  room?: IRoom;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  pricePerNight: number;
  subtotal: number;
  taxes: number;
  totalAmount: number;
  status: BookingStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
}

export interface UpdateBookingStatusRequest {
  bookingId: string;
  status: string;
}

export interface GetAllBookingsParams {
  status: string;
  page: number;
  limit: number;
}
