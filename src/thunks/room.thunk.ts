import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, ApiResponse } from '@/src/types';
import {
  AddRoomImagesRequest,
  CreateRoomRequest,
  IRoom,
  RemoveRoomImagesRequest,
  UpdateRoomRequest,
} from '@/src/types/room';
import { roomServices } from '@/src/apiServices/room.services';

export const createRoom = createAsyncThunk<
  ApiResponse<IRoom>,
  CreateRoomRequest,
  {
    rejectValue: ApiError;
  }
>('room/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await roomServices.createRoom(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to create room!');
  }
});

export const deleteRoom = createAsyncThunk<ApiResponse<null>, string, { rejectValue: ApiError }>(
  'room/delete',
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await roomServices.deleteRoom(roomId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to delete room!');
    }
  }
);

export const updateRoom = createAsyncThunk<
  ApiResponse<IRoom>,
  UpdateRoomRequest,
  { rejectValue: ApiError }
>('room/update', async (payload, { rejectWithValue }) => {
  try {
    const response = await roomServices.updateRoom(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to update room!');
  }
});

export const getRoomById = createAsyncThunk<ApiResponse<IRoom>, string, { rejectValue: ApiError }>(
  'room/getById',
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await roomServices.getRoomById(roomId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to get room!');
    }
  }
);

export const getRoomByHotelId = createAsyncThunk<
  ApiResponse<IRoom>,
  string,
  { rejectValue: ApiError }
>('room/getRoomByHotelId', async (hotelId, { rejectWithValue }) => {
  try {
    const response = await roomServices.getRoomByHotel(hotelId);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to get room!');
  }
});

export const toggleRoomAvailability = createAsyncThunk<
  ApiResponse<IRoom>,
  string,
  { rejectValue: ApiError }
>('room/toggleRoomAvailability', async (roomId, { rejectWithValue }) => {
  try {
    const response = await roomServices.toggleRoomAvailability(roomId);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to toggle room availability!');
  }
});

export const addRoomImages = createAsyncThunk<
  ApiResponse<IRoom>,
  AddRoomImagesRequest,
  { rejectValue: ApiError }
>('room/addRoomImages', async (payload, { rejectWithValue }) => {
  try {
    const response = await roomServices.addImages(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to add images to room!');
  }
});

export const removeRoomImages = createAsyncThunk<
  ApiResponse<IRoom>,
  RemoveRoomImagesRequest,
  { rejectValue: ApiError }
>('room/removeRoomImages', async (payload, { rejectWithValue }) => {
  try {
    const response = await roomServices.removeImages(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to remove images of room!');
  }
});
