import { handleAsycError } from '../../middleware/handleAsyncError.js';
import AppError from '../../utilites/AppError.js';
import { User } from '../../../db/model/user.model.js';






const addToWishList = handleAsycError(async (req, res) => {
    // send the id of the product in body
let {product}=req.body
    let updatedWishList = await User.findByIdAndUpdate(
         req.user._id ,
        {
       $addToSet:{wishList:product} 
    } , 
    { new: true });
    !updatedWishList && next (new AppError("Wishlist noy found",404))
    updatedWishList &&  res.json({ message: "Upadted", updatedWishList })
})




const removeFromWishList = handleAsycError(async (req, res) => {
    // send the id of the product in body
let {product}=req.body
    let removedFromWishList = await User.findOneAndUpdate(
        req.user._id,
        {
       $pull:{wishList:product} 
    } , 
    { new: true });
    !removedFromWishList && next (new AppError("Wishlist noy found",404))
    removedFromWishList &&  res.json({ message: "Removed", removedFromWishList })
})







const getAllWishList = handleAsycError(async (req, res) => {
    // send the id of the product in body
    let AllWishList = await User.findOne({_id:req.user._id}).populate("wishList")
    !AllWishList && next (new AppError("Wishlist noy found",404))
    AllWishList &&  res.json({ message: "All wishlist", AllWishList })
})

export {
    addToWishList,
    removeFromWishList,
    getAllWishList
}