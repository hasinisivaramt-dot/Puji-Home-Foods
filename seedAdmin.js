const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  try {
    // Check existing admin
    const existingAdmin = await Admin.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("12345678", 10);

    // Create admin
    const admin = new Admin({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    await admin.save();

    console.log("Admin Created Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin();