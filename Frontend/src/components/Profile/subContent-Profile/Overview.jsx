import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { usePut } from "../../../customHooks/usePut";
import { ToastContainer, toast } from "react-toastify"
import { useAuth } from "../../../Custom-context/AuthProvider";

/* ---------------- ZOD SCHEMA ---------------- */

const billingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Invalid phone number"),
  address1: z.string().min(5, "Address Line 1 is required"),
  address2: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  zip: z.string().min(3, "ZIP code is required"),
});

const Overview = () => {
  const { loggedInUserData} = useAuth()
  /* -------- Simulated Existing User Data -------- */
  const userData = {
    fullName: loggedInUserData?.fullName || "Hadi Qureshi",
    email: loggedInUserData?.email || "hadiquershi08@gmail.com",
    mobile: loggedInUserData?.mobile || "923095361664",
    address1: "Street 123",
    address2:  "",
    country: loggedInUserData?.address?.country || "Pakistan",
    city: loggedInUserData?.address?.city || "Rawalpindi",
    province: "Punjab",
    zip: "54000",
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(billingSchema),
    defaultValues: userData,
  });

  useEffect(() => {
    reset(userData);
  }, [reset]);
    const { updateUserData , updateData } = usePut(
      `${import.meta.env.VITE_API_URL}/users/update`,
    );
  const onSubmit = async (data) => {
    console.log("Validated Data:", data);

    // simulate API call
    try {
      const result = await updateUserData(data);
      const res = await result.json();
      if (res.success) {
        toast.success("user Information updated Successfully")
          console.log("updated user data ====>", updateData);
      }
      
     } catch (error) {
      toast.error("Failed to update user information")
     }
   
  };


  

  return (
    <div className="row">
      <div className="col-lg-12">
        <form onSubmit={handleSubmit(onSubmit)}  className="bg-secondary">
          <div className=" p-30 mb-5">
            <div className="row">
              {/* Full Name */}
              <div className="col-md-12 form-group">
                <label>Full Name</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("fullName")}
                />
                <small className="text-danger">
                  {errors.fullName?.message}
                </small>
              </div>

              {/* Email */}
              <div className="col-md-6 form-group">
                <label>E-mail</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("email")}
                />
                <small className="text-danger">{errors.email?.message}</small>
              </div>

              {/* Phone */}
              <div className="col-md-6 form-group">
                <label>Mobile No</label>
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      country="pk"
                      inputClass="form-control"
                      containerClass="w-100"
                    />
                  )}
                />
                <small className="text-danger">{errors.mobile?.message}</small>
              </div>

              {/* Address 1 */}
              <div className="col-md-6 form-group">
                <label>Address Line 1</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("address1")}
                />
                <small className="text-danger">
                  {errors.address1?.message}
                </small>
              </div>

              {/* Address 2 */}
              <div className="col-md-6 form-group">
                <label>Address Line 2 (Optional)</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("address2")}
                />
              </div>

              {/* Country */}
              <div className="col-md-6 form-group">
                <label>Country</label>
                <select className="custom-select" {...register("country")}>
                  <option value="">Select Country</option>
                  <option value="United States">United States</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
                <small className="text-danger">{errors.country?.message}</small>
              </div>

              {/* City */}
              <div className="col-md-6 form-group">
                <label>City</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("city")}
                />
                <small className="text-danger">{errors.city?.message}</small>
              </div>

              {/* Province */}
              <div className="col-md-6 form-group">
                <label>Province</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("province")}
                />
                <small className="text-danger">
                  {errors.province?.message}
                </small>
              </div>

              {/* ZIP */}
              <div className="col-md-6 form-group">
                <label>ZIP Code</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("zip")}
                />
                <small className="text-danger">{errors.zip?.message}</small>
              </div>

              {/* Submit */}
              <div className="col-12">
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Info"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer
              position="top-center"
              autoClose={4500}
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
    
  );
};

export default Overview;
