import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Map, BarChart2, Cloud, Settings } from 'lucide-react-native';
import { Screen } from '../../App';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const navItems = [
    { id: 'map', icon: Map, label: '探索地圖' },
    { id: 'stats', icon: BarChart2, label: '個人統計' },
    { id: 'sync', icon: Cloud, label: '雲端同步' },
    { id: 'settings', icon: Settings, label: '設定' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navContent}
      >
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => onNavigate(item.id as Screen)}
              style={styles.navItem}
            >
              <Icon
                size={24}
                color={isActive ? '#60A5FA' : '#6B7280'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingBottom: 24,
    paddingTop: 8,
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    minWidth: '100%',
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 80,
    paddingVertical: 4,
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
    color: '#6B7280',
  },
  navLabelActive: {
    color: '#60A5FA',
  },
});

export default BottomNav;
