// src/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

// create booking (attendee)
router.post('/', requireAuth(), bookingController.createBooking);

// see my bookings
router.get('/my', requireAuth(), bookingController.getMyBookings);

// cancel
router.delete('/:id', requireAuth(), bookingController.cancelBooking);

// more organizer-only endpoints can be added (e.g., get event bookings)
module.exports = router;

// Admin: get all bookings with optional filters
// router.get('/', requireAuth(), requireRole('admin'), bookingController.getAllBookings);


// const express = require('express');
// const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

// Create booking
router.post('/', protect, bookingController.createBooking);

// Get logged-in user's bookings
router.get('/', protect, bookingController.getUserBookings);

// Admin: get all bookings
router.get('/all', protect, bookingController.getAllBookings);

module.exports = router;

