import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Tournament, Participant, Transaction } from '../types';
import { initialUsers, initialTournaments, initialParticipants, initialTransactions } from '../data';

interface AuthContextType {
  user: User | null;
  users: User[];
  tournaments: Tournament[];
  participants: Participant[];
  transactions: Transaction[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  createTournament: (newTournament: Omit<Tournament, 'id' | 'status'>) => { success: boolean, message: string };
  joinTournament: (tournamentId: number) => { success: boolean, message: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [tournaments, setTournaments] = useState<Tournament[]>(initialTournaments);
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (foundUser && foundUser.password === password && foundUser.role === 'admin') {
      setUser(foundUser);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setUser(null);
  };

  const createTournament = (newTournamentData: Omit<Tournament, 'id' | 'status'>): { success: boolean, message: string } => {
    const newTournament: Tournament = {
      id: tournaments.length + 1,
      status: 'Upcoming',
      ...newTournamentData
    };
    setTournaments(prev => [newTournament, ...prev]);
    return { success: true, message: 'Tournament created successfully!' };
  };

  // Fix: Implemented joinTournament to resolve a type error in a component.
  // Since this is an admin application, admins are blocked from joining tournaments.
  const joinTournament = (tournamentId: number): { success: boolean, message: string } => {
    return { success: false, message: 'Admin users cannot join tournaments.' };
  };

  return (
    <AuthContext.Provider value={{ user, users, tournaments, participants, transactions, login, logout, createTournament, joinTournament }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
