import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCompletion = ({ setProfileData }) => {
  const [bio, setBio] = useState("");
  const [meetingPreferences, setMeetingPreferences] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const handleMeetingToggle = (preference) => {
    setMeetingPreferences((prev) =>
      prev.includes(preference) ? prev.filter((p) => p !== preference) : [...prev, preference]
    );
  };

  const handleFinish = () => {
    // Set the profile data
    setProfileData({ bio, meetingPreferences });

    // Navigate to the main page after profile completion
    navigate("/main");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Complete your profile</h2>

      <div style={{ margin: "16px 0" }}>
        <button style={{
          padding: "10px 20px",
          backgroundColor: "#e9d5ff",
          color: "#333",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          Upload Photo
        </button>
      </div>

      <textarea
        placeholder="Tell us about yourself"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        style={{
          width: "100%",
          height: "80px",
          padding: "10px",
          marginTop: "10px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          outline: "none",
          resize: "none"
        }}
      ></textarea>

      <label style={{ display: "block", marginTop: "20px", fontWeight: "bold" }}>Meeting preferences</label>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
        marginTop: "10px"
      }}>
        {["Coffee Chat Before Event", "Meet at Venue", "Virtual Meet First", "Group Meetup Only"].map((preference) => (
          <button
            key={preference}
            onClick={() => handleMeetingToggle(preference)}
            style={{
              padding: "12px",
              border: meetingPreferences.includes(preference) ? "2px solid #7c3aed" : "2px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              background: meetingPreferences.includes(preference) ? "#e9d5ff" : "white"
            }}
          >
            {preference}
          </button>
        ))}
      </div>

      <button
        onClick={handleFinish}
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
        Finish Profile
      </button>
    </div>
  );
};

export default ProfileCompletion;
