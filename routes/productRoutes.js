const express = require("express");

const router = express.Router();

const {
  getProducts,
  addProduct,
  updateStock,
} = require("../controllers/productController");

router.get("/", getProducts);

router.post("/", addProduct);

router.put("/:id/stock", updateStock);

module.exports = router;