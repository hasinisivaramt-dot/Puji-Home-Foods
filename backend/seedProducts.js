const mongoose = require("mongoose")
require("dotenv").config()

const Product = require("./models/Product")

mongoose.connect(process.env.MONGO_URI)

const products = [

  // ================= NON-VEG PICKLES =================

  {
    name: "Chicken Pickle",
    category: "Non-Veg Pickles",
    image: "/images/chicken-pickle.webp",
    prices: { "1kg": 1100 },
    totalStock: 10
  },

  {
    name: "Boneless Chicken Pickle",
    category: "Non-Veg Pickles",
    image: "/images/Boneless chicken pickle.jpg",
    prices: { "1kg": 1200 },
    totalStock: 10
  },

  {
    name: "Bone Chicken Pickle",
    category: "Non-Veg Pickles",
    image: "/images/bone chicken pickle.jpg",
    prices: { "1kg": 1000 },
    totalStock: 10
  },

  {
    name: "Mutton Boneless",
    category: "Non-Veg Pickles",
    image: "/images/MuttonPickle.jpg",
    prices: { "1kg": 2000 },
    totalStock: 8
  },

  {
    name: "Prawns",
    category: "Non-Veg Pickles",
    image: "/images/prawnspickle.webp",
    prices: { "1kg": 2000 },
    totalStock: 6
  },

  {
    name: "Chicken Gongura",
    category: "Non-Veg Pickles",
    image: "/images/gongurachickenpickle.jpg",
    prices: { "1kg": 1600 },
    totalStock: 8
  },

  {
    name: "Mettila Pickle",
    category: "Non-Veg Pickles",
    image: "/images/methillapickle.webp",
    prices: { "1kg": 1600 },
    totalStock: 8
  },

  {
    name: "Natukodi Boneless",
    category: "Non-Veg Pickles",
    image: "/images/natukodipickle.webp",
    prices: { "1kg": 2000 },
    totalStock: 8
  },

  // ================= VEG PICKLES =================

  {
    name: "Ginger Pickle",
    category: "Veg Pickles",
    image: "/images/ginger-pickle.jpg",
    prices: { "1kg": 800 },
    totalStock: 12
  },

  {
    name: "Gongura Pickle",
    category: "Veg Pickles",
    image: "/images/gongura_pickle.webp",
    prices: { "1kg": 800 },
    totalStock: 10
  },

  {
    name: "Avakaya Pickle",
    category: "Veg Pickles",
    image: "/images/avakaya pickle.webp",
    prices: { "1kg": 400 },
    totalStock: 15
  },

  {
    name: "Lemon Pickle",
    category: "Veg Pickles",
    image: "/images/lemonpickle.jpg",
    prices: { "1kg": 400 },
    totalStock: 14
  },

  {
    name: "Kakarakaya Pickle",
    category: "Veg Pickles",
    image: "/images/KakarakayaPachadi.jpg",
    prices: { "1kg": 800 },
    totalStock: 10
  },

  {
    name: "Kothimera Pickle",
    category: "Veg Pickles",
    image: "/images/Kothimeera-Pickle.webp",
    prices: { "1kg": 800 },
    totalStock: 10
  },

  {
    name: "Pandumirchi Pickle",
    category: "Veg Pickles",
    image: "/images/pandumirchi-pickle.webp",
    prices: { "1kg": 400 },
    totalStock: 12
  },

  {
    name: "Pudina Pickle",
    category: "Veg Pickles",
    image: "/images/pudinapickle.jpg",
    prices: { "1kg": 400 },
    totalStock: 12
  },

  {
    name: "Tomato Pickle",
    category: "Veg Pickles",
    image: "/images/tomato-pickle.jpg",
    prices: { "1kg": 400 },
    totalStock: 12
  },

  {
    name: "Usiri Pickle",
    category: "Veg Pickles",
    image: "/images/usiripickle.jpg",
    prices: { "1kg": 400 },
    totalStock: 12
  },

  {
    name: "Chintakaya Pickle",
    category: "Veg Pickles",
    image: "/images/Chintakayapickle.jpg",
    prices: { "1kg": 400 },
    totalStock: 12
  },

  {
    name: "Karivepaku Pickle",
    category: "Veg Pickles",
    image: "/images/karivepaku_pickle.webp",
    prices: { "1kg": 600 },
    totalStock: 10
  },

  // ================= SWEETS =================

  {
    name: "Ariselu",
    category: "Sweets",
    image: "/images/ariselu.jpg",
    prices: { "1kg": 600 },
    totalStock: 20
  },

  {
    name: "Sunnundalu",
    category: "Sweets",
    image: "/images/Sunnundalu.avif",
    prices: { "1kg": 1000 },
    totalStock: 15
  },

  {
    name: "Dry Fruit Laddu",
    category: "Sweets",
    image: "/images/MR-Dry-Fruit-Ladu.jpg",
    prices: { "1kg": 1200 },
    totalStock: 10
  },

  {
    name: "Boondhi Atchu",
    category: "Sweets",
    image: "/images/Boondhi Atchu.jpg",
    prices: { "1kg": 500 },
    totalStock: 12
  },

  {
    name: "Chalividi",
    category: "Sweets",
    image: "/images/chalividi.jpg",
    prices: { "1kg": 500 },
    totalStock: 12
  },

  {
    name: "Gavvalu",
    category: "Sweets",
    image: "/images/Gavvalu.jpg",
    prices: { "1kg": 600 },
    totalStock: 12
  },

  {
    name: "Kaju Kajalu",
    category: "Sweets",
    image: "/images/Kaju Kajalu.jpg",
    prices: { "1kg": 700 },
    totalStock: 10
  },

  {
    name: "Kaju Chikki",
    category: "Sweets",
    image: "/images/Kaju Chikki.jpg",
    prices: { "1kg": 1400 },
    totalStock: 10
  },

  // ================= HOT & SNACKS =================

  {
    name: "Atukulu Mixture",
    category: "Hot & Snacks",
    image: "/images/atukula-mixture.webp",
    prices: { "1kg": 500 },
    totalStock: 18
  },

  {
    name: "Jantikalu",
    category: "Hot & Snacks",
    image: "/images/Jantikalu.webp",
    prices: { "1kg": 500 },
    totalStock: 15
  },

  {
    name: "Chakralu",
    category: "Hot & Snacks",
    image: "/images/Chakralu.jpg",
    prices: { "1kg": 500 },
    totalStock: 12
  },

  {
    name: "Ribbon Pakodi",
    category: "Hot & Snacks",
    image: "/images/Ribbon Pakodi.jpg",
    prices: { "1kg": 500 },
    totalStock: 12
  },

  {
    name: "Sajjabiyyam Chakodi",
    category: "Hot & Snacks",
    image: "/images/Sajjabiyyam Chakodi.jpg",
    prices: { "1kg": 500 },
    totalStock: 12
  },

  {
    name: "Spicy Boondhi",
    category: "Hot & Snacks",
    image: "/images/karam-boondi.webp",
    prices: { "1kg": 500 },
    totalStock: 12
  },

  {
    name: "Pesara Vadiyalu",
    category: "Hot & Snacks",
    image: "/images/Pesara Vadiyalu.jpg",
    prices: { "1kg": 500 },
    totalStock: 10
  },

  {
    name: "Minapa Vadiyalu",
    category: "Hot & Snacks",
    image: "/images/Minapa-Vadiyalu.png",
    prices: { "1kg": 600 },
    totalStock: 10
  },

  {
    name: "Saggubiyyam Vadiyalu",
    category: "Hot & Snacks",
    image: "/images/Saggubiyyam Vadiyalu.webp",
    prices: { "1kg": 600 },
    totalStock: 10
  },

  {
    name: "Arisi Vadiyalu",
    category: "Hot & Snacks",
    image: "/images/Arisi Vadiyalu.jpg",
    prices: { "1kg": 600 },
    totalStock: 10
  },

  {
    name: "Chakodalu",
    category: "Hot & Snacks",
    image: "/images/Chakodalu.jpg",
    prices: { "1kg": 800 },
    totalStock: 10
  }

]

const seedProducts = async () => {

  try {

    await Product.deleteMany()

    await Product.insertMany(products)

    console.log("Products Seeded Successfully")

    process.exit()

  } catch (error) {

    console.log(error)

    process.exit(1)
  }
}

seedProducts()