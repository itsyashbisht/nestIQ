import { IUser } from '@/src/types/auth';
import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers, getMe, updateUserDetails } from '@/src/thunks/user.thunk';

interface UserState {
  allUsers: IUser[];
  loading: boolean;
  error: string | null;
  profile: IUser | null;
}

const initialState: UserState = {
  allUsers: [],
  loading: false,
  error: null,
  profile: null,
};

const getErrorMessage = (payload: unknown): string =>
  typeof payload === 'string' ? payload : 'Something went wrong';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
    clearUserProfile(state) {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
      });
  },
});

export const { clearUserError, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
