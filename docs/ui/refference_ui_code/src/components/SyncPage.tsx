import React from 'react';
import { Download, Edit2, FileText, CheckCircle2 } from 'lucide-react';

export const SyncPage: React.FC = () => {
  const currentFileName = "Snapshot-20231202T224657+1300.gpx";

  return (
    <div className="h-full bg-black flex flex-col">
      <div className="pt-12 pb-6 px-4 bg-[#111] border-b border-gray-800">
        <h1 className="text-lg font-bold text-center">儲存紀錄</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-12">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30">
            <FileText size={36} className="text-blue-500" />
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">目前紀錄檔名</p>
            <p className="text-white font-mono text-sm break-all max-w-[280px]">
              {currentFileName}
            </p>
            <button className="flex items-center gap-1 text-blue-400 text-sm mx-auto mt-2 hover:opacity-80 transition-opacity">
              <Edit2 size={14} />
              <span>重新命名</span>
            </button>
          </div>
        </div>

        <div className="w-full space-y-4">
          <button className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <Download size={20} />
            <span>下載到本機</span>
          </button>
          
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs py-2">
            <CheckCircle2 size={14} className="text-green-500" />
            <span>已與雲端同步</span>
          </div>
        </div>
      </div>
    </div>
  );
};
