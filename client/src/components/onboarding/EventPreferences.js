import React, { useState } from 'react';

const EventPreferences = ({ setPreferences, onNext }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { label: "Music & Concerts", icon: "🎵" },
    { label: "Sports Events", icon: "⚽" },
    { label: "Arts & Culture", icon: "🎨" },
    { label: "Tech & Innovation", icon: "💻" },
    { label: "Food & Drinks", icon: "🍽️" },
    { label: "Outdoor Activities", icon: "🏃‍♂️" },
    { label: "Educational Events", icon: "📚" },
    { label: "Gaming", icon: "🎮" },
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleNext = () => {
    setPreferences(selectedCategories);
    onNext();
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Welcome to Event Buddy!</h2>
      <p>Let's personalize your experience. What types of events interest you?</p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
        marginTop: "20px"
      }}>
        {categories.map(({ label, icon }) => (
          <button
            key={label}
            onClick={() => toggleCategory(label)}
            style={{
              padding: "16px",
              border: selectedCategories.includes(label) ? "2px solid #7c3aed" : "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              background: selectedCategories.includes(label) ? "#e9d5ff" : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            {icon} {label}
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

export default EventPreferences;
