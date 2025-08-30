const Notification = require('../models/Notification');

async function createNotification(userId, title, message) {
  const notification = new Notification({ user: userId, title, message });
  await notification.save();
  return notification;
}

async function getUserNotifications(userId) {
  return Notification.find({ user: userId }).sort({ createdAt: -1 });
}

module.exports = { createNotification, getUserNotifications };
