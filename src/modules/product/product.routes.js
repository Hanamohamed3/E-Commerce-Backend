import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "./product.controller.js";
import { uploadFields } from './../../utilites/fileUpload.js';
import { validation } from "../../middleware/validation.js";
import { addProductSchema, getByIdProductSchema, updateProductSchema } from "./product.validation.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";

const productRoutes=Router();

productRoutes.route('/')
.get(getAllProducts)
    .post(protectedRoutes,allowTo("admin","user"),uploadFields([{name:"imageCover",maxCount:1},{name:"images",maxCount:10}]),
    validation(addProductSchema),addProduct)

    productRoutes.route('/:id')
    .get(validation(getByIdProductSchema),getProduct)
    .put(uploadFields([{name:"imageCover",maxCount:1},{name:"images",maxCount:10}]),validation(updateProductSchema),updateProduct)
    .delete(validation(getByIdProductSchema),deleteProduct)

export default productRoutes