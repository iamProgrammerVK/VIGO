import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  const API = "https://vigo-41rp.onrender.com/chat";
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");

    const res = await axios.post(API, { message });
    const botMsg = { sender: "bot", text: res.data.reply };

    setChat((prev) => [...prev, botMsg]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="flex justify-center items-center min-h-screen 
      bg-gradient-to-br from-purple-600/40 via-indigo-500/40 to-blue-500/40 
      backdrop-blur-xl p-4">

      {/* GLASS CARD */}
      <div className="w-full max-w-2xl bg-white/20 backdrop-blur-2xl 
        border border-white/30 shadow-2xl rounded-3xl flex flex-col h-[90vh] overflow-hidden">

        {/* HEADER */}
        <div className="bg-white/10 backdrop-blur-xl text-white p-4 shadow-md text-center border-b border-white/20">
          <h1 className="text-2xl font-bold tracking-wide drop-shadow-lg">
            VIGO Intelligence
          </h1>
          <p className="text-sm text-white/80">Your personal AI Assistant</p>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/5">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-lg shadow-lg 
                  backdrop-blur-xl ${
                    msg.sender === "user"
                      ? "bg-indigo-600/90 text-white rounded-br-sm"
                      : "bg-white/80 text-gray-900 border rounded-bl-sm"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* INPUT AREA */}
        <div className="p-4 bg-white/20 backdrop-blur-xl border-t border-white/20 flex items-center gap-3">
          <input
            type="text"
            className="flex-1 border border-white/10 bg-white/30 text-indigo-600
              rounded-2xl px-4 py-3 shadow-sm placeholder-white/70
              focus:ring-2 focus:ring-indigo-300 outline-none backdrop-blur-xl"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="bg-indigo-600/90 text-white px-6 py-3 rounded-2xl 
              shadow-lg hover:bg-indigo-700 transition backdrop-blur-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
