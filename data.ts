import { User, Tournament, Participant, Transaction } from './types';

export const initialUsers: User[] = [
    { id: 1, username: 'PlayerOne', email: 'playerone@email.com', wallet_balance: 1500, role: 'admin', password: 'admin' },
    { id: 2, username: 'ProGamer', email: 'progamer@email.com', wallet_balance: 500, role: 'user', password: 'password' },
];

export const initialTournaments: Tournament[] = [
    { 
        id: 1, 
        title: 'BGMI Ultimate Showdown', 
        game_name: 'BGMI', 
        entry_fee: 100, 
        prize_pool: 5000, 
        match_time: '2024-08-15T18:00:00Z',
        status: 'Upcoming',
        commission_percentage: 10,
    },
    { 
        id: 2, 
        title: 'Free Fire Weekly Clash', 
        game_name: 'Free Fire', 
        entry_fee: 50, 
        prize_pool: 2500, 
        match_time: '2024-08-16T20:00:00Z',
        status: 'Upcoming',
        commission_percentage: 15,
    },
    { 
        id: 3, 
        title: 'COD Mobile Pro League', 
        game_name: 'COD Mobile', 
        entry_fee: 200, 
        prize_pool: 10000, 
        match_time: '2024-08-10T19:00:00Z',
        status: 'Live',
        room_id: 'CODPRO123',
        room_password: 'SECRET_PASSWORD',
        commission_percentage: 20,
    },
    { 
        id: 4, 
        title: 'Valorant Champions Tour', 
        game_name: 'Valorant', 
        entry_fee: 0, 
        prize_pool: 1000, 
        match_time: '2024-08-01T15:00:00Z',
        status: 'Completed',
        winner_id: 2,
        commission_percentage: 0,
    }
];

export const initialParticipants: Participant[] = [
    { id: 1, user_id: 1, tournament_id: 3 },
    { id: 2, user_id: 2, tournament_id: 3 },
    { id: 3, user_id: 1, tournament_id: 4 },
    { id: 4, user_id: 2, tournament_id: 4 },
    { id: 5, user_id: 1, tournament_id: 1 },
    { id: 6, user_id: 2, tournament_id: 1 },
    { id: 7, user_id: 2, tournament_id: 2 },
];

export const initialTransactions: Transaction[] = [
    { id: 1, user_id: 1, amount: 1000, type: 'credit', description: 'Initial Deposit', created_at: '2024-08-01T10:00:00Z' },
    { id: 2, user_id: 1, amount: 200, type: 'debit', description: 'Entry for COD Mobile Pro League', created_at: '2024-08-09T11:00:00Z' },
    { id: 3, user_id: 2, amount: 500, type: 'credit', description: 'Added Funds', created_at: '2024-08-02T12:00:00Z' },
    { id: 4, user_id: 2, amount: 10000, type: 'credit', description: 'Prize for Valorant Champions Tour', created_at: '2024-08-01T22:00:00Z' }
];