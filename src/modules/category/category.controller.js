import slugify from "slugify";
import { categoryModel } from "../../../database/models/category.model.js"
import { catchAsyncError } from "../../utils/error.handel.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";


export const getAllCategories = catchAsyncError( async (req, res, next) => {    
    const apiFeatures =   new ApiFeatures(categoryModel.find() , req.query).pagination().fields().filter().search().sort()
    const categories = await apiFeatures.mongooseQuery

    res.status(200).json({ message: "success", page : apiFeatures.pageNumber , categories })
})

export const addCategory = catchAsyncError(async (req, res, next) => {
    req.body.image = req.file.filename
    req.body.slug = slugify(req.body.name)
    let category = new categoryModel(req.body)
    await category.save()
    res.status(201).json({ message: "success", category })
})

export const getOneCategory = catchAsyncError(async (req , res , next)=>{
    const category = await categoryModel.findById(req.params.id)
    !category && res.status(404).json({message :"Category not found"})
    res.status(200).json({ message: "success", category })
})

export const updateCategory = catchAsyncError (async (req, res, next) => {
    req.body.name ?  req.body.slug = slugify(req.body.name) : ""
    req.file ?  req.body.image = req.file.filename : ''
    const category = await categoryModel.findByIdAndUpdate(req.params.id , req.body , {new : true})
    !category && res.status(404).json({message :"Category not found"})
    res.status(200).json({ message: "success", category })
})



export const deleteCategory = deleteOne(categoryModel , "category")
