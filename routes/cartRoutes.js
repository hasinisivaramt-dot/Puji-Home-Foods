const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  removeCartItem,
} = require("../controllers/cartController");

// Add Item To Cart
router.post("/", addToCart);

// Get User Cart
router.get("/:userId", getCart);

// Remove Cart Item
router.delete("/:id", removeCartItem);

module.exports = router;