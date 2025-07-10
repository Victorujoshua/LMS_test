import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Page Components (will be created next)
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage'; // Placeholder for now

// Import Components (will be created/updated next)
import Navbar from './components/Navbar';
// import ProtectedRoute from './components/ProtectedRoute'; // Will create later if needed

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar will be present on all pages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container mx-auto p-4"> {/* Basic page container */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Example of a protected route - concept, actual protection later */}
          {/* For now, DashboardPage is directly accessible */}
          <Route path="/dashboard" element={<DashboardPage />} />
          {/*
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          */}

          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
