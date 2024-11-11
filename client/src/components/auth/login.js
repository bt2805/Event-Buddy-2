import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock, BookHeart}  from "lucide-react"; // Ensure lucide-react is installed

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pronouns, setPronouns] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up attempted with:", { email, password });
    
    // If sign up is successful, navigate to the onboarding process
    navigate("/onboarding");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #d4a5f9, #91d1f7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "32px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Event Buddy</h1>
          <p style={{ marginTop: "8px", color: "#666" }}>Sign up to get started!</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ position: "relative" }}>
            <Mail style={{ position: "absolute", left: "12px", top: "12px", color: "#999" }} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 12px 12px 36px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                outline: "none",
                fontSize: "16px",
                color: "#333",
                boxSizing: "border-box",
              }}
              required
            />
          </div>
          <div style={{ position: "relative" }}>
            <Lock style={{ position: "absolute", left: "12px", top: "12px", color: "#999" }} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 12px 12px 36px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                outline: "none",
                fontSize: "16px",
                color: "#333",
                boxSizing: "border-box",
              }}
              required
            />
          </div>
          <div style={{ position: "relative" }}>
          <BookHeart style={{ position: "absolute", left: "12px", top: "12px", color: "#999" }} />
            <input
              type="Pronouns"
              placeholder="Pronouns"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 12px 12px 36px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                outline: "none",
                fontSize: "16px",
                color: "#333",
                boxSizing: "border-box",
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#7c3aed",
              color: "white",
              padding: "12px",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "none",
            }}
          >
            Sign Up
            <ArrowRight style={{ marginLeft: "8px", height: "20px", width: "20px" }} />
          </button>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            <button
              type="button"
              style={{
                fontSize: "14px",
                color: "#7c3aed",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0",
              }}
            >
              Forgot password?
            </button>
            <button
              type="button"
              style={{
                fontSize: "14px",
                color: "#7c3aed",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0",
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
