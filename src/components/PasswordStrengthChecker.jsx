import React, { useState } from "react";

function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [show, setShow] = useState(false);

  const checkStrength = (pwd) => {
    if (!pwd) return "";

    const lower = /[a-z]/.test(pwd);
    const upper = /[A-Z]/.test(pwd);
    const number = /\d/.test(pwd);
    const special = /[^A-Za-z0-9]/.test(pwd);
    const types = [lower, upper, number, special].filter(Boolean).length;

    const commonPatterns = ["password", "1234", "admin", "qwerty", "letmein", "ayush"];
    let level = 0;

    if (pwd.length < 8) level = 0;
    else if (pwd.length >= 8 && types >= 2) level = 1;
    if (pwd.length >= 8 && types >= 3) level = 2;
    if (pwd.length >= 12 && types === 4) level = 3;

    if (commonPatterns.some((w) => pwd.toLowerCase().includes(w))) {
      level = Math.max(level - 1, 0);
    }

    return ["Very Weak", "Weak", "Moderate", "Strong"][level];
  };

  const getStrengthColor = () => {
    switch (strength) {
      case "Very Weak":
        return "#ff4d4d"; // red
      case "Weak":
        return "#ff884d"; // orange
      case "Moderate":
        return "#ffcc00"; // yellow
      case "Strong":
        return "#4dff88"; // green
      default:
        return "#aaa"; // gray
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(checkStrength(value));
  };

  return (
    <div className="tool-card">
      <h3>Password Strength Checker</h3>
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
          style={{
            padding: "14px",
            width: "100%",
            fontSize: "1.15rem",
            textAlign: "center",
            borderRadius: "8px",
            border: "2px solid #00d4ff",
            background: "#232c3a",
            color: "#fff",
            boxShadow: "0 4px 18px rgba(0,212,255,0.10)",
            marginTop: "12px",
            paddingRight: "2.5rem",
          }}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          {show ? (
            <svg height="22" width="22" viewBox="0 0 24 24" fill="none" stroke="#19a7ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="12" rx="8" ry="5" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
          ) : (
            <svg height="22" width="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.61 3.33-4.77 6-6.16"/>
              <path d="M1 1l22 22"/>
              <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03"/>
              <path d="M14.47 14.47A3.5 3.5 0 0 0 12 8.5c-.62 0-1.2.18-1.69.49"/>
            </svg>
          )}
        </button>
      </div>
      <p style={{ color: getStrengthColor(), fontWeight: "bold", marginTop: "10px" }}>
        Strength: {strength || "N/A"}
      </p>
    </div>
  );
}

export default PasswordStrengthChecker;
