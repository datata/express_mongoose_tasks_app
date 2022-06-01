const express = require('express');
const router = express.Router()

const UserController = require('../controllers/UserController');
const authController = require('../controllers/authController');
const auth = require('../middleware/verifyToken');

router.get('/users', auth,  UserController.getAllUsers);

router.get('/user/:id', auth, UserController.getUserById);

router.put('/user/:id', auth, UserController.updateUserByid);

router.delete('/user/:id', auth, UserController.deleteUserByid);

router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.get('/auth/me', auth, authController.me);

module.exports = router;