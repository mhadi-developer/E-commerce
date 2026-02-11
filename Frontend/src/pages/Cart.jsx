import React from 'react'
import Breadcrumb from "../components/Detail-page-component/Breadcrum.jsx"
import { useCart } from '../Custom-context/CartProvider.jsx'
import CartSummary from '../components/CartSummary.jsx';

const Cart = () => {
  
  const { cartState, IncreamentCart, DecrementCart, RemoveFromCart, ClearCart } = useCart();


  console.log("add to cart state", cartState);
  
  // calculate total cart amount
const totalCartAmount = () => {
    let totalCartAmount = 0;
    cartState.forEach((item) => {
      totalCartAmount += item?.price * item?.quantity;
    })
    return totalCartAmount;
  }
  return (
    <div>
      <Breadcrumb />
      <div className="container-fluid">
        <div className="row px-xl-5">
          {/* Cart Table */}
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody className="align-middle">
                {cartState?.length > 0 &&
                  cartState.map((item) => (
                    <tr key={item._id}>
                      <td className="align-middle">
                        <img
                          src={item?.image?.secure_url}
                          alt="product"
                          style={{ width: "50px" }}
                          className="me-2"
                        />
                        {item.title}
                      </td>
                      <td className="align-middle">{item.price}/-Pkr</td>
                      <td className="align-middle">
                        <div
                          className="input-group quantity mx-auto"
                          style={{ width: "100px" }}
                        >
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => DecrementCart(item)}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className="form-control form-control-sm  border-0 text-center form-custom"
                            value={item?.quantity}
                            readOnly
                          />
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => IncreamentCart(item.productId)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="align-middle">
                        {item?.price * item?.quantity}/-PKR
                      </td>
                      <td className="align-middle">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => RemoveFromCart(item.productId)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <button
              className="btn btn-lg btn-danger my-1"
              onClick={() => ClearCart()}
              disabled={cartState.length == 0 ? true : false}
            >
              Clear Cart <i className="fa fa-times"></i>
            </button>
          </div>

          {/* Cart Summary */}
          <CartSummary totalCartAmount={totalCartAmount} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
