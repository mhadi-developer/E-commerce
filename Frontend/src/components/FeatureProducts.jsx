/* eslint-disable no-unused-vars */
// Product data
// const products = [
//   {
//     id: 1,
//     img: "assesst/img/product-1.jpg",
//     name: "Product Name Goes Here",
//     price: 123,
//     oldPrice: 123,
//     stars: 5,
//   },
//   {
//     id: 2,
//     img: "assesst/img/product-2.jpg",
//     name: "Product Name Goes Here",
//     price: 123,
//     oldPrice: 123,
//     stars: 4.5,
//   },
//   {
//     id: 3,
//     img: "assesst/img/product-3.jpg",
//     name: "Product Name Goes Here",
//     price: 123,
//     oldPrice: 123,
//     stars: 3.5,
//   },
//   {
//     id: 4,
//     img: "assesst/img/product-4.jpg",
//     name: "Product Name Goes Here",
//     price: 123,
//     oldPrice: 123,
//     stars: 3,
//   },
//   {
//     id: 5,
//     img: "assesst/img/product-5.jpg",
//     name: "Product Name Goes Here",
//     price: 123,
//     oldPrice: 123,
//     stars: 5,
//   },
//   {
//     id: 6,
//     img: "assesst/img/product-6.jpg",
//     name: "Product Name Goes Here",
//     price: 123,
//     oldPrice: 123,
//     stars: 4.5,
//   },
//   {
//     id: 7,
//     img: "assesst/img/product-7.jpg",
//     name: "Product Name Goes Here",
//     price: 123,
//     oldPrice: 123,
//     stars: 3.5,
//   },
//   {
//     id: 8,
//     img: "assesst/img/product-8.jpg",
//     name: "Product Name Goes Here",
//     price: 123,
//     oldPrice: 123,
//     stars: 3,
//   },
// ];


import { useState } from "react";
import { useEffect } from "react";
import { useCart } from "../Custom-context/CartProvider";
import { Link } from "react-router";
import { useAuth } from "../Custom-context/AuthProvider";
import { useNavigate } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
// Reusable card component
function ProductCard({ mainImage, title, price, discountPrice, stars, slug , _id }) {
  const { cartState,AddToCart} = useCart();
  // Convert rating number into FontAwesome stars
 const StarRating = ({ value = 0, max = 5 }) => {
   const full = Math.floor(value);
   const half = value % 1 !== 0;
   const empty = max - full - (half ? 1 : 0);

   
   

   return (
     <div
       className="d-inline-flex align-items-center"
       aria-label={`Rating: ${value} out of ${max}`}
     >
       {Array(full)
         .fill(0)
         .map((_, i) => (
           <small key={`full-${i}`} className="fa fa-star text-primary mr-1" />
         ))}

       {half && <small className="fa fa-star-half-alt text-primary mr-1" />}

       {Array(empty)
         .fill(0)
         .map((_, i) => (
           <small
             key={`empty-${i}`}
             className="far fa-star text-primary mr-1"
           />
         ))}
     </div>
   );
 };


  
  const { loggedInUserData } = useAuth(); //check the user is login or not
   const productData = {
     mainImage: mainImage,
     title: title,
     price: price,
     discountPrice: discountPrice,
     stars: stars,
     slug: slug,
     _id: _id,
    
  };
  const navigate = useNavigate();
  const RedirectUserToLogin = () => {
  
    navigate('/signin');
  }

  

  

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img
            src={mainImage?.secure_url}
            alt={mainImage?.public_id}
            className="img-fluid w-100"
          />

          <div className="product-action">
            {loggedInUserData && loggedInUserData.fullName ? (
              <button
                className="btn btn-outline-dark btn-square"
                onClick={() => AddToCart(productData)}
                disabled={
                  cartState.find((item) => item.productId == _id) ? true : false
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
          <Link to={`/product/detail/${slug}`} className="h6 text-decoration-none">
            {title}
          </Link>

          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5>PKR{discountPrice}.00</h5>
            <h6 className="text-muted ml-2">
              <del>PKR{price}.00</del>
            </h6>
          </div>

          <div className="d-flex align-items-center justify-content-center mb-1">
            <StarRating value={4.5} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Main section
export default function FeatureProducts() {

   const [products, setProducts] = useState([]);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(4);
  
  const fetchProducts = async () => {
    if (hasMore) {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${limit}`,
      );
      const data = await res.json();
      console.log("======",data);
      

      setProducts((prev) => [...prev, ...data?.products]);
      setHasMore(data.hasMore);
      setPage((prev) => prev + 1);
    };
  }

  useEffect(() => {
    fetchProducts();
  },[])
  

  return (
    <section className="container-fluid pt-5 pb-3">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Featured Products</span>
      </h2>

      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={<h4>Loading products...</h4>}
        endMessage={
          <p
            className="infinite-scroll-end-text"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            No more products
          </p>
        }
      >
        <div className="row px-xl-5">
          {products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
}
