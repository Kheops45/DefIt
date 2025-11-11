import React from 'react';
import { StarIcon, UserIcon, LogoutIcon, TrophyIcon } from './Icons';

type Page = 'dashboard' | 'profile';

interface HeaderProps {
    username: string;
    points: number;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ username, points, onNavigate, onLogout }) => {
    return (
        <header className="w-full max-w-7xl sticky top-4 z-50 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg p-4 flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                <TrophyIcon className="w-8 h-8 text-yellow-300"/>
                <span className="text-xl font-bold text-white">DefIT</span>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <StarIcon className="w-5 h-5 text-yellow-400"/>
                    <span className="font-semibold text-white">{points} pts</span>
                </div>
                <div className="flex items-center gap-4">
                     <button onClick={() => onNavigate('profile')} className="flex items-center gap-2 text-gray-200 hover:text-white transition group">
                        <UserIcon className="w-6 h-6 group-hover:text-indigo-300 transition" />
                        <span className="hidden sm:inline">{username}</span>
                    </button>
                    <button onClick={onLogout} className="flex items-center gap-2 text-gray-300 hover:text-white transition group">
                        <LogoutIcon className="w-6 h-6 text-red-400 group-hover:text-red-300 transition" />
                        <span className="hidden sm:inline">Déconnexion</span>
                    </button>
                </div>
            </div>
        </header>
    );
};