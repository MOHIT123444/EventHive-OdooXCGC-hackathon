import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as notificationService from '../services/notificationService';

const initialState = { notifications: [], loading: false, error: null };

export const fetchNotifications = createAsyncThunk('notifications/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await notificationService.getUserNotifications();
    return res.data.notifications;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const createNotification = createAsyncThunk('notifications/create', async (data, thunkAPI) => {
  try {
    const res = await notificationService.createNotification(data);
    return res.data.notification;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => { state.loading = true; })
      .addCase(fetchNotifications.fulfilled, (state, action) => { state.loading = false; state.notifications = action.payload; })
      .addCase(fetchNotifications.rejected, (state, action) => { state.loading = false; state.error = action.payload.message; })
      .addCase(createNotification.fulfilled, (state, action) => { state.notifications.push(action.payload); });
  },
});

export default notificationSlice.reducer;
