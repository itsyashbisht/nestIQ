import { createAsyncThunk } from '@reduxjs/toolkit';
import { paymentServices } from '@/src/apiServices/payment.services';
import {
  getRazorpayKeyResponse,
  verifyPaymentRequest,
  verifyPaymentResponse,
} from '@/src/types/payment';
import { ApiResponse } from '@/src/types';

export const getRazorpayKeyId = createAsyncThunk<
  ApiResponse<getRazorpayKeyResponse>,
  void,
  { rejectValue: string }
>('payment/getKey', async (_, { rejectWithValue }) => {
  try {
    const response = await paymentServices.getRazorpayKeyId();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Something went wrong while fetching the razorpay key'
    );
  }
});

export const verifyPayment = createAsyncThunk<
  ApiResponse<verifyPaymentResponse>,
  verifyPaymentRequest,
  { rejectValue: string }
>('payment/verify', async (payload: verifyPaymentRequest, { rejectWithValue }) => {
  try {
    const response = await paymentServices.verifyPayment(payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Something went wrong while verifying the razorpay'
    );
  }
});
