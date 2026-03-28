import { createAsyncThunk } from '@reduxjs/toolkit';
import { hotelService } from '@/src/apiServices/hotel.services';
import {
  CreateHotelRequest,
  GetAllHotelsParams,
  IHotel,
  UpdateHotelRequest,
} from '@/src/types/hotel';

export const getAllHotels = createAsyncThunk<
  IHotel[],
  GetAllHotelsParams,
  { rejectValue: string }
>('hotel/getAllHotels', async (payload, { rejectWithValue }) => {
  try {
    const response = await hotelService.getAllHotels(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to get all hotels');
  }
});

export const getHotelById = createAsyncThunk<IHotel, string, { rejectValue: string }>(
  'hotel/getHotelById',
  async (payload, { rejectWithValue }) => {
  try {
    const response = await hotelService.getHotelById(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to get hotel by Id');
  }
  }
);

export const getHotelBySlug = createAsyncThunk<IHotel, string, { rejectValue: string }>(
  'hotel/getHotelBySlug',
  async (payload, { rejectWithValue }) => {
  try {
    const response = await hotelService.getHotelBySlug(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to get hotel by slug');
  }
  }
);

export const createHotel = createAsyncThunk<
  IHotel,
  CreateHotelRequest,
  { rejectValue: string }
>('hotel/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await hotelService.createHotel(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to create hotel');
  }
});

export const updateHotel = createAsyncThunk<
  IHotel,
  UpdateHotelRequest,
  { rejectValue: string }
>('hotel/update', async (payload, { rejectWithValue }) => {
  try {
    const response = await hotelService.updateHotel(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to update hotel');
  }
});

export const deleteHotel = createAsyncThunk<null, string, { rejectValue: string }>(
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
