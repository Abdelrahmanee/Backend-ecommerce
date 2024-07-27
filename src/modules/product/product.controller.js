import slugify from "slugify";
import { productModel } from "../../../database/models/product.model.js"
import { catchAsyncError } from "../../utils/error.handel.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";


export const getAllProducts = catchAsyncError(async (req, res, next) => {

    let apiFeature = new ApiFeatures(productModel.find(), req.query).sort().fields().search().filter().pagination()
    const products = await apiFeature.mongooseQuery
    res.status(200).json({ message: "success",page : apiFeature.pageNumber , products })
})

export const addProduct = catchAsyncError(async (req, res, next) => {
    
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(img =>img.filename)
    req.body.slug = slugify(req.body.title)
    let product = new productModel(req.body)
    await product.save()
    res.status(201).json({ message: "success", product })
})

export const getOneProduct = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.params.id)
    !product && res.status(404).json({ message: "product not found" })
    res.status(200).json({ message: "success", product })
})

export const updateProduct = catchAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !product && res.status(404).json({ message: "product not found" })
    res.status(200).json({ message: "success", product })
})



export const deleteProduct = deleteOne(productModel , "product")
