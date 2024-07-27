import { Router } from "express";
import { validate } from "../../middleware/validation.middelware.js";
import { authenticate, authorize } from "../../middleware/auth.middelwares.js";
import { addCouponSchema, updateCouponSchema } from "./coupon.validation.js";
import { addCoupon, deleteCoupon, getAllCoupons, getOneCoupon, updateCoupon } from "./coupon.controller.js";
import { paramsIdSchema } from "./coupon.validation.js";
import { checkUnique } from "../../middleware/checkUnique.js";

const router = Router()

router.route('/')
    .post(authenticate, authorize('Admin'), validate(addCouponSchema), checkUnique, addCoupon)
    .get(authenticate, authorize('Admin'), getAllCoupons)

router.route('/:id')
    .get(authenticate, authorize('Admin'), validate(paramsIdSchema), getOneCoupon)
    .patch(authenticate, authorize('Admin'), validate(updateCouponSchema), updateCoupon)
    .delete(authenticate, authorize('Admin'), validate(paramsIdSchema), deleteCoupon)



export default router