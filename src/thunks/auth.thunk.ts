import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../apiServices/auth.services';
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  IUser,
  LoginRequest,
  RegisterRequest,
} from '@/src/types/auth';
import { ApiError, ApiResponse } from '@/src/types';

// REGISTER
export const registerUser = createAsyncThunk<
  ApiResponse<IUser>,
  RegisterRequest,
  { rejectValue: ApiError }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.register(payload);
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

// LOGIN
export const loginUser = createAsyncThunk<
  ApiResponse<IUser>,
  LoginRequest,
  { rejectValue: ApiError }
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.login(payload);
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

// LOGOUT
export const logoutUser = createAsyncThunk<ApiResponse<object>, void, { rejectValue: ApiError }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.logout();
      localStorage.removeItem('accessToken');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

// CHANGE PASSWORD
export const changePassword = createAsyncThunk<
  ApiResponse<null>,
  ChangePasswordRequest,
  { rejectValue: ApiError }
>(
  'auth/changePassword',
  async (payload: { curPassword: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const response = await authService.changePassword(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Password change failed');
    }
  }
);

export const forgotPassword = createAsyncThunk<
  ApiResponse<ForgotPasswordResponse>,
  ForgotPasswordRequest,
  {
    rejectValue: ApiError;
  }
>('auth/forgotPassword', async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.forgotPassword(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Forgot Password failed');
  }
});
