import React from 'react';
import { Map, BarChart2, Cloud, Settings } from 'lucide-react';
import { Screen } from '../App';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const navItems = [
    { id: 'map', icon: Map, label: '探索地圖' },
    { id: 'stats', icon: BarChart2, label: '個人統計' },
    { id: 'sync', icon: Cloud, label: '雲端同步' },
    { id: 'settings', icon: Settings, label: '設定' },
  ];

  return (
    <div className="bg-[#1a1a1a] border-t border-gray-800 pb-6 pt-2">
      <div className="flex justify-around items-center px-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen)}
              className={`flex flex-col items-center min-w-[80px] py-1 transition-colors ${
                isActive ? 'text-blue-400' : 'text-gray-500'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
