import { catchAsyncError } from "../../utils/error.handel.js"



export const deleteOne = (model, documentName) => {
    return catchAsyncError(async (req, res, next) => {
        console.log(req.user._id);
        console.log(req.params);
        const document = await model.findOneAndDelete({ _id: req.params.id, user: req.user._id })
        !document && res.status(404).json({ message: `${documentName} not found` })
        res.status(200).json({ message: "success", document })
    })
}

export const clearCart = async (model , user) => {
    const cart = await model.findOneAndDelete({ user  : user})
    if (!cart) throw new AppError('cart not found', 404)
    return cart
}