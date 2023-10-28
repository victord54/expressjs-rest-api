const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/login', authController.login);

router.post('/register', authController.register);

module.exports = router;
