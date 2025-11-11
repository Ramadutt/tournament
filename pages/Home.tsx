import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Tournament } from '../types';
import { Link } from 'react-router-dom';

const AdminTournamentCard: React.FC<{ tournament: Tournament }> = ({ tournament }) => {
    const { participants } = useAuth();
    const participantCount = participants.filter(p => p.tournament_id === tournament.id).length;

    const getStatusChip = (status: string) => {
        switch (status) {
            case 'Live':
                return 'bg-red-500/20 text-red-400 animate-pulse';
            case 'Completed':
                return 'bg-gray-600 text-gray-300';
            case 'Upcoming':
            default:
                return 'bg-blue-500/20 text-blue-400';
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-white">{tournament.title}</h3>
                    <p className="text-sm text-gray-400">{tournament.game_name}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusChip(tournament.status)}`}>
                    {tournament.status}
                </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-300">
                <div>
                    <p className="text-gray-500">Prize</p>
                    <p className="font-semibold">₹{tournament.prize_pool}</p>
                </div>
                <div>
                    <p className="text-gray-500">Entry</p>
                    <p className="font-semibold">₹{tournament.entry_fee}</p>
                </div>
                <div>
                    <p className="text-gray-500">Participants</p>
                    <p className="font-semibold">{participantCount}</p>
                </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
                <button className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md">Set Winner</button>
                <button className="text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-md">Edit</button>
            </div>
        </div>
    );
};

const ManageTournaments: React.FC = () => {
  const { tournaments } = useAuth();

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Tournaments</h2>
        <Link to="/create-tournament" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
            <i className="fa-solid fa-plus"></i>
            Create
        </Link>
      </div>
      {tournaments.length > 0 ? (
        tournaments.map(tournament => (
          <AdminTournamentCard key={tournament.id} tournament={tournament} />
        ))
      ) : (
        <div className="text-center text-gray-500 py-10">
            <p>No tournaments found.</p>
            <p>Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default ManageTournaments;