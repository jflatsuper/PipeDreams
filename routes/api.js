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
            
            return res.status(200).json(user)
        })
    })(req,res)
})
router.get('/facebook',(req,res,next)=>{
    if(req.query.redirect)req.session.authRedirect=req.query.redirect
    passport.authenticate('facebook',{ scope: ['email']})(req,res,next)
})

router.get('/facebook/callback',passport.authenticate('facebook',
    {successRedirect:"http://localhost:3000/",
    failureRedirect:"http://localhost:3000/"})
)
router.post('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/api/signin')
})
router.get('/getAuth',(req, res,next) => {
   
   res.json(req.user)
   console.log(req.isAuthenticated())
})


module.exports=router