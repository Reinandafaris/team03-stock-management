const express = require('express');
const router = express.Router();

const Upload = require('../middlewares/upload');
const Authenticate = require('../middlewares/authentication');
const { getAllUser, getUser, login, register, getUserLoggedIn, updateUser, deletedUser } = require('../controllers/auth');

router.get('/me', Authenticate, getUserLoggedIn);

router.get('/users', getAllUser);
router.get('/users/:id', getUser);

router.post('/login', login);
router.post('/register', Upload.array('images'), register);
router.patch('/update/:id', Upload.array('images'), updateUser);
router.delete('/delete/:id', Upload.array('images'), deletedUser);

module.exports = router;
