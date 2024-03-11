// const Joi = require('joi');

// const validCreateUser = Joi.object({ 
//     name: Joi.string().min(2).required(),
//     email: Joi.string().email().required(),
//     phone: Joi.string().pattern(/^[0-9]+$/).min(10).required(),
// });

// const validUpdateUser = Joi.object({
//     name: Joi.string().min(2),
//     email: Joi.string().email(),
//     phone: Joi.string().pattern(/^[0-9]+$/).min(10),
// });

// module.exports = { validCreateUser, validUpdateUser };

const Joi = require('joi');

exports.validCreateUser = (bodyData) => {
    let joiUser = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^[0-9]+$/).min(10).required(),
    })
    return joiUser.validate(bodyData)
}

exports.validUpdateUser = (bodyData) => {
    let joiUser = Joi.object({
        name: Joi.string().min(2),
        email: Joi.string().email(),
        phone: Joi.string().pattern(/^[0-9]+$/).min(10),
    })
    return joiUser.validate(bodyData)
}