import { couponModel } from "../../database/models/coupon.model.js";
import { AppError, catchAsyncError } from "../utils/error.handel.js";






export const checkUnique = catchAsyncError(async (req, res, next) => {
    const coupon = await couponModel.findOne({ code: req.body.code })
    if (coupon)
        return new AppError('coupon already exist', 400)
    next()
})