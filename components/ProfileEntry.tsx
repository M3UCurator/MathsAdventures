
import React, { useState } from 'react';

interface ProfileEntryProps {
    onSubmit: (name: string, grade: number) => void;
}

const ProfileEntry: React.FC<ProfileEntryProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [grade, setGrade] = useState(2); // Default to Grade 2

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSubmit(name.trim(), grade);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-purple-400 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md text-center"
            >
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, Future Math Whiz!</h1>
                <p className="text-gray-600 mb-8">Let's get to know you.</p>
                <div className="mb-6">
                    <label htmlFor="name" className="block text-left text-gray-700 font-semibold mb-2">What's your name?</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="e.g. Thabo"
                        required
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="grade" className="block text-left text-gray-700 font-semibold mb-2">What grade are you in?</label>
                    <select
                        id="grade"
                        value={grade}
                        onChange={(e) => setGrade(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                    >
                        <option value={2}>Grade 2</option>
                        <option value={3}>Grade 3</option>
                        {/* Can add more grades later */}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-xl hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                    Let's Go!
                </button>
            </form>
        </div>
    );
};

export default ProfileEntry;
