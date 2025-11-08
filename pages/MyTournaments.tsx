
import React, { useState } from 'react';
import TabSwitcher from '../components/TabSwitcher';
import { useAuth } from '../context/AuthContext';
import { Tournament } from '../types';

const MyTournamentCard: React.FC<{ tournament: Tournament, userWon: boolean }> = ({ tournament, userWon }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-white">{tournament.title}</h3>
                    <p className="text-sm text-gray-400">{tournament.game_name}</p>
                </div>
                {tournament.status === 'Completed' ? (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${userWon ? 'bg-green-500/20 text-green-400' : 'bg-gray-600 text-gray-300'}`}>
                        {userWon ? 'Winner' : 'Participated'}
                    </span>
                ) : (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${tournament.status === 'Live' ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-blue-500/20 text-blue-400'}`}>
                        {tournament.status}
                    </span>
                )}
            </div>
            {tournament.status === 'Live' && tournament.room_id && tournament.room_password && (
                 <div className="bg-gray-900 p-3 rounded-md text-center">
                    <p className="text-sm text-gray-400">Room ID: <span className="font-mono text-teal-400">{tournament.room_id}</span></p>
                    <p className="text-sm text-gray-400">Password: <span className="font-mono text-teal-400">{tournament.room_password}</span></p>
                 </div>
            )}
             <div className="text-xs text-gray-500 flex justify-between">
                <span>Prize: ₹{tournament.prize_pool}</span>
                <span>Entry: ₹{tournament.entry_fee}</span>
            </div>
        </div>
    );
};

const MyTournaments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Upcoming/Live');
  const { user, tournaments, participants } = useAuth();
  
  const joinedTournamentIds = participants
    .filter(p => p.user_id === user?.id)
    .map(p => p.tournament_id);

  const myTournaments = tournaments.filter(t => joinedTournamentIds.includes(t.id));

  const upcomingLive = myTournaments.filter(t => t.status === 'Upcoming' || t.status === 'Live');
  const completed = myTournaments.filter(t => t.status === 'Completed');

  return (
    <div className="p-4 space-y-4">
      <TabSwitcher tabs={['Upcoming/Live', 'Completed']} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="space-y-4">
        {activeTab === 'Upcoming/Live' && (
            upcomingLive.length > 0 ? (
                upcomingLive.map(t => <MyTournamentCard key={t.id} tournament={t} userWon={false} />)
            ) : (
                <p className="text-center text-gray-500 py-10">You haven't joined any upcoming tournaments.</p>
            )
        )}
        {activeTab === 'Completed' && (
            completed.length > 0 ? (
                completed.map(t => <MyTournamentCard key={t.id} tournament={t} userWon={t.winner_id === user?.id} />)
            ) : (
                 <p className="text-center text-gray-500 py-10">No completed tournaments to show.</p>
            )
        )}
      </div>
    </div>
  );
};

export default MyTournaments;
