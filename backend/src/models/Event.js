const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  currentBookings: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ['conference', 'workshop', 'seminar', 'meetup', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    trim: true
  }],
  requirements: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Virtual for available spots
eventSchema.virtual('availableSpots').get(function() {
  return this.capacity - this.currentBookings;
});

// Virtual for isFull
eventSchema.virtual('isFull').get(function() {
  return this.currentBookings >= this.capacity;
});

// Ensure virtuals are serialized
eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

// Static method to create default events
eventSchema.statics.createDefaultEvents = async function(adminUserId) {
  const defaultEvents = [
    {
      title: "Tech Conference 2024",
      description: "Join us for the biggest tech conference of the year featuring keynote speakers, workshops, and networking opportunities. Learn about the latest trends in AI, blockchain, and cloud computing.",
      date: new Date('2024-03-15'),
      time: "9:00 AM - 6:00 PM",
      location: "Convention Center, Downtown",
      capacity: 500,
      currentBookings: 120,
      price: 299,
      category: "conference",
      status: "upcoming",
      tags: ["technology", "networking", "innovation", "AI"],
      requirements: "Basic knowledge of technology concepts",
      organizer: adminUserId
    },
    {
      title: "Web Development Workshop",
      description: "Learn modern web development techniques including React, Node.js, and MongoDB in this hands-on workshop. Build a real project from scratch!",
      date: new Date('2024-03-20'),
      time: "2:00 PM - 8:00 PM",
      location: "Tech Hub, Innovation District",
      capacity: 50,
      currentBookings: 35,
      price: 99,
      category: "workshop",
      status: "upcoming",
      tags: ["web development", "react", "nodejs", "mongodb"],
      requirements: "Basic HTML, CSS, and JavaScript knowledge",
      organizer: adminUserId
    },
    {
      title: "Startup Networking Meetup",
      description: "Connect with fellow entrepreneurs, investors, and startup enthusiasts in a casual networking environment. Share ideas and find potential collaborators.",
      date: new Date('2024-03-25'),
      time: "6:00 PM - 9:00 PM",
      location: "Co-working Space, Business District",
      capacity: 100,
      currentBookings: 75,
      price: 0,
      category: "meetup",
      status: "upcoming",
      tags: ["startup", "networking", "entrepreneurship", "investment"],
      requirements: "Open to all",
      organizer: adminUserId
    },
    {
      title: "Data Science Seminar",
      description: "Explore the latest trends in data science, machine learning, and artificial intelligence. Learn from industry experts and researchers.",
      date: new Date('2024-03-30'),
      time: "10:00 AM - 4:00 PM",
      location: "University Auditorium",
      capacity: 200,
      currentBookings: 150,
      price: 149,
      category: "seminar",
      status: "upcoming",
      tags: ["data science", "AI", "machine learning", "analytics"],
      requirements: "Basic statistics and programming knowledge",
      organizer: adminUserId
    },
    {
      title: "Design Thinking Workshop",
      description: "Learn the principles of design thinking and how to apply them to solve complex problems. Work on real case studies and develop innovative solutions.",
      date: new Date('2024-04-05'),
      time: "1:00 PM - 7:00 PM",
      location: "Design Studio, Creative Quarter",
      capacity: 30,
      currentBookings: 20,
      price: 79,
      category: "workshop",
      status: "upcoming",
      tags: ["design thinking", "innovation", "problem solving", "creativity"],
      requirements: "No prior experience required",
      organizer: adminUserId
    },
    {
      title: "Cybersecurity Summit",
      description: "Stay ahead of cyber threats with insights from security experts. Learn about the latest security tools, best practices, and emerging threats.",
      date: new Date('2024-04-10'),
      time: "9:00 AM - 5:00 PM",
      location: "Security Center, Tech Park",
      capacity: 150,
      currentBookings: 80,
      price: 199,
      category: "conference",
      status: "upcoming",
      tags: ["cybersecurity", "security", "threats", "protection"],
      requirements: "Basic IT knowledge",
      organizer: adminUserId
    },
    {
      title: "Mobile App Development Bootcamp",
      description: "Intensive 3-day bootcamp covering iOS and Android development. Learn Swift, Kotlin, and mobile UI/UX design principles.",
      date: new Date('2024-04-15'),
      time: "9:00 AM - 6:00 PM",
      location: "Mobile Dev Lab, Innovation Center",
      capacity: 40,
      currentBookings: 25,
      price: 399,
      category: "workshop",
      status: "upcoming",
      tags: ["mobile development", "iOS", "Android", "UI/UX"],
      requirements: "Basic programming knowledge",
      organizer: adminUserId
    },
    {
      title: "Digital Marketing Meetup",
      description: "Network with digital marketing professionals and learn about SEO, social media, content marketing, and growth hacking strategies.",
      date: new Date('2024-04-20'),
      time: "7:00 PM - 10:00 PM",
      location: "Marketing Hub, Downtown",
      capacity: 80,
      currentBookings: 45,
      price: 0,
      category: "meetup",
      status: "upcoming",
      tags: ["digital marketing", "SEO", "social media", "growth"],
      requirements: "Open to all",
      organizer: adminUserId
    }
  ];

  try {
    // Check if events already exist
    const existingEvents = await this.countDocuments();
    if (existingEvents === 0) {
      await this.insertMany(defaultEvents);
      console.log('✅ Default events created successfully!');
    }
  } catch (error) {
    console.error('❌ Error creating default events:', error);
  }
};

module.exports = mongoose.model('Event', eventSchema);
