import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/auth/login.js";  // Import the LoginPage component
import MainPage from "./components/MainPage";        // Import the MainPage component

function ConnectionTest() {
  const [apiMessage, setApiMessage] = useState(null);
  const [testConnectionMessage, setTestConnectionMessage] = useState(null);

  useEffect(() => {
    // Fetch from the default /api endpoint
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch((error) => console.error("Error fetching /api:", error));

    // Fetch from the /api/test-connection endpoint
    fetch("/api/test-connection")
      .then((res) => res.json())
      .then((data) => setTestConnectionMessage(data.message))
      .catch((error) => console.error("Error fetching /api/test-connection:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Backend Connection Test</h1>
        <p>{apiMessage ? `API Message: ${apiMessage}` : "Loading API message..."}</p>
        <p>{testConnectionMessage ? `Test Connection Message: ${testConnectionMessage}` : "Loading test connection message..."}</p>
        <Link to="/login" className="App-link">Go to Login Page</Link>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectionTest />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />  {/* Route for the main page */}
      </Routes>
    </Router>
  );
}

export default App;