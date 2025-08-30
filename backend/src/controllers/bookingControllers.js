// src/controllers/bookingController.js
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const { emitAnalyticsUpdate } = require('./analyticsController'); // optional hook to emit realtime updates

// Create booking (no payment yet) - protected route intended
exports.createBooking = async (req, res, next) => {
  try {
    const { eventId, ticketType, quantity, amount } = req.body;
    const userId = req.user._id;

    // Basic server-side validation
    if (!eventId || !amount) return res.status(400).json({ error: true, message: 'Missing eventId or amount' });

    const booking = await Booking.create({
      eventId, userId, ticketType: ticketType || 'general', quantity: quantity || 1, amount, status: 'pending'
    });

    // Optionally: create a payment doc or return booking id to frontend to initiate payment
    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

// Get bookings for logged-in user
exports.getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
};

// Cancel booking
exports.cancelBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: true, message: 'Booking not found' });
    // only owner or admin/manager should cancel: simple check
    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: true, message: 'Not allowed' });
    }
    booking.status = 'cancelled';
    await booking.save();
    // TODO: refund workflow via paymentService
    res.json({ success: true, message: 'Booking cancelled' });
    // optionally emit analytics update
    if (emitAnalyticsUpdate) emitAnalyticsUpdate(booking.eventId.toString());
  } catch (err) {
    next(err);
  }

};
// Admin: get all bookings with optional filters

const bookingService = require('../services/bookingService');

async function createBooking(req, res, next) {
  try {
    const { eventId, seats } = req.body;
    const booking = await bookingService.createBooking(req.user._id, eventId, seats);
    res.status(201).json({ success: true, booking });
  } catch (err) {
    next(err);
  }
}

//User booking 
async function getUserBookings(req, res, next) {
  try {
    const bookings = await bookingService.getUserBookings(req.user._id);
    res.json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
}

async function getAllBookings(req, res, next) {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
}

module.exports = { createBooking, getUserBookings, getAllBookings };
