import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../apiServices/user.services';
import { IUser } from '@/src/types/auth';
import { UpdateDetailsRequest } from '@/src/types/user';

// GET ME — restores session on page load
export const getMe = createAsyncThunk<IUser, void, { rejectValue: string }>(
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
  IUser,
  UpdateDetailsRequest,
  { rejectValue: string }
>('user/updateDetails', async (payload, { rejectWithValue }) => {
  try {
    const response = await userService.updateDetails(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update details');
  }
});

// GET ALL USERS — admin only
export const getAllUsers = createAsyncThunk<IUser[], void, { rejectValue: string }>(
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
