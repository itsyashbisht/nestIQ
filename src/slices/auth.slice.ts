import {createSlice} from "@reduxjs/toolkit";
import {loginUser, logoutUser, registerUser} from "../thunks/auth.thunk";
import {getMe} from "../thunks/user.thunk";
import type {IUser} from "../types";

interface AuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isInitialized: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
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
                state.user = action.payload?.user ?? null;
                state.isAuthenticated = true;
                state.isInitialized = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.user ?? null;
                state.isAuthenticated = true;
                state.isInitialized = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // LOGOUT
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
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
                state.error = action.payload as string;
                state.isAuthenticated = false;
                state.isInitialized = true;
            });
    },
});

export const {clearAuthError, setInitialized} = authSlice.actions;
export default authSlice.reducer;