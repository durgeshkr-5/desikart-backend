const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category: String,
  stock: {
    type: Number,
    default: 0
  },
  images: [String],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  ratings: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
