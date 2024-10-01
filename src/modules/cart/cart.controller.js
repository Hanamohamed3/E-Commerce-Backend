import { handleAsycError } from '../../middleware/handleAsyncError.js';
import { Cart } from '../../../db/model/cart.model.js';
import { Product } from '../../../db/model/product.model.js';
import AppError from '../../utilites/AppError.js';
import { Coupon } from './../../../db/model/coupon.model.js';


function calcPrice(cart){
    let totalPrice=0;
    cart.cartItems.forEach((ele)=>{
        totalPrice+=ele.quantity*ele.price
    })
    
    cart.totalPrice=totalPrice
}

const createCart = handleAsycError(async (req, res, next) => {
  let product=await Product.findById(req.body.product).select("price")
  !product && next (new AppError("product not found",404))
  req.body.price=product.price
  
    let isCartExist=await Cart.findOne({user:req.user._id})
  if(!isCartExist){
    let cart= new Cart({
        user:req.user._id,
        cartItems:[req.body]
    })
    calcPrice(cart);
    await cart.save()
   return res.status(201).json({message:"created",cart})
  }
let item=isCartExist.cartItems.find((ele) => ele.product==req.body.product)
 if(item){
    item.quantity+=1
 }else{
    isCartExist.cartItems.push(req.body)
 }

 calcPrice(isCartExist)
 await isCartExist.save()
res.json({message:"added",isCartExist})
})



const getAllCart=handleAsycError(async (req, res, next) => {
    let cart=await Cart.findOne({user:req.user._id})
    res.json({message:"All Cart",cart})
})

const removeCartItem=handleAsycError(async (req, res, next) => {
let cart=await Cart.findOneAndUpdate({User:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
res.json({message:"Cart item Deleted",cart})
})


const updateCart = handleAsycError(async (req, res, next) => {
    let product=await Product.findById(req.body.product).select("price")
    !product && next (new AppError("product not found",404))
    req.body.price=product.price
      let isCartExist=await Cart.findOne({user:req.user._id})
   
  let item=isCartExist.cartItems.find((ele) => ele.product==req.body.product)
  !item && next(new AppError("Not Found",404))
  
  if(item){
      item.quantity+=req.body.quantity
   }
  
   calcPrice(isCartExist)
   await isCartExist.save()
  res.json({message:"Updated",isCartExist})
  })

// Put in routes
  const applyCoupon = handleAsycError(async (req, res, next) => {
    
    let code = await Coupon.findOne({ code: req.params.code });
    let cart = await Cart.findOne({ user: req.user._id })
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * code.discount) / 100;
    cart.discount = code.discount;
    await cart.save();
    res.json({message:"Done", cart})

  })

export {
    getAllCart,
    createCart,
    updateCart,
    removeCartItem,
    applyCoupon
}