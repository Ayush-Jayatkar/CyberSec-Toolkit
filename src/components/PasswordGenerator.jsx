import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingPasswords, setExistingPasswords] = useState(new Set());
  const [dataLoaded, setDataLoaded] = useState(false);

  const passwordsRef = collection(db, "passwords");

  // Fetch passwords in background
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const snapshot = await getDocs(passwordsRef);
        const passSet = new Set(snapshot.docs.map(doc => doc.data().value));
        setExistingPasswords(passSet);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      } finally {
        setDataLoaded(true);
      }
    };
    fetchPasswords();
  }, []);

  const generateRandomPassword = () => {
    const length = 12;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let newPass = "";
    for (let i = 0; i < length; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return newPass;
  };

  const generatePassword = async () => {
    setLoading(true);
    let newPass = "";

    // Even if DB is still loading, generate instantly
    do {
      newPass = generateRandomPassword();
    } while (dataLoaded && existingPasswords.has(newPass));

    if (dataLoaded) {
      await addDoc(passwordsRef, { value: newPass, createdAt: new Date().toISOString() });
      setExistingPasswords(prev => new Set(prev).add(newPass));
    }

    setPassword(newPass);
    setLoading(false);
  };

  return (
    <div className="tool-card">
      <h3>Password Generator</h3>
      <button onClick={generatePassword} disabled={loading}>
        {loading ? "⏳ Generating..." : "Generate"}
      </button>
      <input
        type="text"
        value={password}
        readOnly
        style={{
          marginTop: "18px",
          padding: "14px",
          width: "100%",
          fontSize: "1.15rem",
          textAlign: "center",
          borderRadius: "8px",
          border: "2px solid #00d4ff",
          background: "#232c3a",
          color: "#fff",
          boxShadow: "0 4px 18px rgba(0,212,255,0.10)",
        }}
      />
    </div>
  );
}
