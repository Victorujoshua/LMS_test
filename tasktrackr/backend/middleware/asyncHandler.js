// This utility wraps async functions for Express route handlers.
// It catches any errors thrown in the async function and passes them to
// Express's next error handling middleware, avoiding the need for
// explicit try-catch blocks in every async route handler.

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
