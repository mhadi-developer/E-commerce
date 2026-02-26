/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useContext } from "react";
import { useCart } from "../Custom-context/CartProvider";





export default function Nav({ categories }) {
  
  let [showmenue, setShowMeanue] = useState(false);
  function handelToggle() {
    setShowMeanue(!showmenue);
  }
  const { cartState } = useCart();
  console.log("nav-bar cart", cartState);
  

  return (
    <>
      <div className="navbar-wrapper">
        <div className="container-fluid bg-dark mb-30">
          <div className="row px-xl-5">
            <div className="col-lg-3 d-none d-lg-block position-relative">
              <button
                type="button"
                className="btn d-flex align-items-center justify-content-between bg-primary w-100"
                data-bs-toggle="collapse"
                data-bs-target="#navbar-vertical"
                aria-expanded="false"
                aria-controls="navbar-vertical"
                style={{ height: "65px", padding: "0px 30px" }}
              >
                <h6 className="text-dark m-0">
                  <i className="fa fa-bars me-2"></i> Categories
                </h6>
                <i className="fa fa-angle-down text-dark"></i>
              </button>
              <nav
                id="navbar-vertical"
                className="collapse position-absolute navbar navbar-light align-items-start p-0 bg-light"
                style={{ width: "calc(100% - 30px)", zIndex: 999 }}
              >
                <div className="navbar-nav dropdown w-100">
                  {categories?.map((category, index) => (
                    <a href="" className="nav-item nav-link">
                      {category.title}
                    </a>
                  ))}
                </div>
              </nav>
            </div>

            <div className="col-lg-9">
              <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                <Link to="/" className="text-decoration-none d-block d-lg-none">
                  <span className="h1 text-uppercase text-dark bg-light px-2">
                    Multi
                  </span>
                  <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                    Shop
                  </span>
                </Link>
                <button
                  type="button"
                  className="navbar-toggler"
                  data-toggle="collapse"
                  data-target="#navbarCollapse"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse justify-content-between"
                  id="navbarCollapse"
                >
                  <div className="navbar-nav mr-auto py-0">
                    <Link to="/" className="nav-item nav-link active">
                      Home
                    </Link>
                    <a href="shop.html" className="nav-item nav-link">
                      Shop
                    </a>
                    <a href="detail.html" className="nav-item nav-link">
                      Shop Detail
                    </a>
                    <div className="nav-item dropdown">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        Pages <i className="fa fa-angle-down mt-1"></i>
                      </a>
                      <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                        <a href="cart.html" className="dropdown-item">
                          Shopping Cart
                        </a>
                        <a href="checkout.html" className="dropdown-item">
                          Checkout
                        </a>
                      </div>
                    </div>
                    <a href="contact.html" className="nav-item nav-link">
                      Contact
                    </a>
                  </div>
                  <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                    <a href="" className="px-0">
                      <i className="fas fa-heart text-primary"></i>
                      <span
                        className="badge text-secondary border border-secondary rounded-circle"
                        style={{ paddingBottom: "2px" }}
                      >
                        0
                      </span>
                    </a>
                    <Link to={'/cart'} className=" px-0 ml-3">
            
                     <i className="fas fa-shopping-cart text-primary"></i>
                      <span
                        className="badge text-secondary border border-secondary rounded-circle"
                        style={{ paddingBottom: "2px" }}
                      >
                        {cartState.length}
                      </span>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
