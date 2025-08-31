const express = require('express');
const router = express.Router();
const { createBooking,getUserBookings,getAllUserBookings } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/',protect,createBooking);
router.get('/',protect,getUserBookings);
// router.get('/all', protect, getAllUserBookings);    // Admin sees all bookings
module.exports = router;

// backend/src/routes/bookingRoutes.js
// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middlewares/authMiddleware');
// const { createBooking, getBookings, getAllBookings } = require('../controllers/bookingController');

// router.post('/', protect, createBooking);       // Create booking
// router.get('/', protect, getBookings);          // User bookings
// router.get('/all', protect, getAllBookings);    // Admin sees all bookings

// module.exports = router;
