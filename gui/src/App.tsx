import './App.css'
import LoggedInAccount from "./components/LoggedInAccount";
import { Toaster, toast } from 'sonner';

function App() {
  const handleLogin = () => {
    toast.success('アカウントを切り替えました！');
  };

  return (
    <>
      <Toaster richColors position='top-center' />
      <button onClick={handleLogin}>ログイン切り替え</button>
      <div className="flex justify-center mt-6">
        <LoggedInAccount />
      </div>

      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
    </>
  )
}

export default App