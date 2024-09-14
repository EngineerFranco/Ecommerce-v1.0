
async function userLogoutController(req, res){
    try {
        res.clearCookie("token")
        res.status(200).json({
            message: "Logout successfuly",
            error: false,
            success: true,
            data: []
        })
        
    } catch (error) {
        res.json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

export default userLogoutController