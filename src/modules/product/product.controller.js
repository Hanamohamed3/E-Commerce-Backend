import { Product } from '../../../db/model/product.model.js';
import { deleteOne } from '../../handler/apiHandler.js';
import { handleAsycError } from '../../middleware/handleAsyncError.js';
import slugify from 'slugify'
import APIfeatures from '../../utilites/APIFeatures.js';


const addProduct = handleAsycError(async (req, res, next) => {
    console.log(req.files)
    req.body.slug = slugify(req.body.name)
    req.body.imageCover=req.files.imageCover[0].filename;
    req.body.images=req.files.images.map(ele=>ele.filename)
    let product = new Product(req.body)
    let added = await product.save()
    res.status(201).json({ message: "Product Added", added })
})




const getAllProducts= handleAsycError(async(req,res,next)=>{
let apiFeature= new APIfeatures(Product.find(),req.query).pagination().sort().search().fields()

    let allProducts= await apiFeature.mongooseQuery;
    res.json({message:"All Products",allProducts})   
})



const getProduct =handleAsycError(async (req, res, next) => {
    const getProduct = await Product.findById(req.params.id)
    getProduct  || res.json({ message: "Not Found"})
   !getProduct || res.json({ message: "One Product", getProduct })
}
)

const updateProduct = handleAsycError(async (req, res, next) => {
    req.body.slug=slugify(req.body.name);
    if (req.files.imageCover) req.body.imageCover= req.files.imageCover[0].filename;
    if (req.files.images) req.body.images= req.files.images.map(ele=>ele.filename);

    let updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    updateProduct &&  res.json({ message: "Upadted", updateBrand })
    !updateProduct && res.json({ message: "Product not found" })
})

const deleteProduct = deleteOne(Product)


export {
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}