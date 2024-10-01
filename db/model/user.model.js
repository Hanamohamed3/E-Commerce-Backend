import mongoose from "mongoose";
import bcrypt from 'bcrypt';


const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'Name should be more than 2 characters']
    },
    email:{
        type:String,
        unique:true
    }, 
    password: String,
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    changePasswordAt:Date,
    wishList:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Product",
    }]
}, { timestamps: true, versionkey: false })

schema.pre("save",function(){
    console.log(this);    
    this.password=bcrypt.hashSync(this.password,7)
})

schema.pre("findByIdAndUpdate",function(){
    console.log(this);
    this._update.password=bcrypt.hashSync(this._update.password,7)
})
export const User = mongoose.model('User', schema)