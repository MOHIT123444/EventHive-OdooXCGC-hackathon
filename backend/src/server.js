// server.js
// Entry point: sets up app, DB, and starts server

require('dotenv').config();
require('express-async-errors'); // to bubble async errors to error middleware

const http = require('http');
const app = require('./src/app'); // Express app
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Connect to DB then start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to DB connection error:', err);
    process.exit(1);
  });
