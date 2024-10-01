import mongoose , { Types }from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'Category name should be more than 2 characters']
    },
    slug: {
        type: String,
        Lowercase: true,
        required: true
    },
    image: String,
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true, versionkey: false })


schema.post("init",function(doc){
    doc.image=process.env.BASEURL+"uploads/"+doc.image
})
export const Category = mongoose.model('Category', schema)