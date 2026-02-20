import { useState, useEffect, useRef } from "react";
import socket from "../Utilities/useSocket.js"
import { useAuth } from "../Custom-context/AuthProvider.jsx";




export default function ChatBot() {
  
  const { loggedInUserData } = useAuth();

  const userId = loggedInUserData._id;
  console.log({userId});
  
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Listen for AI messages from Socket.IO
  useEffect(() => {
    socket.on("ai-response", (data) => {
      console.log("------Response from AI ------>", data);

      setMessages((prev) => [...prev, { sender: "ai", text: data.message }]);
    });

    return () => socket.off("ai-response");
  }, []);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
   

    // Send message to backend
    socket.emit("send-message", { userId, message: text });
    console.log({userId , text});
    
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      className="chat-container d-flex flex-column shadow rounded"
      style={{
        maxWidth: "500px",
        height: "600px",
        margin: "50px auto",
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <div className="chat-header bg-primary text-white p-3 fs-5 fw-medium rounded-top">
        Customer Service
      </div>

      {/* Chat body */}
      <div
        className="chat-body flex-grow-1 p-3"
        style={{ backgroundColor: "#e9ecef", overflowY: "auto" }}
        ref={chatBodyRef}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`d-flex mb-2 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}
          >
            <div
              className={`p-2 ${msg.sender === "user" ? "bg-primary text-white" : "bg-light text-dark"} rounded`}
              style={{
                maxWidth: "75%",
                borderRadius:
                  msg.sender === "user"
                    ? "15px 15px 0 15px"
                    : "15px 15px 15px 0",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="chat-footer p-2 d-flex gap-2 border-top">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
