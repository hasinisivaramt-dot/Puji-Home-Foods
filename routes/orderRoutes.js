const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

// Create Order
router.post("/", createOrder);

// Get All Orders
router.get("/", getOrders);

// Get Single Order
router.get("/:id", getOrderById);

// Update Order Status
router.put("/:id/status", updateOrderStatus);

// Cancel Order
router.put("/:id/cancel", cancelOrder);

module.exports = router;