import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  getUserProfile,
  updateUserProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js'; // We'll create this next

const router = express.Router();

// Public routes
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword); // Placeholder

// Private routes (require authentication via 'protect' middleware)
router.post('/logout', logoutUser); // technically, logout can only happen if logged in
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
