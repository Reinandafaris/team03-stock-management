const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

const { register } = require('../controllers/auth/registerController');
const { login } = require('../controllers/auth/loginControllers');
const { getAllUser, getUser } = require('../controllers/userController');

router.get('/users', getAllUser);
router.get('/users/:id', getUser);
router.post('/login', login);
router.post('/register', upload.array('images'), register);

module.exports = router;
