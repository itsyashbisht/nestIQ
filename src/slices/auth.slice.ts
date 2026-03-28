import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, registerUser } from '../thunks/auth.thunk';
import { getMe } from '../thunks/user.thunk';
import type { IUser } from '../types/auth';

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  loading: boolean;
  error: string | null;
}

const getErrorMessage = (payload: unknown): string =>
  typeof payload === 'string'
    ? payload
    : payload && typeof payload === 'object' && typeof (payload as { message?: unknown }).message === 'string'
      ? ((payload as { message: string }).message as string)
      : 'Something went wrong';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    setInitialized(state) {
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ?? null;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ?? null;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
      })

      // GET ME — restore session on page load
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ?? null;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
        state.isAuthenticated = false;
        state.isInitialized = true;
      });
  },
});

export const { clearAuthError, setInitialized } = authSlice.actions;
export default authSlice.reducer;
