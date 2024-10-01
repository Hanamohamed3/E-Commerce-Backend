import { Router } from "express";
import * as userController from './user.controller.js'
import { protectedRoutes } from "../auth/auth.controller.js";


const UserRoutes=Router();

UserRoutes.route('/')
.get(userController.getAllUsers)
    .post(userController.addUser)

    UserRoutes.route('/:id')
    .get(userController.getUser)
    .put(protectedRoutes,userController.updateUser)
    .delete(userController.deleteUser)
    

UserRoutes.patch("/changePassword/:id",userController.changePassword)

export default UserRoutes