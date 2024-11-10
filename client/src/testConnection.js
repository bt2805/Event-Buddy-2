import React, { useState, useEffect } from 'react';

const TestConnection = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    // Fetch data from the test endpoint
    fetch("/api/test-connection")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Failed to connect to the backend.");
      });
  }, []);

  return (
    <div>
      <h1>Backend Connection Test</h1>
      <p>{message}</p>
    </div>
  );
};

export default TestConnection;
