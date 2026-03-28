import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import cartReducer from './slices/cart.slice';
import searchReducer from './slices/search.slice';
import paymentReducer from './slices/Payment.slice';
import bookingReducer from './slices/booking.slice';
import userReducer from './slices/user.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    search: searchReducer,
    payment: paymentReducer,
    booking: bookingReducer,
    user: userReducer,
  },
});

// Infer types from store itself — same pattern you know, just typed
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
