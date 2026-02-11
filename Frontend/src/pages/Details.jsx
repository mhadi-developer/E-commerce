import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Breadcrumb from "../components/Detail-page-component/Breadcrum.jsx"
import Carousel from 'react-bootstrap/Carousel';
import { useCart } from '../Custom-context/CartProvider';



const Details = () => {
  const { slug } = useParams() 
  const [product, setProduct] = useState({})
  const { IncreamentCart , DecrementCart , AddToCart , cartState}=useCart();
  

  useEffect( () => {
    const getProductbySlug = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/product/detail/${slug}`,
      );
      const data = await res.json();
      console.log("=====>",data);
      

      
      // const id = data.product[0]._id;
      
      
      setProduct(data.product[0]);
      
    } 
    getProductbySlug();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
 
 
  console.log('detailpage', cartState);
  const quantity =
  cartState?.find(item => item.productId === product._id)?.quantity ?? "";
  

    
  return (
    <>
      <Breadcrumb />
      <div className="container-fluid pb-5">
        <div className="row px-xl-5">
          {/* Left Column - Carousel */}
          <div className="col-lg-5 mb-30">
            <Carousel>
              {product.galleryImages?.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image.secure_url}
                    alt={`Product ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* Right Column - Product Info */}
          <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-light p-30">
              <h3>{product.title}</h3>

              {/* Rating */}
              <div className="d-flex mb-3">
                <div className="text-primary mr-2">
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star-half-alt"></small>
                  <small className="far fa-star"></small>
                </div>
                <small className="pt-1">(99 Reviews)</small>
              </div>

              <h3 className="font-weight-semi-bold mb-4">
                PKR.{product.discountPrice}
              </h3>
              <p className="mb-4">{product.shortDescription}</p>

              {/* Sizes */}
              <div className="d-flex mb-3">
                <strong className="text-dark mr-3">Sizes:</strong>
                <form>
                  {["XS", "S", "M", "L", "XL"].map((size, i) => (
                    <div
                      key={i}
                      className="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        className="custom-control-input"
                        id={`size-${i + 1}`}
                        name="size"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`size-${i + 1}`}
                      >
                        {size}
                      </label>
                    </div>
                  ))}
                </form>
              </div>

              {/* Colors */}
              <div className="d-flex mb-4">
                <strong className="text-dark mr-3">Colors:</strong>
                <form>
                  {["Black", "White", "Red", "Blue", "Green"].map(
                    (color, i) => (
                      <div
                        key={i}
                        className="custom-control custom-radio custom-control-inline"
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={`color-${i + 1}`}
                          name="color"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`color-${i + 1}`}
                        >
                          {color}
                        </label>
                      </div>
                    )
                  )}
                </form>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="d-flex align-items-center mb-4 pt-2">
                <div
                  className="input-group quantity mr-3"
                  style={{ width: "130px" }}
                >
                  <div className="input-group-btn">
                    <button
                      className="btn btn-primary btn-minus"
                      onClick={() => DecrementCart(product)}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control border-0 text-center"
                    readOnly
                    value={quantity}
                  />
                  <div className="input-group-btn">
                    <button
                      className="btn btn-primary btn-plus"
                      onClick={() => IncreamentCart(product)}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => AddToCart(product)}
                  className="btn btn-primary px-3"
                  disabled={
                    cartState.map((item) => item.quantity > 0) ? true : false
                  }
                >
                  <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
                </button>
              </div>

              {/* Share */}
              <div className="d-flex pt-2">
                <strong className="text-dark mr-2">Share on:</strong>
                <div className="d-inline-flex">
                  {["facebook-f", "twitter", "linkedin-in", "pinterest"].map(
                    (icon, i) => (
                      <a key={i} className="text-dark px-2" href="#">
                        <i className={`fab fa-${icon}`}></i>
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="row px-xl-5">
          <div className="col">
            <div className="bg-light p-30">
              {/* Tab Links */}
              <div className="nav nav-tabs mb-4" role="tablist">
                {[
                  { id: "tab-pane-1", label: "Description", active: true },
                  { id: "tab-pane-2", label: "Information", active: false },
                  { id: "tab-pane-3", label: "Reviews (0)", active: false },
                ].map((tab, i) => (
                  <a
                    key={i}
                    className={`nav-item nav-link text-dark ${
                      tab.active ? "active" : ""
                    }`}
                    id={`${tab.id}-tab`}
                    data-bs-toggle="tab"
                    href={`#${tab.id}`}
                    role="tab"
                    aria-controls={tab.id}
                    aria-selected={tab.active ? "true" : "false"}
                  >
                    {tab.label}
                  </a>
                ))}
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* Description Tab */}
                <div
                  className="tab-pane fade show active"
                  id="tab-pane-1"
                  role="tabpanel"
                  aria-labelledby="tab-pane-1-tab"
                >
                  <h4 className="mb-3">Product Description</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.longDescription,
                    }}
                  />
                </div>

                {/* Information Tab */}
                <div
                  className="tab-pane fade"
                  id="tab-pane-2"
                  role="tabpanel"
                  aria-labelledby="tab-pane-2-tab"
                >
                  <h4 className="mb-3">Additional Information</h4>
                  <p>
                    Eos no lorem eirmod diam diam, eos elitr et gubergren diam
                    sea. Consetetur vero aliquyam invidunt duo dolores et duo
                    sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod
                    consetetur invidunt sed sed et, lorem duo et eos elitr,
                    sadipscing kasd ipsum rebum diam.
                  </p>
                  <div className="row">
                    {[0, 1].map((col) => (
                      <div key={col} className="col-md-6">
                        <ul className="list-group list-group-flush">
                          {[
                            "Sit erat duo lorem duo ea consetetur, et eirmod takimata.",
                            "Amet kasd gubergren sit sanctus et lorem eos sadipscing at.",
                            "Duo amet accusam eirmod nonumy stet et et stet eirmod.",
                            "Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.",
                          ].map((item, i) => (
                            <li key={i} className="list-group-item px-0">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews Tab */}
                <div
                  className="tab-pane fade"
                  id="tab-pane-3"
                  role="tabpanel"
                  aria-labelledby="tab-pane-3-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="mb-4">1 review for "Product Name"</h4>
                      <div className="media mb-4">
                        <img
                          src="img/user.jpg"
                          alt="Image"
                          className="img-fluid mr-3 mt-1"
                          style={{ width: "45px" }}
                        />
                        <div className="media-body">
                          <h6>
                            John Doe
                            <small>
                              {" "}
                              - <i>01 Jan 2045</i>
                            </small>
                          </h6>
                          <div className="text-primary mb-2">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <i className="far fa-star"></i>
                          </div>
                          <p>
                            Diam amet duo labore stet elitr ea clita ipsum,
                            tempor labore accusam ipsum et no at. Kasd diam
                            tempor rebum magna dolores sed sed eirmod ipsum.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <h4 className="mb-4">Leave a review</h4>
                      <small>
                        Your email address will not be published. Required
                        fields are marked *
                      </small>
                      <div className="d-flex my-3">
                        <p className="mb-0 mr-2">Your Rating * :</p>
                        <div className="text-primary">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className="far fa-star"></i>
                          ))}
                        </div>
                      </div>
                      <form>
                        <div className="form-group">
                          <label htmlFor="message">Your Review *</label>
                          <textarea
                            id="message"
                            cols="30"
                            rows="5"
                            className="form-control"
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Your Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Your Email *</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                          />
                        </div>
                        <div className="form-group mb-0">
                          <input
                            type="submit"
                            value="Leave Your Review"
                            className="btn btn-primary px-3"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details