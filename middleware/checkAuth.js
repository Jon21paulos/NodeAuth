import JWT from 'jsonwebtoken'
import User from '../model/userModel.js'

const checkAuth = async (req, res, next) =>{
    let token = req.header('token')
    // CHECK IF WE EVEN HAVE A TOKEN
    if(token == "null"){
        token = null
    }
    if(!token){
        res.status(400).json({
            errors: [
                {
                    msg: "No token found"
                }
            ]
        })
    }
    else{
        JWT.verify(token,"test",(err,decode)=>{
            if(err) return   res.sendStatus(401).json({
                title:'invalid token'
            })
            User.findOne({ _id:decode.userId},(err,user)=>{
                if(err) return  console.log(err)
    
                return res.status(200).json({
                    title:"data grabbled",
                    user:{
                        email:user.email,
                        name:user.name
                    },
                    
                })
                
            })
            next()
        })
    } 
       
}
export default checkAuth