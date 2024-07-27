import { AppError, catchAsyncError } from "../../utils/error.handel.js";
import { deleteOne } from "../handlers/handlers.js";
import { userModel } from "../../../database/models/user.model.js";


export const addProductToWishlist = catchAsyncError(async (req, res, next) => {

    const wishlist = await userModel.findByIdAndUpdate(req.user._id,
        { $addToSet: { wishlist: req.body.product } }
        , { new: true })

    wishlist || next(new AppError("Wishlist not found", 404))
    !wishlist || res.status(201).json({ message: "success", wishlist: wishlist.wishlist })

})
export const removeProductFromWishlist = catchAsyncError(async (req, res, next) => {

    const wishlist = await userModel.findByIdAndUpdate(req.user._id,
        { $pull: { wishlist: req.params.id } }
        , { new: true })

    wishlist || next(new AppError("Wishlist not found", 404))
    !wishlist || res.status(200).json({ message: "success", wishlist: wishlist.wishlist })

})

export const getLoggedUserWishlist = catchAsyncError(async (req, res, next) => {
    const wishlist = await userModel.findById(req.user._id).populate('wishlist')
    wishlist || next(new AppError("Wishlist not found", 404))
    !wishlist || res.status(200).json({ message: "success", wishlist: wishlist.wishlist })
})

