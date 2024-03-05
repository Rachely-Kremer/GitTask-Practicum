
const mongoose=require('mongoose')
const UsersSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:Number
})
module.exports=mongoose.model('Uswwer',UsersSchema);

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

