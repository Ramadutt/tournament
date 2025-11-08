
import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navItems = [
    { path: '/', icon: 'fa-home', label: 'Home' },
    { path: '/my-tournaments', icon: 'fa-trophy', label: 'My Tournaments' },
    { path: '/wallet', icon: 'fa-wallet', label: 'Wallet' },
    { path: '/profile', icon: 'fa-user', label: 'Profile' },
  ];

  const navLinkClasses = "flex flex-col items-center justify-center w-full text-gray-400";
  const activeNavLinkClasses = "text-teal-400";

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-gray-800 border-t border-gray-700 flex justify-around p-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
        >
          <i className={`fa-solid ${item.icon} text-xl`}></i>
          <span className="text-xs mt-1">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
