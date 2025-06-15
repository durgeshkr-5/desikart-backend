const express = require('express');
const authMiddleware = require("../middlewares/authMiddlewares");
const authorizeRoles = require("../middlewares/rolesMiddleware");
const {adminDashboard, getAllUsers} = require("../controllers/admin.controllers")


const adminRouter = express.Router();


adminRouter.get("/dashboard",adminDashboard)
adminRouter.get("/users", getAllUsers)


module.exports = adminRouter;