
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import NumbersSection from './components/NumbersSection';
import PatternsSection from './components/PatternsSection';
import GeometrySection from './components/GeometrySection';
import MeasurementSection from './components/MeasurementSection';
import DataHandlingSection from './components/DataHandlingSection';
import ProfileEntry from './components/ProfileEntry';
import { Topic, Profile } from './types';

const App: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleProfileSubmit = (name: string, grade: number) => {
        setProfile({ name, grade });
    };

    const handleTopicSelect = (topic: Topic) => {
        setSelectedTopic(topic);
        setSidebarOpen(false); // Close sidebar on topic selection for mobile
    };
    
    const handleBackToDashboard = () => {
        setSelectedTopic(null);
    };

    if (!profile) {
        return <ProfileEntry onSubmit={handleProfileSubmit} />;
    }

    return (
        <div className="relative h-screen flex bg-gray-100 font-sans overflow-hidden">
            <Sidebar 
                onTopicSelect={handleTopicSelect} 
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"></div>}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header profile={profile} onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
                    {!selectedTopic && <Dashboard onTopicSelect={handleTopicSelect} />}
                    {selectedTopic === Topic.Numbers && <NumbersSection onBack={handleBackToDashboard} profile={profile} />}
                    {selectedTopic === Topic.Patterns && <PatternsSection onBack={handleBackToDashboard} profile={profile} />}
                    {selectedTopic === Topic.Geometry && <GeometrySection onBack={handleBackToDashboard} profile={profile} />}
                    {selectedTopic === Topic.Measurement && <MeasurementSection onBack={handleBackToDashboard} profile={profile} />}
                    {selectedTopic === Topic.DataHandling && <DataHandlingSection onBack={handleBackToDashboard} profile={profile} />}
                </main>
            </div>
        </div>
    );
};

export default App;
