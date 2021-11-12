import express from 'express'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.get('/',checkAuth, (req,res)=>{
    console.log('hi')
})


export default router