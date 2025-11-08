import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { User, Tournament, Participant, Transaction } from '../types';
import { initialUsers, initialTournaments, initialParticipants, initialTransactions } from '../data';

interface AuthContextType {
  user: User | null;
  tournaments: Tournament[];
  participants: Participant[];
  transactions: Transaction[];
  login: (username: string) => boolean;
  logout: () => void;
  signup: (username: string, email: string) => { success: boolean; message: string };
  joinTournament: (tournamentId: number) => { success: boolean; message: string };
  updateUser: (newDetails: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [tournaments, setTournaments] = useState<Tournament[]>(initialTournaments);
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const login = (username: string): boolean => {
    const foundUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };
  
  const signup = (username: string, email: string): { success: boolean; message: string } => {
    const usernameExists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
    if (usernameExists) {
      return { success: false, message: 'Username already taken.' };
    }
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
        return { success: false, message: 'Email already registered.' };
    }

    const newUser: User = {
      id: users.length + 1,
      username,
      email,
      wallet_balance: 100, // Welcome bonus
    };

    setUsers(prev => [...prev, newUser]);
    setUser(newUser); // Automatically log in the new user

    return { success: true, message: 'Signup successful!' };
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (newDetails: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...newDetails };
      setUser(updatedUser);
      setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  const joinTournament = useCallback((tournamentId: number): { success: boolean; message: string } => {
    if (!user) return { success: false, message: 'You must be logged in.' };

    const tournament = tournaments.find(t => t.id === tournamentId);
    if (!tournament) return { success: false, message: 'Tournament not found.' };

    if (user.wallet_balance < tournament.entry_fee) {
      return { success: false, message: 'Insufficient wallet balance.' };
    }

    const alreadyJoined = participants.some(p => p.user_id === user.id && p.tournament_id === tournamentId);
    if (alreadyJoined) {
        return { success: false, message: 'You have already joined this tournament.' };
    }

    const newBalance = user.wallet_balance - tournament.entry_fee;
    const updatedUser = { ...user, wallet_balance: newBalance };
    setUser(updatedUser);
    setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? updatedUser : u));

    const newParticipant: Participant = {
        id: participants.length + 1,
        user_id: user.id,
        tournament_id: tournamentId
    };
    setParticipants(prev => [...prev, newParticipant]);

    const newTransaction: Transaction = {
        id: transactions.length + 1,
        user_id: user.id,
        amount: tournament.entry_fee,
        type: 'debit',
        description: `Entry for ${tournament.title}`,
        created_at: new Date().toISOString()
    };
    setTransactions(prev => [newTransaction, ...prev]);

    return { success: true, message: `Successfully joined ${tournament.title}!` };
  }, [user, tournaments, participants, transactions.length]);

  return (
    <AuthContext.Provider value={{ user, tournaments, participants, transactions, login, logout, joinTournament, updateUser, signup }}>
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