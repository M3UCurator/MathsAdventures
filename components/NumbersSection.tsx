import React, { useState } from 'react';
import BackButton from './BackButton';
import Quiz from './Quiz';
import { WordProblem, Profile } from '../types';
import { generateWordProblem } from '../services/geminiService';

interface SectionProps {
    onBack: () => void;
    profile: Profile;
}

const NumbersSection: React.FC<SectionProps> = ({ onBack, profile }) => {
    const topicTitle = 'Numbers, Operations & Relationships';
    const [wordProblem, setWordProblem] = useState<WordProblem | null>(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeQuizSet, setActiveQuizSet] = useState<number | null>(null);

    const fetchWordProblem = async () => {
        setIsLoading(true);
        setFeedback('');
        setUserAnswer('');
        const problem = await generateWordProblem(profile.grade);
        setWordProblem(problem);
        setIsLoading(false);
    };

    const checkAnswer = () => {
        if (wordProblem && userAnswer) {
            if (parseInt(userAnswer, 10) === wordProblem.answer) {
                setFeedback('Correct! Well done!');
            } else {
                setFeedback(`Not quite. The correct answer is ${wordProblem.answer}. Keep trying!`);
            }
        }
    };

    if (activeQuizSet) {
        return <Quiz key={activeQuizSet} topicTitle={topicTitle} quizSet={activeQuizSet} onBack={() => setActiveQuizSet(null)} grade={profile.grade} />;
    }

    return (
        <div>
            <BackButton onClick={onBack} />
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{topicTitle}</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Word Problem Challenge</h3>
                        <p className="text-gray-600 mb-4">Let's solve a story sum!</p>
                        <button onClick={fetchWordProblem} disabled={isLoading} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition">
                            {isLoading ? 'Thinking...' : 'Get a New Problem'}
                        </button>

                        {wordProblem && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                                <p className="text-lg text-gray-800 mb-4">{wordProblem.problem}</p>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="number"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Your answer"
                                    />
                                    <button onClick={checkAnswer} className="px-5 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
                                        Check
                                    </button>
                                </div>
                                {feedback && <p className={`mt-3 font-semibold ${feedback.startsWith('Correct') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}
                            </div>
                        )}
                    </div>
                    <hr/>
                    <div>
                         <h3 className="text-xl font-semibold text-gray-700 mb-2">Topic Quizzes</h3>
                        <p className="text-gray-600 mb-4">Ready to test your knowledge? Pick a quiz to start!</p>
                        <div className="flex flex-wrap gap-4">
                            <button onClick={() => setActiveQuizSet(1)} className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition">
                                Start Quiz 1
                            </button>
                             <button onClick={() => setActiveQuizSet(2)} className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition">
                                Start Quiz 2
                            </button>
                             <button onClick={() => setActiveQuizSet(3)} className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition">
                                Start Quiz 3
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NumbersSection;
