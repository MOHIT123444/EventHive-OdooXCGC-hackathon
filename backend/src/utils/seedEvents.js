const Event = require('../models/Event');
const User = require('../models/User');

const sampleEvents = [
  {
    title: "Tech Conference 2024",
    description: "Join us for the biggest tech conference of the year featuring keynote speakers, workshops, and networking opportunities.",
    date: new Date('2024-03-15'),
    time: "9:00 AM",
    location: "Convention Center, Downtown",
    capacity: 500,
    currentBookings: 120,
    price: 299,
    category: "conference",
    status: "upcoming",
    tags: ["technology", "networking", "innovation"],
    requirements: "Basic knowledge of technology concepts"
  },
  {
    title: "Web Development Workshop",
    description: "Learn modern web development techniques including React, Node.js, and MongoDB in this hands-on workshop.",
    date: new Date('2024-03-20'),
    time: "2:00 PM",
    location: "Tech Hub, Innovation District",
    capacity: 50,
    currentBookings: 35,
    price: 99,
    category: "workshop",
    status: "upcoming",
    tags: ["web development", "react", "nodejs"],
    requirements: "Basic HTML, CSS, and JavaScript knowledge"
  },
  {
    title: "Startup Networking Meetup",
    description: "Connect with fellow entrepreneurs, investors, and startup enthusiasts in a casual networking environment.",
    date: new Date('2024-03-25'),
    time: "6:00 PM",
    location: "Co-working Space, Business District",
    capacity: 100,
    currentBookings: 75,
    price: 0,
    category: "meetup",
    status: "upcoming",
    tags: ["startup", "networking", "entrepreneurship"],
    requirements: "Open to all"
  },
  {
    title: "Data Science Seminar",
    description: "Explore the latest trends in data science, machine learning, and artificial intelligence.",
    date: new Date('2024-03-30'),
    time: "10:00 AM",
    location: "University Auditorium",
    capacity: 200,
    currentBookings: 150,
    price: 149,
    category: "seminar",
    status: "upcoming",
    tags: ["data science", "AI", "machine learning"],
    requirements: "Basic statistics and programming knowledge"
  },
  {
    title: "Design Thinking Workshop",
    description: "Learn the principles of design thinking and how to apply them to solve complex problems.",
    date: new Date('2024-04-05'),
    time: "1:00 PM",
    location: "Design Studio, Creative Quarter",
    capacity: 30,
    currentBookings: 20,
    price: 79,
    category: "workshop",
    status: "upcoming",
    tags: ["design thinking", "innovation", "problem solving"],
    requirements: "No prior experience required"
  }
];

const seedEvents = async () => {
  try {
    // Find an admin user to assign as organizer
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('No admin user found. Please create an admin user first.');
      return;
    }

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Create new events with admin as organizer
    const eventsWithOrganizer = sampleEvents.map(event => ({
      ...event,
      organizer: adminUser._id
    }));

    const createdEvents = await Event.create(eventsWithOrganizer);
    console.log(`Created ${createdEvents.length} sample events`);

    console.log('Sample events seeded successfully!');
  } catch (error) {
    console.error('Error seeding events:', error);
  }
};

module.exports = seedEvents;
