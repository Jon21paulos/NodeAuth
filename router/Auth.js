import express from 'express'
import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
const router = express.Router()
// router.get('/',async (req,res)=>{
//     try {
//         const users = await user.find()
//         res.json(users)
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })
router.post('/signup',async (req,res,next)=>{
    const Users = new User({
        name:req.body.name,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password,10)
    })
    try {
        const newUser = await Users.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({
            title:"login failed",
            error:"invalid credential"
        })
    }
})
router.post('/login',async (req,res,next)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(err) return res.status(500).json({
            title:"server error",
            error:err
        })
        if(!user){
            return res.status(401).json({
                title:"user not found",
                error:"invalid credential"
            })
        }
        if(!bcrypt.compareSync(req.body.password,user.password)){
            return res.status(401).json({
                title:"login faild",
                error:"invalid credential"
            })
        }

        let token = JWT.sign( {userId: user._id},"test")
        return res.status(200).json({
            title:"login success",
            token:token
        })
    })
})

export default router