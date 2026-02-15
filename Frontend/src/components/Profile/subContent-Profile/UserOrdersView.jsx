import React, { useMemo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Custom-context/AuthProvider.jsx";

const UserOrdersView = () => {
  const { loggedInUserData } = useAuth();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2;


  console.log("loggedin user name" , loggedInUserData);
  
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/order/${loggedInUserData._id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await response.json();
      console.log("user fetched orders", data);
      if (data && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (loggedInUserData?._id) {
      fetchOrders();
    }
  }, [loggedInUserData]);

  const navigate = useNavigate();
  const { register, watch } = useForm({
    defaultValues: { status: "all" },
  });
  const selectedStatus = watch("status");

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning text-dark";
      case "processing":
        return "bg-primary";
      case "shipped":
        return "bg-info";
      case "completed":
        return "bg-success";
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  // Filter orders by status
  const filteredOrders = useMemo(() => {
    if (selectedStatus === "all") return orders;
    return orders.filter((order) => order.orderStatus === selectedStatus);
  }, [orders, selectedStatus]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);

  // Paginate filtered orders
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);

  return (
    <div className="container my-5">
      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0 text-white">{loggedInUserData?.fullName} Orders</h4>
        <form>
          <select className="form-select" {...register("status")}>
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </form>
      </div>

      {/* ===== ORDER LIST ===== */}
      {paginatedOrders.length > 0 ? (
        paginatedOrders.map((order) => (
          <div key={order._id} className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              {/* Top Section */}
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="fw-semibold mb-1">
                    Order #{order._id.slice(-7).toUpperCase()}
                  </h6>
                  <small className="text-white text-opacity-80">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <span
                  className={`badge px-3 py-2 ${getStatusBadge(order.orderStatus)}`}
                >
                  {order.orderStatus.toUpperCase()}
                </span>
              </div>

              {/* Items Preview */}
              <div className="mb-3">
                {order.lineItems?.slice(0, 2)?.map((item, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <div
                      className="bg-light rounded me-3"
                      style={{ width: 50, height: 50 }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded"
                        />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center h-100 small text-muted">
                          No Image
                        </div>
                      )}
                    </div>
                    <div>
                      <small className="fw-semibold d-block">{item.name}</small>
                      <small className="text-white text-opacity-75">Qty: {item.quantity}</small>
                    </div>
                  </div>
                ))}
                {order.lineItems?.length > 2 && (
                  <small className="text-muted">
                    + {order.lineItems.length - 2} more items
                  </small>
                )}
              </div>

              {/* Bottom Section */}
              <div className="d-flex justify-content-between align-items-center border-top pt-3">
                <div>
                  <span className="fw-bold fs-5">
                    {(order?.totalAmount / 280).toFixed(2)}{" "}
                    {order.currency?.toUpperCase()}$
                  </span>
                  <div>
                    <small
                      className={`badge ${order.paymentStatus === "paid" ? "bg-success" : "bg-danger"}`}
                    >
                      {order.paymentStatus.toUpperCase()}
                    </small>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    navigate(`/order/confirm/detail?orderId=${order._id}`)
                  }
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-5">
          <h5 className="text-muted">No orders found.</h5>
        </div>
      )}

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default UserOrdersView;
