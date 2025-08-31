// src/controllers/analyticsController.js
const Booking = require('../models/Booking');

// simple aggregation example for event analytics
exports.getEventAnalytics = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const result = await Booking.aggregate([
      { $match: { eventId: require('mongoose').Types.ObjectId(eventId) } },
      {
        $group: {
          _id: '$eventId',
          ticketsSold: { $sum: '$quantity' },
          revenue: { $sum: '$amount' }
        }
      }
    ]);
    res.json({ success: true, data: result[0] || { ticketsSold: 0, revenue: 0 } });
  } catch (err) {
    next(err);
  }
};

// helper to emit - in your actual app you'll integrate socket utility
// exports.emitAnalyticsUpdate = async function (eventId) {
//   // placeholder: you can require socket util and emit updates when bookings change
// };
