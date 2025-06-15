
const User = require('../model/user.model');

const adminDashboard = async (req, res) => {
    try {
        return res.status(200).json({msg:"Welcome to the Admin Panel!!!!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server Error!!!!"})
    }
}

// get all user
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server Error!!!!"});
    }
}

module.exports = {adminDashboard, getAllUsers}