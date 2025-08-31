const Notification = require('../models/Notification');

exports.createNotification = async (req,res,next)=>{
  try{
    const notification = await Notification.create(req.body);
    res.status(201).json({success:true,notification});
  }catch(err){ next(err);}
};

// exports.getUserNotifications = async (req,res,next)=>{
//   try{
//     const notifications = await Notification.find({user:req.user.id});
//     res.json({success:true,notifications});
//   }catch(err){ next(err);}
// };

exports.getUserNotifications = async (req, res, next) => {
  try {
    const filter = req.user ? { user: req.user.id } : {}; // filter by user if logged in
    const notifications = await Notification.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (err) {
    next(err);
  }
};
