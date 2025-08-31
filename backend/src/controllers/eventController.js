const Event = require('../models/Event');

// Get all events (public)
exports.getEvents = async (req, res, next) => {
  try {
    const { category, status, search } = req.query;
    
    let filter = { status: { $ne: 'cancelled' } };
    
    // Filter by category
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    // Filter by status
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    // Search by title or description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const events = await Event.find(filter)
      .populate('organizer', 'name email')
      .sort({ date: 1 })
      .limit(50);
    
    res.json({ 
      success: true, 
      data: events,
      count: events.length
    });
  } catch (err) {
    next(err);
  }
};

// Get single event by ID
exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email');
    
    if (!event) {
      return res.status(404).json({ 
        error: true, 
        message: 'Event not found' 
      });
    }
    
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

// Create new event (admin/organizer only)
exports.createEvent = async (req, res, next) => {
  try {
    const eventData = {
      ...req.body,
      organizer: req.user.id
    };
    
    const event = await Event.create(eventData);
    const populatedEvent = await Event.findById(event._id)
      .populate('organizer', 'name email');
    
    res.status(201).json({ 
      success: true, 
      data: populatedEvent 
    });
  } catch (err) {
    next(err);
  }
};

// Update event (admin/organizer only)
exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ 
        error: true, 
        message: 'Event not found' 
      });
    }
    
    // Check if user is organizer or admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        error: true, 
        message: 'Not authorized to update this event' 
      });
    }
    
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('organizer', 'name email');
    
    res.json({ success: true, data: updatedEvent });
  } catch (err) {
    next(err);
  }
};

// Delete event (admin/organizer only)
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ 
        error: true, 
        message: 'Event not found' 
      });
    }
    
    // Check if user is organizer or admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        error: true, 
        message: 'Not authorized to delete this event' 
      });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    
    res.json({ 
      success: true, 
      message: 'Event deleted successfully' 
    });
  } catch (err) {
    next(err);
  }
};
