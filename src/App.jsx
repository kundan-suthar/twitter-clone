import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import Layout from './components/layout/Layout';
import { useAppStore } from './store/useAppStore';
import ProtectedRoute from './components/auth/ProtectedRoute';

const App = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const checkAuth = useAppStore((state) => state.checkAuth);
  const isCheckingAuth = useAppStore((state) => state.isCheckingAuth);

  React.useEffect(() => {
    (async () => {
      await checkAuth();
    })();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<FeedPage />} />
            <Route path="/explore" element={<div className="p-4 text-white">Explore Page (Coming Soon)</div>} />
            <Route path="/notifications" element={<div className="p-4 text-white">Notifications Page (Coming Soon)</div>} />
            <Route path="/messages" element={<div className="p-4 text-white">Messages Page (Coming Soon)</div>} />
            <Route path="/profile/:handle" element={<div className="p-4 text-white">Profile Page (Coming Soon)</div>} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
