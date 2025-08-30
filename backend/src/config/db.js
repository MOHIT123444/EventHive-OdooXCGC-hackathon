// src/config/db.js
// Mongoose connection helper

const mongoose = require('mongoose');

const DEFAULT_LOCAL_URI = 'mongodb://localhost:27017/eventhive_db';

async function connectDB() {
  const raw = (process.env.MONGO_URI || '').trim();
  const uri = raw || DEFAULT_LOCAL_URI;

  console.log('Attempting to connect to MongoDB:', raw ? 'Using MONGO_URI from .env' : DEFAULT_LOCAL_URI);

  // connection options can be adjusted if needed
  await mongoose.connect(uri, { dbName: process.env.MONGO_DBNAME || undefined });
  console.log('🟢 MongoDB connected');
}

module.exports = connectDB;


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

// src/config/db.js - connects to MongoDB using MONGO_URI
// const mongoose = require('mongoose');

// async function connectDB() {
//   const uri = (process.env.MONGO_URI || '').trim();
//   if (!uri) {
//     throw new Error('MONGO_URI not set in .env — add connection string (MongoDB Atlas or local).');
//   }

//   console.log('Attempting MongoDB connection...');
//   // connect with recommended options
//   await mongoose.connect(uri, {
//     // options left default in Mongoose 7, but explicit if you prefer:
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true
//   });

//   mongoose.connection.on('connected', () => console.log('🟢 MongoDB connected'));
//   mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
//   mongoose.connection.on('disconnected', () => console.warn('⚠️ MongoDB disconnected'));
// }

// module.exports = connectDB;

// backend/src/config/db.js
// const mongoose = require('mongoose');

// async function connectDB() {
//   const uri = (process.env.MONGO_URI || '').trim();
//   if (!uri) {
//     throw new Error('MONGO_URI not set in .env — add your MongoDB connection string');
//   }
//   console.log('Attempting MongoDB connection...');
//   await mongoose.connect(uri);
//   mongoose.connection.on('connected', () => console.log('🟢 MongoDB connected'));
//   mongoose.connection.on('error', (err) => console.error('MongoDB error:', err));
//   mongoose.connection.on('disconnected', () => console.warn('⚠️ MongoDB disconnected'));
// }


// module.exports = connectDB;
