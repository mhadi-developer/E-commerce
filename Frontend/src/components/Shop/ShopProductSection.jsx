import React, { useState } from "react";
import ProductNotFound from "./ProductNotFound";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useCart } from "../../Custom-context/CartProvider";
import { useAuth } from "../../Custom-context/AuthProvider";

const ShopProductSection = ({ products, pages, }) => {
  const { cartState, AddToCart } = useCart();
  const { loggedInUserData } = useAuth(); //check the user is login or not
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = ({ selected }) => {
    onPageChange({
      page: selected + 1,
      limit: itemsPerPage,
    });
  };
  const hasProducts = products?.products?.length > 0;

  const RedirectUserToLogin = () => {
    navigate("/signin");
  };

  return (
    <div className="col-lg-9 col-md-8">
      <div className="row pb-3">
        {/* Toolbar */}
        <div className="col-12 pb-1">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <button className="btn btn-sm btn-light">
                <i className="fa fa-th-large"></i>
              </button>
              <button className="btn btn-sm btn-light ms-2">
                <i className="fa fa-bars"></i>
              </button>
            </div>

            <div className="ms-2 d-flex">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Sorting
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item">Latest</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Popularity</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Best Rating</button>
                  </li>
                </ul>
              </div>

              <div className="btn-group ms-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Showing {itemsPerPage}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {[10, 20, 30].map((value) => (
                    <li key={value}>
                      <button
                        className={`dropdown-item ${
                          itemsPerPage === value ? "active" : ""
                        }`}
                        onClick={() => setItemsPerPage(value)}
                      >
                        {value}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        {!hasProducts ? (
          <ProductNotFound />
        ) : (
          products.products.map((product) => (
            <div key={product._id} className="col-lg-4 col-md-6 col-sm-6 pb-1">
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src={product?.mainImage?.secure_url}
                    alt={product?.title}
                  />
                  <div className="product-action">
                    {loggedInUserData && loggedInUserData.fullName ? (
                      <button
                        className="btn btn-outline-dark btn-square"
                        onClick={() => AddToCart(productData)}
                        disabled={
                          cartState.find(
                            (item) => item.productId == product._id,
                          )
                            ? true
                            : false
                        }
                      >
                        <i className="fa fa-shopping-cart"></i>
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-dark btn-square"
                        onClick={RedirectUserToLogin}
                      >
                        <i className="fa fa-shopping-cart"></i>
                      </button>
                    )}

                    <a href="#" className="btn btn-outline-dark btn-square">
                      <i className="fa fa-sync-alt"></i>
                    </a>
                    <a href="#" className="btn btn-outline-dark btn-square">
                      <i className="fa fa-search"></i>
                    </a>
                    <a href="#" className="btn btn-outline-dark btn-square">
                      <i className="fa fa-heart"></i>
                    </a>
                  </div>
                </div>

                <div className="text-center py-4">
                  <Link
                    className="h6 text-decoration-none"
                    to={`/product/detail/${product?.slug}`}
                  >
                    {product?.title}
                  </Link>

                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>{product?.discountPrice} PKR</h5>
                    <h6 className="text-muted ms-2">
                      <del>{product?.price}</del>
                    </h6>
                  </div>

                  <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary me-1"></small>
                    <small className="fa fa-star text-primary me-1"></small>
                    <small className="fa fa-star text-primary me-1"></small>
                    <small className="fa fa-star text-primary me-1"></small>
                    <small className="fa fa-star-half-alt text-primary me-1"></small>
                    <small>(99)</small>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        {hasProducts && pages > 1 && (
          <div className="col-12">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              previousLabel="Previous"
              pageCount={pages}
              onPageChange={handlePageChange}
              containerClassName="pagination justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProductSection;
