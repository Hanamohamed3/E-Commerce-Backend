import { Router } from "express";
import * as cartController from './cart.controller.js'
import { protectedRoutes } from "../auth/auth.controller.js";
const cartRoutes=Router();

cartRoutes.route('/')
    .post(protectedRoutes,cartController.createCart)
    .get(protectedRoutes,cartController.getAllCart)


    cartRoutes.route('/:id')
    .delete(protectedRoutes,cartController.removeCartItem)



    cartRoutes.route('/:id')
    .patch(protectedRoutes,cartController.applyCoupon)

export default cartRoutes