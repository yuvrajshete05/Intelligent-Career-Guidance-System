import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './Login.css';
import AdventurePage from './AdventurePage';
import Welcome from './Welcome';  // Assuming Welcome is the page you need after login

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Routes>  {/* Use Routes to define routing */}
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/adventure" element={isLoggedIn ? <AdventurePage /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/welcome" element={<Welcome />} /> {/* Add route to Welcome */}
      </Routes>
    </div>
  );
}

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate a successful login
    if (onLoginSuccess) {
      onLoginSuccess();
      navigate('/welcome');  // Navigate to Welcome page after login
    }
  };

  return (
    <>
      <h1>Intelligent Career Counsellor</h1>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Signed up successfully! Now login.');
            }}
          >
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input type="text" name="txt" placeholder="User name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="pswd" placeholder="Password" required />
            <button type="submit">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="pswd" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
