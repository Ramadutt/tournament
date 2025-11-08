
import React from 'react';
import { useAuth } from '../context/AuthContext';
import TournamentCard from '../components/TournamentCard';

const Home: React.FC = () => {
  const { tournaments } = useAuth();
  const upcomingTournaments = tournaments.filter(t => t.status === 'Upcoming');

  return (
    <div className="p-4 space-y-4">
      {upcomingTournaments.length > 0 ? (
        upcomingTournaments.map(tournament => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))
      ) : (
        <div className="text-center text-gray-500 py-10">
            <p>No upcoming tournaments right now.</p>
            <p>Check back later!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
