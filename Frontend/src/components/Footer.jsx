import React from "react";

const Footer = () => {
  const quickLinks = [
    "Home",
    "Our Shop",
    "Shop Detail",
    "Shopping Cart",
    "Checkout",
    "Contact Us",
  ];

  const myAccountLinks = [
    "Home",
    "Our Shop",
    "Shop Detail",
    "Shopping Cart",
    "Checkout",
    "Contact Us",
  ];

  const socialLinks = [
    { icon: "fab fa-twitter", url: "#" },
    { icon: "fab fa-facebook-f", url: "#" },
    { icon: "fab fa-linkedin-in", url: "#" },
    { icon: "fab fa-instagram", url: "#" },
  ];

  return (
    <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
      <div className="row px-xl-5 pt-5">
        {/* Get in Touch */}
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
          <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
          <p className="mb-4">
            No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et
            et dolor sed dolor. Rebum tempor no vero est magna amet no
          </p>
          <p className="mb-2">
            <i className="fa fa-map-marker-alt text-primary mr-3"></i>123
            Street, New York, USA
          </p>
          <p className="mb-2">
            <i className="fa fa-envelope text-primary mr-3"></i>info@example.com
          </p>
          <p className="mb-0">
            <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890
          </p>
        </div>

        {/* Links and Newsletter */}
        <div className="col-lg-8 col-md-12">
          <div className="row">
            {/* Quick Shop */}
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">Quick Shop</h5>
              <div className="d-flex flex-column justify-content-start">
                {quickLinks.map((link, index) => (
                  <a key={index} className="text-secondary mb-2" href="#">
                    <i className="fa fa-angle-right mr-2"></i>
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* My Account */}
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">My Account</h5>
              <div className="d-flex flex-column justify-content-start">
                {myAccountLinks.map((link, index) => (
                  <a key={index} className="text-secondary mb-2" href="#">
                    <i className="fa fa-angle-right mr-2"></i>
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">Newsletter</h5>
              <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Email Address"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary">Sign Up</button>
                  </div>
                </div>
              </form>

              <h6 className="text-secondary text-uppercase mt-4 mb-3">
                Follow Us
              </h6>
              <div className="d-flex">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    className="btn btn-primary btn-square mr-2"
                    href={social.url}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        className="row border-top mx-xl-5 py-4"
        style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}
      >
        <div className="col-md-6 px-xl-0">
          <p className="mb-md-0 text-center text-md-left text-secondary">
            &copy;{" "}
            <a className="text-primary" href="#">
              Domain
            </a>
            . All Rights Reserved. Designed by{" "}
            <a className="text-primary" href="https://htmlcodex.com">
              HTML Codex
            </a>
            <br />
            Distributed By:{" "}
            <a href="https://themewagon.com" target="_blank">
              ThemeWagon
            </a>
          </p>
        </div>
        <div className="col-md-6 px-xl-0 text-center text-md-right">
          <img className="img-fluid" src="assesst/img/payments.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
