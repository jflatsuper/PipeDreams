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
    console.log('this is ')
    res.json(req.user)
    
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
    return res.json(allFood)
})
router.get('/getCart',async(req,res)=>{
    if(req.user){
        console.log('error is from ')
        console.log(req.user)
        const userCart=await Carts.findOne({_id:req.user._id})
        console.log(userCart)
        return res.json(userCart)
        
    }
    res.json({})
    

})
router.post('/updateCart',async(req,res)=>{
    console.log(req.body._id)
    const id=req.body._id
    let t=null 
    
    const foods=await Food.findOne({_id:id})
    console.log(foods)
    if(req.body.action==='plus'){
        Carts.findOne({_id:req.user._id,'products._id':id},async function (
            err,
            existingproduct
          ){
              if(existingproduct===null){
                
                 t=await Carts.findOneAndUpdate(
                    { _id:req.user._id, status: "active",},
                    {$push:{
                        products:{
                            
                                '_id':id,
                                'name':foods.name,
                                'type':foods.type,
                                'status':foods.status,
                                'price':foods.price,
                                'preptime':foods.preptime,
                                'imglink':foods.imglink,
                                'imgurl':foods.imgurl,
                                'description':foods.description,
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
                    { _id:req.user._id, status: "active","products._id":id },
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
    }else{
        let find=await Carts.findOne({ _id:req.user._id, status: "active" })
        let q=find.products.find(t=>t._id===id)
        if(!q){
            res.json(find)

        }
        else if(q.num===1){
           t=await Carts.findOneAndUpdate(
               { _id: req.user._id }, 
               { $pull: { "products": { "_id": id } }},
               { new: true, multi:true })
            res.json(t)
            console.log(t)

        }
        else if(q.num>1){
        t=await Carts.findOneAndUpdate(
            { _id:req.user._id, status: "active","products._id":id },
            { $inc: {'products.$.num':-1}},
            {
                new: true,
                multi: true ,
                upsert:true
          });
          res.json(t)
          console.log(t)
              
    }
}
    
 
    
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
        res.json(t)
    })
    router.get('/getOrders', async(req,res)=>{
        if(req.user?._id){
            const orders= await Order.find({userId:req.user._id})
            return res.json(orders)
           
        }
        
        return res.json([])

    })

module.exports=router