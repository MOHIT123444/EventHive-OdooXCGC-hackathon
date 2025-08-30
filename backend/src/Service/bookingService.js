const Booking = require('../models/Booking');

async function createBooking(userId, eventId, seats) {
  const booking = new Booking({ user: userId, eventId, seats });
  await booking.save();
  return booking;
}

async function getUserBookings(userId) {
  return Booking.find({ user: userId }).populate('user', 'name email');
}

async function getAllBookings() {
  return Booking.find().populate('user', 'name email');
}

module.exports = { createBooking, getUserBookings, getAllBookings };
