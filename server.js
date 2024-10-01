import 'dotenv/config.js'
import cors from 'cors'
import express from 'express'
import { connection } from './db/connection.js'
import { Bootstrap } from './src/modules/Bootstrap.js'

const app = express()
const port = 3000
app.use(express.json())
app.use("/uploads",express.static("uploads"))
app.use(cors())
connection
Bootstrap(app)

app.get('/', (req, res) => res.send('Hello World!'))



app.use((err,req,res,next)=>{
    console.error(err)
    res.status(err.statusCode).json({message:err.message,stack:err.stack})
})


app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))