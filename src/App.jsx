import React, { useRef } from "react";
import "./App.css";
import PasswordGenerator from "./components/PasswordGenerator";
import PasswordStrengthChecker from "./components/PasswordStrengthChecker";

function App() {
  const toolsRef = useRef(null);

  const handleExploreTools = () => {
    if (toolsRef.current) {
      toolsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      {/* Header/Hero */}
      <header className="hero">
        <div className="hero-content">
          <h1>Cybersecurity Toolkit</h1>
          <p>Essential tools for creating and testing strong passwords.</p>
          <button className="cta-btn" onClick={handleExploreTools}>
            Explore Tools
          </button>
        </div>
      </header>

      {/* Tools Section */}
      <main id="tools" className="tools-section" ref={toolsRef}>
        <h2 className="section-title">Featured Tools</h2>
        <div className="tool-grid">
          
          {/* Password Generator */}
          <div className="tool-card">
            <div className="icon-circle">
              <img src="https://img.icons8.com/ios-filled/100/lock--v1.png" alt="Password Generator" />
            </div>
            <h3>Password Generator</h3>
            <p>Create strong and secure passwords instantly.</p>
            <PasswordGenerator />
          </div>

          {/* Password Strength Checker */}
          <div className="tool-card">
            <div className="icon-circle">
              <img src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png" alt="Password Strength Checker" />
            </div>
            <h3>Password Strength Checker</h3>
            <p>Check how strong your password is and get suggestions.</p>
            <PasswordStrengthChecker />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Cybersecurity Toolkit. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
