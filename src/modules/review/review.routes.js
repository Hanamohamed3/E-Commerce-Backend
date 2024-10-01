import { Router } from "express";
import * as reviewController from './review.controller.js'
import { protectedRoutes } from "../auth/auth.controller.js";
const reviewRoutes=Router();

reviewRoutes.route('/')
.get(reviewController.getAllReviews)
    .post(protectedRoutes,reviewController.addReview)

    reviewRoutes.route('/:id')
    .get(reviewController.getReview)
    .put(protectedRoutes,reviewController.updateReview)
    .delete(reviewController.deleteReview)

export default reviewRoutes