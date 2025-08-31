const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        error: true, 
        message: 'User with this email already exists. Please use a different email or try logging in.' 
      });
    }
    
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ success: true, data: { user, token: generateToken(user._id) } });
  } catch (err) {
    // Handle MongoDB validation errors
    if (err.code === 11000) {
      return res.status(400).json({ 
        error: true, 
        message: 'User with this email already exists. Please use a different email or try logging in.' 
      });
    }
    
    // Handle other validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ 
        error: true, 
        message: messages.join(', ') 
      });
    }
    
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: true, message: 'Invalid credentials' });
    }
    res.json({ success: true, data: { user, token: generateToken(user._id) } });
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }
    res.json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};
