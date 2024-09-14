import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"

async function userLoginController(req, res){
    try {
        const {email, password} = req.body
        console.log("LOGIN REQ BODY: ", req.body)
        if(!email){
            throw new Error(`Please provide valid email:`)
        }
        if(!password){
            throw new Error(`Please provide valid password:`)
        }

        const user = await userModel.findOne({email})
    
        if(!user){
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            })
        }
        // verify password
        const checkPassword = await bcrypt.compare(password, user.password)
        console.log(`isPasswordValid: ${checkPassword}`)

        if(checkPassword){
            // generate token
            const tokenData = {
                _id : user._id,
                email : user.email
            }
            const token = jwt.sign(tokenData, process.env.T_KEY, {expiresIn: '8h'})
            console.log("Token: ", token)
            const tokenOption = {
                httpOnly : true,
                secure : true
            }
            // set token as cookie and store in the client browser
            res.cookie("token", token, tokenOption).status(200).json({
                message : "Login successfully!",
                data : token,
                success: true,
                error : false
            })

        }else{
            return res.status(401).json({
                message : "Invalid password",
                error: true,
                success: false
            })
        }
    } catch (error) {
        console.log(error.message)
        res.json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

export default userLoginController