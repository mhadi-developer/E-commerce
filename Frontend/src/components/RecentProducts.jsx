import React from "react";

const RecentProducts = () => {
  const products = [
    {
      id: 1,
      img: "assesst/img/product-1.jpg",
      name: "Product 1",
      price: 123,
      oldPrice: 123,
      rating: 5,
      reviews: 99,
    },
    {
      id: 2,
      img: "assesst/img/product-2.jpg",
      name: "Product 2",
      price: 123,
      oldPrice: 123,
      rating: 4.5,
      reviews: 99,
    },
    {
      id: 3,
      img: "assesst/img/product-3.jpg",
      name: "Product 3",
      price: 123,
      oldPrice: 123,
      rating: 3.5,
      reviews: 99,
    },
    {
      id: 4,
      img: "assesst/img/product-4.jpg",
      name: "Product 4",
      price: 123,
      oldPrice: 123,
      rating: 3,
      reviews: 99,
    },
    {
      id: 5,
      img: "assesst/img/product-5.jpg",
      name: "Product 5",
      price: 123,
      oldPrice: 123,
      rating: 5,
      reviews: 99,
    },
    {
      id: 6,
      img: "assesst/img/product-6.jpg",
      name: "Product 6",
      price: 123,
      oldPrice: 123,
      rating: 4.5,
      reviews: 99,
    },
    {
      id: 7,
      img: "assesst/img/product-7.jpg",
      name: "Product 7",
      price: 123,
      oldPrice: 123,
      rating: 3.5,
      reviews: 99,
    },
    {
      id: 8,
      img: "assesst/img/product-8.jpg",
      name: "Product 8",
      price: 123,
      oldPrice: 123,
      rating: 3,
      reviews: 99,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i)
        stars.push(
          <small key={i} className="fa fa-star text-primary mr-1"></small>
        );
      else if (rating >= i - 0.5)
        stars.push(
          <small
            key={i}
            className="fa fa-star-half-alt text-primary mr-1"
          ></small>
        );
      else
        stars.push(
          <small key={i} className="far fa-star text-primary mr-1"></small>
        );
    }
    return stars;
  };

  return (
    <div className="container-fluid pt-5 pb-3">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Recent Products</span>
      </h2>
      <div className="row px-xl-5">
        {products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <div className="product-item bg-light mb-4">
              <div className="product-img position-relative overflow-hidden">
                <img
                  className="img-fluid w-100"
                  src={product.img}
                  alt={product.name}
                />
                <div className="product-action">
                  <a className="btn btn-outline-dark btn-square" href="#">
                    <i className="fa fa-shopping-cart"></i>
                  </a>
                  <a className="btn btn-outline-dark btn-square" href="#">
                    <i className="far fa-heart"></i>
                  </a>
                  <a className="btn btn-outline-dark btn-square" href="#">
                    <i className="fa fa-sync-alt"></i>
                  </a>
                  <a className="btn btn-outline-dark btn-square" href="#">
                    <i className="fa fa-search"></i>
                  </a>
                </div>
              </div>
              <div className="text-center py-4">
                <a className="h6 text-decoration-none text-truncate" href="#">
                  {product.name}
                </a>
                <div className="d-flex align-items-center justify-content-center mt-2">
                  <h5>${product.price.toFixed(2)}</h5>
                  <h6 className="text-muted ml-2">
                    <del>${product.oldPrice.toFixed(2)}</del>
                  </h6>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-1">
                  {renderStars(product.rating)}
                  <small>({product.reviews})</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;
