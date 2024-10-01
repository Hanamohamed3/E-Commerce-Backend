import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../../../db/model/user.model.js";
import { handleAsycError } from "../../middleware/handleAsyncError.js";
import AppError from "../../utilites/AppError.js";
// import { parse } from "dotenv";



 const signUp= handleAsycError(async (req, res, next) => {
let isFound= await User.findOne({ email: req.body.email });
console.log(isFound);
if (isFound) next(new AppError("Email already exists", 409))
let user = new User(req.body)
await user.save()
res.json({message:"added", user})
}
)


const signIn=handleAsycError(async(req,res,next)=>{
    let {email,password}=req.body;
    let isFound=await User.findOne({email});
    const match=await bcrypt.compare(password,isFound.password);
    if(isFound && match){
        let token =jwt.sign({name:isFound.name,userId:isFound._id,role:isFound.role},"treka")
        return res.json({message:"success",token})
    }
    next(new AppError("incorrect email or password",401))
})


// add product postman checkkkk
const protectedRoutes=handleAsycError(async(req,res,next)=> {
    let{token}=req.headers;
    if (!token) return next(new AppError("please provide token",401))
        let decoded=await jwt.verify(token,"treka");
    // console.log(decoded)
    let user=await User.findById(decoded.userId)
    if (!user) return next(new AppError("invalid user",401))
 if(user.changePasswordAt){
    let changePasswordTime=parseInt(user.changePasswordAt.getTime()/1000);
    if(changePasswordTime>decoded.iat) return next(new AppError("Token is invalid",401))
    }
req.user=user;
    next()
})


const allowTo=(...roles)=>{

return handleAsycError((req,res,next)=>{
    if(!roles.includes(req.user.role)) return next (new AppError("not authorized",403))

        next()
})


}

    export {
        signUp,
        signIn,
        protectedRoutes,
        allowTo
    }