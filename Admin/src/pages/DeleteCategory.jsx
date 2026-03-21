import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search , setSearch] = useState("")

  // 🔹 Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        
        const data = await res.json();
        console.log(data);
        
        
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete category
  const deleteCategory = async (id) => {
    try {
      if (id) {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/category/delete/${id}`,
          {
            method: "DELETE",
          },
        );

        if (response.ok) {
          setLoading(false);
          toast.success("Category removed successfully");

          // 🔥 Close modal programmatically
          const modalElement = document.getElementById("deleteModal");
          const modalInstance =
            window.bootstrap.Modal.getInstance(modalElement);

          if (modalInstance) {
            modalInstance.hide();
          }

          // 🔄 Optional: refresh list after delete
          fetchCategories();
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

    const filteredcategories = categories.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <div className="container py-5">
      <div className="card shadow-lg bg-light border-0 rounded-4">
        <div className="card-body">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold">Manage Categories</h4>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Created</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredcategories.map((cat, index) => (
                  <tr key={cat._id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{cat.title}</td>
                    <td>{new Date(cat.createdAt).toLocaleDateString()}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => setCatId(cat._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 🔥 Delete Modal */}
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold text-danger">
                Delete Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              <p className="mb-0">
                Are you sure you want to delete this category?
                <strong> This action cannot be undone.</strong>
              </p>
            </div>

            <div className="modal-footer border-0">
              <button className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </button>

              <button
                className="btn btn-danger"
                onClick={() => deleteCategory(catId)}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>

            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
