const mongoose = require('mongoose');
const Joi = require('joi');

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
},
{
    timestamps: true
});

const User = mongoose.model('User', UsersSchema);

module.exports = { User };
