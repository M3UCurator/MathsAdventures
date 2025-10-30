
import React from 'react';
import { Topic } from '../types';
import { TOPICS } from '../constants';

interface SidebarProps {
  onTopicSelect: (topic: Topic) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onTopicSelect, isOpen, onClose }) => {
  return (
    <aside className={`w-64 bg-white shadow-lg flex-shrink-0 fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-700">Subjects</h2>
        <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-800" aria-label="Close menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
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
