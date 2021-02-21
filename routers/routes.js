const express = require('express');
const functions = require('../controllers/usersController');

const router = new express.Router();

router.get('/:city', functions.getUsers);

module.exports = router;