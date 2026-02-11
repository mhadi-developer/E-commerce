/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../customHooks/usePost";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Custom-context/AuthProvider";
import * as z from "zod";



// Validation Schema
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export default function SignInForm() {

  const { loggedInUserData, loggedInUserError, loggedInUserLoading } = useAuth();

  if (loggedInUserLoading) return <p>loading.....</p>
  if(loggedInUserData && loggedInUserData?.fullName) return <Navigate to={'/'} />  // checking is user already logged in or not.
  
  const location = useNavigate();



  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signInSchema) });
  









  
    
    const { postData, data, loading, error } = usePost(`${import.meta.env.VITE_API_URL}/users/signin`,);
    
    console.log("response after log in request",data);
    console.log(error);
    
    
      

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    await postData(data);
    location('/'); // redirecting to homepage
    
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h4 className="text-center mb-4 signin-text">Sign In</h4>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    {...register("email")}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password")}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>

                {/* Remember Me */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>

                <div className="text-center mt-3">
                  <small>
                    Don’t have an account? <a href="/signup">Create one</a>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
