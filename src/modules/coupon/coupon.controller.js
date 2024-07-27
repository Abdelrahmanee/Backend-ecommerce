import { catchAsyncError } from "../../utils/error.handel.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { couponModel } from "../../../database/models/coupon.model.js";


export const getAllCoupons = catchAsyncError(async (req, res, next) => {

    const apiFeatures = new ApiFeatures(couponModel.find(), req.query).pagination().fields().filter().search().sort()
    const coupons = await apiFeatures.mongooseQuery

    res.status(200).json({ message: "success", page: apiFeatures.pageNumber, coupons })
})

export const addCoupon = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user._id
    const coupon = new couponModel(req.body)
    await coupon.save()
    res.status(201).json({ message: "success", coupon })
})

export const getOneCoupon = catchAsyncError(async (req, res, next) => {
    const coupon = await couponModel.findById(req.params.id)
    !coupon && res.status(404).json({ message: "coupon not found" })
    res.status(200).json({ message: "success", coupon })
})

export const updateCoupon = catchAsyncError(async (req, res, next) => {
    const coupon = await couponModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !coupon && res.status(404).json({ message: "coupon not found" })
    res.status(200).json({ message: "success", coupon })
})



export const deleteCoupon = deleteOne(couponModel, "coupon")
