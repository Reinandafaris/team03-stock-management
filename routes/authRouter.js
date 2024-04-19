const express = require('express');

const router = express.Router();

const { register } = require('../controllers/auth/registerController');
const { login } = require('../controllers/auth/loginControllers');

router.post('/login', login);
router.post('/register', register);

module.exports = router;
