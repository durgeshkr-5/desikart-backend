const express = require("express");
const authMiddleware = require("../middlewares/authMiddlewares");
const authorizeRoles = require("../middlewares/rolesMiddleware");
const {userDashboard} = require("../controllers/user.controllers")


const userRouter = express.Router();


userRouter.get("/dashboard",userDashboard)




module.exports = userRouter;