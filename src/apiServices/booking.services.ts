import REQUEST from "./axios";
import ROUTES from "../constants/routes.json";

interface CreateBookingPayload {
    hotelId: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    specialRequests?: string;
}

interface VerifyPaymentPayload {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    bookingId: string;
}

export const bookingService = {
    createBooking(payload: CreateBookingPayload) {
        return REQUEST.post(ROUTES.BOOKING.CREATE, payload);
    },

    getMyBookings() {
        return REQUEST.get(ROUTES.BOOKING.GET_MY_BOOKINGS);
    },

    getBookingById(bookingId: string) {
        return REQUEST.get(
            ROUTES.BOOKING.GET_BY_ID.replace(":bookingId", bookingId)
        );
    },

    cancelBooking(bookingId: string) {
        return REQUEST.patch(
            ROUTES.BOOKING.CANCEL.replace(":bookingId", bookingId)
        );
    },

    // ADMIN
    getAllBookings() {
        return REQUEST.get(ROUTES.BOOKING.GET_ALL);
    },

    updateBookingStatus(bookingId: string, status: string) {
        return REQUEST.patch(
            ROUTES.BOOKING.UPDATE_STATUS.replace(":bookingId", bookingId),
            { status }
        );
    },

    // Razorpay payment verification
    verifyPayment(payload: VerifyPaymentPayload) {
        return REQUEST.post(ROUTES.PAYMENT.VERIFY, payload);
    },

    getRazorpayKey() {
        return REQUEST.get(ROUTES.PAYMENT.GET_KEY);
    },
};