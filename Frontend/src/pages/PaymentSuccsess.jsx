import { Link, useSearchParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from "../Custom-context/AuthProvider";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const { loggedInUserData } = useAuth();
  const [searchParams] = useSearchParams();
  const [sessionId, setSessionId] = useState(null);
  const [orderResponse, setOrderResponse] = useState();
  const [orderRecord, setOrderRecord] = useState();
  const [loading, setLoading] = useState(true);

  // 1️⃣ Read session_id from URL
  useEffect(() => {
    const id = searchParams.get("session_id");
    if (id) {
      setSessionId(id);
    }
  }, [searchParams]);

  // 2️⃣ Confirm order only when sessionId exists
  useEffect(() => {
    console.log("authorized user order", loggedInUserData);
    
    if (!sessionId || !(loggedInUserData && loggedInUserData?.fullName) ) return;

    const confirmOrder = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/order/confirm`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId,
              userId: loggedInUserData._id,
            }),
          },
        );

        if (!res.ok) {
          throw new Error("Order confirmation failed");
        }

        const { order } = await res.json();
        console.log(order);
        
       const orderInfo = {
         id: order._id,
         status: order.orderStatus,
       };
       
        setOrderRecord(orderInfo);
        setOrderResponse(order);

        if (res) {

          console.log(order);
         
        }

        console.log("Order confirmed successfully");
      } catch (err) {
        console.error("Order confirmation error:", err);
      } finally {
        setLoading(false);
      }
    };

    confirmOrder();
  }, [sessionId, loggedInUserData]);
   

  


  
  console.log(" products that user order$$$$$$$$$$$$", orderRecord);
  

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <span className="spinner-border text-success" />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-3">
      <div
        className="card border-0 shadow-lg rounded-4 bg-secondary"
        style={{ maxWidth: "460px", width: "100%" }}
      >
        <div className="card-body p-4 p-md-5 text-center">
          <div className="mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10"
              style={{ width: "90px", height: "90px" }}
            >
              <i className="bi bi-check-circle-fill text-white fs-1"></i>
            </div>
          </div>

          <h2 className="fw-semibold text-dark mb-2">Payment Successful</h2>

          <p className="text-muted mb-4">
            Your payment has been processed successfully. Your order is now
            being prepared.
          </p>

          <div className="bg-light rounded-3 p-3 mb-4 text-start">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">Order ID</span>
              <span className="fw-medium text-dark">{orderRecord?.id}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted small">Payment Method</span>
              <span className="fw-medium text-dark">Stripe</span>
            </div>
          </div>

          <div className="d-grid gap-3">
            <Link
              to={`/order/confirm/detail?orderId=${orderRecord?.id}`}
              className="btn btn-success btn-lg rounded-pill"
            >
              View Order
            </Link>
            <Link to="/" className="btn btn-primary btn-lg rounded-pill">
              Continue Shopping
            </Link>
          </div>

          <p className="text-muted small mt-4 mb-0">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
