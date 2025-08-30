// src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { requireAuth } = require('../middlewares/authMiddleware');

// initiate (create payment order) - returns paymentId
router.post('/initiate/:bookingId', requireAuth(), paymentController.initiatePayment);

// confirm (frontend posts result)
router.post('/confirm', requireAuth(), paymentController.confirmPayment);

module.exports = router;

// 

// const express = require('express');
// const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/order', protect, paymentController.createOrder);
router.post('/verify', protect, paymentController.verifyPayment);

module.exports = router;
