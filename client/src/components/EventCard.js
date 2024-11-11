import React from "react";
import { useNavigate } from "react-router-dom";
import "./EventCard.css";

const EventCard = ({ name, location, date, description, price, category, buyLink, venue, image }) => {
  const navigate = useNavigate();

  const handleFindBuddy = () => {
    navigate("/find-buddy", {
      state: { name, location, date, description, price, category,buyLink },
    });
  };

  return (
    <div className="event-card-container">
      <div className="event-content">
        {/* Event Details */}
        <div className="event-details">
          <h4 className="event-name">{name}</h4>
          <p className="event-info">Date: {date}</p>
          <p className="event-info">Location: {location}</p>
          <p className="event-info">Venue: {venue}</p>
          <p className="event-info">Category: {category}</p>
          <p className="event-price">Price: {price}</p>
        </div>

        {/* Event Image */}
        {image && (
          <div className="event-image-container">
            <img src={image} alt={name} className="event-image" />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="event-buttons">
        <a href={buyLink} rel="noopener noreferrer" className="event-button-link">
          Buy Tickets
        </a>
        <button onClick={handleFindBuddy} className="event-button">
          Find Your Buddy
        </button>
      </div>
    </div>
  );
};

export default EventCard;
