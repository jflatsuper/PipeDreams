const mongoose=require('mongoose')
const FoodSchema=new mongoose.Schema({
    name:String,
    ingredients:Array,
    preptime:{
        type:Number,
        required:true
    },
    type:String,
    status:String,
    description:String,
    imglnk:{
        type:String
        },
    price:Number
})
const Food=mongoose.model('Food',FoodSchema)
module.exports=Food
