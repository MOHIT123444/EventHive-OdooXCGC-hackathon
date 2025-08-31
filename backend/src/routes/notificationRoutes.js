const express = require('express');
const { createNotification,getUserNotifications } = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/',protect,createNotification);
router.get('/',protect,getUserNotifications);

module.exports = router;
