import jwt from 'jsonwebtoken';

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;
        console.log("TOKEN: ", token)
        if (!token) {
            return res.status(403).json({ 
                message : "User not Login",
                error : true,
                success : false
            });
        }

        // Verify the token
        jwt.verify(token, process.env.T_KEY, (error, decoded) => {
            if (error) {
                console.log("ERROR: ", error.message)
            }
            console.log("Decoded: ", decoded)
            
            req.user = req.user || {};
            req.user.id = decoded?._id;
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
