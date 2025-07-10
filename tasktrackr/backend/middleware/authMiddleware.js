import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' HttpOnly cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Select '-password' to exclude the password field from the user object
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found for this token');
      }
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      res.status(401); // Unauthorized
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401); // Unauthorized
    throw new Error('Not authorized, no token');
  }
});

// Optional: Middleware for admin authorization (if needed in the future)
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) { // Assuming an 'isAdmin' field in User model
    next();
  } else {
    res.status(403); // Forbidden
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
