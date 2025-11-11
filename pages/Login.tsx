import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (!success) {
      setError('Invalid admin credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-900">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-400">DHAKA JI</h1>
          <p className="text-gray-400">Admin Panel</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center text-white mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400" htmlFor="login_username">Username</label>
              <input 
                id="login_username" 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., PlayerOne"
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-teal-500 focus:border-teal-500 text-white" 
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400" htmlFor="login_password">Password</label>
              <input 
                id="login_password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-teal-500 focus:border-teal-500 text-white" 
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;