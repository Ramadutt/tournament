import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateTournament: React.FC = () => {
  const { createTournament } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [gameName, setGameName] = useState('');
  const [entryFee, setEntryFee] = useState(0);
  const [prizePool, setPrizePool] = useState(0);
  const [matchTime, setMatchTime] = useState('');
  const [commission, setCommission] = useState(10);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!title || !gameName || !matchTime) {
        setMessage({ type: 'error', text: 'Please fill all required fields.'});
        return;
    }

    const result = createTournament({
        title,
        game_name: gameName,
        entry_fee: Number(entryFee),
        prize_pool: Number(prizePool),
        match_time: new Date(matchTime).toISOString(),
        commission_percentage: Number(commission)
    });

    setMessage({ type: result.success ? 'success' : 'error', text: result.message });
    if(result.success) {
        setTimeout(() => navigate('/manage-tournaments'), 1500);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Create New Tournament</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg space-y-4 border border-gray-700">
        <div>
          <label className="text-sm text-gray-400" htmlFor="title">Title</label>
          <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1" required/>
        </div>
        <div>
          <label className="text-sm text-gray-400" htmlFor="game_name">Game Name</label>
          <input id="game_name" type="text" value={gameName} onChange={e => setGameName(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1" required/>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm text-gray-400" htmlFor="entry_fee">Entry Fee (₹)</label>
                <input id="entry_fee" type="number" value={entryFee} onChange={e => setEntryFee(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1" />
            </div>
            <div>
                <label className="text-sm text-gray-400" htmlFor="prize_pool">Prize Pool (₹)</label>
                <input id="prize_pool" type="number" value={prizePool} onChange={e => setPrizePool(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1" />
            </div>
        </div>
        <div>
            <label className="text-sm text-gray-400" htmlFor="match_time">Match Time</label>
            <input id="match_time" type="datetime-local" value={matchTime} onChange={e => setMatchTime(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1" required/>
        </div>
        <div>
            <label className="text-sm text-gray-400" htmlFor="commission">Commission (%)</label>
            <input id="commission" type="number" value={commission} onChange={e => setCommission(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1" />
        </div>
        {message && <p className={`text-sm text-center ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message.text}</p>}
        <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
          Create Tournament
        </button>
      </form>
    </div>
  );
};

export default CreateTournament;