const Address = require("../models/Address");

// Get all addresses for logged-in user
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(addresses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create address
const createAddress = async (req, res) => {
  try {
    const address = await Address.create({ ...req.body, userId: req.user.id });
    res.status(201).json(address);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update address
const updateAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.status(200).json(address);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete address
const deleteAddress = async (req, res) => {
  try {
    await Address.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.status(200).json({ message: "Address deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};