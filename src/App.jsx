import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import FeedPage from './pages/FeedPage';
import Layout from './components/layout/Layout';
import { useAuthStore } from './store/authStore';

const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/home" element={<FeedPage />} />
          <Route path="/explore" element={<div className="p-4 text-white">Explore Page (Coming Soon)</div>} />
          <Route path="/notifications" element={<div className="p-4 text-white">Notifications Page (Coming Soon)</div>} />
          <Route path="/messages" element={<div className="p-4 text-white">Messages Page (Coming Soon)</div>} />
          <Route path="/profile/:handle" element={<div className="p-4 text-white">Profile Page (Coming Soon)</div>} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
