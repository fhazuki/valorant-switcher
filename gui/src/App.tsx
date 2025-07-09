import './App.css';
import LoggedInAccount from "./components/LoggedInAccount";
import { Toaster, toast } from 'sonner';
import React, { useState } from 'react';
import Toast from './components/Toast';

const App = () => {
  const [showToast, setShowToast] = useState(false);

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

  return (
    <>
      <Toaster richColors position='top-center' />

      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
        onClick={handleAccountSwitch}
      >
        アカウント切り替え
      </button>

      {showToast && (
        <Toast message='アカウントを切り替えました！' onClose={() => setShowToast(false)} />
      )}

      <button onClick={handleLogin} className="mt-4 underline text-blue-600">
        テスト通知（sonner）
      </button>

      <div className="flex justify-center mt-6">
        <LoggedInAccount />
      </div>
    </>
  );
};

export default App;
