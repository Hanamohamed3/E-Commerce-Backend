
export const globalError=(err,req,res,next)=>{
    res.status(err.statusCode).send({message:"Error",err:err.message})

}