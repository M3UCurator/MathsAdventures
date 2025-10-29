
import React from 'react';
import { Profile } from '../types';

interface HeaderProps {
    profile: Profile;
}

const Header: React.FC<HeaderProps> = ({ profile }) => {
    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Math Adventures</h1>
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
