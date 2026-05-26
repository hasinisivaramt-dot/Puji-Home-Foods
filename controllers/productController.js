const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Add new product
const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    await product.save();

    res.status(201).json({
      message: "Product Added",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update product stock
const updateStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Update stock
    product.totalStock = req.body.totalStock;

    // Stock status logic
    if (product.totalStock <= 0) {
      product.stockStatus = "Out of Stock";
    } else if (
      product.totalStock <= product.lowStockThreshold
    ) {
      product.stockStatus = "Low Stock";
    } else {
      product.stockStatus = "In Stock";
    }

    await product.save();

    res.status(200).json({
      message: "Stock Updated",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
 updateStock,
};