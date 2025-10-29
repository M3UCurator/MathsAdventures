
import React from 'react';
import { Topic } from '../types';

interface TopicCardProps {
  topic: { id: Topic; title: string; color: string; };
  onSelect: (topic: Topic) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(topic.id)}
      className={`p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col justify-between h-40 ${topic.color}`}
    >
      <h3 className="text-2xl font-bold">{topic.title}</h3>
      <p className="text-right font-semibold">Start →</p>
    </button>
  );
};

export default TopicCard;
