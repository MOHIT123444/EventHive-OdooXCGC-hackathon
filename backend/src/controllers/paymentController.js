const Payment = require('../models/Payment');

exports.createPayment = async (req,res,next)=>{
  try{
    const payment = await Payment.create(req.body);
    res.status(201).json({success:true,payment});
  }catch(err){ next(err);}
};

exports.getPayments = async (req,res,next)=>{
  try{
    const payments = await Payment.find().populate('booking');
    res.json({success:true,payments});
  }catch(err){ next(err);}
};
