import userModel from "../models/userModel.js"

async function userDetailsController(req, res){
    try {
        console.log("USER DETAILS CONTROLLER")
        console.log("UserID: ", req.userID)
        const user = await userModel.findById(req.userID)
        console.log("User Details: ", user)
        
        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "User details"
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export default userDetailsController