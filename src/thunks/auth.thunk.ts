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

const getUserFromAuthPayload = (payload: unknown): IUser => {
  if (payload && typeof payload === 'object' && 'user' in payload) {
    return (payload as { user: IUser }).user;
  }
  return payload as IUser;
};

// REGISTER
export const registerUser = createAsyncThunk<IUser, RegisterRequest, { rejectValue: string }>(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authService.register(payload);
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
      }
      return getUserFromAuthPayload(response.data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk<IUser, LoginRequest, { rejectValue: string }>(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authService.login(payload);
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
      }
      return getUserFromAuthPayload(response.data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      localStorage.removeItem('accessToken');
      return;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

// CHANGE PASSWORD
export const changePassword = createAsyncThunk<void, ChangePasswordRequest, { rejectValue: string }>(
  'auth/changePassword',
  async (payload: { curPassword: string; newPassword: string }, { rejectWithValue }) => {
    try {
      await authService.changePassword(payload);
      return;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Password change failed');
    }
  }
);

export const forgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  {
    rejectValue: string;
  }
>('auth/forgotPassword', async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.forgotPassword(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Forgot Password failed');
  }
});
