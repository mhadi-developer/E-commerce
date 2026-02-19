import React from 'react'
import  Overview  from './subContent-Profile/Overview.jsx';
import { useAuth } from '../../Custom-context/AuthProvider.jsx';
import { Personalinformation }  from './subContent-Profile/Personalinformation.jsx';
import UserOrdersView from './subContent-Profile/UserOrdersView.jsx';
import socket from '../../Utilities/useSocket.js'
import MessagePanel from './subContent-Profile/MessagePanel.jsx';
import { useState  , useEffect} from 'react';
import AddressForm from './subContent-Profile/AddressForm.jsx';

const RightContent = ({ activeTab }) => {
    const { loggedInUserData } = useAuth();
  console.log("-----> Profile ", loggedInUserData);
  const [messages, setMessages] = useState([]);
  
      useEffect(() => {
          socket.on("newOrder", (data) => {
              setMessages(prev => [data, ...prev]);
              setItems(messages);
          })
      });
  
    
  return (
    <div className="col-lg-9">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          {activeTab === "overview" && (
            <div>
              <h1 className="fw-semibold">Overview</h1>
              <Overview />
            </div>
          )}
          {activeTab === "personal" && (
            <div>
              <h1 className="fw-semibold">Personal Information</h1>
              <Personalinformation />
            </div>
          )}
          {activeTab === "addresses" && (
            <div>
              <h1 className="fw-semibold">Addresses</h1>
              <AddressForm userData={ loggedInUserData} />
            </div>
          )}
          {activeTab === "orders" && (
            <div>
              <h1 className="fw-semibold">Orders</h1>
              <UserOrdersView />
            </div>
          )}
          {activeTab === "payments" && (
            <div>
              <h1 className="fw-semibold">Payments</h1>
            </div>
          )}
          {activeTab === "security" && (
            <h1 className="fw-semibold">Security & Login</h1>
          )}
          {activeTab === "preferences" && (
            <h1 className="fw-semibold">Preferences</h1>
          )}
          {activeTab === "messages" && (
            <div>
              <span className="d-flex gap-2 align-items-center mb-3">
                <h1 className="fw-semibold">Messages</h1>
                <span>0</span>
              </span>
              <MessagePanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightContent