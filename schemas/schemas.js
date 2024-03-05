const Joi = require('joi');

const schemaForCreateUser = Joi.object({ 
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required(),
});

const schemaForUpdateUser = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email(),
    phone: Joi.string().min(10),
});

module.exports = { schemaForCreateUser, schemaForUpdateUser };
