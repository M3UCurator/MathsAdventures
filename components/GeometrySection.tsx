import React, { useState } from 'react';
import BackButton from './BackButton';
import Quiz from './Quiz';
import { Topic, Profile } from '../types';

interface SectionProps {
    onBack: () => void;
    profile: Profile;
}

const GeometrySection: React.FC<SectionProps> = ({ onBack, profile }) => {
    const topicTitle = Topic.Geometry;
    const [activeQuizSet, setActiveQuizSet] = useState<number | null>(null);

    if (activeQuizSet) {
        return <Quiz key={activeQuizSet} topicTitle={topicTitle} quizSet={activeQuizSet} onBack={() => setActiveQuizSet(null)} grade={profile.grade} />;
    }

    return (
        <div>
            <BackButton onClick={onBack} />
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{topicTitle}</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Let's explore shapes and space! Get ready to challenge your knowledge by picking a quiz.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <button onClick={() => setActiveQuizSet(1)} className="px-8 py-3 bg-purple-500 text-white font-bold text-lg rounded-lg hover:bg-purple-600 transition">
                        Start Quiz 1
                    </button>
                    <button onClick={() => setActiveQuizSet(2)} className="px-8 py-3 bg-purple-500 text-white font-bold text-lg rounded-lg hover:bg-purple-600 transition">
                        Start Quiz 2
                    </button>
                    <button onClick={() => setActiveQuizSet(3)} className="px-8 py-3 bg-purple-500 text-white font-bold text-lg rounded-lg hover:bg-purple-600 transition">
                        Start Quiz 3
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeometrySection;
