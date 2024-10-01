import mongoose from 'mongoose';

export const connection = mongoose.connect(process.env.DB_Online_connection)
.then((res)=>console.log("Connected"))
.catch((error)=>console.log("Error"))

