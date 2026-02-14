import React from 'react'
import  Overview  from './subContent-Profile/Overview.jsx';
import { useAuth } from '../../Custom-context/AuthProvider.jsx';
import { Personalinformation }  from './subContent-Profile/Personalinformation.jsx';
import UserOrdersView from './subContent-Profile/UserOrdersView.jsx';

const RightContent = ({ activeTab }) => {
    const { loggedInUserData } = useAuth();
    console.log(   "-----> Profile ",loggedInUserData);
    
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
            <h1 className="fw-semibold">Addresses</h1>
          )}
          {activeTab === "orders" && (
            <div>
              <h1 className="fw-semibold">Orders</h1>
              <UserOrdersView />
            </div>
          )}
          {activeTab === "payments" && (
            <h1 className="fw-semibold">Payments</h1>
          )}
          {activeTab === "security" && (
            <h1 className="fw-semibold">Security & Login</h1>
          )}
          {activeTab === "preferences" && (
            <h1 className="fw-semibold">Preferences</h1>
          )}
          {activeTab === "messages" && (
            <h1 className="fw-semibold">Messages</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightContent