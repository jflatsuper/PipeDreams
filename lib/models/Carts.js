const mongoose=require('mongoose')
const CartSchema=mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:String,
    quantity:Number,
    total:Number,
    products:Array
})
const Carts=mongoose.model('Carts',CartSchema)
module.exports=Carts