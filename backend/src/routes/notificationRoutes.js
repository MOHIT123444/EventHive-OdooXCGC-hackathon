// src/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

// create notification (organizer/admin)
router.post('/', requireAuth(), requireRole('admin','manager'), notificationController.createNotification);

module.exports = router;

// 

// const express = require('express');
// const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, notificationController.getNotifications);
router.post('/', protect, notificationController.sendNotification);

module.exports = router;
