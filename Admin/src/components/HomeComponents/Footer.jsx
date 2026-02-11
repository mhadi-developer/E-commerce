import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-secondary rounded-top p-4">
        <div className="row">
          <div className="col-12 col-sm-6 text-center text-sm-start">
            &copy; <a href="#">Your Site Name</a>, All Rights Reserved.
          </div>
          <div className="col-12 col-sm-6 text-center text-sm-end">
            {/* Template attribution */}
            Designed By <a href="https://htmlcodex.com">HTML Codex</a>
            <br />
            Distributed By:{" "}
            <a href="https://themewagon.com" target="_blank" rel="noreferrer">
              ThemeWagon
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
