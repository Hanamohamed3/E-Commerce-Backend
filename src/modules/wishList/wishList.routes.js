import { Router } from "express";
import { addToWishList, getAllWishList, removeFromWishList } from "./wishList.controller.js";
import { protectedRoutes } from "../auth/auth.controller.js";
const wishListRoutes=Router();

wishListRoutes.patch("/",protectedRoutes,addToWishList)
wishListRoutes.delete("/",protectedRoutes,removeFromWishList)
wishListRoutes.get("/",protectedRoutes,getAllWishList)




export default wishListRoutes