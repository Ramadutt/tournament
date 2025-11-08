
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-xl font-bold text-teal-400">DHAKA JI</h1>
      {user && (
        <Link to="/wallet" className="bg-gray-700 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md">
          <i className="fa-solid fa-wallet text-teal-400"></i>
          <span>₹{user.wallet_balance.toFixed(2)}</span>
        </Link>
      )}
    </header>
  );
};

export default Header;
