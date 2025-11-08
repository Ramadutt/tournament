
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');

  const handleUpdateDetails = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ username, email });
    setMessage('Details updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="p-4 space-y-8">
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-teal-500 mx-auto flex items-center justify-center text-4xl font-bold mb-2">
          {user?.username.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold">{user?.username}</h2>
        <p className="text-gray-400">{user?.email}</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg space-y-4">
        <h3 className="font-bold text-lg">Edit Profile</h3>
        <form onSubmit={handleUpdateDetails} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400" htmlFor="username">Username</label>
            <input 
              id="username" 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-teal-500 focus:border-teal-500" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-400" htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-teal-500 focus:border-teal-500" 
            />
          </div>
          {message && <p className="text-green-400 text-sm">{message}</p>}
          <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
            Save Changes
          </button>
        </form>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg space-y-4">
        <h3 className="font-bold text-lg">Change Password</h3>
        <form className="space-y-4">
          <div>
            <label className="text-sm text-gray-400" htmlFor="current_password">Current Password</label>
            <input id="current_password" type="password" className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1" />
          </div>
          <div>
            <label className="text-sm text-gray-400" htmlFor="new_password">New Password</label>
            <input id="new_password" type="password" className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1" />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
            Update Password
          </button>
        </form>
      </div>

      <button
        onClick={logout}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <i className="fa-solid fa-right-from-bracket"></i>
        Logout
      </button>
    </div>
  );
};

export default Profile;
