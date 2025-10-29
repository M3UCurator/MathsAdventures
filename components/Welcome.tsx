import React from 'react';
import { Topic } from '../types';

interface WelcomeProps {
  onTopicSelect: (topic: Topic) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onTopicSelect }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    Ready for an Adventure?
                </span>
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-lg">
                Pick a subject from the list on the left to start learning and playing. You can do it!
            </p>
            <div className="mt-8 text-blue-400">
                <svg className="w-32 h-32 md:w-48 md:h-48 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v11.494m-9-5.747h18M5.468 18.39a9 9 0 1113.064 0M18.532 5.61a9 9 0 11-13.064 0" /></svg>
            </div>
            <button
                onClick={() => onTopicSelect(Topic.Numbers)}
                className="mt-8 px-8 py-4 bg-green-500 text-white font-bold text-xl md:text-2xl rounded-xl shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
            >
                Start with Numbers!
            </button>
        </div>
    );
};

export default Welcome;
