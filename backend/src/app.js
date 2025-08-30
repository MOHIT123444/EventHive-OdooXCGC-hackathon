// src/app.js
// Configure express app, middleware, routes, and error handler

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const errorHandler = require('./middlewares/errorHandler');

// const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// mount API routers under /api
// app.use('/api', (req, res, next) => {
//   console.log(`API request: ${req.method} ${req.originalUrl}`);
//   next();
// }); // Log api requests

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);

// basic health-check
app.get('/', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// central error handler (must be last)
app.use(errorHandler);

module.exports = app;

// src/app.js - express app: middleware, routes, error handler

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// --- global middleware
app.use(cors());                // enable CORS for frontend integration
app.use(express.json());        // parse JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));         // request logging (dev)

// --- routes
app.use('/api/auth', authRoutes);

// health check
app.get('/', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// centralized error handler (must be last)
app.use(errorHandler);

module.exports = app;

// backend/src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');

const errorHandler = require('./middlewares/errorHandler');

// const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// mount routers
// mount API routers under /api
app.use('/api', (req, res, next) => {
  console.log(`API request: ${req.method} ${req.originalUrl}`);
  next();
}); // Log api requests


app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);

// healthcheck
app.get('/', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// centralized error handler (last)
app.use(errorHandler);

module.exports = app;
