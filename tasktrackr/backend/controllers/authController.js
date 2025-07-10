import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from '../middleware/asyncHandler.js'; // We'll create this next

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400); // Bad Request
    throw new Error('User already exists');
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password, // Password will be hashed by pre-save middleware in User model
  });

  if (user) {
    const token = generateToken(user._id);

    // Send HttpOnly cookie (more secure than localStorage)
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // Do not send token in response body if using cookies primarily
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error('Invalid email or password');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private (user must be logged in to log out)
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0), // Set expiry to a past date
  });
  res.status(200).json({ message: 'Logged out successfully' });
});


// @desc    Reset Password (Placeholder)
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // In a real application, you would:
  // 1. Verify the email exists.
  // 2. Generate a password reset token and save it with an expiry.
  // 3. Send an email to the user with a link containing the token.
  // For this placeholder, we'll just simulate success.
  const userExists = await User.findOne({ email });
  if (!userExists) {
    // Still return a success-like message to prevent email enumeration
    // but log this attempt or handle it as per security policy.
    console.log(`Password reset attempt for non-existent email: ${email}`);
    res.status(200).json({ message: 'If your email is registered, you will receive a password reset link.' });
    return;
  }

  // Placeholder logic:
  console.log(`Password reset requested for ${email}. (Placeholder - no email sent)`);
  res.status(200).json({ message: 'If your email is registered, you will receive a password reset link.' });
});

// We will also need controllers for getting and updating user profile later (bonus)
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // req.user will be populated by the authMiddleware
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password; // Password will be hashed by pre-save hook
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      // Consider if you want to re-issue a token if email (part of identity) changes
      // or if password changes (for security). For simplicity, not re-issuing here.
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


export {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  getUserProfile,
  updateUserProfile,
};
