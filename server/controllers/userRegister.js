import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'

async function userRegisterController(req, res){
    try {
        const {email, password, name} = req.body
        console.log("REQ BODY: ", req.body)
        const user = await userModel.findOne({email})
        if(user){
            throw new Error(`User already exists`)
        }

        if(!email){
            throw new Error(`Please provide valid email:`)
        }
        if(!password){
            throw new Error(`Please provide valid password:`)
        }
        if(!name){
            throw new Error(`Please provide valid name:`)
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        if(!hashPassword){
            throw new Error(`Something went wrong`)
        }
        
        const payload = {
            email: email,
            password: hashPassword,
            name: name,
            role: "General"
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: 'User created successfully!'
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

export default userRegisterController