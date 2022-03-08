const mongoose=require('mongoose')
const NewsletterSchema=mongoose.Schema({
    email:String,

})
const  Newsletter=mongoose.model('Newsletter',NewsletterSchema)
module.exports=Newsletter