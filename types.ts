
export interface User {
  id: number;
  username: string;
  email: string;
  wallet_balance: number;
}

export interface Tournament {
  id: number;
  title: string;
  game_name: string;
  entry_fee: number;
  prize_pool: number;
  match_time: string;
  room_id?: string;
  room_password?: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  winner_id?: number;
}

export interface Participant {
    id: number;
    user_id: number;
    tournament_id: number;
}

export interface Transaction {
    id: number;
    user_id: number;
    amount: number;
    type: 'credit' | 'debit';
    description: string;
    created_at: string;
}
