// // src/middlewares/errorHandler.js
// // Centralized error handler

// module.exports = function errorHandler(err, req, res, next) {
//   console.error('💥 ERROR:', err && err.message ? err.message : err);
//   const status = err.status || 500;
//   res.status(status).json({
//     error: true,
//     message: err.message || 'Internal Server Error',
//   });
// };

// src/middlewares/errorHandler.js
// module.exports = function errorHandler(err, req, res, next) {
//   // Simple, consistent error response — good for debugging
//   console.error('💥 ERROR:', err && err.stack ? err.stack : err);
//   const status = err.status || 500;
//   const message = err.message || 'Internal Server Error';
//   res.status(status).json({ error: true, message });
// };

// backend/src/middlewares/errorHandler.js
module.exports = function errorHandler(err, req, res, next) {
  console.error('💥 ERROR:', err && err.stack ? err.stack : err);
  const status = err.status || 500;
  res.status(status).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
};
