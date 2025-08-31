import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as bookingService from '../services/bookingService';

const initialState = { bookings: [], loading: false, error: null };

export const fetchBookings = createAsyncThunk('bookings/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await bookingService.getAllBookings();
    return res.data.bookings;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const createBooking = createAsyncThunk('bookings/create', async (data, thunkAPI) => {
  try {
    const res = await bookingService.createBooking(data);
    return res.data.booking;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => { state.loading = true; })
      .addCase(fetchBookings.fulfilled, (state, action) => { state.loading = false; state.bookings = action.payload; })
      .addCase(fetchBookings.rejected, (state, action) => { state.loading = false; state.error = action.payload.message; })
      .addCase(createBooking.fulfilled, (state, action) => { state.bookings.push(action.payload); });
  },
});

export default bookingSlice.reducer;
