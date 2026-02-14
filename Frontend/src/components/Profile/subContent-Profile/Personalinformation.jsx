import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../Custom-context/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

export const Personalinformation = () => {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  const { loggedInUserData } = useAuth();

  // Populate user info safely
  useEffect(() => {
    if (!loggedInUserData) return;

    try {
      reset({
        fullName: loggedInUserData.fullName || "",
        username: loggedInUserData.username || "",
        email: loggedInUserData.email || "",
        phone: loggedInUserData.phone || "",
        dob: loggedInUserData.dob
          ? new Date(loggedInUserData.dob).toLocaleDateString()
          : "",
        street: loggedInUserData.address?.street || "",
        city: loggedInUserData.address?.city || "",
        state: loggedInUserData.address?.state || "",
        country: loggedInUserData.address?.country || "",
        postalCode: loggedInUserData.address?.postalCode || "",
      });
    } catch (err) {
      setError("Failed to load user information.");
    } finally {
      setLoading(false);
    }
  }, [loggedInUserData, reset]);

  const onSubmit = async (formData) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/change/password`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            userId: loggedInUserData._id,
          }),
        },
      );

      const data = await res.json();

      if (data.success == true) {
        toast.success(data.message || " password updated successfully");
        reset();
        
      }
      if (data.success == false) {
        toast.error(data.message || " failed to update password");
      }

    } catch (err) {
      toast.error(error.message || " An error occur while updating password");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;


  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Info */}
            <div className="card mb-4 shadow-sm rounded-4">
              <div className="card-header fw-bold fs-5">
                Personal Information
              </div>
              <div className="card-body">
                <input
                  className="form-control mb-3"
                  {...register("fullName")}
                  readOnly
                />
                <input
                  className="form-control mb-3"
                  {...register("email")}
                  readOnly
                />
                <input
                  className="form-control mb-3"
                  {...register("phone")}
                  readOnly
                />
              </div>
            </div>

            {/* Security Section */}
            <div className="card mb-4 shadow-sm rounded-4">
              <div className="card-header fw-bold fs-5">Security</div>
              <div className="card-body">
                {/* Current Password */}
                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    {...register("currentPassword", {
                      required: "Current password is required",
                    })}
                  />
                  {errors.currentPassword && (
                    <small className="text-danger">
                      {errors.currentPassword.message}
                    </small>
                  )}
                </div>

                {/* New Password */}
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 8 characters required",
                      },
                    })}
                  />
                  {errors.newPassword && (
                    <small className="text-danger">
                      {errors.newPassword.message}
                    </small>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <small className="text-danger">
                      {errors.confirmPassword.message}
                    </small>
                  )}
                </div>

                {/* Toggle */}
                <button
                  type="button"
                  className="btn btn-outline-secondary mb-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"} Passwords
                </button>

                <br />

                <button
                  type="submit"
                  className="btn btn-primary rounded-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Password"}
                </button>
              </div>
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
          </form>
        </div>
      </div>
    </div>
  );
};
