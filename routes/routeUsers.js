const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers')

router.get('/', userController.getAllUser);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/', userController.getUserById);
router.delete('/', userController.deleteUser);
