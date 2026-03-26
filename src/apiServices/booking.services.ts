import REQUEST from './axios';
import ROUTES from '../constants/routes.json';
import { CreateBookingRequest, UpdateBookingRequest } from '@/src/types/booking';

export const bookingService = {
  createBooking(payload: CreateBookingRequest) {
    return REQUEST.post(ROUTES.BOOKING.CREATE_BOOKING, payload);
  },

  getMyBookings() {
    return REQUEST.get(ROUTES.BOOKING.GET_MY_BOOKINGS);
  },

  getBookingById(bookingId: string) {
    return REQUEST.get(ROUTES.BOOKING.GET_BY_ID.replace(':bookingId', bookingId));
  },

  cancelBooking(bookingId: string) {
    return REQUEST.patch(ROUTES.BOOKING.CANCEL.replace(':bookingId', bookingId));
  },

  // ADMIN
  getAllBookings() {
    return REQUEST.get(ROUTES.BOOKING.GET_ALL);
  },

  updateBookingStatus(payload: UpdateBookingRequest) {
    return REQUEST.patch(ROUTES.BOOKING.UPDATE_STATUS.replace(':bookingId', payload.bookingId), {
      status,
    });
  },
};
