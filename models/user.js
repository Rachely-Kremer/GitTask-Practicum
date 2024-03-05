
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

const Joi = require('joi');

export const schemaForCreateUser = Joi.object({ 
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
});
export const schemaForUpdateUser = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email(),
    phone: Joi.string().min(10),
  });

