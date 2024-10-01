import slugify from 'slugify'
import { handleAsycError } from '../../middleware/handleAsyncError.js'
import { SubCategory } from '../../../db/model/subCategory.model.js'
import { deleteOne } from '../../handler/apiHandler.js'
import APIfeatures from '../../utilites/APIFeatures.js'


const addSubCategory =handleAsycError (async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image=req.file.filename
    let subCategory = new SubCategory(req.body)
    let addedd = await subCategory.save()
    res.json({ message: "subCategory Added", addedd})
})


const getSubCategories= handleAsycError(async(req,res,next)=>{
    let filterObject={}
if(req.params.category){
    filterObject.category=req.params.category
}
let apiFeature= new APIfeatures(SubCategory.find(),req.query).pagination().sort().search().fields()

    
    let allSubCategories= await apiFeature.mongooseQuery;
    res.json({message:"All SubCategories",allSubCategories})   
})



const getSubCategory = handleAsycError(async (req, res, next) => {
    const getSubCategory = await SubCategory.findById(req.params.id)
    getSubCategory  || res.json({ message: "Not Found"})
   !getSubCategory || res.json({ message: "One SubCategory", getSubCategory })
})


const updateSubCategory = handleAsycError(async (req, res, next) => {
    if (req.body.name)
        req.body.slug = slugify(req.body.name)
    const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ message: "Upadted", subCategory })
})

const deleteSubCategory = deleteOne(SubCategory)


export {
    addSubCategory,
    getSubCategory,
    getSubCategories,
    deleteSubCategory,
    updateSubCategory
}