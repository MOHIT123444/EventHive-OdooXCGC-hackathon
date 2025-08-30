// // src/middlewares/authMiddleware.js
// // JWT auth + role-check helpers

// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// function requireAuth() {
//   return async function (req, res, next) {
//     try {
//       const header = req.headers.authorization;
//       if (!header || !header.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'No token provided' });
//       }
//       const token = header.split(' ')[1];
//       if (!process.env.JWT_SECRET) {
//         console.error('JWT_SECRET missing in .env');
//         return res.status(500).json({ error: 'Server misconfigured' });
//       }
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       // attach decoded payload
//       req.auth = decoded;
//       // optionally fetch full user document
//       req.user = await User.findById(decoded.id).select('-password');
//       if (!req.user) return res.status(401).json({ error: 'User not found' });
//       next();
//     } catch (err) {
//       console.error('Auth error:', err.message);
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
//   };
// }

// // role guard middleware factory
// function requireRole(...allowedRoles) {
//   return function (req, res, next) {
//     const role = (req.user && req.user.role) || (req.auth && req.auth.role);
//     if (!role || !allowedRoles.includes(role)) {
//       return res.status(403).json({ error: 'Forbidden: insufficient privileges' });
//     }
//     next();
//   };
// }

// module.exports = { requireAuth, requireRole };

// src/middlewares/authMiddleware.js
// requireAuth() validates JWT and attaches req.user (fetched from MongoDB User model)

// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// function requireAuth() {
//   return async function (req, res, next) {
//     try {
//       const authHeader = req.headers.authorization;
//       if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'No token provided' });
//       }
//       const token = authHeader.split(' ')[1];

//       if (!process.env.JWT_SECRET) {
//         console.error('JWT_SECRET missing in .env');
//         return res.status(500).json({ error: 'Server configuration error' });
//       }

//       let decoded;
//       try {
//         decoded = jwt.verify(token, process.env.JWT_SECRET);
//       } catch (err) {
//         return res.status(401).json({ error: 'Invalid or expired token' });
//       }

//       // Attach minimal decoded data
//       req.auth = decoded;

//       // Load full user doc from MongoDB (so controllers can use req.user)
//       const user = await User.findById(decoded.id).select('-password');
//       if (!user) return res.status(401).json({ error: 'User not found' });

//       req.user = user;
//       next();
//     } catch (err) {
//       next(err);
//     }
//   };
// }

// // role guard helper (usage: requireRole('admin','manager'))
// function requireRole(...allowedRoles) {
//   return (req, res, next) => {
//     const role = (req.user && req.user.role) || (req.auth && req.auth.role);
//     if (!role || !allowedRoles.includes(role)) {
//       return res.status(403).json({ error: 'Forbidden: insufficient privileges' });
//     }
//     next();
//   };
// }

// module.exports = { requireAuth, requireRole };

// backend/src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function requireAuth() {
  return async (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
      }
      const token = header.split(' ')[1];
      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET missing in .env');
        return res.status(500).json({ error: 'Server misconfigured' });
      }
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (e) {
        return res.status(401).json({ error: 'Token invalid or expired' });
      }

      // attach decoded minimal and full user doc
      req.auth = decoded;
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return res.status(401).json({ error: 'User not found' });
      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const role = (req.user && req.user.role) || (req.auth && req.auth.role);
    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient privileges' });
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
