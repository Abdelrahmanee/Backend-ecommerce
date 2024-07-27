import { userModel } from "../../database/models/user.model.js";
import { AppError, catchAsyncError } from "./error.handel.js";



export const checkEmail = catchAsyncError(async (req , res , next)=>{
    const {email} =req.body
    const isExist = await userModel.findOne({email})
    isExist ? next ( new AppError( "email already exist." , 409)): next();

    
}) 