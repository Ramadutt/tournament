
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Transaction } from '../types';

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const isCredit = transaction.type === 'credit';
    const date = new Date(transaction.created_at);
    return (
        <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <div>
                <p className="font-semibold text-white">{transaction.description}</p>
                <p className="text-xs text-gray-400">{date.toLocaleString('en-IN')}</p>
            </div>
            <p className={`font-bold ${isCredit ? 'text-green-400' : 'text-red-400'}`}>
                {isCredit ? '+' : '-'} ₹{transaction.amount.toFixed(2)}
            </p>
        </div>
    );
};

const Wallet: React.FC = () => {
    const { user, transactions } = useAuth();
    const userTransactions = transactions.filter(t => t.user_id === user?.id);

    return (
        <div className="p-4 space-y-6">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-6 rounded-xl shadow-lg text-center text-white">
                <p className="text-sm opacity-80">Current Balance</p>
                <p className="text-4xl font-bold tracking-tight">₹{user?.wallet_balance.toFixed(2)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                    <i className="fa-solid fa-plus"></i>
                    Add Money
                </button>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                    <i className="fa-solid fa-arrow-down"></i>
                    Withdraw
                </button>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
                <div className="bg-gray-800 p-4 rounded-lg">
                    {userTransactions.length > 0 ? (
                        userTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)
                    ) : (
                        <p className="text-center text-gray-500 py-5">No transactions yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wallet;
