const express = require("express");
const authMiddleware = require("../middlewares/authMiddlewares");
const authorizeRoles = require("../middlewares/rolesMiddleware");
const {
  vendorDashboard,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/vendor.controllers");

const vendorRouter = express.Router();

vendorRouter.get(
  "/dashboard",
  vendorDashboard
);

vendorRouter.get("/products",getProduct);
vendorRouter.post("/products",addProduct);
vendorRouter.put("/products/:id",updateProduct);
vendorRouter.delete("/products/:id",deleteProduct);

module.exports = vendorRouter;
