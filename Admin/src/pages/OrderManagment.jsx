import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { json } from "zod";

const statusColors = {
  pending: "warning",
  Processing: "info",
  Shipped: "primary",
  Delivered: "success",
  Cancelled: "danger",
};

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [id, setId] = useState(null);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`);
        const data = await res.json();
        console.log(data.orders);
        
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔄 Update Status
  const updateStatus = async () => {
    try {
      setLoading(true);
 const res = await fetch(`${import.meta.env.VITE_API_URL}/order/update/${id}`, {
   method: "PUT",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({ orderStatus: status }),
 });

      if (res.ok) {
        toast.success("Order status updated");

        const modalEl = document.getElementById("statusModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();

        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status } : o)),
        );
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete Order
  const deleteOrder = async (id) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/order/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.ok) {
        toast.success("Order deleted successfully");

        // Close modal
        const modalEl = document.getElementById("deleteOrderModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();

        // Optimistic UI update
        setOrders((prev) => prev.filter((o) => o._id !== id));
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((o) =>
    o._id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container-fluid py-4">
      {/* 🔷 Header */}
      <div className="card shadow-lg border-0 rounded-4 mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fw-bold mb-1">Order Management</h3>
            <small className="text-muted">Update status or remove orders</small>
          </div>

          <input
            type="text"
            className="form-control w-25"
            placeholder="Search Order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 🔷 Table */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="fw-semibold">{order._id}</td>

                    <td>{order?.customer?.name}</td>

                    <td>
                      <span
                        className={`badge bg-${statusColors[order?.orderStatus]}`}
                      >
                        {order?.orderStatus}
                      </span>
                    </td>

                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                    <td className="text-end d-flex gap-2 justify-content-end">
                      {/* Update */}
                      <button
                        className="btn btn-outline-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#statusModal"
                        onClick={() => {
                          setId(order._id);
                          setStatus(order.status);
                        }}
                      >
                        Update
                      </button>

                      {/* Delete */}
                      <button
                        className="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteOrderModal"
                        onClick={() => setId(order._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="text-center py-4 text-muted">No orders found</div>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 Update Status Modal */}
      <div className="modal fade" id="statusModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 shadow border-0">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Update Status</h5>
              <button className="btn-close" data-bs-dismiss="modal" />
            </div>

            <div className="modal-body">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="modal-footer border-0 justify-content-center">
              <button className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </button>

              <button
                className="btn btn-primary px-4"
                onClick={updateStatus}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 Delete Order Modal */}
      <div className="modal fade" id="deleteOrderModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 shadow border-0">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold text-danger">
                Confirm Deletion
              </h5>
              <button className="btn-close" data-bs-dismiss="modal" />
            </div>

            <div className="modal-body text-center">
              <div className="mb-3">
                <div
                  className="bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px" }}
                >
                  ⚠️
                </div>
              </div>

              <p className="fw-semibold mb-1">
                Are you sure you want to delete this order?
              </p>
              <small className="text-muted">
                This action cannot be undone.
              </small>
            </div>

            <div className="modal-footer border-0 justify-content-center">
              <button className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </button>

              <button
                className="btn btn-danger px-4"
                onClick={() => deleteOrder(id)}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}
