import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Statistics } from './components/Statistics';
import { SyncPage } from './components/SyncPage';
import { SettingsPage } from './components/SettingsPage';
import { BottomNav } from './components/BottomNav';

export type Screen = 'map' | 'stats' | 'sync' | 'settings';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('map');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'map':
        return <Dashboard />;
      case 'stats':
        return <Statistics />;
      case 'sync':
        return <SyncPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
    </div>
  );
}
