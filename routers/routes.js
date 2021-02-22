const express = require('express');
const functions = require('../controllers/usersController');

const router = new express.Router();

router.get('/people-living-in-london-or-within-50-miles/:city', functions.getUsers);

module.exports = router;