// src/controllers/paymentController.js
// Simulated payment flow (Razorpay dummy). In real app replace with SDK + signature verification.

const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const { v4: uuidv4 } = require('uuid');

exports.initiatePayment = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: true, message: 'Booking not found' });

    // create a payment record (simulated order)
    const payment = await Payment.create({
      bookingId: booking._id,
      amount: booking.amount,
      method: 'razorpay_dummy',
      status: 'initiated',
      transactionId: uuidv4()
    });

    // return a payload the frontend can use to open checkout
    res.json({ success: true, data: { paymentId: payment._id, amount: payment.amount, transactionId: payment.transactionId } });
  } catch (err) {
    next(err);
  }
};

exports.confirmPayment = async (req, res, next) => {
  try {
    const { paymentId, success } = req.body; // frontend simulates success = true/false
    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ error: true, message: 'Payment not found' });

    payment.status = success ? 'success' : 'failed';
    await payment.save();

    // update booking on success
    if (success) {
      const booking = await Booking.findById(payment.bookingId);
      booking.status = 'confirmed';
      await booking.save();
      // TODO: generate QR, send ticket via notification service
    }

    res.json({ success: true, data: payment });
  } catch (err) {
    next(err);
  }
};

// Payment service integrated. 
const paymentService = require('../services/paymentService');

async function createOrder(req, res, next) {
  try {
    const { bookingId, amount } = req.body;
    const payment = await paymentService.createPayment(bookingId, amount);
    res.status(201).json({ success: true, payment });
  } catch (err) {
    next(err);
  }
}

async function verifyPayment(req, res, next) {
  try {
    const { paymentId } = req.body;
    const payment = await paymentService.verifyPayment(paymentId);
    res.json({ success: true, payment });
  } catch (err) {
    next(err);
  }
}

module.exports = { createOrder, verifyPayment };
