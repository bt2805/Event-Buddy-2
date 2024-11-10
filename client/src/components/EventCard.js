import React from 'react';

const EventCard = ({ name, location, date, description, price, category, buyLink }) => {
  return (
    <div style={{
      backgroundColor: "#e9d5ff",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "16px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}>
      <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>{name}</h4>
      <p style={{ fontSize: "14px", color: "#666" }}>Category: {category}</p>  {/* Display category here */}
      <p style={{ fontSize: "14px", color: "#666" }}>{location}</p>
      <p style={{ fontSize: "14px", color: "#666" }}>{description}</p>
      <p style={{ fontSize: "14px", color: "#666" }}>Date: {date}</p>
      <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>Price: ${price}</p>
      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        <a
          href={buyLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: "#7c3aed",
            color: "white",
            borderRadius: "8px",
            padding: "8px 16px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            flex: 1,
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          Buy Tickets
        </a>
        <button style={{
          backgroundColor: "#7c3aed",
          color: "white",
          borderRadius: "8px",
          padding: "8px 16px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          flex: 1,
        }}>
          Find Your Buddy
        </button>
      </div>
    </div>
  );
};

export default EventCard;
