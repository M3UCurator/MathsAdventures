
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

    const handleProfileSubmit = (name: string, grade: number) => {
        setProfile({ name, grade });
    };

    const handleTopicSelect = (topic: Topic) => {
        setSelectedTopic(topic);
    };
    
    const handleBackToDashboard = () => {
        setSelectedTopic(null);
    };

    if (!profile) {
        return <ProfileEntry onSubmit={handleProfileSubmit} />;
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar onTopicSelect={handleTopicSelect} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header profile={profile} />
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
