import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "./user.controller.js";
import { validate } from "../../middleware/validation.middelware.js";
import { checkEmail } from "../../utils/checkEmailExist.js";
import { authenticate, authorize } from "../../middleware/auth.middelwares.js";



const router = Router()


router
    .get('', authenticate, authorize('Manger', 'Admin'), getAllUsers)
    .post('', authenticate, authorize('Admin', 'Manger'), checkEmail, addUser)

// router
//     .patch('/updatePassword', updatePassword)

router.route('/:id')
    .get(authenticate, authorize('Admin', 'User', 'Manger'), getUser)
    .patch(authenticate, authorize('Admin', 'Manger'), updateUser)
    .delete(authenticate, authorize('Admin', 'Manger'), deleteUser)



// router.post('/request-password-reset',validate(requestPasswordResetSchema)  , isEmailExist, requestPasswordReset)
// router.post('/verify-otp-reset-password', validate(verifyOTPAndResetPasswordSchema),isEmailExist, verifyOTPAndResetPassword)





export default router