import { createAsyncThunk } from '@reduxjs/toolkit';
import { hotelService } from '@/src/apiServices/hotel.services';
import { ApiError, ApiResponse } from '@/src/types';
import {
  CreateHotelRequest,
  GetAllHotelsParams,
  IHotel,
  UpdateHotelRequest,
} from '@/src/types/hotel';

export const getAllHotels = createAsyncThunk<
  ApiResponse<IHotel[]>,
  GetAllHotelsParams,
  { rejectValue: ApiError }
>('hotel/getAllHotels', async (payload, { rejectWithValue }) => {
  try {
    const response = await hotelService.getAllHotels(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to get all hotels');
  }
});

export const getHotelById = createAsyncThunk<
  ApiResponse<IHotel>,
  string,
  { rejectValue: ApiError }
>('hotel/getHotelById', async (payload, { rejectWithValue }) => {
  try {
    const response = await hotelService.getHotelById(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to get hotel by Id');
  }
});

export const getHotelBySlug = createAsyncThunk<
  ApiResponse<IHotel>,
  string,
  { rejectValue: ApiError }
>('hotel/getHotelBySlug', async (payload, { rejectWithValue }) => {
  try {
    const response = await hotelService.getHotelBySlug(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to get hotel by slug');
  }
});

export const createHotel = createAsyncThunk<
  ApiResponse<IHotel>,
  CreateHotelRequest,
  { rejectValue: ApiError }
>('hotel/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await hotelService.createHotel(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to create hotel');
  }
});

export const updateHotel = createAsyncThunk<
  ApiResponse<IHotel>,
  UpdateHotelRequest,
  { rejectValue: ApiError }
>('hotel/update', async (payload, { rejectWithValue }) => {
  try {
    const response = await hotelService.updateHotel(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to update hotel');
  }
});

export const deleteHotel = createAsyncThunk<ApiResponse<null>, string, { rejectValue: ApiError }>(
  'hotel/deleteHotel',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await hotelService.deleteHotel(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to delete hotel');
    }
  }
);
