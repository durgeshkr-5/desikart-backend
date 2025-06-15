const User = require("../model/user.model");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require('validator');


//Register User
const registerUser = async(req,res) => {
    try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({ message: "Invalid Email" });
    }

    if(password.length <= 5){
        return res.status(400).json({ message: "password length must be greater than 5" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    // Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password :hashedPassword,
      role: role || "user",
    });

    res.status(201).json({msg:"User Registered Successful",data: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    }});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "Missing credentials" });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    // Match password
    const match = await bcrypt.compare(password, user.password);
    

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    // Generate token
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    console.error(error); // Good for debugging
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {registerUser,loginUser};