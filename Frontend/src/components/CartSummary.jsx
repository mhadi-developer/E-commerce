import React, { useState } from 'react'
import { Link } from 'react-router';

const CartSummary = ({ totalCartAmount }) => {

    totalCartAmount = totalCartAmount();
    const [shippingFee, setShippingFee] = useState(20);
    const GST = (totalCartAmount * 0.03);
  return (
    <div className="col-lg-4">
      <form className="mb-4 mt-2">
        <div className="input-group">
          <input
            type="text"
            className="form-control border-0 p-4"
            placeholder="Coupon Code"
          />
          <button className="btn btn-primary">Apply Coupon</button>
        </div>
      </form>

      <h5 className="text-uppercase mb-3 mt-4">
        <span className="bg-secondary pe-3">Cart Summary</span>
      </h5>

      <div className="bg-light p-4 mb-5">
        <div className="border-bottom pb-2">
          <div className="d-flex justify-content-between mb-3">
            <h6>Subtotal</h6>
            <h6>{totalCartAmount}/-PKR</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6 className="fw-medium">Shipping</h6>
            <h6 className="fw-medium">{shippingFee}/-PKR</h6>
          </div>
          <div className="d-flex justify-content-between my-3">
            <h6 className="fw-medium">GST</h6>
            <h6 className="fw-medium">{GST}/-PKR</h6>
          </div>
        </div>

        <div className="pt-2">
          <div className="d-flex justify-content-between mt-2">
            <h5>Total</h5>
            <h5>{totalCartAmount + shippingFee+GST}/-PKR</h5>
          </div>
          <Link to={'/checkout'} className="btn btn-primary fw-bold my-3 py-3 w-100">
            Proceed To Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;