import { deleteOne } from '../../handler/apiHandler.js';
import { handleAsycError } from '../../middleware/handleAsyncError.js';
import APIfeatures from '../../utilites/APIFeatures.js';
import { Category } from './../../../db/model/category.model.js';
import slugify from 'slugify'


const addCategory =handleAsycError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image=req.file.filename
    let category = new Category(req.body)
    let added = await category.save()
    res.json({ message: "Category Added", added })
})


const getCategories= handleAsycError(async(req,res,next)=>{

    let apiFeature= new APIfeatures(Category.find(),req.query).pagination().sort().search().fields()
    let allCategories= await apiFeature.mongooseQuery;
    res.json({message:"All Categories",allCategories})   
}
)


const getCategory = handleAsycError(async (req, res, next) => {
    const getCategory = await Category.findById(req.params.id)
    getCategory  || res.json({ message: "Not Found"})
   !getCategory || res.json({ message: "One Category", getCategory })
})


const updateCategory = handleAsycError(async (req, res, next) => {
    if (req.body.name)
        req.body.slug = slugify(req.body.name)
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ message: "Upadted", category })
})

const deleteCategory = deleteOne(Category)


export {
    addCategory,
    getCategories,
    getCategory,
    deleteCategory,
    updateCategory
}