const Cart = require("../models/Cart");

// Add To Cart
const addToCart = async (req, res) => {
  try {
    const cartItem = new Cart(req.body);

    await cartItem.save();

    res.status(201).json({
      message: "Item Added To Cart",
      cartItem,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get User Cart
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      userId: req.params.userId,
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Remove Cart Item
const removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Item Removed From Cart",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeCartItem,
};