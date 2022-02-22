var express=require('express')
const passport=require('passport')
var router=express.Router()
router.get('/signin',(req,res)=>{
    res.render('login')
})
router.post("/login",(req,res,next)=>{
    passport.authenticate('local',function(err,user,info){
        if(err){
            return res.status(400).json({errors:err})
            // return res.redirect(303,'/api/signin')
        }
        if(!user){
            return res.status(400).json({errors:"No user found"})
            // return res.redirect(303,'/api/signin')
        }
        req.logIn(user,function(err){
            if (err) {
                return res.status(400).json({errors:err})    
            }
            // return res.redirect('/dashboard')
            return res.status(200).json({success:`logged in ${user.id}`})
        })
    })(req,res)
})
router.get('/facebook',(req,res,next)=>{
    if(req.query.redirect)req.session.authRedirect=req.query.redirect
    passport.authenticate('facebook')(req,res,next)
})

router.get('/facebook/callback',passport.authenticate('facebook',
    {failureRedirect:"/api/signin"}),(req,res)=>{
        const redirect=req.session.authRedirect
        if(redirect)delete req.session.authRedirect
        res.redirect(303,redirect||'/dashboard')
    }
)
router.post('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/api/signin')
})


module.exports=router