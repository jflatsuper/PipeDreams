const mongoose =require('mongoose')
const OrderSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    products:{
        type:Array,
        required:true
    },
    transactionid:String,
    transactionref:String,
    completed:{
        required:true,
        type:Boolean,
        default:false
    }
})
const Order=mongoose.model('Order',OrderSchema)
module.exports=Order