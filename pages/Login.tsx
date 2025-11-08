import React, { useState } from 'react';
import TabSwitcher from '../components/TabSwitcher';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Login');
  const { login, signup } = useAuth();

  // State for Login form
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State for Sign Up form
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(loginUsername);
    if (!success) {
      setError('Invalid username or password.');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (signupPassword.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    const result = signup(signupUsername, signupEmail);
    if (!result.success) {
      setError(result.message);
    }
    // On success, the AuthContext will log the user in, and the router will handle the redirect.
  }

  const handleTabChange = (tab: string) => {
    setError('');
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-900">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-400">DHAKA JI</h1>
          <p className="text-gray-400">Your Ultimate Gaming Arena</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <TabSwitcher tabs={['Login', 'Sign Up']} activeTab={activeTab} setActiveTab={handleTabChange} />
          
          <div className="p-4">
            {activeTab === 'Login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400" htmlFor="login_username">Username</label>
                  <input 
                    id="login_username" 
                    type="text" 
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
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
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)} 
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 focus:ring-teal-500 focus:border-teal-500 text-white" 
                    required
                  />
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400" htmlFor="signup_username">Username</label>
                  <input id="signup_username" type="text" value={signupUsername} onChange={e => setSignupUsername(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1" required/>
                </div>
                <div>
                  <label className="text-sm text-gray-400" htmlFor="signup_email">Email</label>
                  <input id="signup_email" type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1" required/>
                </div>
                <div>
                  <label className="text-sm text-gray-400" htmlFor="signup_password">Password</label>
                  <input id="signup_password" type="password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1" required/>
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;