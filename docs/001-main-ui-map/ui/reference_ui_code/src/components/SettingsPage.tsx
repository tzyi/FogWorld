import React from 'react';
import { Upload } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export const SettingsPage: React.FC = () => {
  const handleImport = () => {
    toast.info('正在開啟檔案瀏覽器...', {
      description: '請選擇您的 GPX 檔案進行匯入。',
    });
  };

  return (
    <div className="h-full bg-black flex flex-col">
      <div className="pt-12 pb-6 px-4 border-b border-gray-800">
        <h1 className="text-lg font-bold text-center">設定</h1>
      </div>

      <div className="p-6 space-y-8">
        <section>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">資料管理</h2>
          <button 
            onClick={handleImport}
            className="w-full flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Upload size={20} />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-200">匯入 GPX 檔案</p>
                <p className="text-xs text-gray-500">將外部軌跡資料匯入您的探索地圖</p>
              </div>
            </div>
            <div className="text-gray-600 group-hover:text-gray-400 transition-colors">
              <Upload size={18} />
            </div>
          </button>
        </section>

        <section>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">關於</h2>
          <div className="bg-[#1a1a1a] rounded-xl divide-y divide-gray-800">
            <div className="p-4 flex justify-between items-center">
              <span className="text-gray-300">版本</span>
              <span className="text-gray-500">1.0.0 (Expo Go)</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-gray-300">隱私權政策</span>
              <span className="text-blue-400 text-sm">查看</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
