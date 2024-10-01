import { deleteOne } from '../../handler/apiHandler.js';
import { handleAsycError } from '../../middleware/handleAsyncError.js';
import APIfeatures from '../../utilites/APIFeatures.js';
import { Review } from '../../../db/model/review.model.js';
import AppError from '../../utilites/AppError.js';


const addReview = handleAsycError(async (req, res, next) => {
    req.body.user=req.user._id;
let isReview=await Review.findOne({user:req.user._id,product:req.body.product})
if(isReview) return next(new AppError("Already have review",409))
    let review = new Review(req.body)
    let added = await review.save()
    res.json({ message: "Review Added", added })
})


const getAllReviews= handleAsycError(async(req,res,next)=>{
    
    let apiFeature= new APIfeatures(Review.find(),req.query).pagination().sort().search().fields()
    let allReview= await apiFeature.mongooseQuery
    res.json({message:"All Reviews",allReview})   
})



const getReview =handleAsycError(async (req, res, next) => {
    const getOneReview = await Review.findById(req.params.id)
    getOneReview  || res.json({ message: "Not Found"})
   !getOneReview || res.json({ message: "One Review", getOneReview })
}
)

const updateReview = handleAsycError(async (req, res) => {
    
let {id}=req.params
    let updatedReview = await Review.findOneAndUpdate({_id:id,user:req.user._id}, req.body, { new: true })
    !updatedReview && next (new AppError("Review noy found",404))
    updatedReview &&  res.json({ message: "Upadted", updatedReview })
})

const deleteReview = deleteOne(Review)

export {
    deleteReview,
    updateReview,
    getReview,
    getAllReviews,
    addReview
}