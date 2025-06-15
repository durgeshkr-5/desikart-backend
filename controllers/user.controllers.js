


const userDashboard = async (req, res) => {
    try {
        return res.status(200).json({msg:"Welcome to the User Panel!!!!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server Error!!!!"})
    }
}


module.exports = {userDashboard}