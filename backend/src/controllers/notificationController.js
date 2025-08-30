// src/controllers/notificationController.js
const Notification = require('../models/Notification');
const sendEmail = require('../utils/sendEmail');

exports.createNotification = async (req, res, next) => {
  try {
    const { userId, eventId, type, message, sendAt } = req.body;
    const note = await Notification.create({ userId, eventId, type, message, sendAt });
    // optionally send immediately if sendAt is null or past
    if (!sendAt || new Date(sendAt) <= new Date()) {
      await sendEmail({ to: req.body.email, subject: 'Notification', text: message }).catch(e=>console.error(e));
      note.isSent = true;
      await note.save();
    }
    res.status(201).json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
};

//New 
exports.getUserNotifications = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const notes = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: notes });
  } catch (err) {
    next(err);
  }
};