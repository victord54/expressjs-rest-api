const express = require('express');

const articleController = require('../controllers/article');

const router = express.Router();

router.get('/', articleController.getAll);

module.exports = router;
