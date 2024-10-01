// import userModel from " .. / .. /db/models/user.model.js"
// import bcrypt from 'bcrypt'
// import AppError from " .. /utili/AppError.js"
import { User } from '../../db/model/user.model.js'
import AppError from '../utilites/AppError.js'

export const checkEmail = async(req, res, next) =>{
let user = await User.findOne({email:req.body.email})
if(user)
return next(new AppError("u already register", 409))
// return res.status(409).json({message:"u already register"})

// req.body.password = bcrypt.hashSync(req.body.password, 10)

next()
}