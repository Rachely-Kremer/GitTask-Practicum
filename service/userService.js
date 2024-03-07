
const User = require('../models/user'); 
const { schemaForCreateUser, schemaForUpdateUser } = require('../schemas/schemas');

const getAllUsers = async () => {

 
        const users = await User.find().lean();
        return users;
};

const getUserById = async (id) => {

 
   const user = await User.findById(id).lean()
    return user;
}

const createUser = async (userData) => {

  // Validate request body against the schemaForCreateUser
  const { error } = schemaForCreateUser.validate(userData);
  if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }

    const user = await User.create(userData)
     return user;
 }


 const updateUser = async (id, userData) => {
        const { error } = schemaForUpdateUser.validate(userData);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const user = await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
        return user;
    } catch (error) {
        throw new Error('Error updating user');
    }
};

   
const deleteUser = async (id) => {

 
    const user = await User.findByIdAndDelete(id).exec();
    return user;
 }


module.exports= {
    getAllUsers, getUserById, createUser, updateUser, deleteUser
};