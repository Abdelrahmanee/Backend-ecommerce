
import { Router } from "express"
import { validate } from "../../middleware/validation.middelware.js"
import { checkEmail } from "../../utils/checkEmailExist.js"
import { changeUserPassword, confirmEmail, signIn, signUp } from "./auth.controller.js"
import { signInSchema, signUpSchema } from "./auth.validation.js"
import { authenticate, isEmailConfirmed } from "../../middleware/auth.middelwares.js"
import { uploadSinglePhoto } from "../../utils/fileUpload.js"
import { quickLogin, saveUserData } from "../auth/auth.controller.js";



const router = Router()

router.post('/signup' , uploadSinglePhoto('profilePicture' , 'users') ,validate(signUpSchema)  , checkEmail ,signUp)

router.post('/signin' ,validate(signInSchema),isEmailConfirmed ,  signIn)
router.patch('/change-password' , changeUserPassword)
router.post('/save-user-data', authenticate, saveUserData)
router.get('/quick-login-data', authenticate, quickLogin);

router.get('/confirmEmail/:token' , confirmEmail)



export default router