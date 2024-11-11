import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import local images
import ashleyImage from "./images/ashley.jpeg";
import emmaImage from "./images/emma.jpeg";
import michaelImage from "./images/micheal.jpeg";
import sarahImage from "./images/sarah.jpg";

const mockMatches = [
  {
    id: 1,
    name: "Sarah Butler",
    bio: "Science Major, loves Basketball! Always up for coffee and conversations about NBA.",
    matchPercentage: 75,
    interests: ["Sports", "Food", "Fitness"],
    preferences: ["Public Transit", "Meet at Venue"],
    contact: "sarah.butler@example.com",
    image: sarahImage,
  },
  {
    id: 2,
    name: "Ashley Cole",
    bio: "Arts Major, Favorite team LA Lakers",
    matchPercentage: 95,
    interests: ["Sports", "Fitness", "Recreation"],
    preferences: ["Walk", "Virtual Meet First"],
    contact: "ashley.cole@example.com",
    image: ashleyImage,
  },
  {
    id: 3,
    name: "Michael Johnson",
    bio: "Tech Enthusiast, loves Hackathons and Innovation!",
    matchPercentage: 80,
    interests: ["Technology", "Food", "Networking"],
    preferences: ["Cycling", "Meet at Venue"],
    contact: "michael.johnson@example.com",
    image: michaelImage,
  },
  {
    id: 4,
    name: "Emma Watson",
    bio: "Music lover, especially rock concerts and jazz sessions.",
    matchPercentage: 85,
    interests: ["Music", "Concerts", "Food"],
    preferences: ["Driving", "Virtual Meet First"],
    contact: "emma.watson@example.com",
    image: emmaImage,
  },
];

const FindBuddyPage = () => {
  const { state: event } = useLocation();
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [hasSentRequest, setHasSentRequest] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("left");

  const handleYes = () => {
    const currentMatch = mockMatches[currentMatchIndex];

    if (!hasSentRequest && currentMatch.name !== "Emma Watson") {
      setHasSentRequest(true);
      setAnimationDirection("right");

      setTimeout(() => {
        setHasSentRequest(false);
        setCurrentMatchIndex((prevIndex) =>
          prevIndex < mockMatches.length - 1 ? prevIndex + 1 : 0
        );
      }, 5);
    } else if (currentMatch.name === "Emma Watson") {
      setIsMatched(true);
    }
  };

  const handleNo = () => {
    setHasSentRequest(false);
    setIsMatched(false);
    setAnimationDirection("left");

    setCurrentMatchIndex((prevIndex) =>
      prevIndex < mockMatches.length - 1 ? prevIndex + 1 : 0
    );
  };

  const currentMatch = mockMatches[currentMatchIndex];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "24px", color: "#6B21A8" }}>Find a buddy for {event.name}</h2>
        <p style={{ backgroundColor: "#E9D5FF", padding: "10px", borderRadius: "8px", color: "#6B21A8" }}>
          {event.name} - {event.date}<br />
          {event.location}, {event.description} <br />
          Price: {event.price}
        </p>
      </header>

      <AnimatePresence mode="wait">
        {isMatched ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              textAlign: "center",
              color: "#6B21A8",
              fontSize: "24px",
              fontWeight: "bold",
              margin: "20px 0",
            }}
          >
            🎉 Matched! 🎉 <br />
            Contact: {currentMatch.contact}
            <div style={{ marginTop: "20px" }}>
            <a href={event.buyLink}  target="_blank" rel="noopener noreferrer" className="event-button-link">
              Buy Tickets
            </a>
              {/* <a
                href={event.link} // Make sure this buyLink is correctly passed from the EventCard
                target={event.link}
                // rel={{event.link}}
                style={{
                  backgroundColor: "#7C3AED",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Buy Tickets
              </a> */}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={currentMatch.id}
            initial={{ x: animationDirection === "right" ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: animationDirection === "right" ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              backgroundColor: "#F3E8FF",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src={currentMatch.image}
              alt={currentMatch.name}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                marginBottom: "15px",
                objectFit: "cover",
              }}
            />
            <h3 style={{ fontSize: "20px", color: "#333" }}>{currentMatch.name}</h3>
            <p style={{ color: "#666", marginTop: "8px" }}>{currentMatch.bio}</p>
            <p style={{ color: "#6B21A8", fontWeight: "bold", marginTop: "8px" }}>
              ⭐ {currentMatch.matchPercentage}% match
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isMatched && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button
            onClick={handleNo}
            style={{
              backgroundColor: "#EDE9FE",
              color: "#6B21A8",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            No
          </button>
          <button
            onClick={handleYes}
            style={{
              backgroundColor: "#7C3AED",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Yes
          </button>
        </div>
      )}

      {hasSentRequest && !isMatched && (
        <p style={{ textAlign: "center", color: "#6B21A8", fontSize: "18px", marginTop: "10px" }}>
          Request Sent
        </p>
      )}
    </div>
  );
};

export default FindBuddyPage;
