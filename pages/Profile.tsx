import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center font-bold text-lg">
                {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
                <p className="font-bold text-white">{user.username}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
            </div>
        </div>
        <div>
            <p className="text-sm text-gray-400">Balance</p>
            <p className="font-bold text-white">₹{user.wallet_balance.toFixed(2)}</p>
        </div>
    </div>
  );
};


const ManageUsers: React.FC = () => {
  const { users } = useAuth();
  
  // Filter out the current admin from the list if needed, but showing all is fine for management.
  // const regularUsers = users.filter(u => u.role !== 'admin');

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Manage Users</h2>
      
      <div className="space-y-3">
        {users.map(user => (
            <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;