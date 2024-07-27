import bcrypt from 'bcrypt'
import { AppError, catchAsyncError } from '../../utils/error.handel.js';
import { userModel } from '../../../database/models/user.model.js';
import OtpModel from '../../../database/models/Otp.model.js';
import { generateOTP, sendOTPEmail } from '../../utils/email.js';
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from '../../utils/apiFeatures.js';




export const getUser = catchAsyncError(async (req, res, next) => {

    const { id } = req.params
    const user = await userModel.findById(id)
    if (!user) throw new AppError('User Not found', 404)
    res.status(200).json({ data: user })
})

export const addUser = catchAsyncError(async (req, res, next) => {

    const user = new userModel(req.body)
    
    await user.save();
    console.log(user);
    res.status(200).json({ data: user })
})

//  3-update user 
export const updateUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const { phone, age, userName , password } = req.body

    const user = await userModel.findByIdAndUpdate(id, { userName,   password ,phone, age }, { new: true })
    user || next(new AppError('user not found', 404))
    !user || res.status(200).json({ message: "success", user })
})

// delete user(user must be logged in)
export const deleteUser = deleteOne(userModel, "user")


export const getAllUsers = catchAsyncError(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(userModel.find(), req.query).fields().search().pagination().sort().filter()

    const users = await apiFeatures.mongooseQuery
    res.status(200).json({ message: "success", page: apiFeatures.pageNumber, users })
})

export const requestPasswordReset = catchAsyncError(async (req, res) => {

    const { email } = req.body
    const OTP = generateOTP()
    const user = await userModel.findOne({ email })
    await OtpModel.create({ userId: user._id, OTP });

    sendOTPEmail(email, { otp: OTP })
    res.status(200).json({ message: 'OTP sent to your email' });
})


export const verifyOTPAndResetPassword = catchAsyncError(async (req, res) => {
    const { email, newPassword, OTP } = req.body
    const user = await userModel.findOne({ email })
    const storedOtp = await OtpModel.findOne({ userId: user._id, OTP })
    console.log(user.OTP);
    if (!storedOtp)
        throw new AppError('Invalid or expired OTP', 400)
    const hashedPassword = bcrypt.hashSync(newPassword, +process.env.hash_pass_num)
    const updatedUser = await userModel.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true })
    await OtpModel.deleteOne({ userId: user._id, OTP });
    res.status(200).json({ message: "Password reset successfully", updatedUser })
})



export const deleteAccount = catchAsyncError(async (req, res) => {
    const { _id } = req.user;
    const user = await userModel.findByIdAndUpdate(_id, { isDeleted: true }, { new: true });

    if (!user) throw new AppError('User not found', 404);

    res.json({ message: "User soft deleted successfully", data: user });
});