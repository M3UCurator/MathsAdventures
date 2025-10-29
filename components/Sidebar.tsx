
import React from 'react';
import { Topic } from '../types';
import { TOPICS } from '../constants';

interface SidebarProps {
  onTopicSelect: (topic: Topic) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onTopicSelect }) => {
  return (
    <aside className="w-64 bg-white shadow-lg flex-shrink-0">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-700">Subjects</h2>
      </div>
      <nav>
        <ul>
          {TOPICS.map((topic) => (
            <li key={topic.id}>
              <button
                onClick={() => onTopicSelect(topic.id)}
                className="w-full text-left p-4 hover:bg-gray-100 focus:outline-none focus:bg-blue-100 focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <span className="font-semibold text-gray-800">{topic.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
