/**
 * Category Controller
 * -------------------
 * This file contains all CRUD operations related to Category.
 */

import CategoryModal from "../Modals/Category-modal/category-modal.js";

/* =========================================================
   GET ALL CATEGORIES
   Fetch all categories from the database
========================================================= */
export const getAllCategories = async (req, res) => {
  const categories = await CategoryModal.find({});
  res.json(categories);
};

/* =========================================================
   GET CATEGORY BY ID
   Fetch a single category using its ID
========================================================= */
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModal.findById(id);

    res.status(200).json({
      message: "single category endpoint called",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong",
    });
  }
};

/* =========================================================
   UPDATE CATEGORY
   Update category data using its ID
========================================================= */
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  await CategoryModal.findByIdAndUpdate(id, data);

  res.json({
    message: `category with id ${id} is updated`,
    data: data,
  });
};

/* =========================================================
   DELETE CATEGORY
   Remove a category from the database using its ID
========================================================= */
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  await CategoryModal.findByIdAndDelete(id);

  res.json({
    message: `category with id ${id} is deleted`,
  });
};

/* =========================================================
   CREATE CATEGORY
   Create a new category with image upload support
========================================================= */
export const createCategory = async (req, res) => {
  const { title, isPublic } = req.body;
  const fileData = req.file;

  console.log("***** body", req.body);
  console.log("***** file data", req.file);

  // Prepare image object
  const img = {
    public_id: fileData.filename,
    secure_url: fileData.path,
  };

  console.log("image data **********", img);

  // Final data object to store
  const data = {
    title,
    image: img,
    isPublic: isPublic,
  };

  await CategoryModal.create(data);

  console.log("Category added");
  console.log(`Data stored in MongoDB ${JSON.stringify(data)}`);

  return res.status(200).json({
    success: true,
    message: "Category created",
  });
};

/**
 * ---------------------------------------------------------
 * NOTE:
 * Each function interacts with CategoryModal to perform
 * CRUD (Create, Read, Update, Delete) operations in MongoDB.
 * ---------------------------------------------------------
 */
