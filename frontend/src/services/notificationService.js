import API from './api';

export const getUserNotifications = () => API.get('/notifications');
export const createNotification = (data) => API.post('/notifications', data);
