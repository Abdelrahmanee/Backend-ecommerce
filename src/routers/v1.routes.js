import { Router } from "express";
import categoryRouter from "../modules/category/category.routes.js";
import brandRouter from "../modules/brand/brand.routes.js";
import productRouter from "../modules/product/product.routes.js";
import subCategoryRouter from "../modules/subcategory/subcategory.routes.js";

import userRouter from "../modules/user/user.routes.js";
import authRouter from "../modules/auth/auth.routes.js";
import wishlistRouter from "../modules/wishlist/wishlist.routes.js";
import reviewRouter from "../modules/review/review.routes.js";
import addressRouter from "../modules/address/address.routes.js";
import couponRouter from "../modules/coupon/coupon.routes.js";
import cartRouter from "../modules/cart/cart.routes.js";
import orderRouter from "../modules/order/order.routes.js";


const router = Router()

router.use('/categories', categoryRouter)
router.use('/subcategories', subCategoryRouter)
router.use('/brands', brandRouter)
router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/reviews', reviewRouter)
router.use('/wishlist', wishlistRouter)
router.use('/address', addressRouter)
router.use('/coupons', couponRouter)
router.use('/cart', cartRouter)
router.use('/orders', orderRouter)
router.use('/auth', authRouter)

export default router