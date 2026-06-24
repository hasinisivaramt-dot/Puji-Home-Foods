const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const Admin = require("./models/Admin")

mongoose.connect(process.env.MONGO_URI)

const seedAdmin = async () => {

  try {

    await Admin.deleteMany()

    const hashedPassword = await bcrypt.hash("admin123", 10)

    await Admin.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword
    })

    console.log("Admin Seeded Successfully")

    process.exit()

  } catch (error) {

    console.log(error)

    process.exit(1)
  }
}

seedAdmin()