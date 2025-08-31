import API from './api';

export const createOrder = (data) => API.post('/payments/order', data);
export const verifyPayment = (data) => API.post('/payments/verify', data);
// export const getPaymentHistory = () => API.get('/payments/history');