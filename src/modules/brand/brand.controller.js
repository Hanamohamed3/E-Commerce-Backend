import { Brand } from '../../../db/model/brands.model.js';
import { deleteOne } from '../../handler/apiHandler.js';
import { handleAsycError } from '../../middleware/handleAsyncError.js';

import slugify from 'slugify'
import APIfeatures from '../../utilites/APIFeatures.js';


const addBrand = handleAsycError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo=req.file.filename
    let brand = new Brand(req.body)
    let added = await brand.save()
    res.json({ message: "Brand Added", added })
})


const getAllBrands= handleAsycError(async(req,res,next)=>{
    
    let apiFeature= new APIfeatures(Brand.find(),req.query).pagination().sort().search().fields()
    let allBrands= await apiFeature.mongooseQuery;
    res.json({message:"All Brands",allBrands})   
})



const getBrand =handleAsycError(async (req, res, next) => {
    const getBrand = await Brand.findById(req.params.id)
    getBrand  || res.json({ message: "Not Found"})
   !getBrand || res.json({ message: "One Brand", getBrand })
}
)

const updateBrand = handleAsycError(async (req, res) => {
    req.body.slug=slugify(req.body.name);
    if (req.file) 
        req.body.logo=req.file.filename

    let updateBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true })
    updateBrand &&  res.json({ message: "Upadted", updateBrand })
    !updateBrand && res.json({ message: "Brand not found" })
})

const deleteBrand = deleteOne(Brand)

export {
    addBrand,
    getAllBrands,
    getBrand,
    deleteBrand,
    updateBrand
}