import {Router} from 'express'
import userRegisterController from '../controllers/userRegister.js';
import userLoginController from '../controllers/userLogin.js';
import authToken from '../middleware/authToken.js';
import userDetailsController from '../controllers/userDetails.js';

const router = Router()

router.post("/register", userRegisterController)
router.post("/login", userLoginController)
router.get("/user-details", authToken , userDetailsController)





export default router;