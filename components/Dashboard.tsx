
import React from 'react';
import { Topic } from '../types';
import { TOPICS } from '../constants';
import TopicCard from './TopicCard';

interface DashboardProps {
  onTopicSelect: (topic: Topic) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onTopicSelect }) => {
  return (
    <div>
        <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    Ready for an Adventure?
                </span>
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Pick a subject below to start learning and playing. You can do it!
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPICS.map((topic) => (
                <TopicCard key={topic.id} topic={topic} onSelect={onTopicSelect} />
            ))}
        </div>
    </div>
  );
};

export default Dashboard;
