import './App.css';
import LoggedInAccount from "./components/LoggedInAccount";
import AddAccountModal from "./components/AddAccountModal";
import { Toaster, toast } from 'sonner';
import React, { useState } from 'react';
import Toast from './components/Toast';

const App = () => {
  const [showToast, setShowToast] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleAccountSwitch = async () => {
    try {
      const response = await fetch("http://localhost:8000/switch", {
        method: "POST",
      });

      if (response.ok) {
        setShowToast(true);
      } else {
        alert("切り替えに失敗しました");
      }
    } catch (error) {
      console.error("エラー:", error);
      alert("エラーが発生しました");
    }
  };

  const handleLogin = () => {
    toast.success('アカウントを切り替えました！');
  };

  const handleGameLaunch = () => {
    // ゲーム起動のロジックをここに実装
    console.log("ゲームを起動します");
  };

  function fetchAccountsAgain(): void {
    throw new Error('Function not implemented.');
  }

  // ダミーアカウントデータ
  const accounts = [
    { name: "アカウント1", level: 50 },
    { name: "アカウント2", level: 35 },
    { name: "アカウント3", level: 42 },
    { name: "アカウント4", level: 28 },
    { name: "アカウント5", level: 65 },
    { name: "アカウント6", level: 33 }
  ];

  return (
    <div className="w-full min-h-screen bg-white px-4 py-6">
      {showAdd && (
        <AddAccountModal
          isOpen={showAdd}
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false);
          }}
        />
      )}
      <div className="max-w-[700px] mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">VaLogin</h1>
          <button
            className="bg-gray-100 text-sm rounded-lg px-4 py-2 shadow"
            onClick={() => setShowAdd(true)}
          >
            アカウント追加
          </button>
        </div>

        {/* Status Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Current Login */}
          <div className="border p-4 flex flex-col justify-center items-center text-sm">
            <p className="font-semibold mb-2">現在ログイン中のアカウント</p>
            <p>ゲーム名：</p>
            <p className="mt-2">ランク： レベル：</p>
          </div>

          {/* Account Select + Launch */}
          <div className="border p-4 flex flex-col justify-center items-center text-sm">
            <p className="mb-2">アカウント選択のプルダウン</p>
            <button className="bg-gray-100 mt-4 px-6 py-2 rounded-full font-bold shadow">ゲーム起動</button>
          </div>
        </div>

        {/* Account List Title */}
        <h2 className="text-center text-xl font-bold mb-2">アカウント一覧</h2>

        {/* Account Grid */}
        <div className="grid grid-cols-3 gap-2 text-sm overflow-y-auto h-[240px] px-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-gray-100 h-[60px] rounded flex items-center justify-center shadow-sm">
              アカウント{i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );


};

export default App;