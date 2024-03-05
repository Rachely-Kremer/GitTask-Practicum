
const mongoose=require('mongoose')
const UsersSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:Number
})
module.exports=mongoose.model('User',UsersSchema)