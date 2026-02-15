import React, { useEffect , useState } from "react";
import { useSearchParams } from "react-router";

const ConfirmedOrderDetails = () => {
    const [order, setOrder] = useState(null);
    const [searchParams] = useSearchParams();
    
    const order_id = searchParams.get("orderId"); // order id from backend response after order confirmation


    console.log("*************Confirm order ID", order_id);
    useEffect(() => {
        const sendIdToBackend = async () => {
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/order/find`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
           order_id
          }),
            });
            
            const res = await response.json();

            console.log("tracked order response =>", res);
            setOrder(res);
            
            
        }
        sendIdToBackend();
    }, [order_id]);
  






  if (!order) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          Order details not available.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center ">
        <div className="col-lg-8">
          {/* Header */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body text-center">
              <i className="bi bi-check-circle-fill text-success fs-1 mb-3"></i>
              <h4 className="fw-bold mb-1">Order Confirmed</h4>
              <p className="text-muted mb-0">
                Thank you for your purchase. Your order has been successfully
                placed.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-light fw-semibold">
              Order Summary
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6 fw-bold">Order Owner</div>
                <div className="col-6 text-end fw-bold">
                  {order?.customer?.name}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6 text-muted">Order ID</div>
                <div className="col-6 text-end fw-semibold">{order?._id}</div>
              </div>

              <div className="row mb-2">
                <div className="col-6 text-muted">Payment Status</div>
                <div className="col-6 text-end">
                  <span className="badge bg-success">
                    {order?.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-6 text-muted">Order Date</div>
                <div className="col-6 text-end">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-6 fw-bold">Total Amount</div>
                <div className="col-6 text-end fw-bold">
                  {(order?.totalAmount / 100).toFixed(2) * 280} -PKR
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-secondary fw-semibold">
              Purchased Items
            </div>
            <ul className="list-group list-group-flush">
              {order.lineItems.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    {/* Product Image */}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="me-3"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                  </div>
                  <span className="fw-semibold">
                    {(item.unitAmount / 100) * 280 * item.quantity}/-PKR
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="text-center">
            <a
              href="/user/all/orders"
              className="btn btn-outline-secondary me-2"
            >
              View All Orders
            </a>
            <a href="/" className="btn btn-primary">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedOrderDetails;
