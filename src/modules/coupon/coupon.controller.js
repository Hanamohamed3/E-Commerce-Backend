import { Coupon } from '../../../db/model/coupon.model.js';
import { deleteOne } from '../../handler/apiHandler.js';
import { handleAsycError } from '../../middleware/handleAsyncError.js';
import APIfeatures from '../../utilites/APIFeatures.js';
import AppError from '../../utilites/AppError.js';
import QRCode from 'qrcode';

const createCoupon = handleAsycError(async (req, res, next) => {
    let coupon = new Coupon(req.body)
    let added = await coupon.save()
    res.status(201).json({ message: "Coupon Added", added })
})


const getAllCoupons= handleAsycError(async(req,res,next)=>{
    
    let apiFeature= new APIfeatures(Coupon.find(),req.query).pagination().sort().search().fields()
    let allCoupon= await apiFeature.mongooseQuery
    res.json({message:"All Coupons",allCoupon})   
})



const getCoupon =handleAsycError(async (req, res, next) => {
    const getOneCoupon = await Coupon.findById(req.params.id)

  let url =await QRCode.toDataURL(getOneCoupon.code)

    getOneCoupon  || res.json({ message: "Not Found"})
   !getOneCoupon || res.json({ message: "One Coupon", getOneCoupon,url })



}
)

const updateCoupon = handleAsycError(async (req, res) => {
    
let {id}=req.params
    let updatedCoupon = await Coupon.findOneAndUpdate({_id:id}, req.body, { new: true })
    !updatedCoupon && next (new AppError("Coupon noy found",404))
    updatedCoupon &&  res.json({ message: "Upadted", updatedCoupon })
})

const deleteCoupon = deleteOne(Coupon)

export {
    createCoupon,
    updateCoupon,
    getAllCoupons,
    getCoupon,
    deleteCoupon

}