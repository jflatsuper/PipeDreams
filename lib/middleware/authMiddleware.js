module.exports=async (req,res,next)=>{
    if(!req.user){
       return res.redirect(303,'/api/signin')
    }
    next()

}