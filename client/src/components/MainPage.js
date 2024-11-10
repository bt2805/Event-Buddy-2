import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { recommendedMockData, trendingMockData } from '/Users/bt2805/Desktop/Event-Buddy-2/client/src/mockData.js';

const MainPage = () => {
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [trendingEvents, setTrendingEvents] = useState([]);
  const [useMockData, setUseMockData] = useState(true); // Flag to toggle mock data

  const generateRandomPrice = () => Math.floor(Math.random() * (50 - 10 + 1)) + 10;

  useEffect(() => {
    const fetchEvents = async () => {
      if (useMockData) {
        setRecommendedEvents(recommendedMockData);
        setTrendingEvents(trendingMockData);
      } else {
        try {
          const recommendedResponse = await fetch("https://api.example.com/recommended");
          const recommendedData = await recommendedResponse.json();
          const trendingResponse = await fetch("https://api.example.com/trending");
          const trendingData = await trendingResponse.json();

          const processedRecommendedData = recommendedData.map(event => ({
            ...event,
            price: event.price || generateRandomPrice(),
          }));

          const processedTrendingData = trendingData.map(event => ({
            ...event,
            price: event.price || generateRandomPrice(),
          }));

          setRecommendedEvents(processedRecommendedData);
          setTrendingEvents(processedTrendingData);

        } catch (error) {
          console.error("Error fetching events:", error);
        }
      }
    };

    fetchEvents();
  }, [useMockData]);

  return (
    <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Event Buddy</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "14px", color: "#7c3aed", marginRight: "8px" }}>Live Updates</span>
          <span style={{ fontSize: "20px", color: "#7c3aed" }}>🔔</span>
        </div>
      </header>

      <div style={{
        backgroundColor: "#7c3aed",
        color: "white",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Hi Bhavye, let’s find an event buddy for you today!</h2>
        <p>You have 2 upcoming events for this week</p>
      </div>

      <EventSection title="Recommended Events" events={recommendedEvents} />
      <EventSection title="Trending Now" events={trendingEvents} />
    </div>
  );
};

const EventSection = ({ title, events }) => (
  <div style={{ marginBottom: "16px" }}>
    <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#333", marginBottom: "8px" }}>{title}</h3>
    {events.length > 0 ? (
      events.map((event, index) => (
        <EventCard
          key={index}
          name={event.name}
          location={event.location}
          date={event.date}
          description={event.description}
          price={event.price}
          category={event.category}  // Pass category to EventCard
          buyLink={event.buyLink}
        />
      ))
    ) : (
      <p style={{ color: "#666" }}>No events available at the moment.</p>
    )}
  </div>
);

export default MainPage;
