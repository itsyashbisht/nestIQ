import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, ApiResponse, IBooking } from '@/src/types';
import { CreateBookingRequest } from '@/src/types/booking';
import { bookingService } from '@/src/apiServices/booking.services';

export const createBooking = createAsyncThunk<
  ApiResponse<IBooking>,
  CreateBookingRequest,
  { rejectValue: ApiError }
>('booking/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await bookingService.createBooking(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
  }
});

export const getMyBookings = createAsyncThunk<
  ApiResponse<IBooking[]>,
  void,
  { rejectValue: ApiError }
>('booking/getMyBookings', async (_: void, { rejectWithValue }) => {
  try {
    const response = await bookingService.getMyBookings();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to getMyBookings');
  }
});
