import mongoose ,{Types} from "mongoose";
const schema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true,
        required:[true,'Review comment is required']
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:true
    },
   user:{
    type: Types.ObjectId,
    ref:"User"
   },
   product:{
    type: Types.ObjectId,
    ref:"Product"
   },
    
}, { timestamps: true, versionkey: false })


schema.pre(/^find/,function(){
    this.populate('user','name');
})

export const Review = mongoose.model('Review', schema)