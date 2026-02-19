import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ============================
   ZOD SCHEMA
============================ */

const addressSchema = z.object({
  street: z.string().min(3, "Street must be at least 3 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z
    .string()
    .min(4, "Postal code too short")
    .max(10, "Postal code too long"),
  country: z.string().min(2, "Country is required"),
});

/* ============================
   COMPONENT
============================ */

export default function AddressForm({ userData }) {
  if (!userData) {
    return <p className="text-primary">No User Information</p>;
  }

  console.log({ userData });

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
  } = useForm({
    resolver: zodResolver(addressSchema),
  });

  /* ============================
     FETCH DEFAULT ADDRESS
  ============================ */
  useEffect(() => {
    if (userData?.address) {
      reset({
        street: userData.address.street || "",
        city: userData.address.city || "",
        state: userData.address.state || "",
        postalCode: userData.address.postalCode || "",
        country: userData.address.country || "",
      });
    }
  }, [userData, reset]);
    
    
    
    
    /* Backend Api Call for Update Data*/
const onSubmit = async (data) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/update/${userData._id}`, {
      method: "PUT", // changed to PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // send full address object
    });

    if (!res.ok) throw new Error("Update failed");

    const updatedData = await res.json();

    // Reset form so it becomes clean (isDirty = false)
    reset(updatedData);

    alert("Address updated successfully");
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

  /* ============================
     LOADING STATE
  ============================ */

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  /* ============================
     UI
  ============================ */

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4 p-md-5">
          <h4 className="fw-bold mb-4">Shipping Address</h4>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row g-4">
              {/* Street */}
              <div className="col-12">
                <div className="form-floating">
                  <input
                    {...register("street")}
                    type="text"
                    placeholder="Street"
                    className={`form-control ${
                      errors.street ? "is-invalid" : ""
                    }`}
                  />
                  <label>Street Address</label>
                  <div className="invalid-feedback">
                    {errors.street?.message}
                  </div>
                </div>
              </div>

              {/* City */}
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    {...register("city")}
                    type="text"
                    placeholder="City"
                    className={`form-control ${
                      errors.city ? "is-invalid" : ""
                    }`}
                  />
                  <label>City</label>
                  <div className="invalid-feedback">{errors.city?.message}</div>
                </div>
              </div>

              {/* State */}
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    {...register("state")}
                    type="text"
                    placeholder="State"
                    className={`form-control ${
                      errors.state ? "is-invalid" : ""
                    }`}
                  />
                  <label>State / Province</label>
                  <div className="invalid-feedback">
                    {errors.state?.message}
                  </div>
                </div>
              </div>

              {/* Postal Code */}
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    {...register("postalCode")}
                    type="text"
                    placeholder="Postal Code"
                    className={`form-control ${
                      errors.postalCode ? "is-invalid" : ""
                    }`}
                  />
                  <label>Postal Code</label>
                  <div className="invalid-feedback">
                    {errors.postalCode?.message}
                  </div>
                </div>
              </div>

              {/* Country */}
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    {...register("country")}
                    type="text"
                    placeholder="Country"
                    className={`form-control ${
                      errors.country ? "is-invalid" : ""
                    }`}
                  />
                  <label>Country</label>
                  <div className="invalid-feedback">
                    {errors.country?.message}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-end">
              <button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="btn btn-primary px-4 rounded-pill"
              >
                {isSubmitting ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
