import mongoose , {Types} from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'SubCategory name should be more than 2 characters']
    },
    slug: {
        type: String,
        Lowercase: true,
        required: true
    },
    category:{
        type: Types.ObjectId,
        ref:"Category"
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    },
    image:String,
}, { timestamps: true, versionkey: false })

export const SubCategory = mongoose.model('SubCategory', schema)