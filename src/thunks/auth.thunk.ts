import {createAsyncThunk} from "@reduxjs/toolkit";
import {authService} from "../apiServices/auth.services";

// REGISTER
export const registerUser = createAsyncThunk(
    "auth/register",
    async (
        payload: {
            username: string;
            fullname: string;
            email: string;
            password: string;
            address: string;
            city: string;
            state: string;
            pincode: number;
            phoneNumber: number;
        },
        {rejectWithValue}
    ) => {
        try {
            const response = await authService.register(payload);
            if (response.data.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);

// LOGIN
export const loginUser = createAsyncThunk(
    "auth/login",
    async (
        payload: { email: string; username: string; password: string },
        {rejectWithValue}
    ) => {
        try {
            const response = await authService.login(payload);
            if (response.data.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, {rejectWithValue}) => {
        try {
            const response = await authService.logout();
            localStorage.removeItem("accessToken");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Logout failed"
            );
        }
    }
);

// CHANGE PASSWORD
export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async (
        payload: { curPassword: string; newPassword: string },
        {rejectWithValue}
    ) => {
        try {
            const response = await authService.changePassword(payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Password change failed"
            );
        }
    }
);