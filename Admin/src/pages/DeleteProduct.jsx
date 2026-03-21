import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await res.json();
        console.log(data.products);
        
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/product/delete/${id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        toast.success("Product deleted successfully");

        // Close modal
        const modalEl = document.getElementById("deleteProductModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();

        // Update UI without refetch (optimistic update)
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Filter products
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container-fluid bg-secondary py-4">
      {/* 🔷 Header Card */}
      <div className="card shadow-lg border-0 rounded-4 mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fw-bold mb-1 text-primary">Product Management</h3>
            <small className="text-muted">
              Manage, search, and delete products
            </small>
          </div>

          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 🔷 Table Card */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Created</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={product?.mainImage?.secure_url}
                          alt=""
                          className="rounded"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <div className="fw-semibold">{product.title}</div>
                          <small className="text-muted">
                            {product.category}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td className="fw-semibold text-success">
                      PKR-{product.discountPrice}
                    </td>

                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>

                    <td className="text-end">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteProductModal"
                        onClick={() => setProductId(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="text-center py-4 text-muted">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 Premium Delete Modal */}
      <div className="modal fade" id="deleteProductModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 border-0 shadow">
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

              <p className="mb-1 fw-semibold">
                Are you sure you want to delete this product?
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
                onClick={() => deleteProduct(productId)}
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
