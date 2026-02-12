import React, { useState } from 'react';
import { LocateFixed } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [isExploring, setIsExploring] = useState(false);

  const handleLocate = () => {
    // In a real app, this would use geolocation to center the map
    console.log('Locating user...');
  };

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
      {/* Map Background (Live OpenStreetMap) */}
      <div className="absolute inset-0">
        <iframe
          title="OpenStreetMap"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src="https://www.openstreetmap.org/export/embed.html?bbox=120.9,23.5,121.1,23.7&layer=mapnik"
          className="w-full h-full grayscale invert opacity-70 contrast-125"
        />
      </div>

      {/* Fog Overlay Effect */}
      <div 
        className="absolute inset-0 bg-black/85 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle 100px at 50% 50%, transparent 80px, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle 100px at 50% 50%, transparent 80px, black 100%)'
        }}
      />

      {/* Locate Button */}
      <div className="absolute top-6 right-4 z-20">
        <button 
          onClick={handleLocate}
          className="w-12 h-12 bg-[#1a1a1a]/90 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-700 shadow-lg active:scale-95 transition-transform text-blue-400"
        >
          <LocateFixed size={24} />
        </button>
      </div>

      {/* User Location Blue Dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10" />

      {/* Stats Overlay at Bottom */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="bg-[#1a1a1a]/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-800">
          <div className="grid grid-cols-2 gap-y-4 gap-x-2">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">目前等級</p>
              <p className="text-xl font-bold">等級 1</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">探索比例</p>
              <p className="text-lg font-mono font-medium text-blue-400">0.00001234%</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">今日里程</p>
              <p className="text-lg font-semibold">0.00 km</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">累積里程</p>
              <p className="text-lg font-semibold">12.45 km</p>
            </div>
          </div>

          {/* Start/Stop Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setIsExploring(!isExploring)}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                isExploring 
                ? 'bg-red-600/20 border-2 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                : 'bg-red-600 text-white shadow-[0_4px_15px_rgba(220,38,38,0.4)]'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${isExploring ? 'bg-red-500 animate-pulse' : 'bg-white'}`} />
              {isExploring ? '停止探索' : '開始探索'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
