import { Router } from "express";
import * as couponController from './coupon.controller.js'
import { protectedRoutes } from "../auth/auth.controller.js";
const couponRoutes=Router();

couponRoutes.route('/')
.get(couponController.getAllCoupons)
    .post(protectedRoutes,couponController.createCoupon)

    couponRoutes.route('/:id')
    .get(couponController.getCoupon)
    .put(protectedRoutes,couponController.updateCoupon)
    .delete(couponController.deleteCoupon)

export default couponRoutes