import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { generateQuizQuestions } from '../services/geminiService';
import SummaryPage from './SummaryPage';

interface QuizProps {
    topicTitle: string;
    quizSet: number;
    onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ topicTitle, quizSet, onBack }) => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchQuestions = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const fetchedQuestions = await generateQuizQuestions(topicTitle, quizSet);
            setQuestions(fetchedQuestions);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchQuestions();
    }, [topicTitle, quizSet]);

    const handleAnswerSelect = (answer: string) => {
        setUserAnswer(answer);
    };

    const handleNextQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];
        let isCorrect = false;

        if (currentQuestion.type === 'multiple-choice') {
            if (userAnswer === currentQuestion.correctAnswer) {
                isCorrect = true;
            }
        } else if (currentQuestion.type === 'input') {
            if (parseInt(userAnswer, 10) === currentQuestion.correctAnswer) {
                isCorrect = true;
            }
        }

        if (isCorrect) {
            setScore(score + 1);
        }

        setUserAnswer('');

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsFinished(true);
        }
    };
    
    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswer('');
        setScore(0);
        setIsFinished(false);
        fetchQuestions(); // Refetch questions for a new attempt
    };


    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-700">Creating your quiz...</h2>
                <p className="text-gray-500 mt-2">This might take a moment!</p>
            </div>
        );
    }

    if (error) {
         return (
            <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-2xl shadow-lg text-center">
                <h2 className="text-2xl font-bold text-red-600">Oh no!</h2>
                <p className="text-gray-600 mt-2 mb-4">{error}</p>
                <button onClick={onBack} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
                    Go Back
                </button>
            </div>
        );
    }
    
    if (isFinished) {
        return <SummaryPage score={score} total={questions.length} onRestart={restartQuiz} onBack={onBack} />;
    }

    if (questions.length === 0) {
        return (
            <div className="flex items-center justify-center h-full bg-white p-8 rounded-2xl shadow-lg">
                <p className="text-xl text-gray-600">No quiz questions available right now. Please try again later.</p>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
            <div className="mb-6">
                <p className="text-sm font-semibold text-blue-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
                <h2 className="text-2xl font-bold text-gray-800 mt-2">{currentQuestion.question}</h2>
            </div>
            
            {currentQuestion.type === 'multiple-choice' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                                userAnswer === option
                                    ? 'bg-blue-500 border-blue-600 text-white shadow-lg'
                                    : 'bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400'
                            }`}
                        >
                            <span className="font-semibold">{option}</span>
                        </button>
                    ))}
                </div>
            )}

            {currentQuestion.type === 'input' && (
                 <div className="mt-4">
                    <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => handleAnswerSelect(e.target.value)}
                        className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg"
                        placeholder="Type your answer here"
                    />
                </div>
            )}

            <div className="mt-8 text-right">
                <button
                    onClick={handleNextQuestion}
                    disabled={!userAnswer}
                    className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition"
                >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
            </div>
        </div>
    );
};

export default Quiz;