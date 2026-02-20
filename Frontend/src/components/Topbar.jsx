import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Custom-context/AuthProvider";
import socket from "../Utilities/useSocket";
import { useEffect } from "react";


const Topbar = () => {
  const [notifications, setNotifications] = useState([]);  // messsage/notifications from socket io order confirmations 
  const [searchProduct, setSearchProduct] = useState('');
  const navigate = useNavigate();

  const { loggedInUserData, loggedInUserError, loggedInUserLoading , LogoutUser } = useAuth();
  console.log('********topbar user', loggedInUserData);
  
  //LogoutUser  == function


  useEffect(() => {
    socket.on("newOrder", (data) => {
      setNotifications(prev => [data , ...prev])
    })
  })

  console.log("notifications for user........", notifications);
  




  const handelSearch = (e) => {
    e.preventDefault();

    if (!searchProduct) return;
    navigate(`/shop/?searchProduct=${searchProduct}`)

      
  }

  return (
    <div>
      <div className="container-fluid">
        {/* Top row: About, Contact, Help, FAQs */}
        <div className="row  py-1 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center h-100">
              <a className="text-body mr-3" href="#">
                About
              </a>
              <a className="text-body mr-3" href="#">
                Contact
              </a>
              <a className="text-body mr-3" href="#">
                Help
              </a>
              <a className="text-body mr-3" href="#">
                FAQs
              </a>
            </div>
          </div>

          <div className="col-lg-6 text-center text-lg-end">
            <div className="d-inline-flex ms-auto">
              {/* Account Dropdown */}
              <div className="btn-group">
                {loggedInUserData && loggedInUserData?.fullName ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-sm btn-light dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {loggedInUserLoading
                        ? "loading"
                        : loggedInUserData?.fullName}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link to="/profile" className="dropdown-item">
                          <span className="d-flex gap-3">
                            Profile
                            <span>
                              {notifications.length > 0 ? (
                                <div className="notification">
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M12 2a7 7 0 00-7 7v4l-2 2v1h18v-1l-2-2V9a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                  <span className="dot"></span>
                                </div>
                              ) : (
                                ""
                              )}
                            </span>
                          </span>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={LogoutUser}
                          className="dropdown-item logout-tab"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-sm btn-light dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      My Account
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link to="/signin" className="dropdown-item">
                          Sign in
                        </Link>
                      </li>
                      <li>
                        <Link to="/signup" className="dropdown-item">
                          Sign up
                        </Link>
                      </li>
                    </ul>
                  </>
                )}
              </div>

              {/* Currency Dropdown */}
              <div className="btn-group mx-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  PKR
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item">EUR</button>
                  </li>
                  <li>
                    <button className="dropdown-item">GBP</button>
                  </li>
                  <li>
                    <button className="dropdown-item">CAD</button>
                  </li>
                </ul>
              </div>

              {/* Language Dropdown */}
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  EN
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item">FR</button>
                  </li>
                  <li>
                    <button className="dropdown-item">AR</button>
                  </li>
                  <li>
                    <button className="dropdown-item">RU</button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile Icons */}
            <div className="d-inline-flex align-items-center d-lg-none mt-2">
              <a href="#" className="btn px-2">
                <i className="fas fa-heart text-dark"></i>
                <span className="badge text-dark border border-dark rounded-circle ms-1">
                  0
                </span>
              </a>

              <a href="#" className="btn px-2">
                <i className="fas fa-shopping-cart text-dark"></i>
                <span className="badge text-dark border border-dark rounded-circle ms-1">
                  0
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: Logo, Search, Customer Service */}
        <div className="row align-items-center py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <a href="#" className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">
                Multi
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                Shop
              </span>
            </a>
          </div>

          <div className="col-lg-4 col-6 text-left">
            <form onSubmit={handelSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                  onChange={(e) => setSearchProduct(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    type="submit"
                    className="input-group-text bg-transparent text-primary"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-lg-4 col-6 text-right">
            <p className="m-0 topbar-text">Customer Service</p>
            <Link to={"/chat/customer/service"}>
              <i className="bi bi-headset fs-3"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
