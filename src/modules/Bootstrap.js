import AppError from "../utilites/AppError.js"
import { globalError } from "../utilites/globalError.js"
import authRouter from "./auth/auth.routes.js"
import brandRoutes from "./brand/brand.routes.js"
import cartRoutes from "./cart/cart.routes.js"
import categoryRoutes from "./category/category.routes.js"
import couponRoutes from "./coupon/coupon.routes.js"
import orderRoutes from "./order/order.routes.js"
import productRoutes from "./product/product.routes.js"
import reviewRoutes from "./review/review.routes.js"
import SubCategoryRoutes from "./subCategory/subCategory.routes.js"
import UserRoutes from "./user/user.routes.js"
import wishListRoutes from "./wishList/wishList.routes.js"

export const Bootstrap= (app) =>{
    app.use("/api/v1/categories",categoryRoutes)
    app.use("/api/v1/subcategories",SubCategoryRoutes)
    app.use("/api/v1/brand",brandRoutes)
    app.use("/api/v1/product",productRoutes)
    app.use("/api/v1/user",UserRoutes)
    app.use("/api/v1/auth",authRouter)
    app.use("/api/v1/review",reviewRoutes)
    app.use("/api/v1/wishList",wishListRoutes)
    app.use("/api/v1/coupon",couponRoutes)
    app.use("/api/v1/cart",cartRoutes)
    app.use("/api/v1/order",orderRoutes)







app.all('*',(req,res,next)=>next (new AppError(`can't find this route: ${req.originalUrl}`,404)))
app.use(globalError)


}