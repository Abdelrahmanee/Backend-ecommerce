import { Router } from "express";

import { addToCart, applyCoupon, clearUserCart, getAllUsersCarts, getLoggedUserCart, removeFromCart, updateProductQuantity } from "./cart.controller.js";
import { authenticate, authorize } from "../../middleware/auth.middelwares.js";
import { validate } from "../../middleware/validation.middelware.js";
import { assertUserCart } from "../../middleware/assertCart.js";

const cartRouter = Router()

cartRouter.route('/')
    .post(authenticate, authorize('User'), assertUserCart, addToCart)
    .delete(authenticate, authorize('User'), clearUserCart)
    .get(authenticate, authorize('User'), assertUserCart, getLoggedUserCart)




cartRouter.route('/:id')
    .delete(authenticate, authorize('User'), assertUserCart, removeFromCart)
    .put(authenticate, authorize('User'), assertUserCart, updateProductQuantity)
cartRouter.post('/apply-coupon', authenticate, authorize('User'), assertUserCart, applyCoupon)



export default cartRouter