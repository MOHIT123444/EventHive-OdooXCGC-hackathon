// // src/routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const { requireAuth } = require('../middlewares/authMiddleware');

// router.post('/register', authController.register);
// router.post('/login', authController.login);
// router.get('/profile', requireAuth(), authController.profile);

// module.exports = router;


// src/routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const { requireAuth } = require('../middlewares/authMiddleware');

// // public
// router.post('/register', authController.register);
// router.post('/login', authController.login);

// // protected
// router.get('/profile', requireAuth(), authController.profile);

// module.exports = router;

// backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', requireAuth(), authController.profile);

module.exports = router;
