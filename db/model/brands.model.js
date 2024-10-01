import mongoose, {Types}  from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'Brand name should be more than 2 characters']
    },
    slug: {
        type: String,
        Lowercase: true,
        required: true
    },
    logo: String,
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true, versionkey: false })


schema.post("init",function(doc){
    doc.logo=process.env.BASEURL+"uploads/"+doc.logo
})
export const Brand = mongoose.model('Brand', schema)