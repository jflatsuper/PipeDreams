var express=require('express')
const passport=require('passport')
const Food = require('../lib/models/Food')
var router=express.Router()
const Newsletter=require('../lib/models/Newsletter')
const cloudinary=require('cloudinary').v2
const Carts=require('../lib/models/Carts')
const Order=require('../lib/models/Orders')

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
   
   res.json(req.user||undefined)
   console.log(req.isAuthenticated())
})
router.post('/join_newsletter',(req,res)=>{
    Newsletter.findOne({_id:req.user.id}||{email:req.body.email})
    .then((user)=>{
        if (user) {
           return  res.json('you hva ealready signed up for our newsleterr with email '+user.email)
            
        }
        const newuser=new Newsletter
        newuser.email=req.body.email
        req.user? newuser._id=req.user._id:null
        newuser.save()
        return res.json(newuser)
    })

   
})
router.post('/getfood',async(req,res)=>{
    const allFood= await Food.find({})
    
    const f= await Promise.all(allFood.map(async food=>{
        try{
            return {food, 
                    url:await cloudinary.api.resource(food.imglnk,function as(error, result)
                    {if(error){
                    return error
                    }
                    return result })
            };
           
            
            
        }
        catch(err){
            throw err
        }
        }))
   
   
    
    return res.json(f)
})
router.get('/getCart',async(req,res)=>{
    const userCart=await Carts.findOne({_id:req.user._id})
    console.log(userCart)
    res.json(userCart)

})
router.post('/updateCart',async(req,res)=>{
    console.log(req.body.food._id)
    const id=req.body.food._id
    let t=null
  
    Carts.findOne({_id:req.user._id,'products._id':req.body.food._id},async function (
        err,
        existingproduct
      ){
          if(existingproduct===null){
             t=await Carts.findOneAndUpdate(
                { _id:req.user._id, status: "active",},
                {$push:{
                    products:{
                        
                            '_id':req.body.food._id,
                            'name':req.body.food.name,
                            'type':req.body.food.type,
                            'status':req.body.food.status,
                            'price':req.body.food.price,
                            'preptime':req.body.food.preptime,
                            'imglink':req.body.food.imglink,
                            'description':req.body.food.description,
                            'num':1
                            
                            
                
                        
                    }
                } },
                {
                    new: true,
                    upsert:true
              });
              res.json(t)
              console.log(t)
                
              


          }else{
            t=await Carts.findOneAndUpdate(
                { _id:req.user._id, status: "active","products._id":req.body.food._id },
                { $inc: {'products.$.num':1}},
                {
                    new: true,
                    multi: true ,
                    upsert:true
              });
              res.json(t)
              console.log(t)
                
              

          }
      })
 
    
    // const Cart=await Carts.updateOne(
    //     {_id:req.user._id,'products.id':id},
    //     {$set:{status:'active','products':req.body.food}},
    //     {upsert:true})
    //     console.log(Cart)
 
    

    })
    router.post('/saveOrder',async (req,res)=>{
      console.log(req.body.checked)
      let arrRem=[]
      for(i of req.body.checked){
          arrRem.push(i._id)


      }
      console.log(arrRem)
        const saveOrder=new Order({
            userId:req.user._id,
            products:req.body.checked,
            transactionid:req.body.transid,
            transactionref:req.body.reference,

            
        })
        
        const removed=await Carts.updateOne({_id:req.user._id},{
            $pull:{
                products:{'_id':{$in:arrRem}}
            }

        })
        console.log(removed)
        const t= await saveOrder.save()
        console.log(t)
    })

module.exports=router