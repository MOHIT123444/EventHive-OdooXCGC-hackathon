const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Create default events if they don't exist
    try {
      // Find or create an admin user for default events
      let adminUser = await User.findOne({ role: 'admin' });
      
      if (!adminUser) {
        // Create a default admin user if none exists
        adminUser = await User.create({
          name: 'System Admin',
          email: 'admin@eventhive.com',
          password: 'admin123',
          role: 'admin'
        });
        console.log('✅ Default admin user created');
      }
      
      // Create default events
      await Event.createDefaultEvents(adminUser._id);
      
    } catch (error) {
      console.log('⚠️ Could not create default events:', error.message);
    }
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
