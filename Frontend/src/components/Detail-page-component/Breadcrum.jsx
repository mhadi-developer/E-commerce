import React from "react";
import { Link } from "react-router";

const Breadcrumb = (  ) => {
  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-12">
          <nav className="breadcrumb bg-light mb-30">
            <Link to={'/'} className="breadcrumb-item text-dark">
              Home
            </Link>
            <a className="breadcrumb-item text-dark">
              Shop
            </a>
            <span className="breadcrumb-item active"> Shop Details</span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
