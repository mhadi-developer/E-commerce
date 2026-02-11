import React from "react";

const ProductNotFound = () => {
  return (
    <div className="col-12">
      <div className="d-flex flex-column align-items-center justify-content-center py-5">
        <div className="mb-3 text-primary">
          <i className="fa fa-box-open fa-4x"></i>
        </div>

        <h4 className="fw-semibold mb-2">No Products Found</h4>

        <p
          className="text-muted text-center mb-4"
          style={{ maxWidth: "420px" }}
        >
          We couldn’t find any products matching your current filters. Try
          adjusting your search or clearing some filters.
        </p>

        <button className="btn btn-outline-primary btn-sm">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ProductNotFound;
