import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import bookingReducer from './bookingSlice';
import notificationReducer from './notificationSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingReducer,
    notifications: notificationReducer,
  },
});
