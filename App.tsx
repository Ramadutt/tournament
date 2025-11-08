
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import MyTournaments from './pages/MyTournaments';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Login from './pages/Login';

const App: React.FC = () => {
  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => e.preventDefault();
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
        e.preventDefault();
      }
    };
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextmenu);
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('contextmenu', handleContextmenu);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <AuthProvider>
      <div className="w-full max-w-md mx-auto h-screen overflow-hidden flex flex-col bg-gray-900">
        <Router />
      </div>
    </AuthProvider>
  );
};

const Router: React.FC = () => {
  const { user } = useAuth();

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Layout><Home /></Layout> : <Navigate to="/login" />} />
        <Route path="/my-tournaments" element={user ? <Layout><MyTournaments /></Layout> : <Navigate to="/login" />} />
        <Route path="/wallet" element={user ? <Layout><Wallet /></Layout> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Layout><Profile /></Layout> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
