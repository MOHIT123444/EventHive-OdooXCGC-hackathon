require('dotenv').config();
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Booking = require('./src/models/Booking');
const Payment = require('./src/models/Payment');
const Notification = require('./src/models/Notification');

async function seed(){
  await connectDB();
  await User.deleteMany();
  await Booking.deleteMany();
  await Payment.deleteMany();
  await Notification.deleteMany();

  const users = await User.create([
    {name:'Admin',email:'admin@test.com',password:'123456',role:'admin'},
    {name:'Manager',email:'manager@test.com',password:'123456',role:'manager'},
    {name:'Volunteer',email:'volunteer@test.com',password:'123456',role:'volunteer'},
    {name:'Attendee',email:'attendee@test.com',password:'123456',role:'attendee'}
  ]);

  const bookings = await Booking.create([
    {user:users[3]._id,event:'Event 1',date:new Date()},
    {user:users[3]._id,event:'Event 2',date:new Date()}
  ]);

  const payments = await Payment.create([
    {booking:bookings[0]._id,amount:100,status:'paid'},
    {booking:bookings[1]._id,amount:150,status:'pending'}
  ]);

  const notifications = await Notification.create([
    {user:users[3]._id,message:'Welcome to EventHive!'},
    {user:users[3]._id,message:'Your booking is confirmed'},
    {user:users[3]._id,message:'Your payment was successful'},
    {user:users[3]._id,message:'Your event is starting soon'},
    {user:users[3]._id,message:'Thank you for using EventHive!'}
  ]);

  console.log('✅ Seeded DB successfully');
  process.exit();
}

seed();


