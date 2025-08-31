# EventHive - Event Management System

A full-stack event management application built with Node.js, Express, MongoDB backend and React frontend.

## 🚀 Features

- **User Authentication**: JWT-based login/registration system
- **Role-based Access**: Admin, Manager, Volunteer, and Attendee roles
- **Event Bookings**: Manage event reservations
- **Payment Processing**: Handle event payments
- **Notifications**: Real-time notification system
- **Responsive Design**: Modern, mobile-friendly UI

## 🏗️ Project Structure

```
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── services/       # Business logic
│   │   └── config/         # Configuration files
│   └── server.js           # Entry point
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── layouts/        # Layout components
│   │   ├── redux/          # State management
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json
└── README.md
```

## 🛠️ Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher)
- **npm** or **yarn**

## 📦 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd odoo-xcgc-eventhive
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
# Copy .env.example to .env and update the values
cp .env.example .env

# Update .env file with your MongoDB connection string and JWT secret
MONGO_URI=mongodb://localhost:27017/eventhive
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
# Copy .env.example to .env and update the values
cp .env.example .env

# Update .env file with your backend API URL
VITE_API_URL=http://localhost:5000/api
VITE_NODE_ENV=development
```

## 🚀 Running the Application

### Option 1: Run Backend and Frontend Separately

#### Backend (Terminal 1)
```bash
cd backend

# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

#### Frontend (Terminal 2)
```bash
cd frontend

# Development mode
npm run dev

# Build for production
npm run build
npm run preview
```

### Option 2: Run Both Simultaneously (Recommended)

#### Using Concurrently (Install globally first)
```bash
npm install -g concurrently

# From the root directory
concurrently "cd backend && npm run dev" "cd frontend && npm run dev"
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **MongoDB**: mongodb://localhost:27017/eventhive

## 🔐 Default Users

The system supports multiple user roles. You can create users through the registration endpoint:

- **Admin**: Full system access
- **Manager**: Event and booking management
- **Volunteer**: Limited access to events
- **Attendee**: Basic user access

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Payments
- `GET /api/payments` - Get payment history
- `POST /api/payments` - Process payment

### Notifications
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications` - Create notification

## 🎨 Frontend Features

- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean, intuitive interface
- **State Management**: Redux for global state
- **Protected Routes**: Authentication-based access control
- **Form Validation**: Client-side validation with error handling

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Uses Vite for fast development
```

### Database
```bash
# Access MongoDB shell
mongosh

# Use the database
use eventhive

# View collections
show collections
```

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify database exists

2. **Port Already in Use**
   - Change PORT in backend `.env`
   - Update frontend API URL accordingly

3. **CORS Issues**
   - Backend has CORS enabled
   - Check if frontend URL matches CORS settings

4. **JWT Token Issues**
   - Ensure JWT_SECRET is set in backend `.env`
   - Check token expiration

### Logs
- Backend logs appear in the terminal
- Frontend errors show in browser console
- MongoDB logs in MongoDB service

## 📝 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/eventhive
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Happy Coding! 🎉**
