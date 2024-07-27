import jwt from 'jsonwebtoken'
import { userModel } from "../../database/models/user.model.js"
import { AppError, catchAsyncError } from "../utils/error.handel.js"



export const authenticate = catchAsyncError(async (req, res, next) => {
    const { token } = req.headers
    if (!token) next(new AppError("Unathorized", 401))

    let userPayload = null;

    jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {

        if (error) return next(new AppError(error.message, 498))
        userPayload = payload
    })


    const user = await userModel.findById(userPayload._id)
    if (!user) return next(new AppError("user not found", 404))
    if (user.isDeleted) return next(new AppError("you must login first", 401))

    if (user.passwordChangedAt) {
        const time = parseInt(user?.passwordChangedAt.getTime() / 1000)
        if (time > userPayload.iat) return next(new AppError("Invalid token ... login again", 401))
    }
    req.user = user
    next()
})

export const authorize = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
        if (roles.includes(req.user.role)) return next()
        return next(new AppError('you not allowed to access this endpoint', 401 ))
    })
}

export const isEmailConfirmed = catchAsyncError(async (req, res, next) => {
    const { email } = req.body

    const { isEmailConfirmed } = await userModel.findOne({ email })
    if (!isEmailConfirmed)
        throw new AppError("Email must be confirmed ", 400)

    next();
})

export const isEmailExist = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    const exist = await userModel.findOne({ email })
    if (!exist)
        throw new AppError("Email is not found ", 404)
    next();
})