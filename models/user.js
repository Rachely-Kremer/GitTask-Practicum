
const mongoose=require('mongoose')
const UsersSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
},
{
    timestamps: true
})
module.exports=mongoose.model('User',UsersSchema)