import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "./product.controller.js";
import { validate } from "../../middleware/validation.middelware.js";
import { addProductSchema, paramsIdSchema, updateProductSchema } from "./product.validation.js";
import { uploadMultiplePhotos } from "../../utils/fileUpload.js";
import { authenticate, authorize } from "../../middleware/auth.middelwares.js";

const productRouter = Router()

productRouter.route('/')
    .post(
        authenticate, authorize('Admin', 'Manger'),
        uploadMultiplePhotos([{ name: "imageCover", maxCount: 1 }, { name: "images", maxCount: 10 }], 'products'), validate(addProductSchema),
        validate(addProductSchema),
        addProduct)
    .get(getAllProducts)

productRouter.route('/:id')
    .get(validate(paramsIdSchema), getOneProduct)
    .patch(
        authenticate, authorize('Admin', 'Manger'),
        validate(updateProductSchema),
        uploadMultiplePhotos([{ name: "imageCover", maxCount: 1 }, { name: "images", maxCount: 10 }], 'products')
        , updateProduct)

    .delete(authenticate, authorize('Admin', 'Manger'), validate(paramsIdSchema), deleteProduct)



export default productRouter