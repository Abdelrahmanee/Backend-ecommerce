import slugify from "slugify";
import { AppError, catchAsyncError } from "../../utils/error.handel.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { reviewModel } from "../../../database/models/review.model.js";


export const getAllReviews = catchAsyncError(async (req, res, next) => {

    const apiFeatures = new ApiFeatures(reviewModel.find(), req.query).pagination().fields().filter().search().sort()
    const reviews = await apiFeatures.mongooseQuery

    res.status(200).json({ message: "success", page: apiFeatures.pageNumber, reviews })
})

export const addReview = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user._id
    const isExist = await reviewModel.findOne({ user: req.user._id, product: req.body.product })
    
    isExist && next(new AppError("you can review one time in a product", 409))

    const review = new reviewModel(req.body)
    await review.save()
    res.status(201).json({ message: "success", review })
})

export const getOneReview = catchAsyncError(async (req, res, next) => {
    const review = await reviewModel.findById(req.params.id)
    !review && res.status(404).json({ message: "review not found" })
    res.status(200).json({ message: "success", review })
})

export const updateReview = catchAsyncError(async (req, res, next) => {

    const review = await reviewModel.findOneAndUpdate({ _id: req.params.id , user : req.user._id}, req.body, { new: true })
    !review && res.status(404).json({ message: "review not found" })
    res.status(200).json({ message: "success", review })
})



export const deleteReview = deleteOne(reviewModel, "review")
