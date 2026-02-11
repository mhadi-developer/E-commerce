import React, { useState } from 'react'
import Breadcrumb from '../components/Detail-page-component/Breadcrum.jsx'
import { Link } from 'react-router';
import { useCart } from '../Custom-context/CartProvider';
import { useAuth } from '../Custom-context/AuthProvider';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Controller } from "react-hook-form";
import { z } from "zod";
import { usePut } from '../customHooks/usePut';
import { ToastContainer, toast } from "react-toastify"




//----------------------Billing Schema --------------------------

const billingSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number is required"),
  address1: z.string().min(3, "Address is required"),
  address2: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  zip: z.string().min(3, "ZIP code is required"),
});



// ----------------------------------------------------------







const Checkout = () => {
    const {loggedInUserData } = useAuth();
    const { cartState } = useCart();
  const [shippingFee, setShippingFee] = useState(20);

  const { updateUserData, updateData, updateError, updateLoading } = usePut(
    `${import.meta.env.VITE_API_URL}/users/update`,
  );
  

  console.log('test------------>', cartState);
  
   
    const totalCartAmount = () => {
      let totalCartAmount = 0;
      cartState.forEach((item) => {
        totalCartAmount += item?.price * item?.quantity;
      });
      return totalCartAmount;
    };
  const GST = totalCartAmount() * 0.03;
   //------------------------------------------------------------------------------------

 // stripe payment handler 
 
const handleCheckoutPayment = async () => {
  try {


    console.log('purchasung cart list',cartState);
    

 // stripe object compatablity 
    const purchaseItem = cartState.map((item) => {
      return {
        title: item.title,
        unitPrice: item.price,
        quantity:item.quantity
      }
    })


    console.log('stripe payment list',purchaseItem);
    


   
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/payment/checkout/sessions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: purchaseItem }),
      },
    );

    const session = await res.json();

    
    console.log("session respose***********",session);
    
if (session.url) {
  window.location.href = session.url;
}
}
   catch (err) {
    console.error("checkout Error", err);
  }
};

//-------------------------------------------------------------------------------------  



    const {
      register,
      handleSubmit,
      control,
      reset,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: zodResolver(billingSchema),
      defaultValues: {
        fullName: loggedInUserData?.fullName || "",
        email: loggedInUserData?.email || "",
        mobile: loggedInUserData?.phone || "",
      },
    });

    const onSubmit = async (data) => {
      console.log("Billing Data:", data);
      try {
        await updateUserData(data);
        console.log("updated data", updateData);
        console.log("error in updating user", updateError);
        toast.success("Updated Data successfully");
        
      
     } catch (error) {
      toast.error("something went wrong", error);
     }
      reset();

    };
  return (
    <div>
      <Breadcrumb />

      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Billing Address</span>
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-light p-30 mb-5">
                <div className="row">
                  <div className="col-md-12 form-group">
                    <label>Full Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="John Doe"
                      {...register("fullName")}
                      readOnly
                    />
                    <small className="text-danger">
                      {errors.fullName?.message}
                    </small>
                  </div>

                  <div className="col-md-6 form-group">
                    <label>E-mail</label>
                    <input
                      readOnly
                      className="form-control"
                      type="text"
                      placeholder="example@email.com"
                      {...register("email")}
                    />
                    <small className="text-danger">
                      {errors.email?.message}
                    </small>
                  </div>

                  <div className="col-md-6 form-group">
                    <label>Mobile No</label>
                    <Controller
                      name="mobile"
                      control={control}
                      render={({ field }) => (
                        <PhoneInput
                          {...field}
                          readonly={true}
                          disableDropdown
                          inputProps={{ readOnly: true }}
                          country="us"
                          inputClass="form-control"
                          containerClass="w-100"
                          placeholder="Enter phone number"
                        />
                      )}
                    />

                    <small className="text-danger">
                      {errors.mobile?.message}
                    </small>
                  </div>

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

                  <div className="col-md-6 form-group">
                    <label>Address Line 2 (Optional)</label>
                    <input
                      className="form-control"
                      type="text"
                      {...register("address2")}
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <label>Country</label>
                    <select className="custom-select" {...register("country")}>
                      <option value="">Select Country</option>
                      <option value="United States">United States</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Albania">United Kingdom</option>
                    </select>
                    <small className="text-danger">
                      {errors.country?.message}
                    </small>
                  </div>

                  <div className="col-md-6 form-group">
                    <label>City</label>
                    <input
                      className="form-control"
                      type="text"
                      {...register("city")}
                    />
                    <small className="text-danger">
                      {errors.city?.message}
                    </small>
                  </div>

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

                  <div className="col-md-6 form-group">
                    <label>ZIP Code</label>
                    <input
                      className="form-control"
                      type="text"
                      {...register("zip")}
                    />
                    <small className="text-danger">{errors.zip?.message}</small>
                  </div>

                  <div className="col-12">
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving....." : "  Save Info"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-lg-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Order Total</span>
            </h5>

            <div className="bg-light p-30 mb-5">
              <div className="border-bottom">
                <h6 className="mb-3">Products</h6>
                {cartState?.length > 0 &&
                  cartState.map((item) => (
                    <div
                      key={item?._id}
                      className="d-flex justify-content-between"
                    >
                      <p>
                        {item?.title.length > 35
                          ? item?.title.slice(0, 30) + "..."
                          : item?.title}
                      </p>
                      <p>{item?.quantity * item?.price}/-PKR</p>
                    </div>
                  ))}

                <div className="border-bottom pt-3 pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>{totalCartAmount()}/-Pkr</h6>
                  </div>

                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Shipping</h6>
                    <h6 className="font-weight-medium">{shippingFee}/-PKR</h6>
                  </div>

                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">GST</h6>
                    <h6 className="font-weight-medium">{GST}/-PKR</h6>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>{totalCartAmount() + shippingFee + GST}/-PKR</h5>
                  </div>
                </div>
              </div>

              <div className="mb-5 mt-5">
                <h5 className="section-title position-relative text-uppercase mb-3">
                  <span className="bg-secondary pr-3">Payment</span>
                </h5>

                <div className="bg-light p-30">
                  <div className="form-group">
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="payment"
                        id="stripepayment"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="stripepayment"
                      >
                        Stripe payment
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="payment"
                        id="cashondelievry"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="directcheck"
                      >
                        Cash on Delievry
                      </label>
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="payment"
                        id="banktransfer"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="banktransfer"
                      >
                        Bank Transfer
                      </label>
                    </div>
                  </div>

                  <button
                    className="btn btn-block btn-primary font-weight-bold py-3"
                    onClick={handleCheckoutPayment}
                  >
                    Checkout Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
}

export default Checkout;