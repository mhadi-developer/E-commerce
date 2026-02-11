import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";

// ---------------- Zod Schema ----------------
const categorySchema = z.object({
  title: z.string().min(1, "Category title is required"),
  isPublic: z.boolean(),
});

export default function AddCategoryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      isPublic: true,
    },
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // ---------------- Image Handlers ----------------
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ---------------- Submit Handler ----------------
  const onSubmit = async (data) => {
    if (!image) {
      toast.error("Please select an image for the category.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("isPublic", data.isPublic);
    formData.append("image", image);

    // ---------------- Log submitted data ----------------
    console.log("---- Submitting Category Data ----");
    console.log("Title:", data.title);
    console.log("isPublic:", data.isPublic);
    console.log("Image:", image);
    console.log("-------------------------------");

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/category/add`, {
        method: "POST",
        body: formData, // do NOT set Content-Type
      });

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      const responseData = await res.json();
      toast.success("Category added successfully!");
      console.log("Backend response:", responseData);

      // Reset form
      reset();
      removeImage();
    } catch (err) {
      console.error("Request error:", err.message);
      toast.error("Failed to upload category image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 mb-5 p-5">
      <h3 className="mb-4">Add New Category</h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-secondary p-4 rounded shadow"
        encType="multipart/form-data"
      >
        {/* CATEGORY TITLE */}
        <div className="mb-3">
          <label className="form-label">Category Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter category title"
            {...register("title")}
          />
          {errors.title && (
            <small className="text-danger">{errors.title.message}</small>
          )}
        </div>

        {/* IMAGE UPLOAD */}
        <div className="mb-3">
          <label className="form-label">Category Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="form-control"
          />

          {image && (
            <div className="position-relative mt-3" style={{ width: "180px" }}>
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="img-fluid rounded border"
              />
              <button
                type="button"
                className="btn btn-sm btn-primary position-absolute"
                style={{ top: "5px", right: "5px" }}
                onClick={removeImage}
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* PUBLIC / PRIVATE */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="isPublic"
            {...register("isPublic")}
          />
          <label className="form-check-label" htmlFor="isPublic">
            Public Category
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Category"}
        </button>

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
      </form>
    </div>
  );
}
