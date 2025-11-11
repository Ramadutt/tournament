import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageTournaments from './pages/Home'; // Repurposed for Manage Tournaments
import CreateTournament from './pages/MyTournaments'; // Repurposed for Create Tournament
import ManageUsers from './pages/Profile'; // Repurposed for Manage Users

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
  const isAdmin = user?.role === 'admin';

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={!isAdmin ? <Login /> : <Navigate to="/" />} />
        
        {/* Protected Admin Routes */}
        <Route path="/" element={isAdmin ? <Layout><AdminDashboard /></Layout> : <Navigate to="/login" />} />
        <Route path="/manage-tournaments" element={isAdmin ? <Layout><ManageTournaments /></Layout> : <Navigate to="/login" />} />
        <Route path="/create-tournament" element={isAdmin ? <Layout><CreateTournament /></Layout> : <Navigate to="/login" />} />
        <Route path="/manage-users" element={isAdmin ? <Layout><ManageUsers /></Layout> : <Navigate to="/login" />} />
        
        <Route path="*" element={<Navigate to={isAdmin ? "/" : "/login"} />} />
      </Routes>
    </HashRouter>
  );
};

export default App;