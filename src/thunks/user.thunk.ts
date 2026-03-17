import {createAsyncThunk} from "@reduxjs/toolkit";
import {userService} from "../apiServices/user.services";

// GET ME — restores session on page load
export const getMe = createAsyncThunk(
    "auth/getMe",
    async (_, {rejectWithValue}) => {
        try {
            const response = await userService.getMe();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch user"
            );
        }
    }
);

// UPDATE USER DETAILS
export const updateUserDetails = createAsyncThunk(
    "user/updateDetails",
    async (
        payload: {
            username: string;
            fullname: string;
            email: string;
            address: string;
            city: string;
            state: string;
            pincode: number;
            phoneNumber: number;
        },
        {rejectWithValue}
    ) => {
        try {
            const response = await userService.updateDetails(payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update details"
            );
        }
    }
);

// GET ALL USERS — admin only
export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (_, {rejectWithValue}) => {
        try {
            const response = await userService.getAllUsers();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch users"
            );
        }
    }
);