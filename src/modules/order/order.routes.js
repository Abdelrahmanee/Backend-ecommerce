import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth.middelwares.js";
import { getUserOrders, makeCashOrder } from "./order.controller.js";
import { assertUserCart } from "../../middleware/assertCart.js";
import { makePaymentSession } from "../../utils/stripe.js";

const orderRouter = Router()

orderRouter.route('/')
    .get(authenticate, authorize('User'), getUserOrders)

orderRouter.route('/cash')
    .post(authenticate, authorize('User'), assertUserCart, makeCashOrder)

orderRouter.route('/check-out')
    .post(authenticate, authorize('User'), assertUserCart, makePaymentSession)
//     .delete( authenticate   , authorize('User' ),deleteBrand  )



export default orderRouter