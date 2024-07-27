import { Router } from "express";
import { validate } from "../../middleware/validation.middelware.js";
import { authenticate, authorize } from "../../middleware/auth.middelwares.js";
import { addReview, deleteReview, getAllReviews, getOneReview, updateReview } from "./review.controller.js";
import { addReviewSchema, paramsIdSchema, updateReviewSchema } from "./review.validation.js";

const router = Router()

router.route('/')
    .post(authenticate, authorize('User'), validate(addReviewSchema), addReview)
    .get(getAllReviews)

router.route('/:id')
    .get(validate(paramsIdSchema), getOneReview)
    .patch(authenticate, authorize('User'), validate(updateReviewSchema), updateReview)
    .delete(authenticate, authorize('Admin', 'User'), validate(paramsIdSchema), deleteReview)



export default router