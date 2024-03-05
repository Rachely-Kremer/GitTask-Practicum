const express=require('express');
const router=express.Router();
const userController=require('../controllers/')

router.get('/',getAllUsers);
router.post('/',addUser);
router.get('/',getUserByName);
router.put('/:userId',updateUser);
router.delete('/userId',deleteUser);
