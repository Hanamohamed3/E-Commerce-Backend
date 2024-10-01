import { Router } from "express";
import * as orderController from './order.controller.js'
import { protectedRoutes } from "../auth/auth.controller.js";
const orderRoutes=Router();

orderRoutes.route('/:id')
    .post(protectedRoutes,orderController.createCashOrder)
    
    orderRoutes.route('/checkout/:id')
    .post(protectedRoutes,orderController.onlinePayment)

    orderRoutes.route('/')
    .get(protectedRoutes,orderController.getOrder)

    orderRoutes.route('/all')
    .get(protectedRoutes,orderController.getOrders)

    // orderRoutes.route('/:id')
    // .delete(protectedRoutes,orderController.removeCartItem)

export default orderRoutes