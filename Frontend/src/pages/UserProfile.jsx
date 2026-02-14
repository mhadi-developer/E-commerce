import React, { useState } from "react";
import RightContent from "../components/Profile/RightContent.jsx";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
                  Messages
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
