const express=require('express')
const router=express.Router()
const Food = require('../lib/models/Food.js')
const multiparty=require('multiparty')
const cloudinary=require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'jflat', 
    api_key: '936736424846331', 
    api_secret: 'mnndceAQHgPCDn3ExaqIg7Odh8c',
    secure: true
  });
router.post('/addfoodprocess',async (req,res)=>{
    const form=new multiparty.Form()
    
    form.parse(req, async (err, fields, files) => {
      if(err) return res.status(500).send({ error: err.message })
      console.log(files.file[0].path)
      console.log(fields)
      const img=await cloudinary.uploader.upload(files.file[0].path,{
        resource_type:'auto',
        public_id:'pipedreams/food/'+Date.now()
      }, async (error, result) =>{
          if(error){
              return error
          }
           return result
      });
     
     
      console.log(img)
      const newFood=new Food
      newFood.name=fields.name[0]
      // const n=fields.ingredients.split(',')
      // const obj={}
      // for(const ingredients in n){
      //   obj[ingredients]=n[ingredients]
      //   console.log(n[ingredients])
      // }
      // console.log(obj) 
      
      newFood.preptime=fields.preptime[0]
      newFood.ingredients=fields.ingredients[0].split(',')
      newFood.type=fields.type[0]
      newFood.status=fields.status[0]
      newFood.price=fields.price[0]
      newFood.imglnk=img.public_id
      newFood.imgurl=img.secure_url
      newFood.description=fields.description[0]
     
      await newFood.save()
      console.log(newFood)
      
  
  
    })
})
module.exports=router