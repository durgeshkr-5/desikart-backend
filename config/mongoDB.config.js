
const mongoose = require("mongoose");
require("dotenv").config();

//  Get MongoDB URL from environment variables
const mongoUrl = process.env.MONGO_URL;

//  Validate that MONGO_URL is defined
if (!mongoUrl) {
  throw new Error("MONGO_URL must be defined in the environment variables");
}


/**
 * Function to connect to MongoDB using Mongoose
 */
const connectMongoDB = async () => {
  try {
    // 🌐 Connect to MongoDB with options
    await mongoose.connect(mongoUrl);

    console.log("✅ MongoDB connected successfully");

    // 🔍 Optional: Add event listeners for debugging or monitoring
    mongoose.connection.on("disconnected", () => {
      console.warn("🟡 MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🟢 MongoDB reconnected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("🔴 MongoDB connection error:", err);
    });

  } catch (error) {
    //  Log detailed error for debugging
    console.error("❌ Failed to connect to MongoDB:", error.message);

    // Exit process with failure code
    process.exit(1);
  }
};

module.exports = connectMongoDB;