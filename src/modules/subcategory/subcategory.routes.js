import { Router } from "express";
import { addSubCategory, deleteSubCategory, getAllSubCategories, getOneSubCategory, updateSubCategory } from "./subcategory.controller.js";
import { validate } from "../../middleware/validation.middelware.js";
import { addSubCategorySchema, paramsIdSchema, updateSubCategorySchema } from "./subcategory.validation.js";
import { authenticate, authorize } from "../../middleware/auth.middelwares.js";

const subCategoryRouter = Router({ mergeParams: true })

subCategoryRouter.route('/')
    .post(authenticate, authorize('Admin', 'Manger'), validate(addSubCategorySchema), addSubCategory)
    .get(getAllSubCategories)

subCategoryRouter.route('/:id')
    .get(validate(paramsIdSchema), getOneSubCategory)
    .patch(authenticate, authorize('Admin', 'Manger'), validate(updateSubCategorySchema), updateSubCategory)
    .delete(authenticate, authorize('Admin', 'Manger'), validate(paramsIdSchema), deleteSubCategory)



export default subCategoryRouter