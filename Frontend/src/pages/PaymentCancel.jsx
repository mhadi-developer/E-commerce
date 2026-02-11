import { Link } from "react-router-dom";

const PaymentCancellation = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-3">
      <div
        className="card border-0 shadow-lg rounded-4"
        style={{ maxWidth: "460px", width: "100%" }}
      >
        <div className="card-body p-4 p-md-5 text-center">
          {/* Cancel Icon */}
          <div className="mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-10"
              style={{ width: "90px", height: "90px" }}
            >
              <i className="bi bi-x-circle-fill text-white fs-1"></i>
            </div>
          </div>

          {/* Title */}
          <h2 className="fw-semibold text-dark mb-2">Payment Cancelled</h2>

          {/* Description */}
          <p className="text-muted mb-4">
            Your payment was not completed. No charges were made. You can try
            again or return to shopping.
          </p>

          {/* Order Info (Optional) */}
          <div className="bg-light rounded-3 p-3 mb-4 text-start">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">Order ID</span>
              <span className="fw-medium text-dark">#ORD-92831</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted small">Payment Attempt</span>
              <span className="fw-medium text-dark">Card (Stripe)</span>
            </div>
          </div>

          {/* Actions */}
          <div className="d-grid gap-3">
            <Link to="/checkout" className="btn btn-danger btn-lg rounded-pill">
              Retry Payment
            </Link>

            <Link
              to="/"
              className="btn btn-primary btn-lg rounded-pill"
            >
              Return Home
            </Link>
          </div>

          {/* Footer */}
          <p className="text-muted small mt-4 mb-0">
            If you think this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancellation;
