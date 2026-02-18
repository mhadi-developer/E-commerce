import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../../Custom-context/AuthProvider";
import { useNavigate } from "react-router-dom";

const MessagesPanel = () => {
  const { loggedInUserData } = useAuth();
  const navigate = useNavigate();

 const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const messagesPerPage = 5;

  // Fetch all messages once
 const fetchNotificationsUser = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/orders/notifications/${loggedInUserData._id}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();

    // ✅ Extract notifications array
    setMessages(Array.isArray(data?.notifications) ? data.notifications : []);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
      if (loggedInUserData?._id) {
          fetchNotificationsUser();
      }
  }, [loggedInUserData?._id]);

  // Filter by status
 const filteredMessages = useMemo(() => {
   if (!Array.isArray(messages)) return [];
   if (selectedStatus === "all") return messages;
   return messages.notifications.filter((msg) => msg.orderStatus === selectedStatus);
 }, [messages, selectedStatus]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);

  // Paginate filtered messages
  const paginatedMessages = useMemo(() => {
    if (!Array.isArray(filteredMessages)) return [];
    const start = (currentPage - 1) * messagesPerPage;
    return filteredMessages.slice(start, start + messagesPerPage);
  }, [filteredMessages, currentPage]);
  // Status badge helper
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

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Header + Status Filter */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">Order Notifications</h4>
            <select
              className="form-select w-auto"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Notification List */}
          <div className="list-group shadow-sm rounded-4 overflow-hidden">
            {paginatedMessages.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted mb-0">No notifications found.</p>
              </div>
            ) : (
              paginatedMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="list-group-item list-group-item-action border-0 py-4 px-4"
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="me-3">
                      <div className="d-flex align-items-center mb-2">
                        <span
                          className={`badge fw-semibold me-2 ${getStatusBadge(msg.orderStatus)}`}
                        >
                          {msg.orderStatus?.toUpperCase() || "N/A"}
                        </span>
                        <small className="text-muted">
                          Order ID: #{msg.orderId.slice(-6).toUpperCase()}
                        </small>
                      </div>

                      <p className="mb-2 text-dark fw-medium">{msg.text}</p>

                      <button
                        className="btn btn-sm btn-outline-primary rounded-pill px-3"
                        onClick={() =>
                          navigate(
                            `/order/confirm/detail?orderId=${msg.orderId}`,
                          )
                        }
                      >
                        View Order
                      </button>
                    </div>

                    <div className="text-end">
                      <small className="text-muted">
                        {new Date(msg.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {paginatedMessages > 1 && (
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
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
      </div>
    </div>
  );
};

export default MessagesPanel;
