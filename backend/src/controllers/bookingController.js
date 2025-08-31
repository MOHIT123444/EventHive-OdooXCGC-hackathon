const Booking = require('../models/Booking');

exports.createBooking = async (req,res,next)=>{
  try{
    const booking = await Booking.create({...req.body,user:req.user.id});
    res.status(201).json({success:true,booking});
  }catch(err){ next(err);}
};

exports.getUserBookings = async (req,res,next)=>{
  try{
    const bookings = await Booking.find({user:req.user.id});
    res.json({success:true,bookings});
  }catch(err){ next(err);}
};
