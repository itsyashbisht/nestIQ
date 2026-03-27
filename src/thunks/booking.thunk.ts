import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, ApiResponse, IBooking } from '@/src/types';
import {
  CreateBookingRequest,
  GetAllBookingsParams,
  UpdateBookingStatusRequest,
} from '@/src/types/booking';
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
>('booking/myBookings', async (_: void, { rejectWithValue }) => {
  try {
    const response = await bookingService.getMyBookings();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to getMyBookings');
  }
});

export const getBookingById = createAsyncThunk<
  ApiResponse<IBooking>,
  string,
  { rejectValue: ApiError }
>('booking/byId', async (payload, { rejectWithValue }) => {
  try {
    const response = await bookingService.getBookingById(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get Booking by Id');
  }
});

export const updateBookingStatus = createAsyncThunk<
  ApiResponse<IBooking>,
  UpdateBookingStatusRequest,
  { rejectValue: ApiError }
>('booking/updateStatus', async (payload, { rejectWithValue }) => {
  try {
    const response = await bookingService.updateBookingStatus(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update Booking Status');
  }
});

export const cancelBooking = createAsyncThunk<
  ApiResponse<IBooking>,
  string,
  { rejectValue: ApiError }
>('booking/cancel', async (payload, { rejectWithValue }) => {
  try {
    const response = await bookingService.cancelBooking(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to cancel Booking');
  }
});

export const getAllBookings = createAsyncThunk<
  ApiResponse<IBooking[]>,
  GetAllBookingsParams,
  { rejectValue: ApiError }
>('booking/allBookings', async (params, { rejectWithValue }) => {
  try {
    const response = await bookingService.getAllBookings(params);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to getAllBookings');
  }
});
