
import Joi from 'joi';

export const addSubCategorySchema =Joi.object({
    name:Joi.string().min(2).max(20).required(),
    category:Joi.string().hex().length(24).required(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().max(5242880).required()
    }).required()
})

export const getByIdSchemaSub =Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateCategorySchemaSub =Joi.object({
    id:Joi.string().hex().length(24).required(),
    name:Joi.string().min(2).max(20).required()

})