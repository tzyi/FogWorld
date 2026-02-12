import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Dashboard from './src/components/Dashboard';
import Statistics from './src/components/Statistics';
import SyncPage from './src/components/SyncPage';
import SettingsPage from './src/components/SettingsPage';
import BottomNav from './src/components/BottomNav';

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
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* 主內容區域 */}
      <View style={styles.content}>{renderScreen()}</View>
      {/* 底部導覽列 */}
      <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
  },
});