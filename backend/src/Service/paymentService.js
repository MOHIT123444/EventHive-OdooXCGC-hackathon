const Payment = require('../models/Payment');

async function createPayment(bookingId, amount) {
  const payment = new Payment({ booking: bookingId, amount });
  await payment.save();
  return payment;
}

async function verifyPayment(paymentId) {
  // Simulate verification
  const payment = await Payment.findById(paymentId);
  if (!payment) throw new Error('Payment not found');
  payment.status = 'completed';
  await payment.save();
  return payment;
}

module.exports = { createPayment, verifyPayment };
