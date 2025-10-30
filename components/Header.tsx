import React from 'react';
import { Profile } from '../types';

interface HeaderProps {
    profile: Profile;
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ profile, onMenuClick }) => {
    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center relative z-20">
             <button 
                onClick={onMenuClick} 
                className="text-gray-600 focus:outline-none md:hidden"
                aria-label="Open menu"
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center md:text-left px-2 flex-shrink min-w-0">Math Adventures</h1>
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {profile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="font-semibold text-gray-700">{profile.name}</p>
                    <p className="text-sm text-gray-500">Grade {profile.grade}</p>
                </div>
            </div>
        </header>
    );
};

export default Header;