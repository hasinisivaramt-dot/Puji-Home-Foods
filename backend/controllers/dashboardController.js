const Order = require("../models/Order");
const Product = require("../models/Product");

const getDashboardData = async (req, res) => {
  try {
    // Orders
    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      orderStatus: "Pending",
    });

    const deliveredOrders = await Order.countDocuments({
      orderStatus: "Delivered",
    });

    const cancelledOrders = await Order.countDocuments({
      orderStatus: "Cancelled",
    });

    // Revenue
    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (acc, item) => acc + item.totalAmount,
      0
    );

    // Low stock
    const lowStockProducts = await Product.find({
      totalStock: { $lte: 5 },
    });

    res.status(200).json({
      totalOrders,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      lowStockProductsCount: lowStockProducts.length,
      lowStockProducts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboardData,
};