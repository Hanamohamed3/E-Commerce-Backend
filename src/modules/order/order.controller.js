import { Cart } from '../../../db/model/cart.model.js';
import { Order } from '../../../db/model/order.model.js';
import { handleAsycError } from '../../middleware/handleAsyncError.js';
import { Product } from './../../../db/model/product.model.js';
import Stripe from 'stripe';
import express from 'express'
import AppError from '../../utilites/AppError.js';
import { User } from '../../../db/model/user.model.js';
const stripe = new Stripe('sk_test_51Q45HsI1MerWDsCTzK3v2cPJbDOnUcKOehy8DB8fCgH1oLYPrwyjNhZqv46OdkJbewzKBe5Pb8NiwWjWkVnokD3B00yCitaKJg');



const createCashOrder = handleAsycError(async (req, res, next) => {
let cart= await Cart.findById(req.params.id)
let totalPrice= cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
let order= new Order({
  user:req.user._id,
  cartItems:cart.cartItems,
  totalPrice,
  shippingAddress:req.body.shippingAddress,
  
})
if(order){
let options= cart.cartItems.map(item=>({
  updateOne:{
    filter:{_id:item.product},
    update:{$inc:{quantity:-item.quantity,sold:item.quantity}},

  },
}))
await Product.bulkWrite(options);
await order.save()
}else{
  return next (new AppError('error occured',409))
}
await Cart.findByIdAndUpdate(req.params.id)
res.json({message:"Order Created",order})
})

const getOrder = handleAsycError(async (req, res, next) => {
let order=await Order.findOne({user:req.user._id})
res.json({message:"One Order",order})
})


const getOrders = handleAsycError(async (req, res, next) => {
  let orders=await Order.find({user:req.user._id})
  res.json({message:"All Orders",orders})
  })




  const onlinePayment = handleAsycError(async (req, res, next) => {
    let cart= await Cart.findById(req.params.id)
let totalPrice= cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
  let session =await stripe.checkout.sessions.create({
    line_items:[
      {
      price_data:{
        currency:"egp",
        unit_amount:totalPrice*100,
        product_data:{
name:req.user.name,
        },
      },
    quantity:1,
  },
],
"mode":"payment",
success_url:"https://route-comm.netlify.app/#/",     //Links from frontend
cancel_url:"https://route-comm.netlify.app/#/cart",    //customer_email:req.user.email
client_reference_id:req.params.id,
metadata:req.body.shippingAddress
  })
  res.json({message:"Payment Done",session})
  })


   const app = express();

 const createOnlineOrder= handleAsycError(async(req, res,next) => {
const sig = req.headers['stripe-signature'];
let event;
try {
event =stripe.webhooks.constructEvent(req.body, sig, "whsec_7sda9ZMTuB0z3IM26j1BzUakclYTDm0C");
} catch (err) {
  return res.status(400).send('Webhook Error: ${err.message} ');

}


if(event.type== "checkout.session. completed"){
  const e = event.data.object;
  let cart = await Cart.findById(e.client_reference_id)
  if(!cart) next(new AppError("No valid Cart",400))

    let user = await User.findOne({email:e.customer_email})
    if(!cart) next(new AppError("No valid Cart",400))

  let order= new Order({
    user:user._id,
    cartItems:cart.cartItems,
    totalPrice:e.amount_total / 100,
    shippingAddress: e.metadata,
    paymentMethod:"card",
    isPaid:true,
    paidAt:Date.now()
    
  })
  await order.save()

let options= cart.cartItems.map(item=>({
  updateOne:{
    filter:{_id:item.product},
    update:{$inc:{quantity:-item.quantity,sold:item.quantity}},

  },
}))
await Product.bulkWrite(options);
await Cart.findByIdAndDelete(req.params.id)

}else{
console.log(`Unhandled event type ${event.type}`)

}


res.json({message:"Done"});

  });
  



export {
  createCashOrder,
  getOrders,
  getOrder,
  onlinePayment,
  createOnlineOrder
}