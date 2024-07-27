import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getOneCategory, updateCategory } from "./category.controller.js";
import { validate } from "../../middleware/validation.middelware.js";
import { addCategorySchema, paramsIdSchema, updateCategorySchema } from "./category.validation.js";
import subCategoryRouter from "../subcategory/subcategory.routes.js";
import { uploadSinglePhoto } from "../../utils/fileUpload.js";
import { authenticate, authorize } from "../../middleware/auth.middelwares.js";

const categoryRouter = Router()


categoryRouter.use('/:category/subcategories', subCategoryRouter)

categoryRouter.route('/')
    .post(authenticate, authorize('Admin', 'Manger'), uploadSinglePhoto('image', 'categories'), validate(addCategorySchema), addCategory)
    .get(getAllCategories)

categoryRouter.route('/:id')
    .get(validate(paramsIdSchema), getOneCategory)
    .patch(authenticate, authorize('Admin', 'Manger'), validate(updateCategorySchema), uploadSinglePhoto('image', 'categories'), updateCategory)
    .delete(authenticate, authorize('Admin', 'Manger'), validate(paramsIdSchema), deleteCategory)


export default categoryRouter