const express = require('express');

const userController = require('../controllers/users');

const router = express.Router();

router.get('', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.post('restore/:id', userController.restoreUser);

module.exports = router;
