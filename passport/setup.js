var express=require('express')
var passport=require('passport')
var LocalStrategy=require('passport-local').Strategy
var bcrypt=require('bcrypt')
const User=require('../lib/models/User')
const Facebook=require('passport-facebook')
const FacebookStrategy=Facebook.Strategy
const {credentials}=require('../config')
// router.get('/',(req,res)=>{
//     res.render('login')
// })
// router.post('/api/login',(req,res)=>{
//     console.log(req.body.email)
//     res.redirect(303,'/')
// })
passport.serializeUser((user,done)=>{
    done(null,user.id);
})
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})
passport.use(
    new LocalStrategy ({usernameField:"email"},(email,password,done)=>{
        User.findOne({email:email})
            .then(user=>{
                if(!user){
                    const newUser=new User({email,password})
                    bcrypt.genSalt(10,(err,salt)=>{
                        bcrypt.hash(newUser.password,salt,(err, hash)=>{
                            if(err) throw err;
                            newUser.password=hash;
                            newUser
                                .save()
                                .then(user=>{
                                    return done(null,user)
                                })
                                .catch(err=>{
                                    return done(null,false,{message:err})
                                })
                        })
                    })
                }
                else{
                    bcrypt.compare(password,user.password,(err,isMatch)=>{
                        if(err) throw err;
                        if(isMatch){
                            return done(null,user);
                        }else{
                            return done(null,false,{message:'Wrong Password'})
                        }
                    })
                }
            })
            .catch(err=>{
                return done(null,false,{message:err})
            })
    })
)
passport.use( new FacebookStrategy({
        clientID:credentials.facebook.appId,
        clientSecret:credentials.facebook.appSecret,
        callbackURL:(process.env.BASE_URL||'')+"/auth/facebook/callback",

    },(accessToken,refreshToken,profile,done)=>{
        const authId='facebook:'+profile.id
        User.findOne({authId:authId})
        .then(user=>{
            console.log(profile)
            if(user)return done(null,user)
            const newUser=new User({authId})
            newUser.authId=authId
            newUser.name=profile.displayName
            newUser
                .save()
                .then(user=>{
                    return done(null,user)
                })
                .catch(err=>{
                    return done(err,false,{message:err})
                })

        })
    })
)
module.exports=passport