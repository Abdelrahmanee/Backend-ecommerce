import { Router } from "express";
import { addBrand, deleteBrand, getAllBrands, getOneBrand, updateBrand } from "./brand.controller.js";
import { validate } from "../../middleware/validation.middelware.js";
import { addBrandSchema, paramsIdSchema, updateBrandSchema } from "./brand.validation.js";
import { uploadSinglePhoto } from "../../utils/fileUpload.js";
import { authenticate, authorize } from "../../middleware/auth.middelwares.js";

const brandRouter = Router()

brandRouter.route('/')
    .post(authenticate   , authorize('Admin' , 'Manger'),  uploadSinglePhoto('logo' , 'brands') ,  addBrand)
    .get( getAllBrands)

brandRouter.route('/:id')
    .get(validate(paramsIdSchema) ,getOneBrand)
    .patch(authenticate   , authorize('Admin' , 'Manger') , validate(updateBrandSchema) , uploadSinglePhoto('logo' , 'brands'), updateBrand  )
    .delete( authenticate   , authorize('Admin' , 'Manger') ,validate(paramsIdSchema),deleteBrand  )



export default brandRouter