const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const UserSchema= new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:false
    },
    authId:String,
    password:String,
    dateCreated:Date,
    type:{
        type:String,
        default:'Customer'

    },
    age:Date

})
const User=mongoose.model('User',UserSchema)
module.exports=User