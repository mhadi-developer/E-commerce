import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { useFetch } from "../customHooks/useFetch";
import { useAuth } from "../Custom-context/AuthProvider";
import { useNavigate } from "react-router";
import { useCart } from "../Custom-context/CartProvider";
import { Link } from "react-router";
import ShopSidebar from "../components/Shop/ShopSidebar";
import ShopProductSection from "../components/Shop/ShopProductSection";

const Shope = () => {
  const [searchParam] = useSearchParams(); // recieving query string
  const searchProduct = searchParam.get("searchProduct");
  const categoryId = searchParam.get("categoryId");
  const [category, setCategory] = useState();
  const [products, setProducts] = useState([]);
  const [pages , setPages]  = useState(null)
  const navigate = useNavigate();
  const RedirectUserToLogin = () => {
    navigate("/signin");
  };


  const cat_id = categoryId
  console.log("categoryid", categoryId);
  

  // Fetch category name
  const fetchCategory = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/category/${cat_id}`,
    );
    const catData = await res.json();
    setCategory(catData);
  };

  // Use custom hook to fetch products
  const fetchProductByCategory = async () => {
    try {

      console.log({
        categoryId,
        searchProduct
         });
         
       const res = await fetch(
         `${import.meta.env.VITE_API_URL}/products?categoryId=${categoryId}&searchProduct=${searchProduct}`,
       );

      const data = await res.json();
      console.log(
        'data=========>',data
      );
      
      setProducts(data);
      setPages(data?.pages)
    } catch (error) {
      console.log(error);
       
    }
   
  }
  // Update products state whenever `data` changes
  useEffect(() => {
    if (cat_id || searchProduct) {
      fetchProductByCategory();
    }
     
  }, [categoryId , searchProduct]);

  // Fetch category only once on mount or when `cat_id` changes
  useEffect(() => {
    if (cat_id) {
      fetchCategory();
    }
  }, [cat_id]);

  console.log("___________>", products);

  const StarRating = ({ value = 0, max = 5 }) => {
    const full = Math.floor(value);
    const half = value % 1 !== 0;
    const empty = max - full - (half ? 1 : 0);
  }
  
  console.log("searchProduct", searchProduct);
  

  return (
    <div>
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-5 mt-5">
        <span className="bg-secondary pr-3">{category?.data?.title}</span>
      </h2>
       
      
    <div class="container-fluid">
        <div class="row px-xl-5">

          <ShopSidebar />
          <ShopProductSection products={ products} pages={pages} />
        </div>

      </div>
     </div>
  );
};

export default Shope;
