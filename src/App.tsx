import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  const username = "Ramadhani";
  const country = "Indonesia";
  const city = "Jakarta";

  function goToFlowBuilder() {
    // Placeholder for navigation logic to flow builder
    console.log("Navigating to flow builder...");
     navigate("/flow-builder");
  }

  function goToHome() {
    console.log("Navigating to Home...");

    navigate("/home");
  }

  function goToProfile(){
    console.log("Navigating to Profile...");
    navigate("/profile", {
      state: {
        username: username,
        country: country,
        city: city
      }
    });
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      
      <p>Name: {username}</p>
      <p>Country: {country}</p>
      <p>City: {city}</p>

      <div className="card">
       <div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
         <button onClick={() => setCount((count) => count + 1)} >
          count is {count}
        </button>
        <button onClick={() => goToHome()}>
          to Home
        </button>
        <button onClick={() => goToFlowBuilder()}>
          to flow builder
        </button>
        <button onClick={() => goToProfile()}>
          to Profile
        </button>
       </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
