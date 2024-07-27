import slugify from "slugify";
import { catchAsyncError } from "../../utils/error.handel.js";
import { subcategoryModel } from "../../../database/models/subCategory.model.js";
import { deleteOne } from "../handlers/handlers.js";


export const getAllSubCategories = catchAsyncError(async (req, res, next) => {

    const { category } = req.params
    let filterObj = {}
    if (category) filterObj.category = category
    
    const subCategories = await subcategoryModel.find(filterObj).populate('category');

    res.status(200).json({ message: "success", subCategories })
})

export const addSubCategory = catchAsyncError(async (req, res, next) => {

    req.body.slug = slugify(req.body.name)
    let subcategory = new subcategoryModel(req.body)
    await subcategory.save()
    res.status(201).json({ message: "success", subcategory })
})

export const getOneSubCategory = catchAsyncError(async (req, res, next) => {
    const subcategory = await subcategoryModel.findById(req.params.id)
    !subcategory && res.status(404).json({ message: "subcategory not found" })
    res.status(200).json({ message: "success", subcategory })
})

export const updateSubCategory = catchAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const subcategory = await subcategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !subcategory && res.status(404).json({ message: "subcategory not found" })
    res.status(200).json({ message: "success", subcategory })
})



export const deleteSubCategory = deleteOne(subcategoryModel , "subcategory")
