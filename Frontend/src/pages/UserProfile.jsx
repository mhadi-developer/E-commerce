import React, { useState  , useEffect} from "react";
import RightContent from "../components/Profile/RightContent.jsx";
import socket from "../Utilities/useSocket.js"

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [messages, setMessages] = useState([]);
    
        useEffect(() => {
            socket.on("newOrder", (data) => {
                setMessages(prev => [data, ...prev]);
                setItems(messages);
            })
        });
    
      

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* LEFT SIDEBAR */}
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="nav flex-column nav-pills">
                <button
                  className={`nav-link text-start ${
                    activeTab === "overview" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>

                <button
                  className={`nav-link text-start ${
                    activeTab === "personal" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("personal")}
                >
                  Personal Information
                </button>

                <button
                  className={`nav-link text-start ${
                    activeTab === "addresses" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("addresses")}
                >
                  Addresses
                </button>

                <button
                  className={`nav-link text-start ${
                    activeTab === "orders" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("orders")}
                >
                  Orders
                </button>

                <button
                  className={`nav-link text-start ${
                    activeTab === "payments" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("payments")}
                >
                  Payments
                </button>

                <button
                  className={`nav-link text-start ${
                    activeTab === "security" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  Security & Login
                </button>

                <button
                  className={`nav-link text-start ${
                    activeTab === "preferences" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("preferences")}
                >
                  Preferences
                </button>

                <button
                  className={`nav-link text-start ${
                    activeTab === "messages" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("messages")}
                >
                  <span className="d-flex gap-3">
                    Messages
                    <span>
                      {
                        messages.length > 0 ? ( <div class="notification">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M12 2a7 7 0 00-7 7v4l-2 2v1h18v-1l-2-2V9a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span class="dot"></span>
                      </div>) : ""
                      }
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT AREA */}
        <RightContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default UserProfile;
