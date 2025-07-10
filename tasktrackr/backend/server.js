import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
// import taskRoutes from './routes/taskRoutes.js'; // Will be added later

// Load environment variables
dotenv.config();

const port = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to parse cookies
app.use(cookieParser());

// --- Routes ---
app.get('/', (req, res) => {
  res.send('TaskTrackr API is running...');
});

app.use('/api/users', authRoutes);
// app.use('/api/tasks', taskRoutes); // To be implemented later

// --- Error Handling Middleware ---

// Not Found Error Handler
// This middleware will be triggered if no other route matches
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the next error handling middleware
};

// General Error Handler
// This middleware will catch any errors passed by `next(error)`
// It should be the last piece of middleware added to the stack
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    // Extract field name from error message if possible
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    // Combine multiple validation error messages
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  res.status(statusCode).json({
    message: message,
    // Send stack trace only in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
