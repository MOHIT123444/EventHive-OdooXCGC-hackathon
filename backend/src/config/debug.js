// // src/config/db.js
// // Mongoose connection helper

// const mongoose = require('mongoose');

// const DEFAULT_LOCAL_URI = 'mongodb://localhost:27017/eventhive_db';

// async function connectDB() {
//   const raw = (process.env.MONGO_URI || '').trim();
//   const uri = raw || DEFAULT_LOCAL_URI;

//   console.log('Attempting to connect to MongoDB:', raw ? 'Using MONGO_URI from .env' : DEFAULT_LOCAL_URI);

//   // connection options can be adjusted if needed
//   await mongoose.connect(uri, { dbName: process.env.MONGO_DBNAME || undefined });
//   console.log('🟢 MongoDB connected');
// }

// module.exports = connectDB;
