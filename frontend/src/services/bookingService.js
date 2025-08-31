import API from './api';

export const getAllBookings = () => API.get('/bookings/all');
export const createBooking = (data) => API.post('/bookings', data);
