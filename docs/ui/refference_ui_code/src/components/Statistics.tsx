import React from 'react';
import { Globe, MapPin, Compass, Navigation2, Activity, Zap, Wind } from 'lucide-react';

interface ContinentStat {
  name: string;
  icon: React.ElementType;
  progress: number;
  area: number;
}

export const Statistics: React.FC = () => {
  const stats: ContinentStat[] = [
    { name: '亞洲', icon: Globe, progress: 0.00001245, area: 12.4 },
    { name: '歐洲', icon: Compass, progress: 0.00000512, area: 5.2 },
    { name: '北美洲', icon: MapPin, progress: 0, area: 0 },
    { name: '南美洲', icon: Navigation2, progress: 0, area: 0 },
    { name: '非洲', icon: Activity, progress: 0, area: 0 },
    { name: '大洋洲', icon: Zap, progress: 0, area: 0 },
    { name: '南極洲', icon: Wind, progress: 0, area: 0 },
  ];

  return (
    <div className="h-full bg-black flex flex-col pt-12 pb-2">
      <h1 className="text-xl font-bold text-center mb-6">個人統計數據</h1>
      
      <div className="flex-1 overflow-y-auto px-4 space-y-6">
        {stats.map((item) => (
          <div key={item.name} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400">
              <item.icon size={20} />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-end">
                <span className="font-medium text-gray-200">{item.name}</span>
                <span className="text-[11px] font-mono text-blue-400">
                  {item.progress.toFixed(8)}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${Math.max(item.progress * 10000, 2)}%` }} // Boost visual for tiny %
                />
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-gray-500">已探索面積</span>
                <span className="text-[10px] text-gray-300">{item.area.toLocaleString()} 平方公里</span>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-8 pb-4">
          <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-xl">
            <p className="text-xs text-blue-400 text-center">
              繼續探索，解鎖更多地塊！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
