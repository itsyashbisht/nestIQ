import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../apiServices/user.services';
import { ApiError, ApiResponse } from '@/src/types';
import { IUser } from '@/src/types/auth';
import { UpdateDetailsRequest } from '@/src/types/user';

// GET ME — restores session on page load
export const getMe = createAsyncThunk<ApiResponse<IUser>, void, { rejectValue: ApiError }>(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getMe();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

// UPDATE USER DETAILS
export const updateUserDetails = createAsyncThunk<
  ApiResponse<IUser>,
  UpdateDetailsRequest,
  { rejectValue: ApiError }
>('user/updateDetails', async (payload, { rejectWithValue }) => {
  try {
    const response = await userService.updateDetails(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update details');
  }
});

// GET ALL USERS — admin only
export const getAllUsers = createAsyncThunk<ApiResponse<IUser[]>, void, { rejectValue: ApiError }>(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getAllUsers();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);
