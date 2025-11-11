import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ title: string; value: string | number; icon: string; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 border border-gray-700">
    <div className={`text-2xl p-3 rounded-full ${color}`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const { users, tournaments, participants } = useAuth();

  const totalUsers = users.length;
  const totalTournaments = tournaments.length;
  
  const totalPrizeDistributed = tournaments
    .filter(t => t.status === 'Completed' && t.winner_id)
    .reduce((sum, t) => sum + t.prize_pool, 0);
  
  const totalRevenue = tournaments.reduce((revenue, t) => {
    const participantCount = participants.filter(p => p.tournament_id === t.id).length;
    const tournamentRevenue = participantCount * t.entry_fee * (t.commission_percentage / 100);
    return revenue + tournamentRevenue;
  }, 0);

  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Total Users" value={totalUsers} icon="fa-users" color="bg-blue-500/20 text-blue-400" />
        <StatCard title="Total Tournaments" value={totalTournaments} icon="fa-trophy" color="bg-yellow-500/20 text-yellow-400" />
        <StatCard title="Prizes Distributed" value={`₹${totalPrizeDistributed.toLocaleString('en-IN')}`} icon="fa-gift" color="bg-green-500/20 text-green-400" />
        <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon="fa-coins" color="bg-purple-500/20 text-purple-400" />
      </div>

      <div className="space-y-3">
          <Link 
            to="/manage-tournaments" 
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-lg"
          >
            <i className="fa-solid fa-trophy"></i>
            Manage Tournaments
          </Link>
          <Link 
            to="/manage-users" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-lg"
          >
            <i className="fa-solid fa-users"></i>
            Manage Users
          </Link>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mt-4 border border-gray-700">
          <h3 className="font-bold mb-2">Recent Activity</h3>
          <p className="text-sm text-gray-500 text-center py-4">Activity log will be shown here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;