import cartModel from "../../database/models/cart.model.js";
import { catchAsyncError } from "../utils/error.handel.js";



export const assertUserCart = catchAsyncError(async (req, res, next) => {


    const { _id: user } = req.user;
    const cart = await cartModel.findOne({ user })

    if (cart) return next()

    await cartModel.create({ user, products: [] })
    next()

})



