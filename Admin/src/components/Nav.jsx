import React from 'react'
import { useState , useEffect } from 'react';
import socket from '../customHooks/useSocket.js';
import moment from 'moment';

const Nav = () => {
  const [notifications, setNotifications] = useState([])
  
  useEffect(() => {
     socket.on("new-order", (data) => {
      setNotifications(prev => [data, ...prev]);
      console.log("New order via socket:", data);
    });

    // Cleanup on unmount
    return () => {
      socket.off("new-order"); // remove listener
      socket.disconnect();      // disconnect socket
    };
      
  },[])

  return (
    <div>
      <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
        <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
          <h2 className="text-primary mb-0">
            <i className="fa fa-user-edit"></i>
          </h2>
        </a>
        <a href="#" className="sidebar-toggler flex-shrink-0">
          <i className="fa fa-bars"></i>
        </a>
        <form className="d-none d-md-flex ms-4">
          <input
            className="form-control bg-dark border-0"
            type="search"
            placeholder="Search"
          />
        </form>
        <div className="navbar-nav align-items-center ms-auto">
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-envelope me-lg-2"></i>
              <span className="d-none d-lg-inline-flex">Message</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
              <a href="#" className="dropdown-item">
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    src="assest/img/user.jpg"
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div className="ms-2">
                    <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                    <small>15 minutes ago</small>
                  </div>
                </div>
              </a>
              <hr className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    src="assest/img/user.jpg"
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div className="ms-2">
                    <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                    <small>15 minutes ago</small>
                  </div>
                </div>
              </a>
              <hr className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    src="assest/img/user.jpg"
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div className="ms-2">
                    <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                    <small>15 minutes ago</small>
                  </div>
                </div>
              </a>
              <hr className="dropdown-divider" />
              <a href="#" className="dropdown-item text-center">
                See all message
              </a>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <span className="position-relative">
                <i className="fa fa-bell me-lg-2"></i>

                {notifications.length == 0 ? (
                  ""
                ) : (
                  <>
                    {" "}
                    <span
                      className="position-absolute text-primary"
                      style={{ right: "10px", top: "-10px" }}
                    >
                      <div class="notification-bell">
                        <svg viewBox="0 0 24 24" class="bell-icon">
                          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.1-1.6-5.6-4.5-6.3V4c0-.8-.7-1.5-1.5-1.5S10.5 3.2 10.5 4v.7C7.6 5.4 6 7.9 6 11v5l-1.8 1.8c-.3.3-.1.7.3.7h15c.4 0 .6-.4.3-.7L18 16z" />
                        </svg>

                          <span class="notification-count">{ notifications?.length}</span>
                      </div>
                    </span>
                  </>
                )}
              </span>
              <span className="d-none d-lg-inline-flex">Notification</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
              {notifications.length == 0 ? (
                <p className="text-primary p-3">No Notification</p>
              ) : (
                notifications &&
                notifications?.map((notification) => {
                  return (
                    <>
                      <a href="#" className="dropdown-item">
                        <h6 className="fw-normal mb-0">
                          {notification?.customer?.name} created Order
                        </h6>
                        <small>{moment.utc(notification?.createdAt).fromNow()}</small>
                      </a>
                      <hr className="dropdown-divider" />
                      <a href="#" className="dropdown-item text-center">
                        See all notifications
                      </a>
                    </>
                  );
                })
              )}
            </div>
          </div>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <img
                className="rounded-circle me-lg-2"
                src="assest/img/user.jpg"
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <span className="d-none d-lg-inline-flex">John Doe</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
              <a href="#" className="dropdown-item">
                My Profile
              </a>
              <a href="#" className="dropdown-item">
                Settings
              </a>
              <a href="#" className="dropdown-item">
                Log Out
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav