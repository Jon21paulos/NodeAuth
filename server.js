import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import Auth from './router/Auth.js'
import userRouter from './router/userRouter.js'


dotenv.config()
const app = express()
app.use(cors())

const port = process.env.PORT || 5000

mongoose.connect(process.env.uri,{ useNewUrlParser: true })
const db = mongoose.connection

db.on('error',(error)=>console.error(error))
db.once('open',( )=>console.log('database connected successfuly'))


app.use(express.json())

app.use("/auth",Auth)
app.use("/users",userRouter)


app.listen(port,()=>{
    console.log(`listenning on port ${port}`)
})