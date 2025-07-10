import axios from 'axios';

// Base URL for the backend API
// During development, React (Vite) runs on a different port (e.g., 5173)
// and the backend runs on another (e.g., 5001).
// We need to proxy requests or use the full backend URL.
// For simplicity here, we'll use the full URL.
// In a production setup, these would typically be served from the same domain.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';


const apiClient = axios.create({
  baseURL: API_URL,
  // We are using HttpOnly cookies for JWT, so axios doesn't need to
  // handle Authorization headers directly for auth requests by default.
  // However, enabling withCredentials might be necessary if your backend
  // and frontend are on different subdomains in production, or for CSRF.
  withCredentials: true, // Important for sending HttpOnly cookies cross-origin during dev
});

// Interceptor to handle responses (optional, but good for global error handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error or show toast notification
    // Example: if (error.response && error.response.data.message) { toast.error(...) }
    // For now, just pass the error through
    return Promise.reject(error);
  }
);

// --- Authentication API Calls ---

export const signupUser = async (userData) => {
  try {
    const response = await apiClient.post('/users/signup', userData);
    return response.data; // Contains user info (_id, name, email)
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/users/login', credentials);
    return response.data; // Contains user info (_id, name, email)
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await apiClient.post('/users/logout');
    return response.data; // Contains { message: 'Logged out successfully' }
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const requestPasswordReset = async (emailData) => {
  try {
    // Assuming emailData is an object like { email: 'user@example.com' }
    const response = await apiClient.post('/users/reset-password', emailData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// --- User Profile API Calls (for bonus features, but good to define with auth) ---

export const getUserProfileApi = async () => { // Renamed to avoid conflict if used in a component named getUserProfile
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateUserProfileApi = async (profileData) => { // Renamed
  try {
    const response = await apiClient.put('/users/profile', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default apiClient;
