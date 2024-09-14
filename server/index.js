import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './routes/router.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials : true
}))
app.use("/api", router)


const PORT = process.env.PORT || 3501

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Connected to mongoDB`)
        console.log(`Server is running at port ${PORT}`)
    })
})
