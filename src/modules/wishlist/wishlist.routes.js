import { Router } from "express";
import { validate } from "../../middleware/validation.middelware.js";
import { authenticate, authorize } from "../../middleware/auth.middelwares.js";
import { addProductToWishlist, getLoggedUserWishlist, removeProductFromWishlist } from "./wishlist.controller.js";
import { addToWishlistSchema, removeProductFromWishlistSchema } from "./wishlist.validation.js";

const router = Router()

router.route('/')
    .patch(authenticate, authorize('User'), validate(addToWishlistSchema), addProductToWishlist)
    .get(authenticate, authorize('User'), getLoggedUserWishlist)
router.route('/:id')
    .delete(authenticate, authorize('User'), validate(removeProductFromWishlistSchema), removeProductFromWishlist)




export default router