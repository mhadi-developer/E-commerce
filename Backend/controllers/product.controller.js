/**
 * Product Controller
 * ------------------
 * Handles all product-related CRUD operations.
 */

import ProductModal from "../Modals/Product-modal/product-modal.js";
import multer from "multer";
import path from "path";
import productModal from "../Modals/Product-modal/product-modal.js";
import mongoose from "mongoose";

/* =========================================================
   GET ALL PRODUCTS
   Fetch products with pagination support
========================================================= */
export const getAllProducts = async (req, res) => {
  try {
    /* =========================================================
       1. REQUEST DESTRUCTURING
       - params   → resource identification (category)
       - query    → pagination, search, filters, sorting
    ========================================================= */

    // URL param (e.g. /products/:categoryId)
    // const { categoryId } = req.params;

    // Query string (e.g. ?page=1&limit=10&search=iphone)
    const {
      categoryId,
      searchProduct,                     // keyword search
      page = 1,                   // current page (default: 1)
      limit = 10,                 // items per page (default: 10)
      sortBy = "createdAt",       // sort field (default: latest)
      order = "desc",             // sort order (asc | desc)
      ...filters                  // dynamic filters (price, brand, etc.)
    } = req.query;

    /* =========================================================
       2. PAGINATION CALCULATION
    ========================================================= */

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    /* =========================================================
       3. BUILDING MONGODB QUERY OBJECT
    ========================================================= */

    let queryObject = {};

    // 3.1 Category filtering (URL param)
    console.log("category", categoryId);
    console.log("searchStatement", searchProduct);
    
   if (categoryId && categoryId !== "null" && categoryId !== "undefined") {
  queryObject.category =  categoryId;
}; // string

    // 3.2 Search (case-insensitive on title & description)
   if (searchProduct && searchProduct.trim() !== "" && searchProduct !== "null") {
     queryObject.$or = [
       { title: { $regex: searchProduct.trim(), $options: "i" } },
       { description: { $regex: searchProduct.trim(), $options: "i" } },
     ];
   }
    // 3.3 Dynamic filtering (price, brand, rating, etc.)
    // Reserved keys must not be treated as DB filters
    const reserved = [
      "page",
      "limit",
      "sortBy",
      "order",
      "searchProduct",
      "categoryId",
    ];

    Object.keys(filters).forEach((key) => {
      if (!reserved.includes(key)) {
        queryObject[key] = filters[key];
      }
    });

    /* =========================================================
       4. SORTING LOGIC
    ========================================================= */

    const sortOrder = order === "asc" ? 1 : -1;
    const sortOperation = { [sortBy]: sortOrder };




    
    /* =========================================================
       5. DATABASE QUERY
       - filtered
       - sorted
       - paginated
    ========================================================= */

    console.log("Final queryObject:", queryObject);

    const products = await productModal
      .find( queryObject )
      .skip(skip)
      .limit(limitNum)
      .sort(sortOperation);
    

    const totalProduct = await productModal.countDocuments(queryObject);

    console.log({
      products,
      totalProduct
    });
    

    /* =========================================================
       6. RESPONSE
    ========================================================= */

    res.status(200).json({
      products,                          // current page products
      total: totalProduct,               // total matching products
      page: pageNum,                     // current page number
      pages: Math.ceil(totalProduct / limitNum), // total pages
      hasMore: pageNum * limitNum < totalProduct // pagination helper
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "failed to fetch products",
    });
  }
}; // Fetch products with search, filters, sorting & pagination

/* =========================================================
   GET PRODUCT BY ID
   Fetch a single product using its ID
========================================================= */
export const getProductsById = async (req, res) => {
  const { id } = req.params;

  const product = await ProductModal.findById(id);

  res.json({
    message: "single product endpoint called",
    product,
  });
}; 

/* =========================================================
   GET PRODUCT BY SLUG
   Fetch a single product using slug
========================================================= */
export const getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  
  

  const product = await ProductModal.find({slug});

  

  res.json({
    message: "single product endpoint called",
    product,
  });
}; // fetch single product by slug from database

/* =========================================================
   UPDATE PRODUCT
   Update product data using product ID
========================================================= */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await ProductModal.findByIdAndUpdate(id, data);

    res.status(200).json({
      message: `product with id ${id} is updated`,
      data: data,
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}; // update product by id in database

/* =========================================================
   DELETE PRODUCT
   Delete product using product ID
========================================================= */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await ProductModal.findByIdAndDelete(id);

    res.json({
      message: `product with id ${id} is deleted`,
    });
  } catch (error) {
    console.log(error);
res.status(500).json({
  success: false,
  message: error.message || "something went wrong",
});

    
  }
}; // delete product by id in database

/* =========================================================
   CREATE PRODUCT
   Create a new product with images, sizes, and colors
========================================================= */
export const createProduct = async (req, res) => {
 try {
   const productData = req.body;

   // Parse sizes and colors if provided
   const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];
   const colors = req.body.colors ? JSON.parse(req.body.colors) : [];

   productData.sizes = sizes;
   productData.colors = colors;

   // Extract uploaded images
   const images = req.files;

   // Main product image
   const mainImage = {
     public_id: images.mainImage[0].filename,
     secure_url: images.mainImage[0].path,
   };

   // Gallery images
   const galleryImages = images.galleryImages.map((galleryImg) => {
     return {
       public_id: galleryImg.filename,
       secure_url: galleryImg.path,
     };
   });
   // galleryImg object generated from galleryImages array

   console.log("backend received data ****************", productData);
   console.log("******** images", images);

   // Attach images to product data
   productData.mainImage = mainImage;
   productData.galleryImages = galleryImages;

   // Save product
   await ProductModal.create(productData);

   res.status(201).json({
     message: "product created",
     data: productData,
     success: true,
   });
 } catch (error) {
   res.status(500).json({
     success: false,
     message: error.message || "something went wrong"
   })
   console.log(error);
   
 }
};

/* =========================================================
   GET PRODUCTS BY CATEGORY
   Fetch products belonging to a specific category
========================================================= */
export const getProductsByCategory = async (req, res, next) => {
  try {
    const { cat_id } = req.params;

    const productsByCategory = await productModal.find({
      category: cat_id,
    });


    res.status(200).json({
      data: productsByCategory,
      message: "products fetched successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error?.message || "something went wrong",
    });
  }
};
