import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"

async function userLoginController(req, res){
    try {
        const {email, password} = req.body
        console.log("REQ BODY: ", req.body)
        if(!email){
            throw new Error(`Please provide valid email:`)
        }
        if(!password){
            throw new Error(`Please provide valid password:`)
        }

        const user = await userModel.findOne({email})
    
        if(!user){
            throw new Error(`User not found`)
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        console.log(`Check password ${checkPassword}`)

        if(checkPassword){
            const tokenData = {
                _id : user._id,
                email : user.email
            }
            const token = jwt.sign(tokenData, process.env.T_KEY, {expiresIn: '8h'})
            const tokenOption = {
                httpOnly : true,
                secure : true
            }
            res.cookie("token", token, tokenOption).status(200).json({
                message : "Login successfully!",
                data : token,
                success: true,
                error : false
            })

        }else{
            throw new Error(`Invalid email or password`)
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