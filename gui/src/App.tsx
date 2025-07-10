import './App.css';
import LoggedInAccount from "./components/LoggedInAccount";
import AddAccountModal from "./components/AddAccountModal";
import { Toaster, toast } from 'sonner';
import React, { useEffect, useState } from 'react';
import Toast from './components/Toast';

const App = () => {
  const [showToast, setShowToast] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null); // 追加

  // アカウント一覧を取得
  const fetchAccounts = async () => {
    try {
      const res = await fetch("http://localhost:8000/accounts");
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error("アカウント取得に失敗しました", err);
    }
  };

  useEffect(() => {
    fetchAccounts(); // 初回取得
  }, []);

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
    console.log("ゲームを起動します");
  };

  return (
    <div className="w-full min-h-screen bg-white px-4 py-6">
      {showAdd && (
        <AddAccountModal
          isOpen={showAdd}
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            fetchAccounts();      // ← 一覧を再取得
            setShowAdd(false);    // モーダル閉じる
          }}
        />
      )}

      {selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[999] flex justify-center items-center">
          <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-2xl w-[400px] animate-fade-in">
            <h2 className="text-xl font-bold mb-6 text-center">アカウント詳細</h2>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs text-gray-500 mb-1">ゲーム名</label>
                <div className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2">{selectedAccount.game_name}</div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">ユーザー名</label>
                <div className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2">{selectedAccount.username}</div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">タグ</label>
                <div className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2">{selectedAccount.tag || 'なし'}</div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">レベル</label>
                <div className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2">{selectedAccount.level || '-'}</div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedAccount(null)}
                className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-2 rounded shadow"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}








      <div className="max-w-[700px] mx-auto">
        {/* Header */}
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
          <div className="border p-4 flex flex-col justify-center items-center text-sm">
            <p className="font-semibold mb-2">現在ログイン中のアカウント</p>
            <p>ゲーム名：</p>
            <p className="mt-2">ランク： レベル：</p>
          </div>

          <div className="border p-4 flex flex-col justify-center items-center text-sm">
            <p className="mb-2">アカウント選択のプルダウン</p>
            <button className="bg-gray-100 mt-4 px-6 py-2 rounded-full font-bold shadow">
              ゲーム起動
            </button>
          </div>
        </div>

        {/* Account List */}
        <h2 className="text-center text-xl font-bold mb-2">アカウント一覧</h2>
        <div className="grid grid-cols-3 gap-2 text-sm overflow-y-auto h-[240px] px-2">
          {accounts.map((account, i) => (
            <div
              key={i}
              onClick={() => setSelectedAccount(account)}
              className="bg-gray-100 h-[60px] rounded flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-200 transition"
            >
              {account.game_name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
