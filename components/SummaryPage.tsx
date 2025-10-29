
import React from 'react';

interface SummaryPageProps {
    score: number;
    total: number;
    onRestart: () => void;
    onBack: () => void;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ score, total, onRestart, onBack }) => {
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    let message = "Good try! Keep practicing!";
    if (percentage > 80) {
        message = "Excellent work! You're a math star!";
    } else if (percentage > 50) {
        message = "Great job! You're getting it!";
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-lg mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Quiz Complete!</h2>
            <p className="text-xl text-gray-600 mb-6">{message}</p>
            <div className="mb-6">
                <p className="text-lg text-gray-700">Your score:</p>
                <p className="text-6xl font-bold text-blue-500 my-2">
                    {score} <span className="text-4xl text-gray-500">/ {total}</span>
                </p>
                <p className="text-2xl font-semibold text-green-600">{percentage}%</p>
            </div>
            <div className="flex justify-center space-x-4 mt-8">
                <button
                    onClick={onRestart}
                    className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                >
                    Try Again
                </button>
                <button
                    onClick={onBack}
                    className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
                >
                    Back to Topic
                </button>
            </div>
        </div>
    );
};

export default SummaryPage;
