import AppError from "../utilites/AppError.js"

export const handleAsycError = (fn) => {
return (req,res,next) => {
    fn(req,res, next).catch(err => next(new AppError(err,422)))
}
}