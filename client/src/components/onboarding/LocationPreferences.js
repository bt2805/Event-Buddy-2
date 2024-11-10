import React, { useState } from 'react';

const LocationPreferences = ({ setLocationPreferences, onNext }) => {
  const [distance, setDistance] = useState(10);
  const [transportation, setTransportation] = useState([]);

  const handleTransportationToggle = (mode) => {
    setTransportation((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const handleNext = () => {
    setLocationPreferences({ distance, transportation });
    onNext();
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Let's find events near you</h2>
      <p>Help us show events that are convenient for you to attend</p>
      
      <button style={{
        marginTop: "20px",
        marginBottom: "20px",
        padding: "10px 20px",
        backgroundColor: "#7c3aed",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
      }}>
        Enable Location
      </button>
      
      <label style={{ display: "block", marginTop: "20px", fontWeight: "bold" }}>How far are you willing to travel?</label>
      <input
        type="range"
        min="10"
        max="50"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        style={{ width: "100%", marginTop: "8px" }}
      />
      <p>{distance} miles</p>

      <label style={{ display: "block", marginTop: "20px", fontWeight: "bold" }}>Preferred transportation methods</label>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
        marginTop: "10px"
      }}>
        {["Walking", "Driving", "Public Transit", "Cycling"].map((mode) => (
          <button
            key={mode}
            onClick={() => handleTransportationToggle(mode)}
            style={{
              padding: "12px",
              border: transportation.includes(mode) ? "2px solid #7c3aed" : "2px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              background: transportation.includes(mode) ? "#e9d5ff" : "white"
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          backgroundColor: "#7c3aed",
          color: "white",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          border: "none",
        }}
      >
        Next
      </button>
    </div>
  );
};

export default LocationPreferences;
