import { handleAsycError } from "../middleware/handleAsyncError.js"



export const deleteOne=(model)=>{
   return handleAsycError(async (req, res) => {
        const brand = await model.findByIdAndDelete(req.params.id)
        brand  || res.json({ message: "Not Found"})
       !brand || res.json({ message: "Deleted", brand })
})
}