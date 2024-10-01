import { Router } from "express";
import { addBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "./brand.controller.js";
import { uploadSingle } from './../../utilites/fileUpload.js';
import { validation } from './../../middleware/validation.js';
import { addBrandSchema, getByIdBrandSchema, updateBrandSchema } from "./brand.validation.js";

const brandRoutes=Router();

brandRoutes.route('/')
.get(getAllBrands)
    .post(uploadSingle('image'),validation(addBrandSchema),addBrand)

    brandRoutes.route('/:id')
    .get(validation(getByIdBrandSchema),getBrand)
    .put(validation(updateBrandSchema),updateBrand)
    .delete(validation(getByIdBrandSchema),deleteBrand)

export default brandRoutes