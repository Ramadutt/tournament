import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center sticky top-0 z-10 border-b border-gray-700">
      <h1 className="text-xl font-bold text-teal-400">DHAKA JI - ADMIN</h1>
      <button 
        onClick={logout} 
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm font-semibold flex items-center gap-2 shadow-md"
        aria-label="Logout"
      >
        <i className="fa-solid fa-right-from-bracket"></i>
        <span>Logout</span>
      </button>
    </header>
  );
};

export default Header;