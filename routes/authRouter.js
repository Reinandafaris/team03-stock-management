const express = require('express');

const router = express.Router();

const { getAllUser, getUser } = require('../controllers/userController');

router.get('/users', getAllUser);
router.get('/users/:id', getUser);

module.exports = router;
