
import React, { useState } from 'react';
import { Tournament } from '../types';
import { useAuth } from '../context/AuthContext';

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  const { joinTournament } = useAuth();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = joinTournament(tournament.id);
    setMessage({ type: result.success ? 'success' : 'error', text: result.message });
    setTimeout(() => setMessage(null), 3000);
  };

  const matchDate = new Date(tournament.match_time);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
      <img src={`https://picsum.photos/seed/${tournament.id}/400/200`} alt={tournament.game_name} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1">{tournament.title}</h3>
        <p className="text-sm text-gray-400 mb-4">{tournament.game_name}</p>
        
        <div className="grid grid-cols-2 gap-4 text-center mb-4">
          <div>
            <p className="text-xs text-gray-500">Prize Pool</p>
            <p className="font-bold text-teal-400">₹{tournament.prize_pool}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Entry Fee</p>
            <p className="font-bold text-white">₹{tournament.entry_fee}</p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-300 mb-4">
            <i className="fa-solid fa-clock mr-2"></i>
            {matchDate.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
        </div>

        {message && (
          <div className={`p-2 rounded-md text-sm text-center mb-2 ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleJoin}>
            <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                Join Now
            </button>
        </form>
      </div>
    </div>
  );
};

export default TournamentCard;
