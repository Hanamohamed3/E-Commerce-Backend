import { Router } from "express";
import { addSubCategory, deleteSubCategory, getSubCategories, getSubCategory, updateSubCategory } from "./subCategory.controller.js";
// import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./category.controller.js";
import { uploadSingle } from './../../utilites/fileUpload.js';
import { validation } from "../../middleware/validation.js";
import { addSubCategorySchema, getByIdSchemaSub, updateCategorySchemaSub } from "./subCategory.validation.js";

const SubCategoryRoutes=Router({mergeParams:true});

SubCategoryRoutes.route('/')
    .get(getSubCategories)
    .post(uploadSingle('image'),validation(addSubCategorySchema),addSubCategory)

    SubCategoryRoutes.route('/:id')
.get(validation(getByIdSchemaSub),getSubCategory)
    .put(validation(updateCategorySchemaSub),updateSubCategory)
    .delete(validation(getByIdSchemaSub),deleteSubCategory)

export default SubCategoryRoutes