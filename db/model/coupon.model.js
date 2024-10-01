import mongoose from "mongoose";
const schema = new mongoose.Schema({
    code: {
        type: String,
        trim: true,
        unique:true,
        required:[true,'coupon code required']
    },
   expire:String,
   status:{
    type:Boolean,
    enum:['active','inactive'],
    default:"active"
   },
   discount:{
    type: Number,
    min:1,
    required:true
   },
   type:{
    type: String,
     enum:['percentage','fixed'],
    default:"fixed"
   },
    
}, { timestamps: true, versionkey: false })

export const Coupon = mongoose.model('Coupon', schema)