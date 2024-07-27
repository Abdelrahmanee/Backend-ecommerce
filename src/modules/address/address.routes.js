import { Router } from "express";
import { validate } from "../../middleware/validation.middelware.js";
import { authenticate, authorize } from "../../middleware/auth.middelwares.js";
import { addAddress, getUserAddresses, removeAddress } from "./address.controller.js";
import { addAddressSchema, removeAddressSchema } from "./address.validation.js";

const router = Router()

router.route('/')
    .patch(authenticate, authorize('User'), validate(addAddressSchema), addAddress)
    .get(authenticate, authorize('User'), getUserAddresses)
router.route('/:id')
    .delete(authenticate, authorize('User'), validate(removeAddressSchema), removeAddress)




export default router