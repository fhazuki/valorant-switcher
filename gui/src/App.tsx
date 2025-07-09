import './App.css'
import LoggedInAccount from "./components/LoggedInAccount";

function App() {

  return (
    <>
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