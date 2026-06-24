const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    prices: {
      "250g": Number,
      "500g": Number,
      "750g": Number,
      "1kg": Number,
    },

    totalStock: {
      type: Number,
      default: 0,
    },

    stockStatus: {
      type: String,
      default: "In Stock",
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);