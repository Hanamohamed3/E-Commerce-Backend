import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: [true, 'name is required'],
        minLength: [2, 'Product name should be more than 2 characters']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'description is required'],
        minLength: [50, 'description should be more than 50 characters']
    },
    slug: {
        type: String,
        lowercase: true,
        required: [true, 'slug is required']
    },
    imageCover:String,

    images: [String],
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: [0, 'price cannot be negative']
    },
    priceAfterDiscount: {
        type: Number,
        min:0, 
    },
    sold: {
        type: Number,
        default: 0,
        min: [0, 'sold count cannot be negative']
    },
    stock: {
        type: Number,
        min: 0
    },
    category: {
        type: Types.ObjectId,
        ref: "Category"
    },
    subCategory: {
        type: Types.ObjectId,
        ref: "SubCategory"
    },
    brand: {
        type: Types.ObjectId,
        ref: "Brand"
    },
    rateCount:Number,
    rateAvg:Number,
    rate: {
        type: Number,
        min: 0,
        max: 5
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
    
    }
}, { timestamps: true, versionKey: false ,toJSON:{virtuals:true},toObject:{virtuals:true}});


schema.post("init",function(doc){
    doc.imageCover=process.env.BASEURL+"uploads/"+doc.imageCover;
   if( doc.images)doc.images=doc.images.map(ele =>process.env.BASEURL+"uploads/"+ele )
    

});
schema.pre("/^find/",function(){
    this.populate("myReview")
})

schema.virtual("myReview",{
    ref: 'Review',
    localField: '_id',
    foreignField: 'Product',
  });

export const Product = mongoose.model('Product', schema);
