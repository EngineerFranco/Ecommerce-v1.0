import jwt from 'jsonwebtoken';

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;
        console.log("Client Token: ", token)
        if (!token) {
            return res.status(200).json({ 
                message : "User not Login",
                error : true,
                success : false
            });
        }

        // Verify the token
        jwt.verify(token, process.env.T_KEY, (error, decoded) => {
            if (error) {
                console.log("Invalid Token: ", error.message)
            }
            console.log("Decoded Token: ", decoded)
            
            // req.user = req.user || {};
            req.userID = decoded?._id;
            next();
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data: [],
            error: true,
            success: false
        });
    }
}

export default authToken;
