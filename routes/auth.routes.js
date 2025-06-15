const express = require('express');
const {registerUser,loginUser} = require("../controllers/auth.controllers")

const authRouter = express.Router();

// routes
authRouter.post("/signup",registerUser)
authRouter.post("/login",loginUser)






module.exports = authRouter;