import { createSlice } from '@reduxjs/toolkit';
import { getRazorpayKeyId, verifyPayment } from '@/src/thunks/payment.thunk';

interface PaymentState {
  razorpayKeyId: string;
  verifyStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  keyStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PaymentState = {
  razorpayKeyId: '',
  verifyStatus: 'idle',
  keyStatus: 'idle',
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState(state) {
      state.keyStatus = 'idle';
      state.verifyStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayKeyId.pending, (state) => {
        state.keyStatus = 'loading';
      })
      .addCase(getRazorpayKeyId.fulfilled, (state, action) => {
        state.keyStatus = 'succeeded';
        state.razorpayKeyId = action.payload;
      })
      .addCase(getRazorpayKeyId.rejected, (state, action) => {
        state.keyStatus = 'failed';
        state.error = action.payload;
      })

      .addCase(verifyPayment.pending, (state) => {
        state.verifyStatus = 'loading';
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.verifyStatus = 'succeeded';
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verifyStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
