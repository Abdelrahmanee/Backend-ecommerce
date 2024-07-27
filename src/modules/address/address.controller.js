import { AppError, catchAsyncError } from "../../utils/error.handel.js";
import { deleteOne } from "../handlers/handlers.js";
import { userModel } from "../../../database/models/user.model.js";


export const addAddress = catchAsyncError(async (req, res, next) => {

    const address = await userModel.findByIdAndUpdate(req.user._id,
        { $push: { addresses: req.body } }
        , { new: true })

    address || next(new AppError("address not found", 404))
    !address || res.status(201).json({ message: "success",address :  address.addresses })

})
export const removeAddress = catchAsyncError(async (req, res, next) => {

    const address = await userModel.findByIdAndUpdate(req.user._id,
        { $pull: { addresses: {_id : req.params.id} } }
        , { new: true })

    address || next(new AppError("address not found", 404))
    !address || res.status(200).json({ message: "success", address: address.addresses })

})

export const getUserAddresses = catchAsyncError(async (req, res, next) => {
    const addresses = await userModel.findById(req.user._id)
    addresses || next(new AppError("addresses not found", 404))
    !addresses || res.status(200).json({ message: "success", addresses: addresses.addresses })
})

