

const morgan = require('morgan');
require('dotenv').config();

require('express-async-errors'); // catches async route errors and forwards to error handler

const http = require('http');
const app = require('./backend/src/app'); 
const listEndpoints = require('express-list-endpoints');
console.log(listEndpoints(app));
           // <-- must resolve to backend/src/app.js
const connectDB = require('./backend/src/config/db');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Connect DB then start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to start server due to DB connection error:', err && err.message ? err.message : err);
    process.exit(1);
  });
