import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import EventPreferences from "./onboarding/EventPreferences";
import LocationPreferences from "./onboarding/LocationPreferences";
import ProfileCompletion from "./onboarding/ProfileCompletion";

const Onboarding = () => {
  const [preferences, setPreferences] = useState([]);
  const [locationPreferences, setLocationPreferences] = useState({});
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();

  const completeProfile = () => {
    // After finishing onboarding, navigate to the main page
    navigate("/main");
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<EventPreferences setPreferences={setPreferences} onNext={() => navigate("/onboarding/location-preferences")} />}
        />
        <Route
          path="/location-preferences"
          element={<LocationPreferences setLocationPreferences={setLocationPreferences} onNext={() => navigate("/onboarding/profile-completion")} />}
        />
        <Route
          path="/profile-completion"
          element={<ProfileCompletion setProfileData={setProfileData} onFinish={completeProfile} />}
        />
      </Routes>
    </div>
  );
};

export default Onboarding;
