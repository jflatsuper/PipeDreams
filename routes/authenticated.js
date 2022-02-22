const express=require('express')
const router=express.Router()
router.get('/',(req,res)=>{
    console.log(req.user.email)
    res.render('home',{username:req.user.email})
  })
module.exports=router