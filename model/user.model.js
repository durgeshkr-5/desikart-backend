// models/User.js
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 5,
    },
    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "", // optional: default avatar URL
    },
    vendorInfo: {
      storeName: { type: String },
      storeDescription: { type: String },
      isApproved: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);





const User = mongoose.model("User", userSchema);
module.exports = User;
