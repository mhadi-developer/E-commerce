/* eslint-disable no-unused-vars */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import * as z from "zod";
import "react-phone-input-2/lib/bootstrap.css";
import { usePost } from "../customHooks/usePost";
import { useAuth } from "../Custom-context/AuthProvider";
import { Navigate, useNavigate } from "react-router";

const schema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string(),
    phone: z.string().min(10, "Enter a valid phone number"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function SignupForm() {

  const { loggedInUserData, loggedInUserError, loggedInUserLoading } = useAuth();
  // checking user already logged in or not
  

  if (loggedInUserLoading) return <strong>loading... please wait...</strong>;
  if (loggedInUserData && loggedInUserData?.fullName) return <Navigate to={'/'} />;  //Redirecting loogedin User to home page 




   const { postData, data, error, loading } = usePost(
     `${import.meta.env.VITE_API_URL}/users/signup`,
   );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors , isSubmitting},
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit =  async (data) => {
     data = await  postData(data);
  };
  console.log("**********************SignUp******************************",data);
  

  if (data) {
     window.location.href = "/"
   }


  return (
    <div className="container py-5 px-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-4 text-center signup-text">Create Account</h4>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    className={`form-control ${
                      errors.fullName && "is-invalid"
                    }`}
                    {...register("fullName")}
                  />
                  <div className="invalid-feedback">
                    {errors.fullName?.message}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className={`form-control ${errors.email && "is-invalid"}`}
                    {...register("email")}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>

                {/* Phone Input */}
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        country={"us"}
                        value={field.value}
                        onChange={field.onChange}
                        inputClass="form-control"
                        inputStyle={{ width: "100%" }}
                      />
                    )}
                  />
                  {errors.phone && (
                    <div className="text-danger small mt-1">
                      {errors.phone.message}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password && "is-invalid"
                    }`}
                    {...register("password")}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword && "is-invalid"
                    }`}
                    {...register("confirmPassword")}
                  />
                  <div className="invalid-feedback">
                    {errors.confirmPassword?.message}
                  </div>
                </div>

                <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting? true:false}>
                 {isSubmitting? "CreatingAccount.....": " CreateAcount"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
