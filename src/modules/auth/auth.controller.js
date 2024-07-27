import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


import { sendOTPEmail } from "../../utils/email.js"
import { AppError, catchAsyncError } from "../../utils/error.handel.js";
import { userModel } from '../../../database/models/user.model.js';

export const signUp = catchAsyncError(async (req, res, next) => {

    const profilePicture = req.file.filename

    const { userName, email, password, gender, phone, age } = req.body;
    // Generate an email token for email confirmation
    const emailToken = jwt.sign({ email }, process.env.EMAIL_SECRET_KEY, { expiresIn: '1h' });
    const link = `${process.env.BASE_URL}api/v1/auth/confirmEmail/${emailToken}`;

    // Send confirmation email
    await sendOTPEmail(email, { link });


    // Create the user in the database
    const user = await userModel.create({
        userName,
        email,
        password,
        gender,
        phone,
        profilePicture,
        age,
        isDeleted: false,
        isActive: false,
        isLoggedOut: true,
        isEmailConfirmed: false,
        // isEmailConfirmed: false
    });

    res.status(201).json({ message: "success", user });
});

export const confirmEmail = catchAsyncError(async (req, res, next) => {
    const { token } = req.params
    try {
        const { email } = jwt.verify(token, process.env.EMAIL_SECRET_KEY)
        const user = await userModel.findOneAndUpdate({ email }, { isEmailConfirmed: true })
        res.status(200).json({ message: "Email is verified" })
    }
    catch (error) {
        throw new AppError('Email is not verified', 498)
    }

})



export const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password))
        throw new AppError('Invalid cardinat ...', 400)


    const { userName, age, phone, gender, _id, role } = user
    const token = jwt.sign({ email, role, userName, age, phone, gender, _id }, process.env.SECRET_KEY)

    console.log(user);

    res.status(200).json({ message: "success", token, _id, user: { userName, role, age, phone, gender, _id } })
})

// update password
export const changeUserPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.user
    const { oldPassword, newPassword, rePassword } = req.body;

    // Check if newPassword matches rePassword
    if (newPassword !== rePassword) {
        return next(new AppError('New password and re-entered password do not match', 400));
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
        return next(new AppError('User not found', 404));
    }

    // Verify the old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return next(new AppError('Incorrect old password', 401));
    }

    // Check if new password is the same as the old password
    const isSameAsOld = bcrypt.compareSync(newPassword, user.password);
    if (isSameAsOld) {
        return next(new AppError('New password cannot be the same as the old password', 400));
    }


    await userModel.findOneAndUpdate({ email }, { password: newPassword, passwordChangedAt: Date.now() })
    const { userName, age, phone, gender, _id, role } = user
    const token = jwt.sign({ email, role, userName, age, phone, gender, _id }, process.env.SECRET_KEY)


    // Respond with the updated user information
    res.status(200).json({ message: "Password updated successfully", token, user });
});


export const saveUserData = catchAsyncError(async (req, res, next) => {
    const { profilePicture, email } = req.body;
    const { _id } = req.user;

    // Update the user data
    const user = await userModel.findByIdAndUpdate(
        _id,
        { profilePicture, email },
        { new: true }
    );

    res.status(200).json({ message: 'User data saved successfully', user: { profilePicture: user.profilePicture, email: user.email } });
});

export const quickLogin = catchAsyncError(async (req, res) => {
    const { _id } = req.user;
    const user = await userModel.findById(_id).select('profilePicture email');

    if (!user) {
        throw new AppError('User not found', 404);
    }

    res.status(200).json({ message: 'Quick login data retrieved successfully', user });
})