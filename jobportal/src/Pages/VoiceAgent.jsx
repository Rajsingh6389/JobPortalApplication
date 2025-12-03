import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function VoiceAgent() {
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showPrompt, setShowPrompt] = useState(false); // UI overlay

  // 🔥 All voice commands mapped to routes
  const commands = [
    { keywords: ["upload job", "post job", "open upload"], path: "/upload-job" },
    { keywords: ["find jobs", "jobs", "job search"], path: "/find-jobs" },
    { keywords: ["find talent", "hire", "recruit"], path: "/find-talent" },
    { keywords: ["view applications", "applications"], path: "/applications" },
    { keywords: ["about", "about us"], path: "/about" },
    { keywords: ["home", "homepage"], path: "/" },
    { keywords: ["profile", "my profile"], path: "/profile" },
    { keywords: ["login", "sign in"], path: "/login" },
    { keywords: ["signup", "register"], path: "/signup" },
  ];

  // 🔊 Speak response
  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.pitch = 1;
    utter.rate = 1;
    synth.speak(utter);
  };

  // 🔍 Match spoken command
  const matchCommand = (text) => {
    const lower = text.toLowerCase().trim();

    for (let cmd of commands) {
      for (let keyword of cmd.keywords) {
        if (lower.includes(keyword)) return cmd.path;
      }
    }
    return null;
  };

  // 🎤 Initialize Speech Recognition
  useEffect(() => {
    if (!SpeechRecognition) {
      alert("Your browser does not support Voice Recognition.");
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.continuous = false; // you can set to true if needed
    recog.interimResults = false;

    recognitionRef.current = recog;

    recog.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      setShowPrompt(false);

      const path = matchCommand(spokenText);

      if (path) {
        speak(`Opening ${path.replace("/", "")}`);
        setTimeout(() => navigate(path), 800);
      } else {
        speak("Sorry, I didn't understand that.");
      }
    };

    recog.onend = () => {
      setListening(false);
      setShowPrompt(false);
    };
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;

    setListening(true);
    setShowPrompt(true);
    speak("I'm listening.");

    recognitionRef.current.start();
  };

  return (
    <>
      {/* Floating Mic Button */}
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 9999,
        }}
      >
        <button
          onClick={startListening}
          className={`${
            listening ? "pulse" : ""
          }`}
          style={{
            background: listening ? "#ff5c33" : "#ffa726",
            padding: "18px",
            borderRadius: "50%",
            color: "white",
            fontSize: "24px",
            border: "none",
            cursor: "pointer",
            transition: "0.3s",
            boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
          }}
        >
          🎤
        </button>
      </div>

      {/* Voice Command Prompt Overlay */}
      {showPrompt && (
        <div
          style={{
            position: "fixed",
            bottom: "110px",
            right: "20px",
            background: "rgba(0,0,0,0.75)",
            padding: "12px 20px",
            borderRadius: "10px",
            color: "white",
            fontSize: "16px",
            animation: "fadeIn 0.3s",
          }}
        >
          Listening... say a command
        </div>
      )}

      {/* Transcript Display */}
      {transcript && (
        <p
          style={{
            position: "fixed",
            bottom: "60px",
            right: "100px",
            color: "#fff",
            background: "rgba(0,0,0,0.4)",
            padding: "8px 16px",
            borderRadius: "12px",
            fontSize: "16px",
          }}
        >
          You said: <b>{transcript}</b>
        </p>
      )}

      {/* Pulse Animation */}
      <style>{`
        .pulse {
          animation: pulseGlow 1.3s infinite;
        }

        @keyframes pulseGlow {
          0% { box-shadow: 0 0 10px #ff5722; }
          50% { box-shadow: 0 0 25px #ff9800; }
          100% { box-shadow: 0 0 10px #ff5722; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default VoiceAgent;
