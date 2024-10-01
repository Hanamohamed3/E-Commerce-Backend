import { Router } from "express";
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./category.controller.js";
import { validation } from './../../middleware/validation.js';
import { addCategorySchema, getByIdSchema, updateCategorySchema } from "./category.validation.js";
import { uploadSingle } from "../../utilites/fileUpload.js";
import SubCategoryRoutes from "../subCategory/subCategory.routes.js";

const categoryRoutes=Router();

categoryRoutes.use('/:category/subCategory',SubCategoryRoutes)


categoryRoutes.route('/').get(getCategories)
    .post(uploadSingle('image'),validation(addCategorySchema),addCategory)

categoryRoutes.route('/:id').get(validation(getByIdSchema),getCategory)
    .put(validation(updateCategorySchema),updateCategory)
    .delete(validation(getByIdSchema),deleteCategory)

export default categoryRoutes