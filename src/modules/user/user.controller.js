import { deleteOne } from '../../handler/apiHandler.js';
import { handleAsycError } from '../../middleware/handleAsyncError.js';
import slugify from 'slugify'
import APIfeatures from '../../utilites/APIFeatures.js';
import { User } from './../../../db/model/user.model.js';
import AppError from '../../utilites/AppError.js';


const addUser = handleAsycError(async (req, res, next) => {
let userr=await User.findOne({email:req.body.email})
if(userr) return next (new AppError("Email is already used",409))
    let user = new User(req.body)
    let added = await user.save()
    res.json({ message: "user Added", added })
})


const getAllUsers= handleAsycError(async(req,res,next)=>{
    
    let apiFeature= new APIfeatures(User.find(),req.query).pagination().sort().search().fields()
    let allUsers= await apiFeature.mongooseQuery;
    res.json({message:"All Users",allUsers})   
})



const getUser =handleAsycError(async (req, res, next) => {
    const getOneUser = await User.findById(req.params.id)
    getOneUser  || res.json({ message: "Not Found"})
   !getOneUser || res.json({ message: "One User", getOneUser })
}
)

const updateUser = handleAsycError(async (req, res) => {
    req.body.slug=slugify(req.body.name);
    if (req.file) 
        req.body.logo=req.file.filename

    let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    updatedUser &&  res.json({ message: "Upadted", updatedUser })
    !updatedUser && res.json({ message: "User not found" })
})




const deleteUser = deleteOne(User)

const changePassword = handleAsycError(async (req, res,next) => {
    
let{id}=req.params
req.body.changePasswordAt=Date.now();
console.log(req.body.changePasswordAt)
    let updatedPass = await User.findOneAndUpdate({_id:id} ,req.body, { new: true })
    !updatedPass && next (new AppError("user not found",404)) 
    updatedPass && res.json({ message: "Password Updated",updatedPass })
})

export {
    addUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    changePassword
}