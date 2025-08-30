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
