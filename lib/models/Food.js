const mongoose=require('mongoose')
const FoodSchema=new mongoose.Schema({
    name:String,
    ingredients:Array,
    preptime:Number,
    type:String
})
const Food=mongoose.model('Food',FoodSchema)
module.exports=Food
