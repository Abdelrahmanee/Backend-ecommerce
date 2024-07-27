import slugify from "slugify";
import { brandModel } from "../../../database/models/brand.model.js"
import { catchAsyncError } from "../../utils/error.handel.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";


export const getAllBrands = catchAsyncError(async (req, res, next) => {

    const apiFeatures =   new ApiFeatures(brandModel.find() , req.query).pagination().fields().filter().search().sort()
    const brands = await apiFeatures.mongooseQuery

    res.status(200).json({ message: "success", page : apiFeatures.pageNumber , brands })
})

export const addBrand = catchAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let brand = new brandModel(req.body)
    await brand.save()
    res.status(201).json({ message: "success", brand })
})

export const getOneBrand = catchAsyncError(async (req, res, next) => {
    const brand = await brandModel.findById(req.params.id)
    !brand && res.status(404).json({ message: "brand not found" })
    res.status(200).json({ message: "success", brand })
})

export const updateBrand = catchAsyncError(async (req, res, next) => {
    req.body.name ? req.body.slug = slugify(req.body.name) : ''
    req.file ?  req.body.logo = req.file.filename : ''
    
    const brand = await brandModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !brand && res.status(404).json({ message: "brand not found" })
    res.status(200).json({ message: "success", brand })
})



export const deleteBrand = deleteOne(brandModel , "brand")
