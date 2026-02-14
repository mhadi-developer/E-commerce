/**
 * Order Management Controller
 * ---------------------------
 * Handles admin / system-level order operations.
 * Logic and behavior
 */

import orderModal from "../Modals/OrderModal/order.modal.js";

/* =========================================================
   GET ALL ORDERS
   Fetch all orders from database
========================================================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModal.find({});

    console.log("&&&&&&&&&&&---orders from DB------******", orders);

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error?.message || "something went wrong Server error........",
    });
  }
};

/* =========================================================
   GET ORDER BY ID
   Fetch a single order using order ID
========================================================= */
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id for find order", id);
    

    const orders = await orderModal.find({user: id});

    console.log(
      "**************--Order Find By ID (DB)-- ***********",
      orders,
    );

    res.status(200).json({
      message: "order fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error?.message || "something went wrong Server error........",
    });
  }
};

/* =========================================================
   UPDATE ORDER BY ID
   Update order data using order ID
========================================================= */
export const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedOrderById = await orderModal.findByIdAndUpdate(id, data);

    console.log("-----updated order-----", updatedOrderById);

    res.status(200).json({
      updatedOrderById,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error?.message || "something went wrong Server error........",
    });
  }
};

/* =========================================================
   DELETE ORDER BY ID
   Delete order using order ID
========================================================= */
export const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await orderModal.findByIdAndDelete(id);

    console.log("-----deleted order------", deletedOrder);

    res.status(200).json({
      deletedOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error?.message || "something went wrong Server error........",
    });
  }
};

/**
 * ---------------------------------------------------------
 * LOGGING NOTES
 * - console.log kept for local debugging
 * ---------------------------------------------------------
 */
